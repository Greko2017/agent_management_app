import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import CampaignTable from '../../components/CampaignTable';
import { useDispatch, useSelector } from "react-redux";
import { getCampaigns } from '../../services/CampaignServices/CampaignServices';

function Campaigns() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);  
  const user = useSelector(state => state.auth.currentUser);
  const {role} = useSelector(state => state.auth);

  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadCampaigns()
      })()
  }, []);

  
  const loadCampaigns = async () => {
    let query = {'auth_user_id': user._id,'role_name': role.name }
      const response = await dispatch(getCampaigns(query, setErrorMessage, setSuccessMessage, setIsLoading));
      console.log('-- loadCampaigns campaigns', response.data)
      setCampaigns(response.data)  
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Campaigns </Header>
            <p>On this view you can manage company campaigns</p>
        </Message>
        <CampaignTable isLoading={isLoading} setIsLoading={setIsLoading} loadCampaigns={loadCampaigns} campaigns={campaigns}/>
    </>
  )
}

export default Campaigns