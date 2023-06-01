import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import RewardTable from '../../components/RewardTable';
import { useDispatch } from "react-redux";
import { getRewards } from '../../services/RewardServices/RewardServices';

function Rewards() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rewards, setRewards] = useState([]);  

  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadRewards()
      })()
  }, []);

  
  const loadRewards = async () => {        
      const response = await dispatch(getRewards(setErrorMessage, setSuccessMessage, setIsLoading));
      setRewards(response.data) 
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Rewards </Header>
            <p>On this view you can manage company rewards (branches) across different town and countries</p>
        </Message>
        <RewardTable isLoading={isLoading} setIsLoading={setIsLoading} loadRewards={loadRewards} rewards={rewards}/>
    </>
  )
}

export default Rewards