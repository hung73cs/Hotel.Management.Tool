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
  CCardFooter,
  CButton,
} from '@coreui/react'
import { Gender } from 'src/Utils/Enum'

const CreateAccount = () => {
  const [name, setName] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [gender, setGender] = React.useState(Gender[1])
  const [idCard, setIdCard] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [date, setDate] = React.useState('')
  const [month, setMonth] = React.useState(1)
  const [pass1, setPass1] = React.useState('')
  const [pass2, setPass2] = React.useState('')
  const [year, setYear] = React.useState('')
  const [accountInfo, setaccountInfo] = React.useState({
    username: '',
    password: '',
    role: 'Admin',
    userInfoModel: {
      name: '',
      gender: Gender[1],
      birthday: '',
      phoneNumber: '',
      address: '',
      idCard: '',
    },
  })

  const OnSelect = (e, type) => {
    let value = e.target.selectedIndex
    switch (type) {
      case 'MONTH':
        setMonth(value)
        break
      case 'GENDER':
        setGender(Gender[value])
        break
      case 'ROLE':
        setaccountInfo(() => {
          return Object.assign({}, accountInfo, {
            role: e.target.value,
          })
        })
        break
      default:
        break
    }
  }

  const OnInput = (e, type) => {
    let value = e.target.value
    switch (type) {
      case 'USERNAME':
        setaccountInfo(() => {
          return Object.assign({}, accountInfo, {
            username: value.replace(' ', ''),
          })
        })
        break
      case 'NAME':
        setName(value)
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
          setPhoneNumber(value)
        }
        break
      case 'ADDRESS':
        setAddress(value)
        break
      case 'IDCARD':
        if (value.length < 13) {
          setIdCard(value)
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
  }

  function Submit(e) {
    if (pass1 !== pass2) {
      alert('Mật khẩu không chính xác')
      return
    }
    accountInfo.password = pass1
    accountInfo.userInfoModel.name = name
    accountInfo.userInfoModel.gender = gender

    // check validate birthday
    {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          if (date < 0 || date > 31) {
            alert('Ngày sinh không hợp lệ')
          }
          break
        case 4:
        case 6:
        case 9:
        case 11:
          if (date < 0 || date > 30) {
            alert('Ngày sinh không hợp lệ')
          }
          break
        default:
          if (date < 0 || date > 28) {
            alert('Ngày sinh không hợp lệ')
          }
          break
      }

      let currentDate = new Date()
      if (currentDate.getFullYear() < year) {
        alert('Năm sinh không hợp lệ')
        return
      } else {
        if (currentDate.getFullYear() === year) {
          if (currentDate.getMonth < month) {
            alert('Tháng sinh không hợp lệ')
            return
          } else {
            if (currentDate.getMonth === month) {
              if (currentDate.getDate < date) {
                alert('Ngày sinh không hợp lệ')
                return
              }
            }
          }
        }
      }
    }

    let birthDay = year.toString() + '-' + month.toString() + '-' + date.toString()
    accountInfo.userInfoModel.birthday = birthDay
    accountInfo.userInfoModel.phoneNumber = phoneNumber
    accountInfo.userInfoModel.address = address
    accountInfo.userInfoModel.idCard = idCard

    console.log(accountInfo)
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
              <CFormLabel style={{ float: 'right' }}>Username:</CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl
                type="text"
                value={accountInfo.username}
                onInput={(e) => OnInput(e, 'USERNAME')}
              />
            </CCol>
          </CInputGroup>
          {/* Name */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }}>Name:</CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" value={name} onInput={(e) => OnInput(e, 'NAME')} />
            </CCol>
          </CInputGroup>
          {/* Ngày sinh */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }}>Ngày sinh:</CFormLabel>
            </CCol>
            {/* ngày */}
            <CCol md="1" style={{ marginRight: 10 }}>
              <CFormControl type="number" value={date} onInput={(e) => OnInput(e, 'DATE')} />
            </CCol>
            {/* tháng */}
            <CCol md="2" style={{ marginRight: 10 }}>
              <CFormSelect onChange={(e) => OnSelect(e, 'MONTH')}>
                <option disabled>Choose...</option>
                {[...Array(13).keys()].map((item, index) => {
                  if (item > 0) {
                    return <option key={index}>Tháng {item}</option>
                  } else {
                    return null
                  }
                })}
              </CFormSelect>
            </CCol>
            {/* năm */}
            <CCol md="2">
              <CFormControl type="number" value={year} onInput={(e) => OnInput(e, 'YEAR')} />
            </CCol>
          </CInputGroup>
          {/* Giới tính */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }}>Giới tính:</CFormLabel>
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
              <CFormLabel style={{ float: 'right' }}>Số điện thoại:</CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl
                type="number"
                value={phoneNumber}
                onInput={(e) => OnInput(e, 'PHONENUMBER')}
              />
            </CCol>
          </CInputGroup>
          {/* Địa chỉ */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }}>Địa chỉ:</CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" value={address} onInput={(e) => OnInput(e, 'ADDRESS')} />
            </CCol>
          </CInputGroup>
          {/* ID card */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }}>CMND:</CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="number" value={idCard} onInput={(e) => OnInput(e, 'IDCARD')} />
            </CCol>
          </CInputGroup>
          {/* Nhập mật khẩu */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }}>Mật khẩu:</CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="password" onInput={(e) => OnInput(e, 'PASS1')} />
            </CCol>
          </CInputGroup>
          {/* Nhập lại mật khẩu */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }}>
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
              <CFormLabel style={{ float: 'right', marginBottom: 0 }}>Phân quyền:</CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormSelect onChange={(e) => OnSelect(e, 'ROLE')}>
                <option disabled>Choose....</option>
                <option>Admin</option>
                <option>Staff</option>
              </CFormSelect>
            </CCol>
          </CInputGroup>
        </CCardBody>
        <CCardFooter>
          <CButton
            className="m-1"
            color={'success'}
            style={{ float: 'right' }}
            onClick={(e) => Submit(e)}
          >
            {'Bấm vào đây thằng lồn!'}
          </CButton>
        </CCardFooter>
      </CCard>
    </CRow>
  )
}
export default CreateAccount
