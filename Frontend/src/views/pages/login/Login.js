import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../../_actions'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Message from 'src/components/Message'

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
  const [message, setMessage] = useState('')

  function handleChange(e, type) {
    let value = e.target.value
    setInputs(
      Object.assign({}, inputs, type === 'USERNAME' ? { username: value } : { password: value }),
    )
    console.log(inputs)
  }

  const error = useSelector((state) => state.alert)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('vdsd')
    setSubmitted(true)
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: '/' } }
      dispatch(userActions.login(username, password, from))
      setMessage(error.message)
      console.log('fsdf', message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>
                    <CFormControl
                      placeholder="Username"
                      autoComplete="username"
                      value={inputs.username}
                      onInput={(e) => handleChange(e, 'USERNAME')}
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
                      value={inputs.password}
                      onInput={(e) => handleChange(e, 'PASS')}
                    />
                  </CInputGroup>
                  {message && <Message variant="danger">{message}</Message>}
                  <CRow>
                    <CCol xs="6">
                      <CButton
                        {...loggingIn}
                        color="primary"
                        className="px-4"
                        onClick={(e) => handleSubmit(e)}
                      >
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
