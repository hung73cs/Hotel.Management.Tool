import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _navUser = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Trang chủ',
    to: '/home',
    icon: <CIcon name="cil-home" customClasses="nav-icon" />,
  },
  {
    _component: 'CNavTitle',
    anchor: 'Thuê phòng cho user',
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
    anchor: 'Báo cáo',
    to: '/to',
    icon: <CIcon name="cil-chart-pie" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Doanh thu theo tháng',
        to: '/report/month',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Doanh thu theo năm',
        to: '/report/year',
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
    ],
  },
]

export default _navUser
