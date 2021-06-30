import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormControl,
  CFormLabel,
  CInputGroup,
  CCol,
  CButton,
  CForm,
  CFormFeedback,
} from '@coreui/react'
import { reportService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
const Reports = () => {
  const [validated, setValidated] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [message, setMessage] = useState('')
  const [year, setYear] = useState('')
  const [revenue, setRevenue] = useState('')

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      return
    } else {
      event.preventDefault()
      createReportService()
    }
  }

  const createReportService = () => {
    var data = {
      year: Number(year),
    }
    reportService.reportYear(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Lỗi khi tạo báo cáo')
          break
        case 409:
          setMessage('Vui lòng điền đầy đủ thông tin')
          break
        case 500:
          setMessage('Lỗi khi tạo báo cáo')
          break
        default:
          setRevenue(res.totalPrice)
      }
    })
  }
  return (
    <CCard>
      {toastMessage && <ToastNotification message={toastMessage} />}
      <CCardHeader>
        <strong>Báo cáo doanh thu theo năm</strong>
      </CCardHeader>
      <CCardBody>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CInputGroup>
            <CCol md="2">
              <CFormLabel>Nhập năm:</CFormLabel>
            </CCol>
            <CCol md="4">
              <CFormControl
                name="year"
                id="year"
                type="number"
                value={year}
                onInput={(e) => setYear(e.target.value)}
                required
              />
              <CFormFeedback invalid>Bắt buộc</CFormFeedback>
            </CCol>
            <CCol md="3">
              <div style={{ marginLeft: 50 }}>
                <CButton type="submit">XEM BÁO CÁO</CButton>
              </div>
            </CCol>
          </CInputGroup>
          <CInputGroup>
            <CCol md="2">
              <CFormLabel>DOANH THU:</CFormLabel>
            </CCol>
            <CCol md="4">
              <h2>{revenue} VND</h2>
            </CCol>
          </CInputGroup>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
export default Reports
