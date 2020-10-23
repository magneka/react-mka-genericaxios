import React from "react";
import "./style.css";
import useAxiosGet from './useAxiosGet'

export default function App() {

  const [getFakt, faktState] = useAxiosGet()
  
  const getFakturaliste = () => {
    getFakt("http://localhost:5000/api/sak/FakturalisteForSak?saksnr=1231234")
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

       <button onClick={getFakturaliste}>fakturaListe</button>

       <br/>
       <select>
        {faktLastet() &&  faktState.data.result.map((team, i) => 
        <option key={team.fakturaNr} value={team.fakturaNr}>{team.fakturaCaption}</option>
        )}
      </select>       

  
      
       <br/>
       {JSON.stringify(faktState)}       

    </div>
  );
}
