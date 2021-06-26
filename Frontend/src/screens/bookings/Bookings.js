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
  CButton,
} from '@coreui/react'
import { roomService, bookingService, userService } from 'src/_services'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [rooms, setRooms] = useState([])
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    roomService.getAll().then((x) => setRooms(x))
  }, [])

  useEffect(() => {
    userService.getAll().then((x) => setAccounts(x))
  }, [])

  useEffect(() => {
    bookingService.getAll().then((x) => setBookings(x))
  }, [])

  const findNameRoom = (id) => {
    return rooms.find((x) => x.id === id)?.name
  }
  const findAccount = (id) => {
    console.log('id', id)
    return accounts.find((x) => x.id === id)?.username
  }
  console.log('room', rooms)
  console.log('accounts', accounts)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách phiếu thuê phòng:</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Đây là danh sách các phiếu thuê phòng</p>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÊN PHÒNG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">SỐ KHÁCH</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NGÀY BẮT ĐẦU</CTableHeaderCell>
                  <CTableHeaderCell scope="col">GIÁ TẠM TÍNH</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TUỲ CHỈNH</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rooms.length > 0 &&
                  accounts.length > 0 &&
                  bookings.map((item, index) => (
                    <CTableRow key={item.accountId}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{findNameRoom(item.roomId)}</CTableDataCell>
                      <CTableDataCell>{item.numberOfGuest}</CTableDataCell>
                      <CTableDataCell>{item.startedDate}</CTableDataCell>
                      <CTableDataCell>{item.unitStandardPrice}</CTableDataCell>
                      <CTableDataCell>
                        <CButton onClick={() => findNameRoom(item.roomId)}></CButton>
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
export default Bookings
