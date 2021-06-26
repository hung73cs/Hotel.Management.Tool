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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { userService } from 'src/_services'
const GetAccounts = () => {
  const [accounts, setAccounts] = useState([
    {
      username: '',
      role: '',
      userInfoModel: '',
    },
  ])
  const [visible, setVisible] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const formatBirthday = (birthday) => {
    return String(birthday).substring(0, 10)
  }
  const handleClick = (data) => {
    setVisible(!visible)
    setUserInfo(data)
  }
  useEffect(() => {
    userService.getAll().then((x) => setAccounts(x))
  }, [])
  console.log(accounts)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách tài khoản người dùng:</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Đây là danh sách các tài khoản</p>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÀI KHOẢN</CTableHeaderCell>
                  <CTableHeaderCell scope="col">LOẠI TÀI KHOẢN</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CHI TIẾT</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {accounts.map((account, index) => (
                  <CTableRow key={account.accountId}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{account.username}</CTableDataCell>
                    <CTableDataCell>{account.role}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="link" onClick={() => handleClick(account.userInfoModel)}>
                        Chi tiết
                      </CButton>
                      <CModal alignment="center" visible={visible}>
                        <CModalHeader onDismiss={() => setVisible(false)}>
                          <CModalTitle>THÔNG TIN CHI TIẾT</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <CTable>
                            <CTableBody>
                              <CTableRow>
                                <CTableHeaderCell scope="col">Tên tài khoản</CTableHeaderCell>
                                <CTableDataCell scope="col">
                                  <mark>
                                    <strong>{account.username}</strong>
                                  </mark>
                                </CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell scope="col">Loại tài khoản</CTableHeaderCell>
                                <CTableDataCell scope="col">
                                  <strong>{account.role}</strong>
                                </CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
                                <CTableDataCell scope="col">
                                  <mark>
                                    <strong>{userInfo.name}</strong>
                                  </mark>
                                </CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell scope="col">CMND/CCCD</CTableHeaderCell>
                                <CTableDataCell scope="col">{userInfo.idCard}</CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell scope="col">Giới tính</CTableHeaderCell>
                                <CTableDataCell scope="col">{userInfo.gender}</CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell scope="col">Ngày sinh</CTableHeaderCell>
                                <CTableDataCell scope="col">
                                  {formatBirthday(userInfo.birthday)}
                                </CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell scope="col">SDT</CTableHeaderCell>
                                <CTableDataCell scope="col">{userInfo.phoneNumber}</CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                                <CTableDataCell scope="col">{userInfo.address}</CTableDataCell>
                              </CTableRow>
                            </CTableBody>
                          </CTable>
                        </CModalBody>
                        <CModalFooter>
                          <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                          </CButton>
                        </CModalFooter>
                      </CModal>
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

export default GetAccounts
