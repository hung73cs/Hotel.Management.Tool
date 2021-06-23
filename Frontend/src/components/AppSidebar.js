/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CCreateNavItem, CAvatar } from '@coreui/react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar position="fixed" selfHiding="md" unfoldable={unfoldable} show={sidebarShow}>
      <CSidebarBrand style={{ margin: '10px 50px' }} className="d-none d-md-flex" to="/">
        {/* <CAvatar src="logo/logo.png" size="xl" /> */}
        <img src="logo/logo.png" className="img-fluid" alt="Responsive image"></img>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CCreateNavItem items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
