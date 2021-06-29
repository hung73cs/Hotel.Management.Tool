import React from 'react'

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Tự thêm
const GetAccounts = React.lazy(() => import('./screens/user/GetAccounts'))
const CreateAccount = React.lazy(() => import('./screens/user/CreateAccount'))
const RoomTypes = React.lazy(() => import('./screens/rooms/RoomTypes'))
const Rooms = React.lazy(() => import('./screens/rooms/Rooms'))
const Parameters = React.lazy(() => import('./screens/parameters/Parameters'))
const GuestTypes = React.lazy(() => import('./screens/guests/GuestTypes'))
const CreateBooking = React.lazy(() => import('./screens/bookings/CreateBooking'))
const Bookings = React.lazy(() => import('./screens/bookings/Bookings'))
const EditBooking = React.lazy(() => import('./screens/bookings/EditBooking'))
const SurchargeRates = React.lazy(() => import('./screens/surchargerates/SurchargeRates'))
const CreateBill = React.lazy(() => import('./screens/bills/CreateBill'))
const GetBills = React.lazy(() => import('./screens/bills/Bills'))
const ChangePassword = React.lazy(() => import('./screens/user/ChangePassword'))

const ReportsMonth = React.lazy(() => import('./screens/reports/ReportMonth'))
const ReportsYear = React.lazy(() => import('./screens/reports/ReportYear'))

const routes = [
  { path: '/', exact: true, component: Dashboard },
  { path: '/login', name: 'Login', component: Login },
  //Tự thêm
  { path: '/user', name: 'Tài khoản' },
  { path: '/user/getaccounts', name: 'Danh sách tài khoản', component: GetAccounts },
  { path: '/user/createaccount', name: 'Tạo tài khoản', component: CreateAccount },
  { path: '/room-type', name: 'Quản lý loại phòng', component: RoomTypes },
  { path: '/room', name: 'Quản lý phòng', component: Rooms },
  { path: '/parameter', name: 'Quy định chung', component: Parameters },
  { path: '/guest-type', name: 'Quản lý loại khách', component: GuestTypes },
  { path: '/booking', name: 'Thuê phòng' },
  { path: '/booking/create', name: 'Tạo phiếu thuê phòng', component: CreateBooking },
  { path: '/booking/bookings', name: 'Danh sách phiếu thuê phòng', component: Bookings },
  { path: '/booking/editbooking', name: 'Sửa phiếu thuê phòng', component: EditBooking },
  { path: '/surcharge-rate', name: 'Tỉ lệ phụ thu', component: SurchargeRates },
  { path: '/bill', name: 'Hoá đơn' },
  { path: '/bill/createbill', name: 'Tạo hoá đơn', component: CreateBill },
  { path: '/bill', name: 'Kiểm tra hóa đơn', component: GetBills },
  { path: '/change-password', name: 'Đổi mật khẩu', component: ChangePassword },
  { path: '/report-month', name: 'Báo cáo doanh thu', component: ReportsMonth },
  { path: '/report-year', name: 'Báo cáo doanh thu', component: ReportsYear },
]
export default routes
