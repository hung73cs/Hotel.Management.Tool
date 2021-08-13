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
import { guestTypeService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
const GuestTypes = () => {
  const [guestTypes, setGuestTypes] = useState([
    {
      name: '',
      surchargeRate: 0,
    },
  ])
  const guestTypeInit = {
    id: null,
    name: '',
    surchargeRate: 0,
  }
  const [editForm, setEditForm] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [guestTypeToCreateOrUpdate, setGuestTypeToCreateOrUpdate] = useState(guestTypeInit)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState()
  const [messageOut, setMessageOut] = useState('')

  const handleClickCreate = () => {
    setOpenModal(true)
  }

  const handleClickEdit = (value) => {
    setEditForm(true)
    setOpenModal(true)
    setGuestTypeToCreateOrUpdate(value)
  }

  const saveGuestTypeToCreate = () => {
    var data = {
      name: guestTypeToCreateOrUpdate.name,
      surchargeRate: Number(guestTypeToCreateOrUpdate.surchargeRate),
    }

    guestTypeService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Tên loại khách bị trùng')
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
          setToastMessage('Tạo loại khách thành công')
      }
    })
  }

  const saveGuestTypeToEdit = () => {
    var data = {
      name: guestTypeToCreateOrUpdate.name,
      surchargeRate: Number(guestTypeToCreateOrUpdate.surchargeRate),
    }
    guestTypeService.edit(guestTypeToCreateOrUpdate.id, data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        case 404:
          setMessage('Loại khách cần sửa không tồn tại')
          break
        case 409:
          setMessage('Tên loại khách bị trùng với các loại khách khác')
          break
        case 403:
          setMessage('Không có quyền')
          break
        case 500:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          handleCloseModal()
          setToastMessage('Sửa loại khách thành công')
      }
    })
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setMessage('')
    setGuestTypeToCreateOrUpdate(guestTypeInit)
    setEditForm(false)
  }

  const handleClickDelete = (id) => {
    guestTypeService._delete(id).then((res) => {
      switch (res) {
        case 403:
          setMessageOut('Không có quyền')
          break
        case 409:
          setMessageOut('Không thể xoá vì có phiếu thuê phòng đang chứa loại khách này')
          break
        default:
          setGuestTypes(guestTypes.filter((item) => item.id !== id))
          setToastMessage('Xoá loại khách thành công')
      }
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setGuestTypeToCreateOrUpdate({ ...guestTypeToCreateOrUpdate, [name]: value })
    console.log('guestTypeToCreateOrUpdate', guestTypeToCreateOrUpdate)
  }

  useEffect(() => {
    guestTypeService.getAll().then((x) => setGuestTypes(x))
  }, [openModal, guestTypes])

  const modalCreateEdit = () => {
    return (
      <CModal visible={openModal}>
        <CModalHeader onDismiss={() => setOpenModal(false)}>
          {editForm ? (
            <CModalTitle>Thông tin loại khách muốn sửa</CModalTitle>
          ) : (
            <CModalTitle>Thông tin loại khách muốn thêm</CModalTitle>
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
                  value={guestTypeToCreateOrUpdate.name}
                  onInput={handleInputChange}
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Tỉ lệ phụ thu: </CFormLabel>
              </CCol>
              <CCol>
                <CFormControl
                  type="number"
                  id="note"
                  name="surchargeRate"
                  onInput={handleInputChange}
                  value={guestTypeToCreateOrUpdate.surchargeRate}
                />
              </CCol>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {editForm ? (
              <CButton style={{ margin: '0px 10px', width: 100 }} onClick={saveGuestTypeToEdit}>
                SỬA
              </CButton>
            ) : (
              <CButton style={{ margin: '0px 10px', width: 100 }} onClick={saveGuestTypeToCreate}>
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
            <strong>Danh sách loại khách:</strong>
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
                  Đây là danh sách các quy định chung của khách sạn
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
                  <CTableHeaderCell scope="col">TÊN LOẠI KHÁCH</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TỈ LỆ PHỤ THU (%)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tuỳ chỉnh</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {guestTypes.map((item, index) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      <strong>{item.name}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{item.surchargeRate}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CIcon
                        style={{ margin: '0px 5px', cursor: 'pointer' }}
                        size={'lg'}
                        name="cil-pencil"
                        onClick={() => handleClickEdit(item)}
                      ></CIcon>{' '}
                      <CIcon
                        style={{ margin: '0px 5px', cursor: 'pointer' }}
                        size={'lg'}
                        name="cil-trash"
                        onClick={() => (item.id = handleClickDelete(item.id))}
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

export default GuestTypes
