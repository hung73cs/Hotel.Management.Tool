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
  CInputGroup,
  CFormLabel,
  CFormControl,
  CForm,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { parameterService } from 'src/_services'
import ToastNotification from 'src/components/Toasts'
import Message from 'src/components/Message'

const Parameters = () => {
  const [validated, setValidated] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [editForm, setEditForm] = useState(false)
  const [parameterName, setParameterName] = useState('')
  const [parameterValue, setParameterValue] = useState(0)
  const [parameterId, setParameterId] = useState('')
  const [parameters, setParameters] = useState('')

  useEffect(() => {
    parameterService.getAll().then((x) => setParameters(x))
  }, [])

  useEffect(() => {
    parameterService.getAll().then((x) => setParameters(x))
  }, [openModal])

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      return
    }
    if (!editForm) {
      event.preventDefault()
      createParameterService()
      handleReset()
    } else {
      event.preventDefault()
      editParameterService()
      handleReset()
    }
  }

  const createParameterService = () => {
    var data = {
      name: parameterName,
      value: Number(parameterValue),
    }
    parameterService.create(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi tạo, vui lòng điền đầy đủ thông tin')
          break
        case 409:
          setMessage('Tên quy định đã tồn tại')
          break
        case 403:
          setMessage('Không có quyền')
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

  const editParameterService = () => {
    var data = {
      id: parameterId,
      name: parameterName,
      value: Number(parameterValue),
    }
    parameterService.edit(data).then((res) => {
      switch (res) {
        case 400:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        case 404:
          setMessage('Quy định cần sửa không tồn tại')
          break
        case 403:
          setMessage('Không có quyền')
          break
        case 409:
          setMessage('Tên quy định bị trùng với các quy định khác')
          break
        case 500:
          setMessage('Có lỗi khi sửa, vui lòng điền đầy đủ thông tin')
          break
        default:
          setMessage('')
          handleCloseModal()
          setToastMessage('Sửa quy định thành công')
      }
    })
  }

  const handleOpenModalToCreate = () => {
    setOpenModal(true)
  }
  const handleOpenModalToUpdate = (data) => {
    setParameterId(data.id)
    setParameterName(data.name)
    setParameterValue(data.value)
    setEditForm(true)
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    handleReset()
  }

  const handleReset = () => {
    setMessage('')
    setToastMessage('')
    setEditForm(false)
    setParameterId('')
    setParameterName('')
    setParameterValue('')
  }

  const [searchInput, setSearchInput] = useState('')

  const handleChangeSearchInput = (e) => {
    const { name, value } = e.target
    setSearchInput({ ...searchInput, [name]: value })
    //searchRoom()
  }

  const handleClickDelete = (id) => {
    parameterService._delete(id)
    let parameterCopy = parameters.filter((item) => item.id !== id)
    setParameters(parameterCopy)
    setToastMessage('Xoá quy định thành công')
  }

  const modalCreateEdit = () => {
    return (
      <CModal visible={openModal}>
        <CModalHeader onDismiss={() => handleCloseModal()}>
          {editForm ? (
            <CModalTitle>Thông tin quy định muốn sửa</CModalTitle>
          ) : (
            <CModalTitle>Thông tin quy định muốn thêm</CModalTitle>
          )}
        </CModalHeader>
        {message && <Message variant="danger">{message}</Message>}
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Tên: </CFormLabel>
              </CCol>
              <CCol>
                <CFormControl
                  name="name"
                  type="text"
                  id="name"
                  value={parameterName}
                  onInput={(e) => setParameterName(e.target.value)}
                />
                <CFormFeedback invalid>Bắt buộc</CFormFeedback>
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>Giá trị: </CFormLabel>
              </CCol>
              <CCol>
                <CFormControl
                  type="text"
                  id="value"
                  name="value"
                  onInput={(e) => setParameterValue(e.target.value)}
                  value={parameterValue}
                />
              </CCol>
            </CInputGroup>
            <span>
              <CButton color="secondary" type="submit">
                Lưu
              </CButton>
              <CButton color="secondary" onClick={() => handleCloseModal()}>
                Đóng
              </CButton>
            </span>
          </CForm>
        </CModalBody>
      </CModal>
    )
  }

  return (
    <CRow>
      {toastMessage && <ToastNotification message={toastMessage} />}
      {modalCreateEdit()}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách quy định chung của khách sạn:</strong>
          </CCardHeader>
          <CCardBody style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="text-medium-emphasis small" style={{ width: '70%' }}>
                Đây là danh sách các quy định chung của khách sạn
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
                  <CTableHeaderCell scope="col">TÊN QUY ĐỊNH</CTableHeaderCell>
                  <CTableHeaderCell scope="col">GIÁ TRỊ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tuỳ chỉnh</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {parameters.length > 0 ? (
                  parameters.map((item, index) => (
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
                          onClick={() => handleOpenModalToUpdate(item)}
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

export default Parameters
