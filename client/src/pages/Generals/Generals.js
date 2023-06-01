import React, { useEffect, useState } from 'react'
import { Header, Message, Segment } from "semantic-ui-react";
import GeneralTable from '../../components/GeneralTable';
import { useDispatch } from "react-redux";
import { getGenerals } from '../../services/GeneralServices/GeneralServices.js';

function Generals() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generals, setGenerals] = useState([]);  

  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadGenerals()
      })()
  }, []);

  
  const loadGenerals = async () => {        
      const response = await dispatch(getGenerals(setErrorMessage, setSuccessMessage, setIsLoading));
      setGenerals(response.data) 
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Generals </Header>
            <p>On this view you can manage generals</p>
        </Message>
        <Segment loading={isLoading}>
        <GeneralTable isLoading={isLoading} setIsLoading={setIsLoading} loadGenerals={loadGenerals} generals={generals}/>
        </Segment>
    </>
  )
}

export default Generals