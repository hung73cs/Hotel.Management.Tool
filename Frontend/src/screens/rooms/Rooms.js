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
  CFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { roomService } from 'src/_services'
import { roomTypeService } from 'src/_services'

import AddEditComponent from 'src/components/room/AddEditComponent'
import { map } from 'core-js/core/array'
const Rooms = () => {
  const [openModal, setOpenModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [rooms, setRooms] = useState([
    {
      name: '',
      cost: 0,
      roomTypeModel: '',
    },
  ])
  const roomInit = {
    name: '',
    roomType: '',
    status: '',
    note: '',
    roomTypeModel: {
      id: '',
      name: '',
      cost: 0,
    },
  }
  const [dataRoom, setDataRoom] = useState(roomInit)
  const [roomTypes, setRoomtypes] = useState([
    {
      id: '',
      name: '',
      cost: 0,
    },
  ])

  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [openModal])

  // useEffect(() => {
  //   roomTypeService.getAll().then((x) => setRoomtypes(x))
  // }, [])
  console.log(roomTypes)
  const handleClickCreate = () => {
    setIsEdit(false)
    setDataRoom(roomInit)
    setOpenModal(true)
  }

  const handleClickEdit = (data) => {
    setIsEdit(true)
    setDataRoom(data)
    setOpenModal(true)
  }

  const handleClickDelete = (data) => {
    roomService._delete(data)
    let roomsCopy = rooms.filter((item) => item.id !== data)
    setRooms(roomsCopy)
  }

  const close = () => {
    setOpenModal(false)
  }

  const modalCreateEdit = () => {
    return (
      <CModal visible={openModal}>
        <CModalHeader onDismiss={() => setOpenModal(false)}>
          <CModalTitle>THÔNG TIN CHI TIẾT</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCard>
            <CCardBody>
              <CInputGroup className="mb-3">
                <CCol>
                  <CFormLabel>Tên: </CFormLabel>
                </CCol>
                <CCol>
                  <CFormControl type="text" />
                </CCol>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CCol>
                  <CFormLabel>Loại phòng:</CFormLabel>
                </CCol>
                <CCol>
                  {/* <CFormSelect> */}
                  {/* {roomTypes.map((item, index) => {
                    return <div key={index}>{item.name}</div>
                  })} */}
                  {/* </CFormSelect> */}
                </CCol>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CCol>
                  <CFormLabel>Tình trạng:</CFormLabel>
                </CCol>
                <CCol>
                  <CFormSelect>
                    <option>Trống</option>
                    <option>Đang được sử dụng</option>
                    <option>Đang sửa chữa</option>
                  </CFormSelect>
                </CCol>
              </CInputGroup>
            </CCardBody>
          </CCard>
        </CModalBody>
        <CModalFooter></CModalFooter>
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
                onClick={() => handleClickCreate(dataRoom)}
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
