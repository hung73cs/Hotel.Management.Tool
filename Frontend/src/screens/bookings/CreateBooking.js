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
import { roomService, surchargeRateService, guestTypeService, bookingService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
const CreateBooking = () => {
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const [rooms, setRooms] = useState([])
  const [guestTypes, setguestTypes] = useState([])

  const [roomId, setRoomId] = useState('')
  const [accountId, setAccountId] = useState('')

  const [numberOfGuest, setNumberOfGuest] = useState('')
  const [unitPrice, setUnitPrice] = useState(0)
  const [unitStandardPrice, setUnitStandardPrice] = useState(0)

  const initBookingDetail = [
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
    {
      guestName: '',
      guestTypeId: '',
      idCard: '',
      address: '',
    },
  ]
  const [bookingDetails, setBookDetails] = useState(initBookingDetail)

  const date = new Date()
  const [numberBookingDetail, setNumberBookingDetail] = useState(0)
  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
    guestTypeService.getAll().then((x) => setguestTypes(x))
    setAccountId(JSON.parse(localStorage.getItem('user'))?.accountId)
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
    createBookingService()
    return
  }

  const onBlurSetUnitPrice = (id) => {
    setUnitPrice(getPriceRoom(id))
  }

  const onBlurNumberOfGuest = (number) => {
    setNumberBookingDetail(number)
    calculateUnitStandardPrice()
  }

  const calculateUnitStandardPrice = () => {
    var data = {
      numberOfGuest: Number(numberOfGuest),
      unitPrice: Number(unitPrice),
    }
    surchargeRateService.calculate(data).then((res) => setUnitStandardPrice(res.result))
    console.log('UnitStandardPrice', unitStandardPrice)
  }

  const createBookingService = () => {
    const books = bookingDetails.slice(0, numberOfGuest)
    var data = {
      roomId: roomId,
      accountId: accountId,
      numberOfGuest: Number(numberOfGuest),
      unitPrice: Number(unitPrice),
      unitStandardPrice: Number(unitStandardPrice),
      bookingDetailModels: books,
    }
    console.log('data', data)
    bookingService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Phòng hiện đã được thuê')
          break
        case 500:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          setToastMessage('Tạo phiếu thuê phòng thành công')
      }
    })
  }

  const handleReset = () => {
    setRoomId('')
    setNumberOfGuest('')
    setUnitPrice(0)
    setUnitStandardPrice(0)
    setBookDetails(initBookingDetail)
  }

  const getPriceRoom = (id) => {
    return rooms.find((x) => x.id === id)?.roomTypeModel.cost
  }

  const getRoomTypeRoom = (id) => {
    return rooms.find((x) => x.id === id)?.roomTypeModel.name
  }

  return (
    <CRow>
      {toastMessage && <ToastNotification message={toastMessage} />}
      <CCard className="sb-4">
        <CCardHeader>
          <strong>Tạo tài khoản người dùng</strong>
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
                    <CFormLabel>Chọn phòng:</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormSelect
                      name="roomId"
                      id="roomId"
                      value={roomId}
                      onInput={(e) => setRoomId(e.target.value)}
                      onBlur={() => onBlurSetUnitPrice(roomId)}
                      required
                    >
                      <option value="">--Chọn--</option>
                      {rooms.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <CFormFeedback invalid>Bắt buộc</CFormFeedback>
                  </CCol>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CCol md="3">
                    <CFormLabel>Ngày bắt đầu thuê:</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormControl id="date" name="date" value={date} disabled />
                  </CCol>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CCol md="3">
                    <CFormLabel>Số lượng khách:</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormControl
                      id="numberOfGuest"
                      name="numberOfGuest"
                      type="number"
                      value={numberOfGuest}
                      onInput={(e) => setNumberOfGuest(e.target.value)}
                      onBlur={() => onBlurNumberOfGuest(numberOfGuest)}
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
                    title={getPriceRoom(roomId) + ' VND'}
                    value="GIÁ"
                    color="danger"
                  />
                  <CWidgetIcon
                    className="mb-3"
                    icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
                    iconPadding={3}
                    title={unitStandardPrice + ' VND'}
                    value="GIÁ TẠM TÍNH"
                    color="danger"
                  />
                </CCol>
              </div>
            </div>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">KHÁCH HÀNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">LOẠI KHÁCH</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CMND</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ĐỊA CHỈ</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {[...Array(Number(numberBookingDetail))].map((_, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <strong>{index + 1}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormControl
                        // id="name"
                        // name="name"
                        type="text"
                        value={bookingDetails[index]?.guestName || ''}
                        onInput={(e) => {
                          let temp = [...bookingDetails]
                          temp[index].guestName = e.target.value
                          setBookDetails(temp)
                        }}
                        required
                      />
                      <CFormFeedback invalid>Bắt buộc</CFormFeedback>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormSelect
                        // name="f"
                        // id="f"
                        value={bookingDetails[index]?.guestTypeId || ''}
                        onInput={(e) => {
                          let temp = [...bookingDetails]
                          temp[index].guestTypeId = e.target.value
                          setBookDetails(temp)
                        }}
                        required
                      >
                        <option value="">--Chọn--</option>
                        {guestTypes.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          )
                        })}
                      </CFormSelect>
                      <CFormFeedback invalid>Bắt buộc</CFormFeedback>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormControl
                        // id="idCard"
                        // name="idCard"
                        type="text"
                        value={bookingDetails[index]?.idCard || ''}
                        onInput={(e) => {
                          let temp = [...bookingDetails]
                          temp[index].idCard = e.target.value
                          setBookDetails(temp)
                        }}
                        required
                      />
                      <CFormFeedback invalid>Bắt buộc</CFormFeedback>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormControl
                        // id="address"
                        // name="address"
                        type="text"
                        value={bookingDetails[index]?.address || ''}
                        onInput={(e) => {
                          let temp = [...bookingDetails]
                          temp[index].address = e.target.value
                          setBookDetails(temp)
                        }}
                        required
                      />
                      <CFormFeedback invalid>Bắt buộc</CFormFeedback>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CButton style={{ margin: '0px 10px', width: 100 }} type="submit">
                THÊM
              </CButton>
              <CButton style={{ margin: '0px 10px', width: 100 }} onClick={() => handleReset()}>
                LÀM MỚI
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CRow>
  )
}

export default CreateBooking
