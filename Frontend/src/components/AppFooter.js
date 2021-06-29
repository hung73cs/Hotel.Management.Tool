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
    </CFooter>
  )
}

export default React.memo(AppFooter)
