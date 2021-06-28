import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI

export const surchargeRateService = {
  calculate,
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
  const response = await fetch(`${apiUrl}/surcharge-rate/id/${id}`, requestOptions)
  return handleResponse(response)
}

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/surcharge-rate`, requestOptions).then(handleResponse)
}

async function create(data) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return await fetch(`${apiUrl}/surcharge-rate`, requestOptions).then(handleResponse)
}

async function edit(data) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }

  return await fetch(`${apiUrl}/surcharge-rate/id/${data.guestLevel}`, requestOptions).then(
    handleResponse,
  )
}

async function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/surcharge-rate/id/${id}`, requestOptions).then(handleResponse)
}

async function calculate(ob) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(ob),
  }
  console.log('ob', JSON.stringify(ob))
  return await fetch(`${apiUrl}/surcharge-rate/calculate`, requestOptions)
    .then((res) => res.json())
    .catch((er) => er)
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
