import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormControl,
  CFormLabel,
  CInputGroup,
  CRow,
  CCol,
  CCardFooter,
  CButton,
  CForm,
  CFormFeedback,
} from '@coreui/react'
import Message from '../../components/Message'
import { userService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'

const ChangePassword = () => {
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmNewPassword] = useState('')

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      return
    }
    if (confirmPassword !== newPassword) {
      event.preventDefault()
      setMessage('Mật khẩu không khớp')
      return
    } else {
      event.preventDefault()
      setMessage('')
      changePasswordService()
      return
    }
  }
  const changePasswordService = () => {
    var data = {
      password: currentPassword,
      newPassword: newPassword,
    }
    let accountId = JSON.parse(localStorage.getItem('user'))?.accountId
    userService.changePassword(accountId, data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi đổi mật khẩu, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Mật khẩu cũ không chính xác')
          break
        case 500:
          setMessage('Có lỗi khi đổi mật khẩu, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          setToastMessage('Đổi mật khẩu thành công')
      }
    })
  }

  const handleReset = () => {
    setMessage('')
    setToastMessage('')
    setNewPassword('')
    setCurrentPassword('')
    setConfirmNewPassword('')
    setValidated(false)
  }
  return (
    <CRow>
      {toastMessage && <ToastNotification message={toastMessage} />}
      <CCard className="sb-4">
        <CCardHeader>
          <strong>Đổi mật khẩu</strong>
        </CCardHeader>
        {message && <Message variant="danger">{message}</Message>}
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right' }}>Mật khẩu cũ:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormControl
                  name="currentPassword"
                  type="password"
                  id="name"
                  value={currentPassword}
                  onInput={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* Name */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right' }}>Mật khẩu mới:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormControl
                  name="username"
                  type="password"
                  id="name"
                  value={newPassword}
                  onInput={(e) => setNewPassword(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right' }}>Nhập lại mật khẩu mới:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormControl
                  name="confirmPassword"
                  type="password"
                  id="name"
                  value={confirmPassword}
                  onInput={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* Ngày sinh */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CButton style={{ margin: '0px 10px', width: 150 }} type="submit">
                ĐỔI MẬT KHẨU
              </CButton>
              <CButton style={{ margin: '0px 10px', width: 150 }} onClick={() => handleReset()}>
                LÀM MỚI
              </CButton>
            </div>
          </CForm>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </CRow>
  )
}
export default ChangePassword
