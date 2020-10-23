import React from "react";
import "./style.css";
import useAxiosGet from './useAxiosGet'
import useAxiosPost from './useAxiosPost'

export default function App() {

  const [getFakt, faktState] = useAxiosGet()
  const [postFakt, postfaktState] = useAxiosPost()


  
  const getFakturaliste = () => {
    getFakt("/api/sak/FakturalisteForSak?saksnr=1231234")
  }

  const postFeilsendt = () => {
    postFakt("/api/sak/SakErFeilsendt", {'SaksNr': 'S1234' })
  }

  const postUtsettSak = () => {
    postFakt("/api/sak/UtsettSak", {'SaksNr': 'S1234' })
  }

   const postAvdragsOrdning = () => {
     let avddata = {  
        saksnr: 'S20020',
        terminbelop: 100234.50,
        terminLengde: '1 MND', 
        skyldnerEpost: 'kåre@knall.no',
        skyldnerPnrOrgnr: '1231231233'
     }

     var formData = new FormData();  
     formData.append("saksnr", 'S20020')
     formData.append("terminbelop", 100234.50)
     formData.append("terminLengde", '1 MND') 
     formData.append("skyldnerEpost", 'kåre@knall.no')
     formData.append("skyldnerPnrOrgnr", '1231231233')

     postFakt("/api/sak/OpprettAvdragsOrdning", avddata)
  }


 /*
 {"loading":false,"data":{"result":[{"fakturaNr":"F000012","fakturaCaption":"Faktura 012"},{"fakturaNr":"F000013","fakturaCaption":"Faktura 013"},{"fakturaNr":"F000014","fakturaCaption":"Faktura 014"},{"fakturaNr":"F000015","fakturaCaption":"Faktura 015"}]}}

      <select>
        {state.data.result.map((team, i) => <option key={team.fakturaNr} value={team.fakturaNr}>{team.fakturaCaption}</option>)}
      </select>
  */

  const faktLastet = () => {
    return (faktState && faktState.data && faktState.data.result)
  } 

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

       <button onClick={postFeilsendt}>Post feilsendt</button><br/>
       <button onClick={postUtsettSak}>Post utsett</button><br/>
       <button onClick={postAvdragsOrdning}>Post avdragsordning</button><br/>
       
       <button onClick={getFakturaliste}>fakturaListe</button>
       <br/>
       <select>
        <option key='' value=''>Velg faktura</option>
        {faktLastet() &&  faktState.data.result.map((team, i) => 
        <option key={team.fakturaNr} value={team.fakturaNr}>{team.fakturaCaption}</option>
        )}
      </select>       

  
      
       <br/>
       {JSON.stringify(faktState)}  

        <br/>
       {JSON.stringify(postfaktState)}       

    </div>
  );
}
