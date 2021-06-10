import React from 'react'
import { CAlert } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const Message = ({ variant, children }) => {
  return <CAlert variant={variant}>{children}</CAlert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
