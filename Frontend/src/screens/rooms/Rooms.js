import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CFormLabel,
  CFormControl,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { roomService } from 'src/_services'
import { roomTypeService } from 'src/_services'

const Rooms = () => {
  const [openModal, setOpenModal] = useState(false)
  const [rooms, setRooms] = useState([
    {
      id: '',
      name: '',
      roomTypeId: 0,
      note: '',
      roomTypeModel: '',
    },
  ])
  const [roomTypes, setRoomtypes] = useState([
    {
      id: '',
      name: '',
      cost: 0,
    },
  ])
  const roomInit = {
    name: '',
    roomTypeId: '',
    note: '',
  }
  const [roomToCreateOrUpdate, setRoomToCreateOrUpdate] = useState(roomInit)

  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [openModal])

  useEffect(() => {
    roomTypeService.getAll().then((x) => setRoomtypes(x))
  }, [])
  const handleClickCreate = () => {
    setRoomToCreateOrUpdate(roomInit)
    setOpenModal(true)
  }
  const handleCreateService = (ob) => {
    roomService.create(ob)
  }

  const handleClickEdit = (data) => {
    setOpenModal(true)
  }

  const handleClickDelete = (data) => {
    roomService._delete(data)
    let roomsCopy = rooms.filter((item) => item.id !== data)
    setRooms(roomsCopy)
  }

  const OnSelect = (e) => {
    let value = e.target.selectedIndex
    let temp = roomToCreateOrUpdate
    temp.roomTypeId = roomTypes.find((item) => item.name === value).id
  }

  const onInputChange = (e, type) => {
    let value = e.target.value
    let temp = roomToCreateOrUpdate

    switch (type) {
      case 'name':
        temp.name = value
        break
      case 'note':
        temp.note = value
        break
      default:
        break
    }
    setRoomToCreateOrUpdate(temp)
    console.log('aa', roomToCreateOrUpdate)
  }

  const modalCreateEdit = () => {
    return (
      <CModal visible={openModal}>
        <CModalHeader onDismiss={() => setOpenModal(false)}>
          <CModalTitle>Thông tin phòng muốn thêm</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup className="mb-3">
            <CCol>
              <CFormLabel>Tên: </CFormLabel>
            </CCol>
            <CCol>
              <CFormControl
                type="text"
                value={roomToCreateOrUpdate.name}
                onInput={(e) => onInputChange(e, 'name')}
              />
            </CCol>
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CCol>
              <CFormLabel>Loại phòng:</CFormLabel>
            </CCol>
            <CCol>
              <CFormSelect onChange={(e) => OnSelect(e)}>
                {roomTypes.map((item, index) => {
                  return <option key={index}>{item.name}</option>
                })}
              </CFormSelect>
            </CCol>
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CCol>
              <CFormLabel>Ghi chú: </CFormLabel>
            </CCol>
            <CCol>
              <CFormControl
                type="text"
                value={roomToCreateOrUpdate.note}
                onInput={(e) => onInputChange(e, 'note')}
              />
            </CCol>
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => handleCreateService()}>Lưu</CButton>
          <CButton color="secondary">Đóng</CButton>
        </CModalFooter>
      </CModal>
    )
  }
  return (
    <CRow>
      {modalCreateEdit()}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách loại phòng:</strong>
          </CCardHeader>
          <CCardBody style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="text-medium-emphasis small" style={{ width: '90%' }}>
                Đây là danh sách các loại phòng của khách sạn
              </p>
              <CButton
                onClick={() => handleClickCreate()}
                style={{ width: '10%', fontSize: '0.8rem' }}
              >
                {/* <CIcon style={{ margin: '0px 5px' }} size={'lg'} name="cil-plus"></CIcon> */}
                <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>+</span>
                Thêm phòng
              </CButton>
            </div>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên phòng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Loại phòng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tình trạng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ghi chú</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rooms.map((room, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{room.name}</CTableDataCell>
                    <CTableDataCell>{room.roomTypeModel.name}</CTableDataCell>
                    <CTableDataCell>{room.roomStatus}</CTableDataCell>
                    <CTableDataCell>{room.note}</CTableDataCell>
                    <CTableDataCell>
                      <CIcon
                        style={{ margin: '0px 5px', cursor: 'pointer' }}
                        size={'lg'}
                        name="cil-pencil"
                        onClick={() => handleClickEdit(room)}
                      ></CIcon>
                      <CIcon
                        style={{ margin: '0px 5px', cursor: 'pointer' }}
                        size={'lg'}
                        name="cil-trash"
                        onClick={() => (room.id = handleClickDelete(room.id))}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Rooms
