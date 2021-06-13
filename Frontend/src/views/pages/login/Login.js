import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../../_actions'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const { username, password } = inputs
  const loggingIn = useSelector((state) => state.authentication.loggingIn)
  const dispatch = useDispatch()
  const location = useLocation()

  // reset login status
  // useEffect(() => {
  //   dispatch(userActions.logout()``)
  // }, [dispatch, submitted])

  function handleChange(e) {
    let value = e.target.value
    setInputs(Object.assign({}, inputs, { username: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    setSubmitted(true)
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: '/' } }
      dispatch(userActions.login(username, password, from))
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>
                    <CFormControl
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onInput={(e) => handleChange(e)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormControl
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onInput={(e) => handleChange(e)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">
                      <CButton color="primary" className="px-4">
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
