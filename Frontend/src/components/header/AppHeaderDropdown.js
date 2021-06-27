import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../_actions'
const AppHeaderDropdown = () => {
  const dispatch = useDispatch()

  const LogOut = () => {
    dispatch(userActions.logout())
  }

  const getUsername = () => {
    const username = JSON.parse(localStorage.getItem('user'))?.username
    return <h6>{username}</h6>
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        style={{ display: 'flex' }}
        placement="bottom-end"
        className="py-0"
        caret={false}
      >
        <span>
          {getUsername()}
          <CAvatar src="avatars/avt.png" size="md" />
        </span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem onClick={() => LogOut()}>
          <CIcon name="cil-lock-locked" className="me-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
