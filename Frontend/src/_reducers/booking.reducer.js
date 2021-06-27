var defaultBooking = {
  data: {
    id: '',
    roomId: '',
    accountId: '',
    numberOfGuest: 0,
    startedDate: '',
    unitPrice: 0,
    unitStandardPrice: 0,
    bookingDetailModels: [],
  },
}

export function booking(state = defaultBooking, action) {
  switch (action.type) {
    case 'EDIT_BOOKING':
      return Object.assign({}, state, {
        data: action.data,
      })
    default:
      return state
  }
}
