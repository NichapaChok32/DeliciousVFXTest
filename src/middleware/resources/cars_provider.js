import HttpRequest from './http_request'

class CarsProvider extends HttpRequest {
  async getLists() {
    const { data } = await this.get('/b/5f33f98ddddf413f95c2b306')
    return data
  }
}

export default CarsProvider
