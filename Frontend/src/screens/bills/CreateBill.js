/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// //This is a freaking mess. Just ignore it :<
// import React, { useEffect, useState } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CButton,
//   CInputGroup,
//   CFormLabel,
//   CFormControl,
//   CFormSelect,
//   CForm,
//   CFormFeedback,
//   CWidgetIcon,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { billService, surchargeRateService, guestTypeService, bookingService } from 'src/_services'
// import ToastNotification from 'src/components/Toasts'
// import Message from 'src/components/Message'
// const CreateBill = () => {
//   const [validated, setValidated] = useState(false)
//   const [message, setMessage] = useState('')
//   const [toastMessage, setToastMessage] = useState('')

//   const [rooms, setRooms] = useState([])
//   const [guestTypes, setguestTypes] = useState([])

//   const [bookingId, setBookingId] = useState('')
//   const [accountId, setAccountId] = useState('')

//   const [numberOfRentalDays, setNumberOfRentalDays] = useState('')
//   const [unitPrice, setUnitPrice] = useState(0)
//   const [price, setPrice] = useState(0)

//   const initBillDetail = [
//     {
//       bookingId: '',
//       numberOfRentalDays: '',
//       unitPrice: '',
//       price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//     {
//         bookingId: '',
//         numberOfRentalDays: '',
//         unitPrice: '',
//         price: '',
//     },
//   ]
//   const [billDetails, setBillDetails] = useState(initBillDetail)

//   const date = new Date()
//   const [numberBillDetail, setNumberBillDetail] = useState(0)

//   //   useEffect(() => {
// //     roomService.getAll().then((x) => setRooms(x))
// //     guestTypeService.getAll().then((x) => setguestTypes(x))
// //     setAccountId(JSON.parse(localStorage.getItem('user'))?.accountId)
// //   }, [])

//   const handleSubmit = (event) => {
//     const form = event.currentTarget
//     if (form.checkValidity() === false) {
//       event.preventDefault()
//       event.stopPropagation()
//       setValidated(true)
//       return
//     }
//     event.preventDefault()
//     setMessage('')
//     createBillService()
//     return
//   }

//   const onBlurSetUnitPrice = (id) => {
//     setUnitPrice(getPriceRoom(id))
//   }

//   const onBlurNumberOfRentalDays = (number) => {
//     setNumberBillDetail(number)
//     calculatePrice()
//   }

//   const calculatePrice = () => {
//     var data = {
//       numberOfRentalDays: Number(numberOfRentalDays),
//       unitPrice: Number(unitPrice),
//     }
//     //Check lại chỗ này nè
//     surchargeRateService.calculate(data).then((res) => setPrice(res.result))
//     console.log('Price', price)
//   }

//   const createBillService = () => {
//     const bills = billDetails.slice(0, numberOfRentalDays)
//     var data = {
//       bookingId: bookingId,
//       //accountId: accountId,
//       numberOfRentalDays: Number(numberOfRentalDays),
//       unitPrice: Number(unitPrice),
//       Price: Number(price),
//       billDetailModels: bills,
//     }
//     console.log('data', data)
//     billService.create(data).then((res) => {
//       switch (res) {
//         case 400:
//           setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
//           break
//         case 409:
//           setMessage('Hóa đơn đã được tạo')
//           break
//         case 500:
//           setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
//           break
//         default:
//           setMessage('')
//           setToastMessage('Tạo hóa đơn thành công')
//       }
//     })
//   }

//   const handleReset = () => {
//     setBookingId('')
//     setNumberOfRentalDays('')
//     setUnitPrice(0)
//     setPrice(0)
//     setBillDetails(initBillDetail)
//   }

//   const getPriceRoom = (id) => {
//     return rooms.find((x) => x.id === id)?.roomTypeModel.cost
//   }

//   const getRoomTypeRoom = (id) => {
//     return rooms.find((x) => x.id === id)?.roomTypeModel.name
//   }

