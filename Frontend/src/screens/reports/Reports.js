/* eslint-disable prettier/prettier */
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
  //CModal,
  //CModalHeader,
 // CModalTitle,
 // CModalBody,
  CInputGroup,
 // CFormLabel,
  CFormControl,
 // CForm,
 // CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { reportService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
//import Message from 'src/components/Message'

const Reports = () => {
 // const [validated, setValidated] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [reportName, setReportName] = useState('')
  const [reportValue, setReportValue] = useState(0)
  const [reportId, setReportId] = useState('')
  const [reports, setReports] = useState('')

  useEffect(() => {
    reportService.getAll().then((x) => setReports(x))
  }, [])

  useEffect(() => {
    reportService.getAll().then((x) => setReports(x))
  }, [openModal])

  const createReportService = () => {
    var data = {
      name:reportName,
      value: Number(reportValue),
    }
    reportService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Tên quy định đã tồn tại')
          break
        case 500:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          handleCloseModal()
          setToastMessage('Tạo quy định thành công')
      }
    })
  }

  const handleOpenModalToCreate = () => {
    setOpenModal(true)
  }


  const handleCloseModal = () => {
    setOpenModal(false)
    handleReset()
  }

  const handleReset = () => {
    setMessage('')
    setToastMessage('')
   //setEditForm(false)
    setReportId('')
    setReportName('')
    setReportValue('')
  }

  const [searchInput, setSearchInput] = useState('')

  const handleChangeSearchInput = (e) => {
    const { name, value } = e.target
    setSearchInput({ ...searchInput, [name]: value })
  }
  const handleClickDelete = (id) => {
    reportService._delete(id)
    let reportCopy = reports.filter((item) => item.id !== id)
    setReports(reportCopy)
    setToastMessage('Xoá quy định thành công')
  }

  return (
    <CRow>
      {toastMessage && <ToastNotification message={toastMessage} />}
      {/* {modalCreateEdit()} */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Báo cáo doanh thu của khách sạn:</strong>
          </CCardHeader>
          <CCardBody style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="text-medium-emphasis small" style={{ width: '70%' }}>
                Đây là danh sách các báo cáo của khách sạn
              </p>
              <CInputGroup style={{ width: '20%', marginRight: 20 }}>
                <CCol>
                  <CFormControl
                    type="text"
                    name="searchInput"
                    onInput={handleChangeSearchInput}
                    value={searchInput || ''}
                  />
                </CCol>
              </CInputGroup>
              <CButton
                onClick={() => handleOpenModalToCreate()}
                style={{ width: '10%', fontSize: '0.8rem' }}
              >
                {/* <CIcon style={{ margin: '0px 5px' }} size={'lg'} name="cil-plus"></CIcon> */}
                <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>+</span>
                Thêm
              </CButton>
            </div>
            <CTable striped>
              <CTableHead>
                <CTableRow color="primary">
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TÊN BÁO CÁO</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TỔNG DOANH THU</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Tuỳ chỉnh</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {reports.length > 0 ? (
                  reports.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.name}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong> {item.value} </strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon
                          style={{ margin: '0px 5px', cursor: 'pointer' }}
                          size={'lg'}
                          name="cil-pencil"
                        //   onClick={() => handleOpenModalToUpdate(item)}
                        ></CIcon>
                        <CIcon
                          style={{ margin: '0px 5px', cursor: 'pointer' }}
                          size={'lg'}
                          name="cil-trash"
                          onClick={() => (item.id = handleClickDelete(item.id))}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableDataCell>Trống</CTableDataCell>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Reports
