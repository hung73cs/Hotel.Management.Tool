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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { userService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'
const GetAccounts = () => {
  const [accounts, setAccounts] = useState([
    {
      username: '',
      role: '',
      userInfoModel: '',
    },
  ])
  const [accountShow, setAccountShow] = useState({
    username: '',
    role: '',
    userInfoModel: '',
  })
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const formatBirthday = (birthday) => {
    return String(birthday).substring(0, 10)
  }
  const handleOpenModal = (data) => {
    setAccountShow(data)
    setVisible(true)
  }

  const handleDelete = (id) => {
    userService.delete(id)
    let copy = accounts.filter((item) => item.accountId !== id)
    setAccounts(copy)
    setToastMessage('Xoá tài khoản thành công')
  }
  useEffect(() => {
    userService
      .getAll()
      .then((x) =>
        setAccounts(
          x.filter((x) => x.accountId !== JSON.parse(localStorage.getItem('user'))?.accountId),
        ),
      )
  }, [])
  console.log(accounts)

  const openModel = () => {
    return (
      <CModal visible={visible}>
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
                    <strong>{accountShow.username}</strong>
                  </mark>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Loại tài khoản</CTableHeaderCell>
                <CTableDataCell scope="col">
                  <strong>{accountShow.role}</strong>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
                <CTableDataCell scope="col">
                  <mark>
                    <strong>{accountShow.userInfoModel.name}</strong>
                  </mark>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">CMND/CCCD</CTableHeaderCell>
                <CTableDataCell scope="col">{accountShow.userInfoModel.idCard}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Giới tính</CTableHeaderCell>
                <CTableDataCell scope="col">{accountShow.userInfoModel.gender}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Ngày sinh</CTableHeaderCell>
                <CTableDataCell scope="col">
                  {formatBirthday(accountShow.userInfoModel.birthday)}
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">SDT</CTableHeaderCell>
                <CTableDataCell scope="col">{accountShow.userInfoModel.phoneNumber}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                <CTableDataCell scope="col">{accountShow.userInfoModel.address}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CModalBody>
      </CModal>
    )
  }
  return (
    <CRow>
      {openModel()}
      {toastMessage && <ToastNotification message={toastMessage} />}

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
                {accounts.length > 0 &&
                  accounts.map((account, index) => (
                    <CTableRow key={account.accountId}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{account.username}</CTableDataCell>
                      <CTableDataCell>{account.role}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="link" onClick={() => handleOpenModal(account)}>
                          Chi tiết
                        </CButton>
                        <CIcon
                          style={{ margin: '0px 5px', cursor: 'pointer' }}
                          size={'lg'}
                          name="cil-trash"
                          onClick={() => handleDelete(account.accountId)}
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

export default GetAccounts