//   return (
//     <CRow>
//       {toastMessage && <ToastNotification message={toastMessage} />}
//       <CCard className="sb-4">
//         <CCardHeader>
//           <strong>Tạo tài khoản người dùng</strong>
//         </CCardHeader>
//         {message && <Message variant="danger">{message}</Message>}
//         <CCardBody>
//           <CForm
//             className="row g-3 needs-validation"
//             noValidate
//             validated={validated}
//             onSubmit={handleSubmit}
//           >
//             <CInputGroup className="mb-3">
//               <CCol>
//                 <CFormLabel>Chọn phòng:</CFormLabel>
//               </CCol>
//               <CCol>
//                 <CFormSelect
//                   name="roomId"
//                   id="roomId"
//                   value={roomId}
//                   onInput={(e) => setRoomId(e.target.value)}
//                   onBlur={() => onBlurSetUnitPrice(roomId)}
//                   required
//                 >
//                   <option value="">--Chọn--</option>
//                   {rooms.map((item, index) => {
//                     return (
//                       <option value={item.id} key={index}>
//                         {item.name}
//                       </option>
//                     )
//                   })}
//                 </CFormSelect>
//                 <CFormFeedback invalid>Bắt buộc</CFormFeedback>
//               </CCol>
//             </CInputGroup>
//             <CRow>
//               {roomId && (
//                 <h6 style={{ textAlign: 'center' }}>
//                   Phòng bạn đang chọn là loại phòng <strong>{getRoomTypeRoom(roomId)}</strong>, có
//                   giá là <strong>{getPriceRoom(roomId)} đồng</strong>
//                 </h6>
//               )}
//             </CRow>
//             <CInputGroup>
//               <CCol>
//                 <CFormLabel>Ngày bắt đầu thuê:</CFormLabel>
//               </CCol>
//               <CCol>
//                 <CFormControl id="date" name="date" value={date} disabled />
//               </CCol>
//             </CInputGroup>
//             <CInputGroup>
//               <CCol>
//                 <CFormLabel>Số lượng khách:</CFormLabel>
//               </CCol>
//               <CCol>
//                 <CFormControl
//                   id="numberOfGuest"
//                   name="numberOfGuest"
//                   type="number"
//                   value={numberOfGuest}
//                   onInput={(e) => setNumberOfGuest(e.target.value)}
//                   onBlur={() => onBlurNumberOfGuest(numberOfGuest)}
//                   required
//                 />
//                 <CFormFeedback invalid>Bắt buộc</CFormFeedback>
//               </CCol>
//               <CCol xs="12" sm="6" lg="3">
//                 <CWidgetIcon
//                   className="mb-3"
//                   icon={<CIcon width={24} name="cil-settings" className="icon icon-xl" />}
//                   iconPadding={3}
//                   title="income"
//                   value="$1.999,50"
//                   color="primary"
//                 />
//               </CCol>
//             </CInputGroup>
//             <CTable>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell scope="col">STT</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">KHÁCH HÀNG</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">LOẠI KHÁCH</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">CMND</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">ĐỊA CHỈ</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {[...Array(Number(numberBookingDetail))].map((_, index) => (
//                   <CTableRow key={index}>
//                     <CTableDataCell>
//                       <strong>{index + 1}</strong>
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       <CFormControl
//                         // id="name"
//                         // name="name"
//                         type="text"
//                         value={bookingDetails[index]?.guestName || ''}
//                         onInput={(e) => {
//                           let temp = [...bookingDetails]
//                           temp[index].guestName = e.target.value
//                           setBookDetails(temp)
//                         }}
//                         required
//                       />
//                       <CFormFeedback invalid>Bắt buộc</CFormFeedback>
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       <CFormSelect
//                         // name="f"
//                         // id="f"
//                         value={bookingDetails[index]?.guestTypeId || ''}
//                         onInput={(e) => {
//                           let temp = [...bookingDetails]
//                           temp[index].guestTypeId = e.target.value
//                           setBookDetails(temp)
//                         }}
//                         required
//                       >
//                         <option value="">--Chọn--</option>
//                         {guestTypes.map((item, index) => {
//                           return (
//                             <option value={item.id} key={index}>
//                               {item.name}
//                             </option>
//                           )
//                         })}
//                       </CFormSelect>
//                       <CFormFeedback invalid>Bắt buộc</CFormFeedback>
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       <CFormControl
//                         // id="idCard"
//                         // name="idCard"
//                         type="text"
//                         value={bookingDetails[index]?.idCard || ''}
//                         onInput={(e) => {
//                           let temp = [...bookingDetails]
//                           temp[index].idCard = e.target.value
//                           setBookDetails(temp)
//                         }}
//                         required
//                       />
//                       <CFormFeedback invalid>Bắt buộc</CFormFeedback>
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       <CFormControl
//                         // id="address"
//                         // name="address"
//                         type="text"
//                         value={bookingDetails[index]?.address || ''}
//                         onInput={(e) => {
//                           let temp = [...bookingDetails]
//                           temp[index].address = e.target.value
//                           setBookDetails(temp)
//                         }}
//                         required
//                       />
//                       <CFormFeedback invalid>Bắt buộc</CFormFeedback>
//                     </CTableDataCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>
//             <CButton type="submit"> Tạo</CButton>
//             <CButton onClick={() => handleReset()}> Làm mới</CButton>
//           </CForm>
//         </CCardBody>
//       </CCard>
//     </CRow>
//   )
// }

// export default CreateBooking
