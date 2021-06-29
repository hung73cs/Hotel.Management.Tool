import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _nav = [
  {
    _component: 'CNavTitle',
    anchor: 'Thuê phòng',
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Phiếu thuê phòng',
    to: '/to',
    icon: <CIcon name="cil-notes" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tạo phiếu mới',
        to: '/booking/create',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Danh sách phiếu',
        to: '/booking/bookings',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Hoá đơn',
    to: '/bill',
    icon: <CIcon name="cil-chart-pie" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tạo hoá đơn',
        to: '/bill/createbill',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Kiểm tra hoá đơn',
        to: '/bill',
      },
    ],
  },
  {
    _component: 'CNavTitle',
    anchor: 'Nội bộ',
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Tài khoản',
    to: '/to',
    icon: <CIcon name="cil-user" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Danh sách tài khoản',
        to: '/user/getaccounts',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Thêm tài khoản',
        to: '/user/createaccount',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Phòng',
    to: '/to',
    icon: <CIcon name="cil-room" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Loại phòng',
        to: '/room-type',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Phòng',
        to: '/room',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Báo cáo doanh thu',
    to: '/to',
    icon: <CIcon name="cil-bookmark" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Báo cáo theo tháng',
        to: '/report',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Báo cáo theo năm',
        to: '/report',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Quy định chung',
    to: '/to',
    icon: <CIcon name="cil-list-rich" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Quy định đặt phòng',
        to: '/parameter',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Loại khách',
        to: '/guest-type',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tỉ lệ phụ thu',
        to: '/surcharge-rate',
      },
    ],
  },
]

export default _nav
