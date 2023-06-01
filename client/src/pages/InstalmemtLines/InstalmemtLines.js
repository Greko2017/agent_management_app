import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { getInstalmentLines } from '../../services/InstalmentServices/InstalmentServices';
import InstalmentLineTable from '../../components/InstalmentLineTable';

function InstalmentLines() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [instalment_lines, setInstalmentLines] = useState([]);  

  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadInstalmentLines()
      })()
  }, []);

  
  const loadInstalmentLines = async () => {        
      const response = await dispatch(getInstalmentLines(setErrorMessage, setSuccessMessage, setIsLoading));
      setInstalmentLines(response.data) 
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Instalment Lines </Header>
            <p>On this view you can manage installments Lines</p>
        </Message>
        <InstalmentLineTable isLoading={isLoading} setIsLoading={setIsLoading} loadInstalmentLines={loadInstalmentLines} instalment_lines={instalment_lines}/>
    </>
  )
}

export default InstalmentLines