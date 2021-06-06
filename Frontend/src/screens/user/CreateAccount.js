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

const CreateAccount = () => {
  const [username, setUsername] = React.useState('')
  const [name, setName] = React.useState('')
  const [pass1, setPass1] = React.useState('')
  const [pass2, setPass2] = React.useState('')
  const [gender, setGender] = React.useState()
  const [accountInfo, setAccountInfo] = React.useState()
  const { register, handleSubmit, watch } = useForm()

  const OnSelect = (e) => {
    let value = e.target.selectedIndex
    setGender(Gender[value])
  }

  const OnInput = (e) => {
    let value = e.target.value

    if (value.length < 32) {
      setPass2(value)
    }
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
              <CFormLabel style={{ float: 'right' }} htmlFor="validationDefault04">
                Username:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" onInput={(e) => OnSelect(e)} />
            </CCol>
          </CInputGroup>
          {/* Name */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} htmlFor="validationDefault04">
                Name:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" onInput={(e) => OnSelect(e)} />
            </CCol>
          </CInputGroup>
          {/* Ngày sinh */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} htmlFor="validationDefault04">
                Ngày sinh:
              </CFormLabel>
            </CCol>
            {/* ngày */}
            <CCol md="1" style={{ marginRight: 10 }}>
              <CFormControl type="number" onInput={(e) => OnSelect(e)} />
            </CCol>
            {/* tháng */}
            <CCol md="2" style={{ marginRight: 10 }}>
              <CFormSelect id="validationDefault04" onChange={(e) => OnSelect(e)}>
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
              <CFormControl type="number" onInput={(e) => OnSelect(e)} />
            </CCol>
          </CInputGroup>
          {/* Giới tính */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }} htmlFor="validationDefault04">
                Giới tính:
              </CFormLabel>
            </CCol>
            <CCol md="3">
              <CFormSelect id="validationDefault04" onChange={(e) => OnSelect(e)}>
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
              <CFormLabel style={{ float: 'right' }} htmlFor="validationDefault04">
                Số điện thoại:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" onInput={(e) => OnSelect(e)} />
            </CCol>
          </CInputGroup>
          {/* Địa chỉ */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} htmlFor="validationDefault04">
                Địa chỉ:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" onInput={(e) => OnSelect(e)} />
            </CCol>
          </CInputGroup>
          {/* ID card */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right' }} htmlFor="validationDefault04">
                CMND:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="text" onInput={(e) => OnSelect(e)} />
            </CCol>
          </CInputGroup>
          {/* Nhập mật khẩu */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }} htmlFor="validationDefault04">
                Mật khẩu:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="password" onInput={(e) => OnSelect(e)} />
            </CCol>
          </CInputGroup>
          {/* Nhập lại mật khẩu */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }} htmlFor="validationDefault04">
                Xác nhận lại mật khẩu:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormControl type="password" value={pass2} onInput={(e) => OnSelect(e)} />
            </CCol>
          </CInputGroup>
          {/* Phân quyền   */}
          <CInputGroup className="mb-3">
            <CCol md="4" style={{ marginRight: 10 }}>
              <CFormLabel style={{ float: 'right', marginBottom: 0 }} htmlFor="validationDefault04">
                Phân quyền:
              </CFormLabel>
            </CCol>
            <CCol md="6">
              <CFormSelect id="validationDefault04" onChange={(e) => OnSelect(e)}>
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
