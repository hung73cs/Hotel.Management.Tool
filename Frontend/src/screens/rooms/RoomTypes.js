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
      if (res === 500 || res === 409) {
        return setMessage('Gặp lỗi khi tạo, kiểm tra tên có bị trùng')
      } else {
        setMessage('')
        setOpenModal(false)
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
      if (res === 500 || res === 409) {
        return setMessage('Gặp lỗi khi sửa, kiểm tra tên có bị trùng')
      } else {
        setMessage('')
        setOpenModal(false)
        setRoomTypeToCreateOrUpdate(roomTypeInit)
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

  const handleClickDelete = (data) => {
    roomTypeService._delete(data)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRoomTypeToCreateOrUpdate({ ...roomTypeToCreateOrUpdate, [name]: value })
  }

  useEffect(() => {
    roomTypeService.getAll().then((x) => setRoomTypes(x))
  }, [openModal])

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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="text-medium-emphasis small" style={{ width: '70%' }}>
                Đây là danh sách các loại phòng của khách sạn
              </p>
              <CInputGroup style={{ width: '20%', marginRight: 20 }}>
                <CCol>
                  <CFormControl type="text" name="searchInput" />
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
                  <CTableHeaderCell scope="col">TÊN LOẠI PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ĐƠN GIÁ (VNĐ)</CTableHeaderCell>
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
