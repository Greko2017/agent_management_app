
import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import InstalmentTable from '../../components/InstalmentTable';
import { useDispatch } from "react-redux";
import {getInstallments} from '../../services/InstalmentServices/InstalmentServices.js'

function Installments() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [installments, setInstallments] = useState([]);  

  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadInstallments()
      })()
  }, []);

  
  const loadInstallments = async () => {        
      const response = await dispatch(getInstallments(setErrorMessage, setSuccessMessage, setIsLoading));
      setInstallments(response.data) 
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Installments </Header>
            <p>On this view you can manage installments</p>
        </Message>
        <InstalmentTable isLoading={isLoading} setIsLoading={setIsLoading} loadInstallments={loadInstallments} installments={installments}/>
    </>
  )
}

export default Installments