import React from "react";
import "./style.css";
import useAxiosGet from "./useAxiosGet"

export default function App() {

  [getData, state] = useAxiosGet()

  const getFakturaliste = () => {
    getData("http://localhost:5000/api/sak/FakturalisteForSak/1231234")
  }

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

       <button onClick={getFakturaliste}>fakturaListe</button>
    </div>
  );
}
