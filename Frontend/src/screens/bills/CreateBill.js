/* eslint-disable no-unused-vars */
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
  CInputGroup,
  CFormLabel,
  CFormControl,
  CFormSelect,
  CForm,
  CFormFeedback,
  CWidgetIcon,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
import { roomService, bookingService, billService } from 'src/_services'
const CreateBill = () => {
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const [rooms, setRooms] = useState([])
  const [bookings, setBookings] = useState([])
  const [bookingId, setBookingId] = useState('')
  const [guestName, setGuestName] = useState('')
  const [address, setAddress] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [bookingBilleds, setBookingBilleds] = useState([])
  const [numberOfRent, setNumberOfRent] = useState('')
  const [billDetails, setBillDetails] = useState([])
  const date = new Date().toISOString()

  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [])

  useEffect(() => {
    bookingService.getAll().then((x) => setBookings(x))
  }, [])

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      return
    }
    event.preventDefault()
    setMessage('')
    //createBookingService()
    createBillService()
    return
  }

  const calculateNumberOfRentalDays = (date, preDate) => {
    const dayDate = date.split('-').pop()
    const dayPreDate = preDate.split('-').pop()
    return dayDate - dayPreDate + 1
    // return Math.floor(
    //   (Date.UTC(date.getDate(), date.getMonth(), date.getFullYear()) -
    //     Date.UTC(preDate.getDate(), preDate.getMonth(), preDate.getFullYear(),)) / (1000 * 60 * 60 * 24))
  }

  const handleAddToBookingBills = (bookingId) => {
    let temp = bookingBilleds
    let bookingsCopy = [...bookings]
    let booking = bookingsCopy.find((x) => x.id === bookingId)
    bookingsCopy = bookingsCopy.filter((x) => x.id !== bookingId)
    let calculateTotalPrice = totalPrice
    calculateTotalPrice += booking.unitStandardPrice * calculateNumberOfRentalDays(date.split('T')[0], booking.startedDate.split('T')[0])
    setTotalPrice(calculateTotalPrice)
    temp.push(booking)
    setBookingId(bookingId)
    setBookingBilleds(temp)
    console.log('booking', booking)
    const data = {
      bookingId: booking.id,
      numberOfRentalDays: calculateNumberOfRentalDays(
        date.split('T')[0],
        booking.startedDate.split('T')[0],
      ),
      unitPrice: booking.unitPrice,
      price: booking.unitStandardPrice,
    }
    let tempBillDetails = billDetails
    tempBillDetails.push(data)
    setBillDetails(tempBillDetails)
    console.log('tempBillDetails', tempBillDetails)
    setBookings(bookingsCopy)
    console.log('bookingBilleds', bookingBilleds)
  }

  const createBillService = () => {
    var data = {
      createdDate: date,
      guestName: guestName,
      address: address,
      totalPrice: Number(totalPrice),
      billDetailModels: billDetails,
    }
    console.log('data', data)
    billService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Hoá đơn tạo không hợp lệ')
          break
        case 500:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          setToastMessage('Tạo hoá đơn thành công')
      }
    })
  }

  const findNameRoom = (roomId) => {
    return rooms.find((x) => x.id === roomId)?.name
  }

  const formatDatetime = (datetime) => {
    const regex = /\d{4}-\d{2}-\d{1,2}/
    return datetime.match(regex)
  }
  return (
    <CRow>
      {toastMessage && <ToastNotification message={toastMessage} />}
      <CCard className="sb-4">
        <CCardHeader>
          <strong>Tạo hoá đơn người dùng</strong>
        </CCardHeader>
        {message && <Message variant="danger">{message}</Message>}
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <CInputGroup className="mb-4">
                  <CCol md="3">
                    <CFormLabel>Chọn phiếu thuế phòng:</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormSelect
                      name="bookingId"
                      id="bookingId"
                      value={bookingId}
                      onInput={(e) => {
                        handleAddToBookingBills(e.target.value)
                      }}
                    >
                      <option value="">--Chọn--</option>
                      {bookings.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.id.split('-').pop()}
                          </option>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CCol md="3">
                    <CFormLabel>Ngày tạo:</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormControl id="date" name="date" value={formatDatetime(date)} disabled />
                  </CCol>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CCol md="3">
                    <CFormLabel>Tên khách:</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormControl
                      id="guestName"
                      name="guestName"
                      type="text"
                      value={guestName}
                      onInput={(e) => setGuestName(e.target.value)}
                      required
                    />
                    <CFormFeedback invalid>Bắt buộc</CFormFeedback>
                  </CCol>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CCol md="3">
                    <CFormLabel>Địa chỉ:</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormControl
                      id="address"
                      name="address"
                      type="text"
                      value={address}
                      onInput={(e) => setAddress(e.target.value)}
                      required
                    />
                    <CFormFeedback invalid>Bắt buộc</CFormFeedback>
                  </CCol>
                </CInputGroup>
              </div>
              <div style={{ width: '35%', margin: '0px 20px' }}>
                <CCol>
                  <CWidgetIcon
                    className="mb-3"
                    icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
                    iconPadding={3}
                    title={totalPrice + ' VND'}
                    value="TỔNG TIỀN"
                    color="danger"
                  />
                </CCol>
              </div>
            </div>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NGÀY BẮT ĐẦU THUÊ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ĐƠN GIÁ PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">THÀNH TIỀN</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bookingBilleds.length > 0 &&
                  bookingBilleds.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <strong>{index + 1}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{findNameRoom(item.roomId)}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{formatDatetime(item.startedDate)}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.unitPrice}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.unitStandardPrice}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CButton style={{ margin: '0px 10px', width: 100 }} type="submit">
                TẠO
              </CButton>
              <CButton style={{ margin: '0px 10px', width: 100 }}>LÀM MỚI</CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CRow>
  )
}
export default CreateBill