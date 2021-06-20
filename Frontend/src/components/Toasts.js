import React, { useRef, useState } from 'react'
import { CToaster, CToast, CToastBody, CToastClose } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ToastNotification = ({ message }) => {
  const toaster = useRef()
  console.log('Day la toast')
  return (
    <>
      <CToaster ref={toaster} placement="top-end">
        <CToast color="info" className="text-white align-items-center">
          <div className="d-flex">
            <CToastBody>{message}</CToastBody>
            <CToastClose className="me-2 m-auto" white />
          </div>
        </CToast>
      </CToaster>
    </>
  )
}
export default ToastNotification
