import axios from 'axios';

let badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoieXVzaGdoaW1pcmVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJheXVzaCIsImlkIjoxLCJsYXN0TmFtZSI6ImdoaW1pcmUiLCJmaXJzdE5hbWUiOiJheXVzaCJ9LCJpYXQiOjE1MTM2NjU4MjEsImV4cCI6MTUxMzY2NTgzMX0.BNFhqj5biKL-22M9rKy8qlq9P6v8hxnJfF6Fe1Izewk';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoieXVzaGdoaW1pcmVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJheXVzaCIsImlkIjoxLCJsYXN0TmFtZSI6ImdoaW1pcmUiLCJmaXJzdE5hbWUiOiJheXVzaCJ9LCJpYXQiOjE1MTQ5NzU3MzgsImV4cCI6MTUxNTc3NTczOH0.UD0OuxNi2DoU9JgbzOAguYyWLU59D6a_FCYGBgufp5U';

let axiosService = axios.create({
    baseURL: 'http://localhost:8848/api/',
    timeout: 3000,
    headers: {'Authorization': badToken }
});

function getRefreshToken() {
    return axiosService({
        url: 'refresh',
        method: 'get',
        headers: {'Authorization': refreshToken}
    });
}

axiosService.interceptors.response.use(undefined, err => {
    let res = err.response;
    console.log(res.status);

    if (res.status === 401) {
      let tempConfig = res.config;
      
       return getRefreshToken()
        .then(data => {   
            console.log('data', data);
          axiosService.defaults.headers['Authorization'] = data.data.accessToken;
          tempConfig.headers['Authorization'] = data.data.accessToken;
  
          return axiosService.request(tempConfig)
            .then(response => response)
            .catch(err => err);
          });
    }

    return Promise.reject(err);
});

export default axiosService;
