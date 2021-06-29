/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CCreateNavItem, CAvatar } from '@coreui/react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import navigationUser from '../_narUser'
import { NavLink } from 'react-router-dom'
const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const Admin = () => {
    let isAdmin = JSON.parse(localStorage.getItem('user'))?.role
    if (isAdmin === 0) return true
    else return false
  }
  return (
    <CSidebar position="fixed" selfHiding="md" unfoldable={unfoldable} show={sidebarShow}>
      <CSidebarBrand style={{ margin: '10px 50px' }} className="d-none d-md-flex" to="/">
        {/* <CAvatar src="logo/logo.png" size="xl" /> */}
        <NavLink to="/">
          <img src="logo/logo.png" className="img-fluid" alt="Responsive image"></img>
        </NavLink>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {Admin() ? (
            <CCreateNavItem items={navigation} />
          ) : (
            <CCreateNavItem items={navigationUser} />
          )}
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
