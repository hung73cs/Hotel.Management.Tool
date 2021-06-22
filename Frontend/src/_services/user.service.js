import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
}

async function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }
  return await fetch(`${apiUrl}/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      return user
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return await fetch(`${apiUrl}/account`, requestOptions).then(handleResponse)
}

async function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return await fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse)
}

async function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }
  console.log('register', user)
  return await fetch(`${apiUrl}/account`, requestOptions).then(handleResponse)
}

async function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return await fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return await fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse)
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
