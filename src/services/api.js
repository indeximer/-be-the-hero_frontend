import axios from 'axios'

const api = axios.create({
    baseURL: 'https://be-the-hero-backend-df.herokuapp.com'
})

export default api