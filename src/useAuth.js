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
  
  const logout = () => localStorage.removeItem('kf.token', '')

  const getDecodedToken = () => {
     //let res = jwt_decode(localStorage.getItem('kf.token'))
     let token = getToken()
     let res = ''
     if (token) {
      let res = jwt_decode(getToken())
      console.log(res)
     }
     return(res)     
  }

  const expirationDate = () => {    
    let date = new Date(getDecodedToken() * 1000)
    return date
  }
  
  const roles = () => getDecodedToken()["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

 
  return {login, logout, getToken, getDecodedToken, expirationDate, roles}
})

export default useAuth