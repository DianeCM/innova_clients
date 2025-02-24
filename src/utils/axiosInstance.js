import axios from 'axios'

const baseURL = 'https://pruebareactjs.test-class.com/Api/'

const axiosInstance = axios.create({baseURL: baseURL})

export default axiosInstance