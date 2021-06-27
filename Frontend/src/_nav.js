import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _nav = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Trang chủ',
    to: '/home',
    icon: <CIcon name="cil-home" customClasses="nav-icon" />,
  },
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
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Hoá đơn',
    to: '/bill',
    icon: <CIcon name="cil-dollar" customClasses="nav-icon" />,
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
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Typography',
    to: '/theme/typography',
    icon: <CIcon name="cil-home" customClasses="nav-icon" />,
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Base',
    to: '/to',
    icon: <CIcon name="cil-puzzle" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Accordion',
        to: '/base/accordion',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Cards',
        to: '/base/cards',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Carousel',
        to: '/base/carousels',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Collapse',
        to: '/base/collapses',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'List group',
        to: '/base/list-groups',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Pagination',
        to: '/base/paginations',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Popovers',
        to: '/base/popovers',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Progress',
        to: '/base/progress',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Spinners',
        to: '/base/spinners',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tables',
        to: '/base/tables',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    anchor: 'Buttons',
    icon: <CIcon name="cil-cursor" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    anchor: 'Forms',
    icon: <CIcon name="cil-notes" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Form Control',
        to: '/forms/form-control',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Select',
        to: '/forms/select',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Range',
        to: '/forms/range',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Input Group',
        to: '/forms/input-group',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Layout',
        to: '/forms/layout',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Charts',
    to: '/charts',
    icon: <CIcon name="cil-chart-pie" customClasses="nav-icon" />,
  },
  {
    _component: 'CNavGroup',
    anchor: 'Icons',
    icon: <CIcon name="cil-star" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    anchor: 'Notifications',
    icon: <CIcon name="cil-bell" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Badges',
        to: '/notifications/badges',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Modal',
        to: '/notifications/modals',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Widgets',
    to: '/widgets',
    icon: <CIcon name="cil-calculator" customClasses="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavTitle',
    anchor: 'Extras',
  },
  {
    _component: 'CNavGroup',
    anchor: 'Pages',
    icon: <CIcon name="cil-star" customClasses="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Login',
        to: '/login',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Register',
        to: '/register',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Error 404',
        to: '/404',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
