import axios from 'axios'
import jwt_decode from 'jwt-decode'

const useAuth = (() => {

  const login = (user, password) => {
    
    const options = {
      headers: { 'Content-Type': 'application/json' }
    }
    
    axios     
        .post('http://localhost:5000/api/ApiSecurity/auth', {
        "Username": "magnea@uc.no",
        "Password": "P@ssw0rd1!"
      }, options)
      .then(res => {     
        localStorage.setItem('kf.token', res.data.token)       
        console.log(`Token set: ${res.data.token}`)        
      })
      .catch(error => {
        console.error(error)
      })
  }

  const getToken = () => localStorage.getItem('kf.token')
  
  const logout = () => localStorage.setItem('kf.token', '')

  const getDecodedToken = () => {
     //let res = jwt_decode(localStorage.getItem('kf.token'))
     let res = jwt_decode(getToken())
     console.log(res)
     return(res)
  }

 
  return [login, logout, getToken, getDecodedToken]
})

export default useAuth