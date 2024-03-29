import { userConstants } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './'
import { history } from '../_helpers'

export const userActions = {
  login,
  logout,
  getAll,
  delete: _delete,
  UpdateToken,
}

function login(username, password, from) {
  return (dispatch) => {
    dispatch(request({ username }))

    userService.login(username, password).then(
      (user) => {
        dispatch(UpdateToken(user.token))
        history.push(from)
        console.log('user')
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
        console.log('alert', alertActions.error(error.toString()))
      },
    )
  }

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user }
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error }
  }
}

function UpdateToken(token) {
  return { type: 'UPDATE_TOKEN', token: token }
}
function logout() {
  userService.logout()
  return (dispatch) => {
    dispatch(RemoveToken())
  }
}

function RemoveToken() {
  return { type: userConstants.LOGOUT }
}

function getAll() {
  return (dispatch) => {
    dispatch(request())

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString())),
    )
  }

  function request() {
    return { type: userConstants.GETALL_REQUEST }
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users }
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error }
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id))

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString())),
    )
  }

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id }
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id }
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error }
  }
}
