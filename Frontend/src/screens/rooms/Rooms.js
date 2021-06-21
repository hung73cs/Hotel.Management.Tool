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
  CPagination,
  CPaginationItem,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { roomService, roomTypeService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
const Rooms = () => {
  const roomToCreateInit = {
    id: null,
    name: '',
    roomTypeId: '',
    note: '',
  }
  const [openModal, setOpenModal] = useState(false)
  const [rooms, setRooms] = useState([])
  const [roomTypes, setRoomtypes] = useState([
    {
      id: '',
      name: '',
      cost: 0,
    },
  ])
  const [roomToCreate, setRoomToCreate] = useState(roomToCreateInit)
  const [editForm, setEditForm] = useState(false)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState()

  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [openModal])

  const handleClickCreate = () => {
    setOpenModal(true)
  }
  const handleClickEdit = (room) => {
    setEditForm(true)
    setOpenModal(true)
    setRoomToCreate(room)
  }

  const handleClickDelete = (data) => {
    roomService._delete(data)
    let roomsCopy = rooms.filter((item) => item.id !== data)
    setRooms(roomsCopy)
    setToastMessage('Xoá phòng thành công')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setMessage('')
    setRoomToCreate(roomToCreateInit)
    setEditForm(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRoomToCreate({ ...roomToCreate, [name]: value })
  }

  const loadedValueSelectRoomType = (data) => {
    if (editForm) return roomTypes.find((x) => x.id === data)?.name
    else return roomTypes[0]?.name
  }

  const saveRoomToCreate = () => {
    var data = {
      name: roomToCreate.name,
      roomTypeId: roomTypes.find((x) => x.name === roomToCreate.roomType)?.id,
      note: roomToCreate.note,
    }
    roomService.create(data).then((res) => {
      if (res === 500 || res === 409) {
        return setMessage('Gặp lỗi khi tạo, kiểm tra tên có bị trùng')
      } else {
        setMessage('')
        setOpenModal(false)
        setRoomToCreate(roomToCreateInit)
        setToastMessage('Tạo phòng thành công')
      }
    })
  }

  const saveRoomToEdit = () => {
    var data = {
      id: roomToCreate.id,
      name: roomToCreate.name,
      roomTypeId: roomToCreate.roomTypeId,
      note: roomToCreate.note,
    }
    roomService.edit(data).then((res) => {
      if (res === 500 || res === 409) {
        return setMessage('Gặp lỗi khi sửa, kiểm tra tên có bị trùng')
      } else {
        setMessage('')
        setOpenModal(false)
        setRoomToCreate(roomToCreateInit)
        setToastMessage('Sửa phòng thành công')
      }
    })
  }

  const [searchInput, setSearchInput] = useState('')

  const handleChangeSearchInput = (e) => {
    const { name, value } = e.target
    setSearchInput({ ...searchInput, [name]: value })
    //searchRoom()
  }
  const searchRoom = () => {
    let filteredData = rooms.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.roomType.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.note.toString().toLowerCase().includes(searchInput.toLowerCase())
      )
    })
    setRooms(filteredData)
  }

  useEffect(() => {
    roomTypeService.getAll().then((x) => setRoomtypes(x))
  }, [])

  const modalCreateEdit = () => {
    return (
      <CModal visible={openModal}>
        <CModalHeader onDismiss={() => setOpenModal(false)}>
          {editForm ? (
            <CModalTitle>Thông tin phòng muốn sửa</CModalTitle>
          ) : (
            <CModalTitle>Thông tin phòng muốn thêm</CModalTitle>
          )}
        </CModalHeader>
        {message && <Message variant="danger">{message}</Message>}
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Tên: </CFormLabel>
              </CCol>
              <CCol>
                <CFormControl
                  name="name"
                  type="text"
                  id="name"
                  value={roomToCreate.name}
                  onInput={handleInputChange}
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Loại phòng:</CFormLabel>
              </CCol>
              <CCol>
                <CFormSelect
                  name="roomType"
                  id="roomType"
                  value={roomToCreate.roomType}
                  defaultValue={loadedValueSelectRoomType(roomToCreate.roomTypeId)}
                  onInput={handleInputChange}
                >
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
                  id="note"
                  name="note"
                  onInput={handleInputChange}
                  value={roomToCreate.note}
                />
              </CCol>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          {editForm ? (
            <CButton color="secondary" onClick={saveRoomToEdit}>
              Lưu
            </CButton>
          ) : (
            <CButton color="secondary" onClick={saveRoomToCreate}>
              Lưu
            </CButton>
          )}

          <CButton color="secondary" onClick={() => handleCloseModal()}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }

  return (
    <CRow>
      {toastMessage && <ToastNotification message={toastMessage} />}
      {modalCreateEdit()}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách loại phòng:</strong>
          </CCardHeader>
          <CCardBody style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="text-medium-emphasis small" style={{ width: '70%' }}>
                Đây là danh sách các phòng của khách sạn
              </p>
              <CInputGroup style={{ width: '20%', marginRight: 20 }}>
                <CCol>
                  <CFormControl
                    type="text"
                    name="searchInput"
                    onInput={handleChangeSearchInput}
                    value={searchInput || ''}
                  />
                </CCol>
              </CInputGroup>
              <CButton
                onClick={() => handleClickCreate()}
                style={{ width: '10%', fontSize: '0.8rem' }}
              >
                {/* <CIcon style={{ margin: '0px 5px' }} size={'lg'} name="cil-plus"></CIcon> */}
                <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>+</span>
                Thêm
              </CButton>
            </div>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÊN PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">LOẠI PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ĐƠN GIÁ (VNĐ)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÌNH TRẠNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">GHI CHÚ</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{room.name}</CTableDataCell>
                      <CTableDataCell>
                        <strong> {room.roomTypeModel.name} </strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{room.roomTypeModel.cost} </strong>
                      </CTableDataCell>
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
                  ))
                ) : (
                  <CTableDataCell>Trống</CTableDataCell>
                )}
              </CTableBody>
            </CTable>
            <CPagination aria-label="Page navigation example">
              <CPaginationItem>Previous</CPaginationItem>
              <CPaginationItem>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>3</CPaginationItem>
              <CPaginationItem>Next</CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Rooms
