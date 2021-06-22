import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <strong target="_blank" rel="noopener noreferrer">
          Phần mềm Quản lý khách sạn
        </strong>
        <span className="ms-1"> &copy;2021</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Xây dựng bởi</span>
        <strong target="_blank" rel="noopener noreferrer">
          Phi Hùng & Team
        </strong>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
