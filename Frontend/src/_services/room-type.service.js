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
  return await fetch(`${apiUrl}/room-type`, requestOptions).then(handleResponse)
}

async function create(roomType) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(roomType),
  }
  console.log('roomType', typeof roomType.cost)
  return await fetch(`${apiUrl}/room-type`, requestOptions).then(handleResponse)
}

async function edit(roomType) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(roomType),
  }

  return await fetch(`${apiUrl}/room-type/${roomType.id}`, requestOptions).then(handleResponse)
}

async function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/room-type/id/${id}`, requestOptions).then(handleResponse)
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
