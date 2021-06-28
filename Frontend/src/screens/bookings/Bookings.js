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
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { bookingActions } from 'src/_actions'
import { NavLink } from 'react-router-dom'
import { roomService, bookingService, userService, guestTypeService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
import EditBooking from './EditBooking'
const Bookings = () => {
  const initBooking = {
    id: '',
    roomId: '',
    accountId: '',
    numberOfGuest: 0,
    startedDate: '',
    unitPrice: 0,
    unitStandardPrice: 0,
    bookingDetailModels: [],
  }

  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [visibleXL, setVisibleXL] = useState(false)
  const [bookings, setBookings] = useState([])
  const [rooms, setRooms] = useState([])
  const [accounts, setAccounts] = useState([])
  const [bookingShow, setBookingShow] = useState(initBooking)
  const [guestTypes, setGuestTypes] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [bookingToEdit, setBookingToEdit] = useState(initBooking)
  const dispatch = useDispatch()

  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [])

  useEffect(() => {
    userService.getAll().then((x) => setAccounts(x))
  }, [])

  useEffect(() => {
    bookingService.getAll().then((x) => setBookings(x))
  }, [])

  useEffect(() => {
    guestTypeService.getAll().then((x) => setGuestTypes(x))
  }, [])

  const handleDeleteBooking = (id) => {
    bookingService._delete(id)
    let bookingsCopy = bookings.filter((item) => item.id !== id)
    setBookings(bookingsCopy)
    setToastMessage('Xoá phiếu thuê phòng thành công')
  }

  const findNameRoom = (id) => {
    return rooms.find((x) => x.id === id)?.name
  }
  const findAccount = (id) => {
    return accounts.find((x) => x.accountId === id)?.username
  }
  const findGuestType = (id) => {
    return guestTypes.find((x) => x.id === id)?.name
  }
  const ShowBookingDetailModal = (booking) => {
    setBookingShow(booking)
    console.log('bookingShow', bookingShow)
    console.log('bookingShow', bookingShow.bookingDetailModels)
    setVisibleXL(true)
  }
  const BookingDetailModal = () => {
    return (
      <CModal size="xl" visible={visibleXL}>
        <CModalHeader onDismiss={() => setVisibleXL(false)}>
          <CModalTitle>THÔNG TIN CHI TIẾT</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="col">Phòng: </CTableHeaderCell>
                <CTableDataCell scope="col">{findNameRoom(bookingShow.roomId)}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Người lập phiếu: </CTableHeaderCell>
                <CTableDataCell scope="col">{findAccount(bookingShow.accountId)}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Ngày bắt đầu thuê: </CTableHeaderCell>
                <CTableDataCell scope="col">{bookingShow.startedDate}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Số lượng khách: </CTableHeaderCell>
                <CTableDataCell scope="col">{bookingShow.numberOfGuest}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Đơn giá: </CTableHeaderCell>
                <CTableDataCell scope="col">{bookingShow.unitStandardPrice}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Giá tạm tính: </CTableHeaderCell>
                <CTableDataCell scope="col">{bookingShow.unitStandardPrice}</CTableDataCell>
              </CTableRow>
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
                  {bookingShow.bookingDetailModels.map((item, index) => (
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
      {openEdit && <EditBooking booking={bookingToEdit}></EditBooking>}
      {BookingDetailModal()}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách phiếu thuê phòng:</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Đây là danh sách các phiếu thuê phòng</p>
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
                {rooms.length > 0 &&
                  accounts.length > 0 &&
                  bookings.map((item, index) => (
                    <CTableRow key={item.accountId}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{findNameRoom(item.roomId)}</CTableDataCell>
                      <CTableDataCell>{item.numberOfGuest}</CTableDataCell>
                      <CTableDataCell>{item.startedDate}</CTableDataCell>
                      <CTableDataCell>{item.unitStandardPrice}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="link" onClick={() => ShowBookingDetailModal(item)}>
                          Chi tiết
                        </CButton>
                        <NavLink to="/booking/editbooking">
                          <CIcon
                            style={{ margin: '0px 5px', cursor: 'pointer' }}
                            size={'lg'}
                            name="cil-trash"
                            onClick={() => {
                              dispatch(bookingActions.editBooking(item))
                            }}
                          />
                        </NavLink>
                        <CIcon
                          style={{ margin: '0px 5px', cursor: 'pointer' }}
                          size={'lg'}
                          name="cil-trash"
                          onClick={() => handleDeleteBooking(item.id)}
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
export default Bookings
