import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { booking } from './booking.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  booking,
})

export default rootReducer
