/* eslint-disable prettier/prettier */
import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI
export const bookingService={
    getById,
    getAll,
    create,
    edit,
    _delete,
}

async function getById(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
      }
      const response = await fetch(`${apiUrl}/booking/id/${id}`, requestOptions)
      return handleResponse(response)
}

async function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
      }
      return await fetch(`${apiUrl}/booking`, requestOptions).then(handleResponse)
}

async function create(booking){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      }
      //console.log('booking', typeof booking.unitPrice)
      return await fetch(`${apiUrl}/booking`, requestOptions).then(handleResponse)
}

async function edit(booking){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      }
    
      return await fetch(`${apiUrl}/booking/id/${booking.id}`, requestOptions).then(handleResponse)
    
}

async function _delete(id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
      }
      return await fetch(`${apiUrl}/booking/id/${id}`, requestOptions).then(handleResponse)
    
}
async function handleResponse(response){
    return response.text().then((text) => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
          return response.status
        }
        return data
      })   
}