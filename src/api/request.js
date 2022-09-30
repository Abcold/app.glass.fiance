import axios from 'axios'

const request = axios.create({
  baseURL: './',
  responseType:'json',
  timeout: 30000
})
request.interceptors.response.use(
  response => {
    return response.data
  }, err => {
    // if (err.response) {
    //
    // }
    return err
  })
export {
  request
}
