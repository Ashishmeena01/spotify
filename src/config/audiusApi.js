import axios from 'axios'

const audiusApi = axios.create({
  baseURL: 'https://api.audius.co/v1',
  headers: {
    Accept: 'application/json',
  },
})

export default audiusApi
