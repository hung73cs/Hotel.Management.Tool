import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppBreadcrumb } from './index'

import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ms-md-3 d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon name="cil-menu" size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon name="logo" height="48" alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <div style={{ display: 'flex', justifyContent: 'flex-begin' }}>
              <CNavLink to="/booking/create" component={NavLink} activeClassName="active">
                <strong>TẠO PHIẾU THUÊ PHÒNG</strong>
              </CNavLink>
              <CNavLink to="/booking/bookings" component={NavLink} activeClassName="active">
                <strong>DANH SÁCH PHIẾU THUÊ PHÒNG</strong>
              </CNavLink>
              <CNavLink to="/bill/createbill" component={NavLink} activeClassName="active">
                <strong>TẠO HOÁ ĐƠN</strong>
              </CNavLink>
              <CNavLink to="/bill" component={NavLink} activeClassName="active">
                <strong>DANH SÁCH HOÁ ĐƠN</strong>
              </CNavLink>
              <CNavLink to="/room" component={NavLink} activeClassName="active">
                <strong>DANH SÁCH PHÒNG</strong>
              </CNavLink>
            </div>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
