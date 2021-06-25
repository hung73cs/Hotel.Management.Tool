/* eslint-disable prettier/prettier */
import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
//import { func } from 'prop-types'
const apiUrl=commonConstants.BACKENDURI
export const parameterService={
    getById,
    getAll,
    create,
    edit,
    _delete
}
 async function getById(id){
     const requestOptions={
         method: 'GET',
         headers: authHeader(),
     }
     const response=await fetch(`${apiUrl}/parameter/id/${id}`, requestOptions)
     return handleResponse(response)
 }

 async function getAll(){
    const requestOptions={
        method: 'GET',
        headers: authHeader(),
    }
    return await fetch(`${apiUrl}/parameter`,requestOptions).then(handleResponse)
 }

 async function create(parameter){
    const requestOptions={
        method:'POST',
        headers: {...authHeader(),'Content-Type':'application/json'},
        body: JSON.stringify(parameter),
    }
    //console.log('parameter',typeof parameter.value)
    return await fetch(`${apiUrl}/parameter`,requestOptions).then(handleResponse)
 }

 async function edit(parameter){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(parameter),
      }
    
      return await fetch(`${apiUrl}/parameter/id/${parameter.id}`, requestOptions).then(handleResponse)
    
 }

 async function _delete(id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
      }
    return await fetch(`${apiUrl}/paramter/id/${id}`, requestOptions).then(handleResponse)
    
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