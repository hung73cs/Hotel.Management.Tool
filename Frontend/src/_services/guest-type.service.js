/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const guestTypeService = {
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
  const response = await fetch(`${apiUrl}/guest-type/id/${id}`, requestOptions)
  return handleResponse(response)
}

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/guest-type`, requestOptions).then(handleResponse)
}

async function create(guestType) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(guestType),
  }
  //console.log('guestType', typeof guestType.SurchargeRate)
  return await fetch(`${apiUrl}/guest-type`, requestOptions).then(handleResponse)
}

async function edit(id, guestType) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(guestType),
  }
  console.log('guestTypeeditid', id)
  console.log('guestTypeedit', guestType)
  return await fetch(`${apiUrl}/guest-type/id/${id}`, requestOptions).then(handleResponse)
}

async function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/guest-type/id/${id}`, requestOptions).then(handleResponse)
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
