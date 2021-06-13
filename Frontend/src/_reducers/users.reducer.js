import { userConstants } from '../_constants'

var defaultUser = {
  loading: true,
  token: '',
}

export function users(state = defaultUser, action) {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return Object.assign({}, state, {
        token: action.token,
      })
    case userConstants.LOGOUT:
      return Object.assign({}, state, {
        token: '',
      })
    default:
      return state
  }
}
