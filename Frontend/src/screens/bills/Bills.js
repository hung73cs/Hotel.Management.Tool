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
import { billService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'

const Bills = () => {
  const initBill = {
    id: '',
    accountId: '',
    createdDate: '',
    guessName: '',
    address: '',
    totalPrice: '',
    billDetailModels: [],
  }

  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [visibleXL, setVisibleXL] = useState(false)
  const [bills, setBills] = useState([])
  const [accounts, setAccounts] = useState([])
  const [billShow, setBillShow] = useState(initBill)
  const [guestTypes, setGuestTypes] = useState([])

  useEffect(() => {
    billService.getAll().then((x) => setBills(x))
    console.log('bills', bills)
  }, [])

  const handleDeleteBill = (id) => {
    billService._delete(id)
    let billsCopy = bills.filter((item) => item.id !== id)
    setBills(billsCopy)
    setToastMessage('Xoá hóa đơn thành công')
  }

  const findNameBill = (id) => {
    return bills.find((x) => x.id === id)?.name
  }
  const findAccount = (id) => {
    return accounts.find((x) => x.accountId === id)?.username
  }
  const findGuestType = (id) => {
    return guestTypes.find((x) => x.id === id)?.name
  }
  const ShowBillDetailModal = (bill) => {
    setBillShow(bill)
    console.log('billShow', billShow)
    console.log('billShow', billShow.billDetailModels)
    setVisibleXL(true)
  }
  const formatDatetime = (datetime) => {
    const regex = /\d{4}-\d{2}-\d{1,2}/
    return datetime.match(regex)
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
                  <strong>{findAccount(billShow.address)}</strong>
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
                <CTableHeaderCell scope="col">KHÁCH HÀNG</CTableHeaderCell>
                <CTableHeaderCell scope="col">LOẠI KHÁCH</CTableHeaderCell>
                <CTableHeaderCell scope="col">CMND</CTableHeaderCell>
                <CTableHeaderCell scope="col">ĐỊA CHỈ</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {billShow.lengh > 0 &&
                billShow.bookingDetailModels.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <strong>{index + 1}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{item.bookingId}</strong>
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
                  <CTableHeaderCell scope="col">THÀNH TIỀN</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bills.map((item, index) => (
                  <CTableRow key={item.Id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{item.guestName}</CTableDataCell>
                    <CTableDataCell>{item.createdDate}</CTableDataCell>
                    <CTableDataCell>{item.totalPrice}</CTableDataCell>
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
