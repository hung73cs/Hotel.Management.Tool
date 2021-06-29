import React from 'react'

import { CCard, CCardBody, CCol, CRow, CCarousel, CCarouselItem } from '@coreui/react'

const Dashboard = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CCarousel controls>
              <CCarouselItem>
                <img className="d-block w-100" src="imageHotel/1.jpg" />
              </CCarouselItem>
              <CCarouselItem>
                <img className="d-block w-100" src="imageHotel/2.jpg" />
              </CCarouselItem>
              <CCarouselItem>
                <img className="d-block w-100" src="imageHotel/3.jpg" />
              </CCarouselItem>
            </CCarousel>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
