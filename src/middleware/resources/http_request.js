import axios from 'axios'

class HttpRequest {
  constructor() {
    // this.axios = axios
    this.axiosInstance = axios.create({
      baseURL: 'https://api.jsonbin.io',
      timeout: 120000,
    })

    this.axiosInstance.interceptors.request.use(
      function (config) {
        // eslint-disable-next-line dot-notation
        config.headers.common['secret-key'] = '$2b$10$0ve8/zpqfEF0X1kZ0TdfW.ehq645eiEhc.OykoUZABVEdE8D3bpr2'
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.axiosInstance.interceptors.response.use(
      function (response) {
        // Do something with response data
        return response
      },
      function (error) {
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }

  setHeader(header) {
    this.axiosInstance.defaults.headers.common[header.key] = header.value
    this.axiosInstance.defaults.headers.common = header
  }

  get(methodName, data) {
    return this.axiosInstance.get(methodName, {
      params: data,
    })
  }

  create(methodName, data) {
    return this.axiosInstance.post(methodName, data)
  }

  update(methodName, data) {
    return this.axiosInstance.patch(methodName, data)
  }

  delete(methodName, param, data) {
    return this.axiosInstance.delete(methodName, {
      params: param,
      data,
    })
  }

  request(type, url, data) {
    let promise = null
    switch (type) {
      case 'GET':
        promise = axios.get(url, { params: data })
        break
      case 'POST':
        promise = axios.post(url, data)
        break
      case 'PATCH':
        promise = axios.patch(url, data)
        break
      case 'DELETE':
        promise = axios.delete(url, data)
        break
      default:
        promise = axios.get(url, { params: data })
        break
    }
    return promise
  }
}

export default HttpRequest
