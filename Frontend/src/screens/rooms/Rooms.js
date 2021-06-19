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
import { roomService, roomTypeService } from 'src/_services'

const Rooms = () => {
  const [rooms, setRooms] = useState([
    {
      name: '',
      cost: 0,
    },
  ])
  const handleClickDelete = (data) => {
    roomService._delete(data)
  }

  const loadNameRoomType = (id) => {
    // return roomTypeService.getById(id)
    console.log(roomTypeService.getById(id).then((x) => x.name))
    return 'fs'
  }
  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [rooms])
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
                  <CTableHeaderCell scope="col">Tên phòng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Loại phòng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tình trạng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ghi chú</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rooms.map((room, index) => (
                  <CTableRow key={room.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{room.name}</CTableDataCell>
                    <CTableDataCell>{loadNameRoomType(room.roomTypeId)}</CTableDataCell>
                    <CTableDataCell>{room.roomStatus}</CTableDataCell>
                    <CTableDataCell>{room.note}</CTableDataCell>

                    <CTableDataCell>
                      {/* <CIcon size={'xl'} name="cil-eco" /> */}
                      <CIcon
                        size={'xl'}
                        name="cil-trash"
                        onClick={() => (room.id = handleClickDelete(room.id))}
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

export default Rooms
