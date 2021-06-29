/* eslint-disable prettier/prettier */
import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const reportService = {
  getById,
  getAll,
  create,
  edit,
  _delete,
}
async function getById(id) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    }
    const response = await fetch(`${apiUrl}/report/id/${id}`, requestOptions)
    return handleResponse(response)
  }
  
  async function getAll() {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    }
    return await fetch(`${apiUrl}/report`, requestOptions).then(handleResponse)
  }
  
  async function create(report) {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    }
    //console.log('report', typeof report.cost)
    return await fetch(`${apiUrl}/report`, requestOptions).then(handleResponse)
  }
  
  async function edit(report) {
    const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    }
  
    return await fetch(`${apiUrl}/report/id/${report.id}`, requestOptions).then(handleResponse)
  }
  
  async function _delete(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader(),
    }
    return await fetch(`${apiUrl}/report/id/${id}`, requestOptions).then(handleResponse)
  }
  async function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text)
      if (!response.ok) {
        return response.status
      }
      return data
    })
  }
  