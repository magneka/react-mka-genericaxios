import axios from 'axios'

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

  const getToken = () => {() => {return localStorage.getItem('kf.token')}}
  
  const logout = () => localStorage.setItem('kf.token', '')
 
  return [login, logout, getToken]
})

export default useAuth