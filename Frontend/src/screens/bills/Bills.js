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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { billService, bookingService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'

const Bills = () => {
  const initBill = {
    id: '',
    createdDate: '',
    guestName: '',
    address: '',
    totalPrice: 0,
    billDetailModels: [],
  }

  const initBillDetail = {
    bookingId: '',
    numberOfRentalDays: 0,
    unitPrice: 0,
    price: 0,
  }

  const [toastMessage, setToastMessage] = useState('')
  const [visibleXL, setVisibleXL] = useState(false)
  const [bills, setBills] = useState([])
  const [billShow, setBillShow] = useState(initBill)
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    billService.getAll().then((x) => setBills(x))
  }, [])
  useEffect(() => {
    bookingService.getAll().then((x) => setBookings(x))
  }, [])

  const handleDeleteBill = (id) => {
    billService._delete(id)
    let billsCopy = bills.filter((item) => item.id !== id)
    setBills(billsCopy)
    setToastMessage('Xoá hóa đơn thành công')
  }

  const ShowBillDetailModal = (bill) => {
    console.log('billtruockhishow', bill)
    setBillShow(bill)
    //setBillDetailModelsShow(bill.billDetailModels)
    console.log('billShow', billShow)
    console.log('billShow.billDetailModels', billShow.billDetailModels)
    setVisibleXL(true)
  }
  const formatDatetime = (datetime) => {
    const regex = /\d{4}-\d{2}-\d{1,2}/
    return datetime?.match(regex)
  }

  const BillDetailModal = () => {
    return (
      <CModal size="lg" visible={visibleXL}>
        <CModalHeader onDismiss={() => setVisibleXL(false)}>
          <CModalTitle>THÔNG TIN CHI TIẾT</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="col">Tên khách hàng:: </CTableHeaderCell>
                <CTableDataCell scope="col">
                  <strong style={{ color: 'blue' }}>{billShow.guestName}</strong>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Địa chỉ: </CTableHeaderCell>
                <CTableDataCell scope="col">
                  <strong>{billShow.address}</strong>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Ngày tạo: </CTableHeaderCell>
                <CTableDataCell scope="col">
                  <strong>{formatDatetime(billShow.createdDate)}</strong>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Tổng tiền: </CTableHeaderCell>
                <CTableDataCell scope="col">
                  <strong>{billShow.totalPrice}</strong>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CTable>
            <CTableHead color="secondary">
              <CTableRow>
                <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                <CTableHeaderCell scope="col">MÃ HOÁ ĐƠN</CTableHeaderCell>
                <CTableHeaderCell scope="col">SỐ NGÀY THUÊ</CTableHeaderCell>
                <CTableHeaderCell scope="col">ĐƠN GIÁ</CTableHeaderCell>
                <CTableHeaderCell scope="col">THÀNH TIỀN</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {billShow.billDetailModels.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <strong>{index + 1}</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <strong>{item.bookingId.split('-').pop()}</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <strong>{item.numberOfRentalDays}</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <strong>{item.unitPrice}</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <strong>{item.price}</strong>
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
      {/* {openEdit && <EditBooking bill={billToEdit}></EditBooking>} */}
      {BillDetailModal()}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách hóa đơn:</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Đây là danh sách các hóa đơn</p>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÊN KHÁCH HÀNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NGÀY TẠO</CTableHeaderCell>
                  <CTableHeaderCell scope="col">THÀNH TIỀN (VNĐ)</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bills.map((item, index) => (
                  <CTableRow key={item.Id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      <strong>{item.guestName}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{formatDatetime(item.createdDate)}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{item.totalPrice}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="link" onClick={() => ShowBillDetailModal(item)}>
                        Chi tiết
                      </CButton>
                      <CIcon
                        style={{ margin: '0px 5px', cursor: 'pointer' }}
                        size={'lg'}
                        name="cil-trash"
                        onClick={() => handleDeleteBill(item.id)}
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
export default Bills
