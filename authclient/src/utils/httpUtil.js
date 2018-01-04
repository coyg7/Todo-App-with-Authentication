import axios from 'axios';


const API_BASE_URL = 'http://localhost:8848';

export function get(resourceName) {
    return axios({
        method: 'get',
        url: `${API_BASE_URL}/${resourceName}`
    });
}


export function post(resourceName, data) {
    return axios({
      method: 'post',
      url: `${API_BASE_URL}/${resourceName}`,
      data: data
    });
  }
  
  export function put(resourceName, id, data) {
    return axios({
      method: 'put',
      url: `${API_BASE_URL}/${resourceName}/${id}`,
      data: data
    })
  }
  
  export function destroy(resourceName, id) {
    return axios({
      method: 'delete',
      url: `${API_BASE_URL}/${resourceName}/${id}`
    })
  }
  