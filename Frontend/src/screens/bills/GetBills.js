/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
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
  const [openEdit, setOpenEdit] = useState(false)
  const [billToEdit, setBillToEdit] = useState(initBill)
  const dispatch = useDispatch()

//   useEffect(() => {
//     roomService.getAll().then((x) => setRooms(x))
//   }, [])

  // useEffect(() => {
  //   userService.getAll().then((x) => setAccounts(x))
  // }, [])

  useEffect(() => {
    billService.getAll().then((x) => setBills(x))
  }, [])

//   useEffect(() => {
//     guestTypeService.getAll().then((x) => setGuestTypes(x))
//   }, [])

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
  const BillDetailModal = () => {
    return (
      <CModal size="xl" visible={visibleXL}>
        <CModalHeader onDismiss={() => setVisibleXL(false)}>
          <CModalTitle>THÔNG TIN CHI TIẾT</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="col">Hóa đơn: </CTableHeaderCell>
                <CTableDataCell scope="col">{findNameBill(billShow.id)}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Ngày tạo hóa đơn: </CTableHeaderCell>
                <CTableDataCell scope="col">{billShow.createdDate}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Tên khách hàng: </CTableHeaderCell>
                <CTableDataCell scope="col">{findAccount(billShow.accountId)}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Địa chỉ khách hàng: </CTableHeaderCell>
                <CTableDataCell scope="col">{billShow.address}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Thành tiền: </CTableHeaderCell>
                <CTableDataCell scope="col">{billShow.totalPrice}</CTableDataCell>
              </CTableRow>
              {/* <CTableRow>
                <CTableHeaderCell scope="col">Giá tạm tính: </CTableHeaderCell>
                <CTableDataCell scope="col">{billShow.unitStandardPrice}</CTableDataCell>
              </CTableRow> */}
              <CTable>
                <CTableHead color="secondary">
                  <CTableRow>
                    <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                    <CTableHeaderCell scope="col">HÓA ĐƠN</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TÊN KHÁCH HÀNG</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NGÀY TẠO</CTableHeaderCell>
                    <CTableHeaderCell scope="col">THÀNH TIỀN</CTableHeaderCell>

                    {/* <CTableHeaderCell scope="col">ĐỊA CHỈ</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {billShow.billDetailModels.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <strong>{index + 1}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.guestName}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{findGuestType(item.guestTypeId)}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.idCard}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.address}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
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
                    <CTableHeaderCell scope="col">HÓA ĐƠN</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TÊN KHÁCH HÀNG</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NGÀY TẠO</CTableHeaderCell>
                    <CTableHeaderCell scope="col">THÀNH TIỀN</CTableHeaderCell>
                    
                    {/* <CTableHeaderCell scope="col">ĐỊA CHỈ</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {accounts.length > 0 &&
                  bills.map((item, index) => (
                    <CTableRow key={item.Id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{findNameBill(item.Id)}</CTableDataCell>
                      <CTableDataCell>{item.accountId}</CTableDataCell>
                      <CTableDataCell>{item.createdDate}</CTableDataCell>
                      <CTableDataCell>{item.totalPrice}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="link" onClick={() => ShowBillDetailModal(item)}>
                          Chi tiết
                        </CButton>
                        {/* <NavLink to="/createbill">
                          <CIcon
                            style={{ margin: '0px 5px', cursor: 'pointer' }}
                            size={'lg'}
                            name="cil-trash"
                            onClick={() => {
                              dispatch(billActions.editBill(item))
                            }}
                          />
                        </NavLink> */}
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
