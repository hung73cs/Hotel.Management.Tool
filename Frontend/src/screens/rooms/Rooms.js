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
  CInputGroup,
  CFormLabel,
  CFormControl,
  CFormSelect,
  CForm,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { roomService, roomTypeService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
const Rooms = () => {
  const [validated, setValidated] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [editForm, setEditForm] = useState(false)
  const [rooms, setRooms] = useState([])
  const [roomTypes, setRoomtypes] = useState([])
  const [roomName, setRoomName] = useState('')
  const [roomNote, setRoomNote] = useState('')
  const [roomTypeId, setRoomTypeId] = useState('')
  const [roomId, setRoomId] = useState('')

  useEffect(() => {
    roomTypeService.getAll().then((x) => setRoomtypes(x))
  }, [])

  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [openModal])

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      return
    }
    if (!editForm) {
      event.preventDefault()
      createRoomService()
    } else {
      event.preventDefault()
      editRoomService()
    }
  }

  const createRoomService = () => {
    var data = {
      name: roomName,
      roomTypeId: roomTypeId,
      note: roomNote,
    }
    console.log('createRoomService', data)
    roomService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Tên phòng đã tồn tại')
          break
        case 500:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          handleCloseModal()
          setToastMessage('Tạo phòng thành công')
      }
    })
  }

  const editRoomService = () => {
    var data = {
      id: roomId,
      name: roomName,
      roomTypeId: roomTypeId,
      note: roomNote,
    }
    console.log('createRoomService', data)
    roomService.edit(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        case 404:
          setMessage('Phòng cần sửa không tồn tại')
          break
        case 409:
          setMessage('Tên phòng bị trùng với các phòng khác')
          break
        case 500:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          handleCloseModal()
          setToastMessage('Sửa phòng thành công')
      }
    })
  }

  const handleOpenModalToCreate = () => {
    setOpenModal(true)
  }
  const handleOpenModalToUpdate = (data) => {
    setRoomId(data.id)
    setRoomName(data.name)
    setRoomTypeId(data.roomTypeId)
    setRoomNote(data.note)
    setEditForm(true)
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    handleReset()
  }

  const handleReset = () => {
    setMessage('')
    setToastMessage('')
    setEditForm(false)
    setRoomId('')
    setRoomName('')
    setRoomNote('')
    setRoomTypeId('')
  }

  const [searchInput, setSearchInput] = useState('')

  const handleChangeSearchInput = (e) => {
    const { name, value } = e.target
    setSearchInput({ ...searchInput, [name]: value })
    //searchRoom()
  }

  const handleClickDelete = (data) => {
    roomService._delete(data)
    let roomsCopy = rooms.filter((item) => item.id !== data)
    setRooms(roomsCopy)
    setToastMessage('Xoá phòng thành công')
  }

  const modalCreateEdit = () => {
    return (
      <CModal visible={openModal}>
        <CModalHeader onDismiss={() => handleCloseModal()}>
          {editForm ? (
            <CModalTitle>Thông tin phòng muốn sửa</CModalTitle>
          ) : (
            <CModalTitle>Thông tin phòng muốn thêm</CModalTitle>
          )}
        </CModalHeader>
        {message && <Message variant="danger">{message}</Message>}
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Tên: </CFormLabel>
              </CCol>
              <CCol>
                <CFormControl
                  name="name"
                  type="text"
                  id="name"
                  value={roomName}
                  onInput={(e) => setRoomName(e.target.value)}
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Loại phòng:</CFormLabel>
              </CCol>
              <CCol>
                {editForm ? (
                  <CCol>
                    <CFormSelect
                      name="roomType"
                      id="roomType"
                      value={roomTypeId}
                      defaultValue={roomTypeId}
                      onInput={(e) => setRoomTypeId(e.target.value)}
                    >
                      <option value="">--ChọnEdit--</option>
                      {roomTypes.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <CFormFeedback invalid>Bắt buộc</CFormFeedback>
                  </CCol>
                ) : (
                  <CFormSelect
                    name="roomType"
                    id="roomType"
                    value={roomTypeId}
                    onInput={(e) => setRoomTypeId(e.target.value)}
                  >
                    <option value="">--Chọn--</option>
                    {roomTypes.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      )
                    })}
                  </CFormSelect>
                )}
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
                  onInput={(e) => setRoomNote(e.target.value)}
                  value={roomNote}
                />
              </CCol>
            </CInputGroup>
            <span>
              <CButton color="secondary" type="submit">
                Lưu
              </CButton>
              <CButton color="secondary" onClick={() => handleCloseModal()}>
                Đóng
              </CButton>
            </span>
          </CForm>
        </CModalBody>
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
                onClick={() => handleOpenModalToCreate()}
                style={{ width: '10%', fontSize: '0.8rem' }}
              >
                {/* <CIcon style={{ margin: '0px 5px' }} size={'lg'} name="cil-plus"></CIcon> */}
                <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>+</span>
                Thêm
              </CButton>
            </div>
            <CTable striped>
              <CTableHead>
                <CTableRow color="primary">
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÊN PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">LOẠI PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ĐƠN GIÁ (VNĐ)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÌNH TRẠNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">GHI CHÚ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tuỳ chỉnh</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <strong>{room.name}</strong>
                      </CTableDataCell>
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
                          onClick={() => handleOpenModalToUpdate(room)}
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Rooms
