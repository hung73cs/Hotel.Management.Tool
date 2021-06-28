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
import { roomService, bookingService } from 'src/_services'
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
    return
  }
  const handleAddToBookingBills = (bookingId) => {
    const booking = bookings.find((x) => x.id === bookingId)
    setBookingBilleds((bookingBilleds) => bookingBilleds.push(booking))
    console.log('bookingBilleds', bookingBilleds)
  }

  const findNameRoom = (bookingId) => {
    const roomId = bookings.find((x) => x.id === bookingId)?.roomId
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
                      onInput={(e) => setBookingId(e.target.value)}
                      required
                      onChange={() => handleAddToBookingBills(bookingId)}
                    >
                      <option value="">--Chọn--</option>
                      {bookings.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {findNameRoom(item.id)}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <CFormFeedback invalid>Bắt buộc</CFormFeedback>
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
                  <CTableHeaderCell scope="col">SỐ NGÀY THUÊ</CTableHeaderCell>
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
                        <strong>{item.bookingId}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.numberOfRent}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.bookingId}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.bookingId}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CButton style={{ margin: '0px 10px', width: 100 }} type="submit">
                THÊM
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
