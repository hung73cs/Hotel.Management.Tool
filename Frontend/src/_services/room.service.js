import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const roomService = {
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
  const response = await fetch(`${apiUrl}/room/id/${id}`, requestOptions)
  return handleResponse(response)
}

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/room`, requestOptions).then(handleResponse)
}

async function create(room) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(room),
  }
  console.log('createRoom', JSON.stringify(room))
  return await fetch(`${apiUrl}/room`, requestOptions).then(handleResponse)
}

async function edit(room) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(room),
  }

  return await fetch(`${apiUrl}/room/id/${room.id}`, requestOptions).then(handleResponse)
}

async function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/room/id/${id}`, requestOptions).then(handleResponse)
}
async function handleResponse(response) {
  return await response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      return response.status
    }
    return data
  })
}
