import React from "react";
import "./style.css";
import axios from 'axios'
import useAxios from './useAxios'
import useAuth from './useAuth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [login, logout, getToken] = useAuth()

  const [getFaktura, fakturaState] = useAxios()
  const [postData, postDataState] = useAxios()
  const isLoading = () => (postDataState.loading || postDataState.loading)
   
  const getFakturaliste = () => {
    getFaktura('get', "/api/sak/FakturalisteForSak?saksnr=1231234", {}, 'Fakuraliste')
  }

  const postFeilsendt = () => {
    postData('post', "/api/sak/SakErFeilsendt", {'SaksNr': 'S1234' }, 'Feilsendt faktura')
  }

  const postUtsettSak = () => {
    postData('post', "/api/sak/UtsettSak", {'SaksNr': 'S1234', 'Utsettelse': '30' }, 'Utsett sak')
  }

  const postAvdragsOrdning = () => {
    let avddata = {  
      saksnr: 'S20020',
      terminbelop: 100234.50,
      terminLengde: '1 MND', 
      skyldnerEpost: 'kåre@knall.no',
      skyldnerPnrOrgnr: '1231231233'
    }
   /*
    var formData = new FormData();  
    formData.append("saksnr", 'S20020')
    formData.append("terminbelop", 100234.50)
    formData.append("terminLengde", '1 MND') 
    formData.append("skyldnerEpost", 'kåre@knall.no')
    formData.append("skyldnerPnrOrgnr", '1231231233')*/

    postData('post', "/api/sak/OpprettAvdragsOrdning", avddata, 'Lag avrdagsordning')
  }

/*
  const login = () => {
    const options = {
      headers: { 'Content-Type': 'application/json' }
    };
    axios     
        .post('http://localhost:5000/api/ApiSecurity/auth', {
        "Username": "magnea@uc.no",
        "Password": "P@ssw0rd1!"
      }, options)
      .then(res => {
        //setBearerToken(res.data.token) 
        localStorage.setItem('kf.token', res.data.token)       
        console.log(`Token set: ${res.data.token}`)
        //onFileUpload("F00001", res.data.token)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const logout = () => {localStorage.setItem('kf.token', '')}
  */
  const lGetToken = () => {return localStorage.getItem('kf.token')}

  const faktLastet = () => {
    return (fakturaState && fakturaState.data && fakturaState.data.result)
  } 

  return (
    <div>

      <ToastContainer />

      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button><br/><br/>

      <button disabled={isLoading()} onClick={postFeilsendt}>Post feilsendt</button><br/>
      <button disabled={isLoading()} onClick={postUtsettSak}>Post utsett</button><br/>
      <button disabled={isLoading()} onClick={postAvdragsOrdning}>Post avdragsordning</button><br/><br/>
      
      <button disabled={isLoading()} onClick={getFakturaliste}>fakturaListe</button>
      <select>
        <option key='' value=''>Velg faktura</option>
        {faktLastet() &&  fakturaState.data.result.map((team, i) => 
        <option key={team.fakturaNr} value={team.fakturaNr}>{team.fakturaCaption}</option>
        )}
      </select>       

      <br/>
      Token: {localStorage.getItem('kf.token')}<br/>
      {JSON.stringify(fakturaState)}<br/>
      {JSON.stringify(postDataState)}<br/>
            

    </div>
  );
}
