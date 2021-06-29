/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */ 
/* eslint-disable prettier/prettier */
//Report by Month
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormControl,
  CFormLabel,
  CInputGroup,
  CRow,
  CFormSelect, //CFormSelect để chọn tháng 
  CCol,
  CCardFooter,
  CButton,
  CForm,
  CFormFeedback,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { billService, reportService, roomTypeService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
import FormatDatetime from 'src/utis/FormatDatetime'
const Reports = () => {
    const initReport = {
      id: '',
      month:'',
      totalRevenue: '',
      year: '',
    }
    const [validated, setValidated] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [message, setMessage] = useState('')
    const [visibleXL, setVisibleXL] = useState(false)
    const [reports, setReports] = useState([])
    const [reportShow, setReportShow] = useState(initReport)
    const [bills, setBills]=useState([])
    const [roomTypes, setRoomTypes] = useState([])
    const [month, setMonth]= useState('')
    const [year, setYear]= useState('')
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
    useEffect(() => {
        reportService.getAll().then((x)=> setRevenue(x))
    }, [])

    useEffect(() => {
        billService.getAll().then((x) => setBills(x))
      }, [])
    useEffect(() => {
        reportService.getAll().then((x) => setReports(x))
      }, [reports])
    useEffect(() => {
        roomTypeService.getAll().then((x) => setRoomTypes(x))
    }, [])
    useEffect(() => {
        reportService.getAll().then((x) => setRevenue(x))
    }, [])
    
    //Optional. Không chắc có cần xóa report không, nhưng define luôn
    // const handleDeleteReport = (id) => {
    //     reportService._delete(id)
    //     let reportsCopy = reports.filter((item) => item.id !== id)
    //     setReports(reportsCopy)
    //     setToastMessage('Xoá báo cáo doanh thu thành công')
    // }
    
    // const findNameReport = (id) => {
    //     console.log('report', id)
    //     console.log('bill', bills)
    //     console.log('roomtype', roomTypes)
    //     console.log(
    //       'report',
    //       reports.find((x) => x.id === id),
    //     )
    //     return reports.find((x) => x.id === id)?.name
    //   }
    // const ShowReportDetailModal = (report) => {
    //     setReportShow(report)
    //     console.log('reportShow', reportShow)
    //     console.log('reportShow', reportShow.reportDetailModels)
    //     setVisibleXL(true)
    // }
    // const formatDatetime = (datetime) => {
    //     const regex = /\d{4}-\d{2}-\d{1,2}/
    //     return datetime.match(regex)
    //   }
    const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      return
    }
    else {
      event.preventDefault()
      createReportService()
      handleReset()
    }
  }
   
  const handleReset = () => {
    setMessage('')
    setToastMessage('')
    setMonth('')
    setYear('')
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    handleReset()
  }
  const createReportService = () => {
    var data = {
      month: month,
      year: year,
    }
    reportService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Báo cáo doanh thu đã tồn tại')
          break
        case 500:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          handleCloseModal()
          setToastMessage('Tạo báo cáo doanh thu thành công')
      }
    })
  }
    return (
        <CCard>
          {toastMessage && <ToastNotification message={toastMessage} />}
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Báo cáo doanh thu</strong>
            </CCardHeader>
            <CCardBody>
                <p className="text-medium-emphasis small">Đây là danh sách các báo cáo doanh thu của khách sạn:</p>
                {/* <CModal size="lg" visible={visibleXL}> */}
                    <CModalHeader onDismiss={() => setVisibleXL(false)}>
                        <CModalTitle>BÁO CÁO DOANH THU</CModalTitle>
                    </CModalHeader>
                    {/*================================== */}
                    <CCardBody>
                        <CModalBody>
                            <CRow>
                                <CForm 
                                    className="row g-3 needs-validation"
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >                                
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%'}}>              
                                    <CCol md="4">    
                                    <CFormSelect
                                        name="month"
                                        id="month"
                                        value={month}
                                        onInput={(e) => setMonth(e.target.value)}
                                        required
                                    >                                    
                                        <option>-- Chọn tháng --</option>
                                        <option value="1">Tháng 1</option>
                                        <option value="2">Tháng 2</option>
                                        <option value="3">Tháng 3</option>
                                        <option value="4">Tháng 4</option>
                                        <option value="5">Tháng 5</option>
                                        <option value="6">Tháng 6</option>
                                        <option value="7">Tháng 7</option>
                                        <option value="8">Tháng 8</option>
                                        <option value="9">Tháng 9</option>
                                        <option value="10">Tháng 10</option>
                                        <option value="11">Tháng 11</option>
                                        <option value="12">Tháng 12</option>
                                        {/* {months.map((item, index) => {
                                            return (
                                            <option value={item.value} key={index}>
                                                Tháng{item.name}
                                            </option>
                                            )
                                        })} */}
                                    </CFormSelect>
                                    </CCol>
                                    <CInputGroup>
                                        <CCol md="3">                                            
                                        </CCol>
                                        <CFormControl
                                            placeholder="Nhập năm"
                                            type="number"
                                            value={year}
                                            onInput={(e) => setYear(e.target.value)}
                                            required
                                        />
                                    </CInputGroup>
                                </div>
                                </CForm>
                            </CRow>
                            {/*================================== */}
                            <CRow>
                                <CTableHead color="secondary">
                                <CTableRow>
                                    <CTableHeaderCell scope="col">TỔNG DOANH THU</CTableHeaderCell>
                                
                                </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CTableRow>
                                    <CTableDataCell>
                                        <strong>{revenue}</strong>
                                    </CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CRow>
                        </CModalBody>
                        {/*================================== */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CButton style={{ margin: '0px 10px', width: 130 }} type="submit">TẠO BÁO CÁO</CButton>
                            <CButton style={{ margin: '0px 10px', width: 100 }} onClick={() => handleReset()}>LÀM MỚI</CButton>
                        </div>
                    </CCardBody>
                {/* </CModal> */}
            </CCardBody>
        </CCard>
    </CCard>
    )
}
export default Reports