import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormControl,
  CFormLabel,
  CInputGroup,
  CRow,
  CFormSelect,
  CCol,
} from '@coreui/react'
import { Gender } from 'src/Utils/Enum'
import { useForm } from 'react-hook-form'
import { Switch } from 'react-router'

const CreateAccount = () => {
  const [date, setDate] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState('')
  const [accountInfo, setAccountInfo] = React.useState({ username: '', name: '', role: '', password: '', role: '', gender: '', birthday: '', phoneNumber: '', address: '', idCard: '' })

  const OnSelect = (e, type) => {
    let value = e.target.selectedIndex
    setGender(Gender[value])

    switch (type) {
      case 'MONTH':
        setMonth(value)
        break
      case 'GENDER':
        setGender(Gender[value])
        break
      case 'ROLE':
        let accountInfoCopy = accountInfo
        accountInfoCopy.role = e.target.index
        setAccountInfo(accountInfoCopy)
        break
      default:
        break
    }
  }

  const OnInput = (e, type) => {
    let value = e.target.value
    let accountInfoCopy = accountInfo;
    switch (type) {
      case 'USERNAME':
        accountInfoCopy.username = value
        break
      case 'NAME':
        accountInfoCopy.name = value
        break
      case 'DATE':
        if (value.length < 3) {
          setDate(value)
        }
        break
      case 'YEAR':
        if (value.length < 5) {
          setYear(value)
        }
        break
      case 'PHONENUMBER':
        if (value.length < 32) {
          accountInfoCopy.phoneNumber = value
        }
        break
      case 'ADDRESS':
        accountInfoCopy.address = value
        break
      case 'IDCARD':
        if (value.length < 13) {
          accountInfoCopy.idCard = value
        }
        break
      case 'PASS1':
        if (value.length < 32) {
          setPass1(value)
        }
        break
      case 'PASS2':
        if (value.length < 32) {
          setPass2(value)
        }
        break
      default:
        break
    }
    setAccountInfo(accountInfoCopy)
  }

  return (
    <CRow>
      <CCard className="sb-4">
        <CCardHeader>
          <strong>Tạo tài khoản người dùng</strong>
        </CCardHeader>
        <CCardBody>
          {/* Username */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} >
                Username:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" value={accountInfo.username} onInput={(e) => OnInput(e, "USERNAME")} />
            </CCol>
          </CInputGroup>
          {/* Name */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} >
                Name:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" value={accountInfo.name} onInput={(e) => OnInput(e, "NAME")} />
            </CCol>
          </CInputGroup>
          {/* Ngày sinh */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} >
                Ngày sinh:
              </CFormLabel>
            </CCol>
            {/* ngày */}
            <CCol md="1" style={{ marginRight: 10 }}>
              <CFormControl type="number" value={date} onInput={(e) => OnInput(e, "DATE")} />
            </CCol>
            {/* tháng */}
            <CCol md="2" style={{ marginRight: 10 }}>
              <CFormSelect onChange={(e) => OnSelect(e, 'MONTH')}>
                <option disabled>Choose...</option>
                {[...Array(13).keys()].map((item, index) => {
                  if (item > 0) {
                    return <option key={index}>Tháng {item}</option>
                  }
                })}
              </CFormSelect>
            </CCol>
            {/* năm */}
            <CCol md="2">
              <CFormControl type="number" value={year} onInput={(e) => OnInput(e, "YEAR")} />
            </CCol>
          </CInputGroup>
          {/* Giới tính */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }} >
                Giới tính:
              </CFormLabel>
            </CCol>
            <CCol md="3">
              <CFormSelect onChange={(e) => OnSelect(e, 'GENDER')}>
                <option disabled>Choose...</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Unknown</option>
              </CFormSelect>
            </CCol>
          </CInputGroup>
          {/* Số điện thoại */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} >
                Số điện thoại:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="number" value={accountInfo.phoneNumber} onInput={(e) => OnInput(e, 'PHONENUMBER')} />
            </CCol>
          </CInputGroup>
          {/* Địa chỉ */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} >
                Địa chỉ:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" value={accountInfo.address} onInput={(e) => OnInput(e, 'ADDRESS')} />
            </CCol>
          </CInputGroup>
          {/* ID card */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} >
                CMND:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="number" value={accountInfo.idCard} onInput={(e) => OnInput(e, 'IDCARD')} />
            </CCol>
          </CInputGroup>
          {/* Nhập mật khẩu */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }} >
                Mật khẩu:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="password" onInput={(e) => OnInput(e, 'PASS1')} />
            </CCol>
          </CInputGroup>
          {/* Nhập lại mật khẩu */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }} >
                Xác nhận lại mật khẩu:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="password" value={pass2} onInput={(e) => OnInput(e, 'PASS2')} />
            </CCol>
          </CInputGroup>
          {/* Phân quyền   */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }} >
                Phân quyền:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormSelect onChange={(e) => OnSelect(e, 'ROLE')}>
                <option disabled>Choose...</option>
                <option>Admin</option>
                <option>Staff</option>
              </CFormSelect>
            </CCol>
          </CInputGroup>
        </CCardBody>
      </CCard>
    </CRow>
  )
}
export default CreateAccount
