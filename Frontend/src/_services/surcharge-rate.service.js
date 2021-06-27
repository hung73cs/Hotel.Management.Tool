import { authHeader } from '../_helpers'
import { commonConstants } from '../_constants/common.constants'
const apiUrl = commonConstants.BACKENDURI

export const surchargeRateService = {
  calculate,
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
