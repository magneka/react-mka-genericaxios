import axios from 'axios'

const axiosTokenInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000
})

axiosTokenInstance.interceptors.request.use(
    config => {
        const token = "localStorage.getItem('kf.token')"

        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export default axiosTokenInstance