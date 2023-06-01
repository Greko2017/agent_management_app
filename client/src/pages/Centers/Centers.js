import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import CenterTable from '../../components/CenterTable';
import { useDispatch, useSelector } from "react-redux";
import { getQueryCenters } from '../../services/CenterServices/CenterServices';

function Centers() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [centers, setCenters] = useState([]);   
  const user = useSelector(state => state.auth.currentUser);
  const {role} = useSelector(state => state.auth);
  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadCenters()
        // await loadCashierCenters()
      })()
  }, []);
  
  const loadCenters = async () => {
      let query = {'auth_user_id': user._id,'role_name': role.name }
      const response = await dispatch(getQueryCenters(query, setErrorMessage, setSuccessMessage, setIsLoading));
      setCenters(response.data) 
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Centers </Header>
            <p>On this view you can manage company centers (branches) across different town and countries</p>
        </Message>
        <CenterTable isLoading={isLoading} setIsLoading={setIsLoading} loadCenters={loadCenters} centers={centers}/>
        </>
  )
}

export default Centers