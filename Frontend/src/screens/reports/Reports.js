/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
 // CButton,
} from '@coreui/react'
import { roomtypeService, reportService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'

const Reports = () => {
  const initReport = {
    // id: '',
    // roomId: '',
    // accountId: '',
    // numberOfGuest: 0,
    // startedDate: '',
    // unitPrice: 0,
    // unitStandardPrice: 0,
    // bookingDetailModels: [],
  }
  const [roomtypes, setRoomtypes] = useState([])
  const [reports, setReports] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  
  useEffect(() => {
    roomtypeService.getAll().then((x) => setRoomtypes(x))
  }, [])

  useEffect(() => {
    reportService.getAll().then((x) => setReports(x))
  }, [])

  const findNameRoom=(id)=>{
    return roomtypes.find((x)=>x.id===id)?.name
  }

  return (
    <CRow>
      {toastMessage && <ToastNotification message={toastMessage}/>}
      {/* {BookingDetailModal()} */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Báo cáo doanh thu:</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Đây là danh sách các báo cáo</p>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÊN PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">DOANH THU</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {roomtypes.length > 0 &&
                  reports.map((item, index) => (
                    <CTableRow key={item.accountId}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{findNameRoom(item.roomId)}</CTableDataCell>
                      <CTableDataCell>{item.Revenue}</CTableDataCell>
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