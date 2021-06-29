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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CInputGroup,
  CFormLabel,
  CFormControl,
  CModalFooter,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { roomTypeService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([
    {
      name: '',
      cost: 0,
    },
  ])
  const roomTypeInit = {
    id: null,
    name: '',
    cost: 0,
  }
  const [editForm, setEditForm] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [roomTypeToCreateOrUpdate, setRoomTypeToCreateOrUpdate] = useState(roomTypeInit)
  const [message, setMessage] = useState('')
  const [messageOut, setMessageOut] = useState('')
  const [toastMessage, setToastMessage] = useState()

  const handleClickCreate = () => {
    setOpenModal(true)
  }

  const handleClickEdit = (value) => {
    setEditForm(true)
    setOpenModal(true)
    setRoomTypeToCreateOrUpdate(value)
  }

  const saveRoomTypeToCreate = () => {
    var data = {
      name: roomTypeToCreateOrUpdate.name,
      cost: Number(roomTypeToCreateOrUpdate.cost),
    }
    console.log('roomTdataype', typeof data.cost)

    roomTypeService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Tên loại phòng đã tồn tại')
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
          setRoomTypeToCreateOrUpdate(roomTypeInit)
          setToastMessage('Tạo loại phòng thành công')
      }
    })
  }

  const saveRoomTypeToEdit = () => {
    var data = {
      id: roomTypeToCreateOrUpdate.id,
      name: roomTypeToCreateOrUpdate.name,
      cost: roomTypeToCreateOrUpdate.cost,
    }
    roomTypeService.edit(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        case 404:
          setMessage('Loại phòng cần sửa không tồn tại')
          break
        case 403:
          setMessage('Không có quyền')
          break
        case 409:
          setMessage('Tên loại phòng bị trùng với các loại phòng khác')
          break
        case 500:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          handleCloseModal()
          setToastMessage('Sửa loại phòng thành công')
      }
    })
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setMessage('')
    setRoomTypeToCreateOrUpdate(roomTypeInit)
    setEditForm(false)
  }

  const handleClickDelete = (id) => {
    roomTypeService._delete(id).then((res) => {
      switch (res) {
        case 400:
          setMessageOut('Có lỗi khi xoá')
          break
        case 404:
          setMessageOut('Không tìm thấy loại phòng để xoá')
          break
        case 403:
          setMessageOut('Không có quyền')
          break
        case 409:
          setMessageOut('Không thể xoá vì có phòng đang được sử dụng loại phòng này')
          console.log('roomTypes', roomTypes)
          break
        case 500:
          setMessageOut('Có lỗi khi xoá')
          break
        default:
          setMessageOut('')
          let roomTypesCopy = roomTypes.filter((item) => item.id !== id)
          setRoomTypes(roomTypesCopy)
          setToastMessage('Xoá loại phòng thành công')
      }
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRoomTypeToCreateOrUpdate({ ...roomTypeToCreateOrUpdate, [name]: value })
  }

  useEffect(() => {
    roomTypeService.getAll().then((x) => setRoomTypes(x))
  }, [openModal, roomTypes])

  const modalCreateEdit = () => {
    return (
      <CModal visible={openModal}>
        <CModalHeader onDismiss={() => setOpenModal(false)}>
          {editForm ? (
            <CModalTitle>Thông tin loại phòng muốn sửa</CModalTitle>
          ) : (
            <CModalTitle>Thông tin loại phòng muốn thêm</CModalTitle>
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
                  value={roomTypeToCreateOrUpdate.name}
                  onInput={handleInputChange}
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Giá: </CFormLabel>
              </CCol>
              <CCol>
                <CFormControl
                  type="number"
                  id="note"
                  name="cost"
                  onInput={handleInputChange}
                  value={roomTypeToCreateOrUpdate.cost}
                />
              </CCol>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          {editForm ? (
            <CButton color="secondary" onClick={saveRoomTypeToEdit}>
              Lưu
            </CButton>
          ) : (
            <CButton color="secondary" onClick={saveRoomTypeToCreate}>
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
                  Đây là danh sách các loại phòng của khách sạn
                </p>
              </div>
              <div>
                <CButton
                  onClick={() => handleClickCreate()}
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
                  <CTableHeaderCell scope="col">TÊN LOẠI PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ĐƠN GIÁ (VNĐ)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tuỳ chỉnh</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {roomTypes.map((roomType, index) => (
                  <CTableRow key={roomType.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      <strong>{roomType.name}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{roomType.cost}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CIcon
                        style={{ margin: '0px 5px', cursor: 'pointer' }}
                        size={'lg'}
                        name="cil-pencil"
                        onClick={() => handleClickEdit(roomType)}
                      ></CIcon>{' '}
                      <CIcon
                        style={{ margin: '0px 5px', cursor: 'pointer' }}
                        size={'lg'}
                        name="cil-trash"
                        onClick={() => (roomType.id = handleClickDelete(roomType.id))}
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

export default RoomTypes
