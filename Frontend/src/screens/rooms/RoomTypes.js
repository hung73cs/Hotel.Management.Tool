import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { roomTypeService } from 'src/_services'

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([
    {
      name: '',
      cost: 0,
    },
  ])
  const handleClickDelete = (data) => {
    roomTypeService._delete(data)
  }
  useEffect(() => {
    roomTypeService.getAll().then((x) => setRoomTypes(x))
  }, [roomTypes])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách loại phòng:</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Đây là danh sách các loại phòng của khách sạn
            </p>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên loại phòng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Đơn giá</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {roomTypes.map((roomType, index) => (
                  <CTableRow key={roomType.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{roomType.name}</CTableDataCell>
                    <CTableDataCell>{roomType.cost}</CTableDataCell>
                    <CTableDataCell>
                      {/* <CIcon size={'xl'} name="cil-eco" /> */}
                      <CIcon
                        size={'xl'}
                        name="cil-trash"
                        onClick={() => (roomType.id = handleClickDelete(roomType.id))}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RoomTypes
