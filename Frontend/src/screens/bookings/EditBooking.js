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
import {
  roomService,
  surchargeRateService,
  guestTypeService,
  bookingService,
  parameterService,
} from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
import { useSelector } from 'react-redux'

const EditBooking = () => {
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

  const init1BookingDetail = {
    guestName: '',
    guestTypeId: '',
    idCard: '',
    address: '',
  }
  const booking = useSelector((state) => state.booking.data)

  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const [rooms, setRooms] = useState([])
  const [guestTypes, setguestTypes] = useState([])

  const [roomId, setRoomId] = useState(booking.roomId)
  const [accountId, setAccountId] = useState(booking.accountId)

  const [numberOfGuest, setNumberOfGuest] = useState(booking.numberOfGuest)
  const [unitPrice, setUnitPrice] = useState(booking.unitPrice)
  const [unitStandardPrice, setUnitStandardPrice] = useState(booking.unitStandardPrice)
  const [startedDate, setStartedDate] = useState(booking.startedDate)

  const [bookingDetails, setBookDetails] = useState(booking.bookingDetailModels)
  const [numberBookingDetail, setNumberBookingDetail] = useState(booking.bookingDetailModels.length)
  const [parameters, setParameters] = useState([])
  const [isPlusGuestTypeCostArray, SetIsPlusGuestTypeCostArray] = useState([])

  useEffect(() => {
    console.log('object', booking.roomId)
    roomService
      .getAll()
      .then((x) =>
        setRooms(
          x.filter(
            (x) => x.roomStatus === 'OPEN' || (x.roomStatus === 'CLOSE' && x.id === booking.roomId),
          ),
        ),
      )

    guestTypeService.getAll().then((x) => setguestTypes(x))
    parameterService.getAll().then((x) => {
      setParameters(x)
    })
    setAccountId(JSON.parse(localStorage.getItem('user'))?.accountId)
  }, [])

  useEffect(() => {
    console.log('booking', booking)
    console.log('hello')
    console.log('roomid', roomId)
    console.log('numberOfGuest', numberOfGuest)
    console.log('unitPrice', unitPrice)
    console.log('numberBookingDetail', numberBookingDetail)
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
    editBookingService()
    return
  }

  const onBlurSetUnitPrice = (id) => {
    setUnitPrice(getPriceRoom(id))
  }

  const onBlurNumberOfGuest = (number) => {
    if (number > numberBookingDetail) {
      const temp = bookingDetails
      const diff = (number = numberBookingDetail + 1)
      for (let i = 1; i <= diff; i++) {
        temp.push(init1BookingDetail)
        setBookDetails(temp)
      }
    }
    if (number > getParameterNumberOfGuestInRoom()) {
      setMessage(
        'Số khách trong phòng không được vượt quá ' + getParameterNumberOfGuestInRoom() + ' khách',
      )
    } else {
      setNumberBookingDetail(number)
      calculateUnitStandardPrice()
      setMessage('')
    }
  }

  const calculateUnitStandardPrice = () => {
    var data = {
      numberOfGuest: Number(numberOfGuest),
      unitPrice: Number(unitPrice),
    }
    surchargeRateService.calculate(data).then((res) => setUnitStandardPrice(res.result))
    console.log('UnitStandardPrice', unitStandardPrice)
  }

  const editBookingService = () => {
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
    bookingService.edit(booking.id, data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi lưu, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Phòng hiện đã được thuê')
          break
        case 500:
          setMessage('Có lỗi khi lưu, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          setToastMessage('Lưu phiếu thuê phòng thành công')
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
  const getParameterNumberOfGuestInRoom = () => {
    const title = 'Số khách tối đa trong 1 phòng'
    return parameters.find((x) => x.name === title)?.value
  }

  const getPriceRoom = (id) => {
    return rooms.find((x) => x.id === id)?.roomTypeModel.cost
  }

  const getRoomTypeRoom = (id) => {
    return rooms.find((x) => x.id === id)?.roomTypeModel.name
  }
  const formatDatetime = (datetime) => {
    const regex = /\d{4}-\d{2}-\d{1,2}/
    return datetime.match(regex)
  }

  const setPriceGuestType = (guestTypeId) => {
    if (isPlusGuestTypeCostArray.find((x) => x === guestTypeId) === undefined) {
      const guestTypesCopy = [...guestTypes]
      const costGuestType = guestTypesCopy.find((x) => x.id === guestTypeId)?.surchargeRate
      setUnitStandardPrice(unitStandardPrice + (unitStandardPrice * costGuestType) / 100)
      const temp = isPlusGuestTypeCostArray
      temp.push(guestTypeId)
      SetIsPlusGuestTypeCostArray(temp)
    }
  }
  return (
    <CRow>
      {toastMessage && <ToastNotification message={toastMessage} />}
      <CCard className="sb-4">
        <CCardHeader>
          <strong>Sửa phiếu thuê phòng</strong>
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
                    <CFormLabel>Mã phiếu thuê:</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel>
                      <strong>{booking.id.split('-').pop()}</strong>
                    </CFormLabel>
                  </CCol>
                </CInputGroup>
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
                    <CFormControl id="date" name="date" value={startedDate} disabled />
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
                          setPriceGuestType(bookingDetails[index]?.guestTypeId)
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
                SỬA
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

export default EditBooking
