import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const roomTypeService = {
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
  const response = await fetch(`${apiUrl}/room-type/id/${id}`, requestOptions)
  return handleResponse(response)
}

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return fetch(`${apiUrl}/room-type`, requestOptions).then(handleResponse)
}

async function create(roomType) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(roomType),
  }

  return fetch(`${apiUrl}/room-type`, requestOptions).then(handleResponse)
}

async function edit(roomType) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(roomType),
  }

  return fetch(`${apiUrl}/room-type/${roomType.id}`, requestOptions).then(handleResponse)
}

async function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }
  return fetch(`${apiUrl}/room-type/id/${id}`, requestOptions).then(handleResponse)
}
async function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 409) {
        // auto logout if 401 response returned from api
        console.log('Khong the get all roomtype')
        return response.status
        // eslint-disable-next-line no-restricted-globals
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
