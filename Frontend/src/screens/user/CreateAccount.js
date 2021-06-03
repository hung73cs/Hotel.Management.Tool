import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormControl,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CCol,
  CFormFeedback,
} from '@coreui/react'

const CreateAccount = () => {
  return (
    <CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Tạo tài khoản người dùng</strong>
        </CCardHeader>
        <CCardBody>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">@</CInputGroupText>
            <CFormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon2">@</CInputGroupText>
            <CFormControl
              placeholder="Mật khẩu"
              aria-label="Mật khẩu"
              aria-describedby="basic-addon2"
              type="password"
            />
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon2">@</CInputGroupText>
            <CFormControl
              placeholder="Nhập lại mật khẩu"
              aria-label="Nhập lại mật khẩu"
              aria-describedby="basic-addon2"
              type="password"
            />
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CCol md="12">
              <CFormLabel htmlFor="validationDefault03">Tên hiển thị</CFormLabel>
              <CFormControl type="text" id="validationDefault03" required />
            </CCol>
            <CCol md="6">
              <CFormLabel htmlFor="validationDefault04">Loại tài khoản</CFormLabel>
              <CFormSelect id="validationDefault04">
                <option disabled>Choose...</option>
                <option>Admin</option>
                <option>Staff</option>
              </CFormSelect>
            </CCol>

            <CCol md="6">
              <CFormLabel htmlFor="validationDefault04">Giới tính</CFormLabel>
              <CFormSelect id="validationDefault04">
                <option disabled>Choose...</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Unknown</option>
              </CFormSelect>
            </CCol>
          </CInputGroup>

          <CFormLabel htmlFor="basic-url">Your vanity URL</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon3">https://example.com/users/</CInputGroupText>
            <CFormControl id="basic-url" aria-describedby="basic-addon3" />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>$</CInputGroupText>
            <CFormControl aria-label="Amount (to the nearest dollar)" />
            <CInputGroupText>.00</CInputGroupText>
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CFormControl placeholder="Username" aria-label="Username" />
            <CInputGroupText>@</CInputGroupText>
            <CFormControl placeholder="Server" aria-label="Server" />
          </CInputGroup>
          <CInputGroup>
            <CInputGroupText>With textarea</CInputGroupText>
            <CFormControl component="textarea" aria-label="With textarea"></CFormControl>
          </CInputGroup>
        </CCardBody>
      </CCard>
    </CRow>
  )
}
export default CreateAccount
