import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const roomService = {
  getAll,
  create,
  edit,
  _delete,
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return fetch(`${apiUrl}/room`, requestOptions).then(handleResponse)
}

function create(room) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(room),
  }

  return fetch(`${apiUrl}/room`, requestOptions).then(handleResponse)
}

function edit(room) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(room),
  }

  return fetch(`${apiUrl}/room/id/${room.id}`, requestOptions).then(handleResponse)
}

function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }
  return fetch(`${apiUrl}/room/id/${id}`, requestOptions).then(handleResponse)
}
function handleResponse(response) {
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
