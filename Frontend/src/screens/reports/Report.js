//Report by Month
import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormControl,
  CFormLabel,
  CInputGroup,
  CFormSelect,
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
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [revenue, setRevenue] = useState('')

  const months = [
    {
      name: '1',
      value: '01',
    },
    {
      name: '2',
      value: '02',
    },
    {
      name: '3',
      value: '03',
    },
    {
      name: '4',
      value: '04',
    },
    {
      name: '5',
      value: '05',
    },
    {
      name: '6',
      value: '06',
    },
    {
      name: '7',
      value: '07',
    },
    {
      name: '8',
      value: '08',
    },
    {
      name: '9',
      value: '09',
    },
    {
      name: '10',
      value: '10',
    },
    {
      name: '11',
      value: '11',
    },
    {
      name: '12',
      value: '12',
    },
  ]

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
      month: Number(month),
      year: Number(year),
    }
    reportService.reportMonth(data).then((res) => {
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
        <strong>Báo cáo doanh thu theo tháng</strong>
      </CCardHeader>
      <CCardBody>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CInputGroup className="mb-3">
            <CCol md="2">
              <CFormLabel>Tháng:</CFormLabel>
            </CCol>
            <CCol md="4">
              <CFormSelect
                name="month"
                id="month"
                value={month}
                onInput={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">--Chọn--</option>
                {months.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      Tháng {item.name}
                    </option>
                  )
                })}
              </CFormSelect>
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
              <CFormLabel>Năm:</CFormLabel>
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
          </CInputGroup>
          <CInputGroup>
            <CCol md="2">
              <CFormLabel>DOANH THU:</CFormLabel>
            </CCol>
            <CCol md="4">
              <h2>{revenue} </h2>
            </CCol>
          </CInputGroup>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
export default Reports
