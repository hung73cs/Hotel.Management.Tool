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
  CForm,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { surchargeRateService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'

const SurchargeRates = () => {
  const [validated, setValidated] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [editForm, setEditForm] = useState(false)
  const [surchargeRates, setSurchargeRates] = useState([])
  const [guestLevel, setGuestLevel] = useState('')
  const [rate, setRate] = useState('')

  useEffect(() => {
    //surchargeRateService.getAll().then((x) => setSurchargeRates(x))
  }, [])

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
      createParameterService()
      handleReset()
    } else {
      event.preventDefault()
      editParameterService()
      handleReset()
    }
  }

  const createParameterService = () => {
    var data = {
      guestLevel: Number(guestLevel),
      rate: Number(rate),
    }
    surchargeRateService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Tên quy định đã tồn tại')
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
          setToastMessage('Tạo quy định thành công')
      }
    })
  }

  const editParameterService = () => {
    var data = {
      guestLevel: Number(guestLevel),
      rate: Number(rate),
    }
    surchargeRateService.edit(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        case 404:
          setMessage('Quy định cần sửa không tồn tại')
          break
        case 403:
          setMessage('Không có quyền')
          break
        case 409:
          setMessage('Tên quy định bị trùng với các quy định khác')
          break
        case 500:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          handleCloseModal()
          setToastMessage('Sửa quy định thành công')
      }
    })
  }

  const handleOpenModalToCreate = () => {
    setOpenModal(true)
  }
  const handleOpenModalToUpdate = (data) => {
    setGuestLevel(data.guestLevel)
    setRate(data.rate)
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
    setGuestLevel('')
    setRate('')
  }

  const handleClickDelete = (id) => {
    surchargeRateService._delete(id)
    let copy = surchargeRates.filter((item) => item.id !== id)
    setSurchargeRates(copy)
    setToastMessage('Xoá thành công')
  }

  const modalCreateEdit = () => {
    return (
      <CModal visible={openModal}>
        <CModalHeader onDismiss={() => handleCloseModal()}>
          {editForm ? (
            <CModalTitle>Thông tin muốn sửa</CModalTitle>
          ) : (
            <CModalTitle>Thông tin muốn thêm</CModalTitle>
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
                  value={guestLevel}
                  onInput={(e) => setGuestLevel(e.target.value)}
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Giá trị: </CFormLabel>
              </CCol>
              <CCol>
                <CFormControl
                  type="text"
                  id="value"
                  name="value"
                  onInput={(e) => setRate(e.target.value)}
                  value={rate}
                />
              </CCol>
            </CInputGroup>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CButton style={{ margin: '0px 10px', width: 100 }} type="submit">
                THÊM
              </CButton>
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
            <strong>Bảng tra cứu tỉ lệ phụ thu:</strong>
          </CCardHeader>
          <CCardBody style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '10px 0px 10px 0px',
              }}
            >
              <div>
                <p className="text-medium-emphasis small">Đây là danh sách tỉ lệ phụ thu</p>
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
            <CTable striped>
              <CTableHead>
                <CTableRow color="primary">
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">SỐ KHÁCH</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TỈ LỆ PHỤ THU</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tuỳ chỉnh</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {surchargeRates.length > 0 ? (
                  surchargeRates.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.guestLevel}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong> {item.rate} </strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon
                          style={{ margin: '0px 5px', cursor: 'pointer' }}
                          size={'lg'}
                          name="cil-pencil"
                          onClick={() => handleOpenModalToUpdate(item)}
                        ></CIcon>
                        <CIcon
                          style={{ margin: '0px 5px', cursor: 'pointer' }}
                          size={'lg'}
                          name="cil-trash"
                          onClick={() => handleClickDelete(item.guestLevel)}
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

export default SurchargeRates
