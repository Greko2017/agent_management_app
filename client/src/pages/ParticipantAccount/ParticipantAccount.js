import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import ParticipantAccountTable from '../../components/ParticipantAccountTable';
import { useDispatch, useSelector } from "react-redux";
import { getParticipantAccounts } from '../../services/ParticipantAccountServices/ParticipantAccountServices';

function ParticipantAccounts() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [participant_accounts, setParticipantAccounts] = useState([]);  
  const [participant_common_accounts, setParticipantCommonAccounts] = useState([]);  
  const {currentUser: user, role, permissions} = useSelector(state => state.auth);

  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadParticipantAccounts()
      })()
  }, []);
  
  
  const loadParticipantCommonAccounts = async () => {   
    console.log('in loadParticipantCommonAccounts', role)      
    let query  = { }
    switch (role.name) {
        case 'elite':
            query = {
              "participants": {
                  "$elemMatch": {
                      "participant_id": user._id
                  }
              },
              "$where": "this.participants.length > 1"
            }
            break;
        case 'collaborator':
            query = {"participants.participant_id": {$all: [user._id, user?.parent_id]}
          }
            break;
            case "accountant":
              console.log('in accountant')
                query = {
                  // participants: {
                  //      "$size": {
                  //          "$gte": 2
                  //      }
                  // }
              }
                break;   
    
        default:
            break;
    }

      const response = await dispatch(getParticipantAccounts(query, setErrorMessage, setSuccessMessage, setIsLoading));
      setParticipantCommonAccounts(response.data) 
  }

  const loadParticipantAccounts = async () => {
    let query  = {
      "participants": { $size: 1, $elemMatch: { "participant_id": user._id } }
    }
    switch (role.name) {
        case 'elite':
            query = {"participants": { $size: 1, $elemMatch: { "participant_id": user._id } }}
            break;
        case 'collaborator':
            query = {"participants": { $size: 1, $elemMatch: { "participant_id": user._id } }}
            break;
        case 'Admin':
          console.log('in Admin')
            query = {}
            break;  
    
            case "accountant":
              console.log('in accountant')
                query = {
                  // participants: {
                  //      "$size": {
                  //          "$gte": 2
                  //      }
                  // }
              }
                break; 
        default:
            break;
    }

      const response = await dispatch(getParticipantAccounts(query, setErrorMessage, setSuccessMessage, setIsLoading));
      setParticipantAccounts(response.data) 
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Participant Accounts </Header>
            <p>On this view you can manage company participant_accounts</p>
        </Message>
        <ParticipantAccountTable isLoading={isLoading} setIsLoading={setIsLoading} loadParticipantAccounts={loadParticipantAccounts} participant_accounts={participant_accounts}/>
    
    
    {role && role.name === 'elite' ? (
        <>
                    
          <Message className="message-container" size="huge" secondary="true">
          <Header size="huge"> Participant Common Accounts </Header>
          <p>List of all account shared with your collaborators or elite</p>
          </Message>
          <ParticipantAccountTable isLoading={isLoading} setIsLoading={setIsLoading} loadParticipantAccounts={loadParticipantCommonAccounts} participant_accounts={participant_common_accounts}/>

        </>
    ) : null} </>
  )
}

export default ParticipantAccounts