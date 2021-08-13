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
  const [messageOut, setMessageOut] = useState('')

  useEffect(() => {
    roomTypeService.getAll().then((x) => setRoomtypes(x))
  }, [])

  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [openModal, rooms])

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
        case 403:
          setMessage('Không có quyền')
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
        case 403:
          setMessage('Không có quyền')
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

  const handleClickDelete = (id) => {
    roomService._delete(id).then((res) => {
      switch (res) {
        case 400:
          setMessageOut('Có lỗi khi xoá')
          break
        case 404:
          setMessageOut('Không tìm thấy phòng để xoá')
          break
        case 403:
          setMessageOut('Không có quyền')
          break
        case 409:
          setMessageOut('Không thể xoá vì phiếu thuê phòng đang sử dụng phòng này')
          break
        case 500:
          setMessageOut('Có lỗi khi xoá')
          break
        default:
          setMessageOut('')
          console.log('odayla')
          let roomsCopy = rooms.filter((item) => item.id !== id)
          setRooms(roomsCopy)
          setToastMessage('Xoá phòng thành công')
      }
    })
  }

  const [sort, setSort] = useState(true)
  const handleSort = () => {
    if (sort) {
      rooms.sort((a, b) => a.name.localeCompare(b.name))
      setSort(!sort)
    } else {
      rooms.sort((a, b) => b.name.localeCompare(a.name))
      setSort(!sort)
    }
  }

  const [sortStatus, setSortStatus] = useState(true)
  const handleSortStatus = () => {
    if (sortStatus) {
      rooms.sort((a, b) => a.roomStatus.localeCompare(b.roomStatus))
      setSortStatus(!sortStatus)
    } else {
      rooms.sort((a, b) => b.roomStatus.localeCompare(a.roomStatus))
      setSortStatus(!sortStatus)
    }
  }

  const statusColor = (data) => {
    if (data === 'OPEN') return <strong style={{ color: 'blue' }}>TRỐNG</strong>
    return <strong style={{ color: 'red' }}>CÓ KHÁCH</strong>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {editForm ? (
                <CButton style={{ margin: '0px 10px', width: 100 }} type="submit">
                  SỬA
                </CButton>
              ) : (
                <CButton style={{ margin: '0px 10px', width: 100 }} type="submit">
                  THÊM
                </CButton>
              )}

              <CButton
                color="secondary"
                style={{ margin: '0px 10px', width: 100 }}
                onClick={() => handleCloseModal()}
              >
                ĐÓNG
              </CButton>
            </div>
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
            <strong>Danh sách phòng:</strong>
          </CCardHeader>
          <CCardBody>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '10px 0px 10px 0px',
              }}
            >
              <div>
                <p className="text-medium-emphasis small">
                  Đây là danh sách tất cả các loại phòng của khách sạn
                </p>
              </div>
              <div>
                <CButton
                  onClick={() => handleOpenModalToCreate()}
                  style={{ width: '100px', fontSize: '0.8rem' }}
                >
                  <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>+ </span>
                  THÊM
                </CButton>
              </div>
            </div>
            {messageOut && <Message variant="danger">{messageOut}</Message>}
            <CTable striped>
              <CTableHead>
                <CTableRow color="primary">
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSort()}
                  >
                    TÊN PHÒNG
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">LOẠI PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ĐƠN GIÁ (VNĐ)</CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSortStatus()}
                  >
                    TÌNH TRẠNG
                  </CTableHeaderCell>
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
                      <CTableDataCell>
                        <strong>{statusColor(room.roomStatus)}</strong>
                      </CTableDataCell>
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
