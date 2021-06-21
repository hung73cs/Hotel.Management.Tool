import React, { useEffect, useState } from 'react'
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
  CForm,
  CFormFeedback,
} from '@coreui/react'
import Message from '../../components/Message'
import { userService } from 'src/_services'

const CreateAccount = () => {
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState()
  const [birthday, setBirthday] = useState({
    date: 1,
    month: 1,
    year: 1900,
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [idCard, setIdCard] = useState('')
  const [validated, setValidated] = useState(false)

  const months = [
    {
      name: '1',
      value: 1,
    },
    {
      name: '2',
      value: 2,
    },
    {
      name: '3',
      value: 3,
    },
    {
      name: '4',
      value: 4,
    },
    {
      name: '5',
      value: 5,
    },
    {
      name: '6',
      value: 6,
    },
    {
      name: '7',
      value: 7,
    },
    {
      name: '8',
      value: 8,
    },
    {
      name: '9',
      value: 9,
    },
    {
      name: '10',
      value: 10,
    },
    {
      name: '11',
      value: 11,
    },
    {
      name: '12',
      value: 12,
    },
  ]
  const genders = [
    {
      name: 'Nam',
      value: 'MALE',
    },
    {
      name: 'Nữ',
      value: 'FEMALE',
    },
    {
      name: 'Không xác định',
      value: 'NOTHING',
    },
  ]
  const roles = [
    {
      name: 'Admin',
      value: 'ADMIN',
    },
    {
      name: 'Nhân viên',
      value: 'STAFF',
    },
  ]

  const handleSubmit = (event) => {
    console.log('Vo rui ne')
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      console.log('validation')
      return
    }
    if (confirmPassword !== password) {
      event.preventDefault()
      setMessage('Mật khẩu không khớp')
      console.log('mat khau')
      return
    } else {
      event.preventDefault()
      setMessage('')
      createAccountService()
      console.log('register')
      return
    }
  }

  const createAccountService = () => {
    var data = {
      username: username,
      password: password,
      role: role,
      userInfoModel: {
        name: name,
        gender: gender,
        birthday: birthday,
        phoneNumber: phoneNumber,
        address: address,
        idCard: idCard,
      },
    }
    userService.register(data).then((res) => {
      if (res === 500 || res === 409) {
        return setMessage('Gặp lỗi khi tạo, kiểm tra tên có bị trùng')
      } else {
        setMessage('')
        setToastMessage('Tạo phòng thành công')
      }
    })
  }

  return (
    <CRow>
      <CCard className="sb-4">
        <CCardHeader>
          <strong>Tạo tài khoản người dùng</strong>
        </CCardHeader>
        {message && <Message variant="danger">{message}</Message>}
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right' }}>Tên tài khoản:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormControl
                  name="username"
                  type="text"
                  id="name"
                  value={username}
                  onInput={(e) => setUsername(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* Name */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right' }}>Name:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormControl
                  name="username"
                  type="text"
                  id="name"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* Ngày sinh */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right' }}>Ngày sinh:</CFormLabel>
              </CCol>
              {/* ngày */}
              <CCol md="1" style={{ marginRight: 10 }}>
                <CFormControl
                  name="date"
                  id="date"
                  type="number"
                  value={birthday.date}
                  onInput={(e) => setBirthday(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
              {/* tháng */}
              <CCol md="2" style={{ marginRight: 10 }}>
                <CFormSelect
                  name="month"
                  id="month"
                  value={birthday.month}
                  defaultValue={months[0].value}
                  onInput={(e) => setBirthday(e.target.value)}
                >
                  {months.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        Tháng {item.name}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
              {/* năm */}
              <CCol md="2">
                <CFormControl
                  name="year"
                  id="year"
                  type="number"
                  value={birthday.year}
                  onInput={(e) => setBirthday(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* Giới tính */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right', marginBottom: 0 }}>Giới tính:</CFormLabel>
              </CCol>
              <CCol md="3">
                <CFormSelect
                  name="gender"
                  id="gender"
                  value={gender}
                  defaultValue={genders[0].value}
                  onInput={(e) => setGender(e.target.value)}
                >
                  {genders.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.name}
                      </option>
                    )
                  })}
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
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  value={phoneNumber}
                  onInput={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* Địa chỉ */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right' }}>Địa chỉ:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormControl
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onInput={(e) => setAddress(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* ID card */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right' }}>CMND:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormControl
                  id="idCard"
                  name="idCard"
                  type="number"
                  value={idCard}
                  onInput={(e) => setIdCard(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* Nhập mật khẩu */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right', marginBottom: 0 }}>Mật khẩu:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormControl
                  id="password"
                  name="password"
                  type="text"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
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
                <CFormControl
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  value={confirmPassword}
                  onInput={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            {/* Phân quyền   */}
            <CInputGroup className="mb-3">
              <CCol md="4" style={{ marginRight: 10 }}>
                <CFormLabel style={{ float: 'right', marginBottom: 0 }}>Loại tài khoản:</CFormLabel>
              </CCol>
              <CCol md="6">
                <CFormSelect
                  name="role"
                  id="role"
                  value={role}
                  defaultValue={roles[1].value}
                  onInput={(e) => setRole(e.target.value)}
                >
                  {roles.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.name}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
            </CInputGroup>
            <CButton color="primary" type="submit">
              Submit form
            </CButton>
          </CForm>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </CRow>
  )
}
export default CreateAccount
