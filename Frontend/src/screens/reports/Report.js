/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */ 
/* eslint-disable prettier/prettier */
//Report by Year
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
      bookingDetailModels: [],
    }
    const initReportDetail={
        roomTypeId:'',
        revenue:'',
        ratio:'',
    }
    const [toastMessage, setToastMessage] = useState('')
    const [visibleXL, setVisibleXL] = useState(false)
    const [reports, setReports] = useState([])
    const [reportShow, setReportShow] = useState(initReport)
    const [bills, setBills]=useState([])
    const [roomTypes, setRoomTypes] = useState([])

    useEffect(() => {
        billService.getAll().then((x) => setBills(x))
      }, [])
    useEffect(() => {
        reportService.getAll().then((x) => setReports(x))
      }, [reports])
    useEffect(() => {
        roomTypeService.getAll().then((x) => setRoomTypes(x))
    }, [])
    
    //Optional. Không chắc có cần xóa report không, nhưng define luôn
    const handleDeleteReport = (id) => {
        reportService._delete(id)
        let reportsCopy = reports.filter((item) => item.id !== id)
        setReports(reportsCopy)
        setToastMessage('Xoá báo cáo doanh thu thành công')
    }
    
    const findNameReport = (id) => {
        console.log('report', id)
        console.log('bill', bills)
        console.log('roomtype', roomTypes)
        console.log(
          'report',
          reports.find((x) => x.id === id),
        )
        return reports.find((x) => x.id === id)?.name
      }

    const ShowReportDetailModal = (report) => {
        setReportShow(report)
        console.log('reportShow', reportShow)
        console.log('reportShow', reportShow.reportDetailModels)
        setVisibleXL(true)
    }
    const formatDatetime = (datetime) => {
        const regex = /\d{4}-\d{2}-\d{1,2}/
        return datetime.match(regex)
      }
    const ReportDetailModal = () => {
        return (
          <CModal size="lg" visible={visibleXL}>
            <CModalHeader onDismiss={() => setVisibleXL(false)}>
              <CModalTitle>BÁO CÁO DOANH THU</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CTable>
                <CTableBody>
                  {/* <CTableRow>
                    <CTableHeaderCell scope="col">Phòng: </CTableHeaderCell>
                    <CTableDataCell scope="col">
                      <strong style={{ color: 'blue' }}>{findNameRoom(reportShow.roomId)}</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Người lập phiếu: </CTableHeaderCell>
                    <CTableDataCell scope="col">
                      <strong>{findAccount(reportShow.accountId)}</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Ngày bắt đầu thuê: </CTableHeaderCell>
                    <CTableDataCell scope="col">
                      <strong>{formatDatetime(reportShow.startedDate)}</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Số lượng khách: </CTableHeaderCell>
                    <CTableDataCell scope="col">
                      <strong>{reportShow.numberOfGuest}</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Đơn giá: </CTableHeaderCell>
                    <CTableDataCell scope="col">
                      <strong>{reportShow.unitPrice} VNĐ</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Giá tạm tính: </CTableHeaderCell>
                    <CTableDataCell scope="col">
                      <strong style={{ color: 'red' }}>{reportShow.unitStandardPrice} VNĐ</strong>
                    </CTableDataCell>
                  </CTableRow> */}
                    <CFormSelect aria-label="Default select example">
                        <option>--Chọn tháng--</option>
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
                    </CFormSelect>
                    <CCol md="3">
                    <CFormLabel>Năm:</CFormLabel>
                  </CCol>
                </CTableBody>
              </CTable>
              <CTable>
                <CTableHead color="secondary">
                  <CTableRow>
                    <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                    <CTableHeaderCell scope="col">BÁO CÁO</CTableHeaderCell>
                    <CTableHeaderCell scope="col">LOẠI PHÒNG</CTableHeaderCell>
                    <CTableHeaderCell scope="col">THÁNG</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NĂM</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TỔNG DOANH THU</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {reportShow.reportDetailModels.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <strong>{index + 1}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{formatDatetime(item.month)}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{formatDatetime(item.year)}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.totalRevenue}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CModalBody>
          </CModal>
        )
      }
      return (
        <CRow>
          {toastMessage && <ToastNotification message={toastMessage} />}
          {ReportDetailModal()}
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Báo cáo doanh thu:</strong>
              </CCardHeader>
              <CCardBody>
                <p className="text-medium-emphasis small">Đây là danh sách các báo cáo doanh thu của khách sạn</p>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                      <CTableHeaderCell scope="col">TÊN PHÒNG</CTableHeaderCell>
                      <CTableHeaderCell scope="col">SỐ KHÁCH</CTableHeaderCell>
                      <CTableHeaderCell scope="col">NGÀY BẮT ĐẦU</CTableHeaderCell>
                      <CTableHeaderCell scope="col">GIÁ TẠM TÍNH</CTableHeaderCell>
                      <CTableHeaderCell scope="col">TUỲ CHỈNH</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {bills.length > 0 &&
                      reports.map((item, index) => (
                        <CTableRow key={item.accountId}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>
                            <strong>{findNameReport(item.reportId)}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <strong>
                              <strong>{formatDatetime(item.month)}</strong>
                            </strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <strong>{formatDatetime(item.year)}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <strong style={{ color: 'red' }}>{item.totalRevenue}</strong>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="link" onClick={() => ShowReportDetailModal(item)}>
                              Chi tiết
                            </CButton>
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
export default Reports