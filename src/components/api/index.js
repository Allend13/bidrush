import { API_ADRESS } from 'constants'
import axios from 'axios'


const api = axios.create({
  baseURL: API_ADRESS,
  headers: {},
})

export default api
