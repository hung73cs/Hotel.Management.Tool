/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const customerTypeService = {
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
    const response = await fetch(`${apiUrl}/customer-type/id/${id}`, requestOptions)
    return handleResponse(response)
  }
  
  async function getAll() {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    }
    return await fetch(`${apiUrl}/customer-type`, requestOptions).then(handleResponse)
  }
  
  async function create(customerType) {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(customerType),
    }
    //console.log('customerType', typeof customerType.SurchargeRate)
    return await fetch(`${apiUrl}/customer-type`, requestOptions).then(handleResponse)
  }
  
  async function edit(customerType) {
    const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(customerType),
    }
  
    return await fetch(`${apiUrl}/customer-type/id/${customerType.id}`, requestOptions).then(handleResponse)
  }
  
  async function _delete(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader(),
    }
    return await fetch(`${apiUrl}/customer-type/id/${id}`, requestOptions).then(handleResponse)
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
  