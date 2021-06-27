export const bookingActions = {
  editBooking,
}

function editBooking(data) {
  return { type: 'EDIT_BOOKING', data: data }
}
