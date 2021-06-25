import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const surchargeRateService = {
  getAll,
  create,
  edit,
  _delete,
}

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/surcharge-rate`, requestOptions).then(handleResponse)
}

async function create(surchargeRate) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(surchargeRate),
  }
  return await fetch(`${apiUrl}/surcharge-rate`, requestOptions).then(handleResponse)
}

async function edit(surchargeRate) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(surchargeRate),
  }

  return await fetch(`${apiUrl}/surcharge-rate/id/${surchargeRate.id}`, requestOptions).then(handleResponse)
}

async function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/surcharge-rate/id/${id}`, requestOptions).then(handleResponse)
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
