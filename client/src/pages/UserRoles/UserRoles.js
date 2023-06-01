import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import UserRoleTable from '../../components/UserRoleTable';
import { useDispatch } from "react-redux";
import { getUserRoles } from '../../services/UserRoleServices/UserRoleServices';

function UserRoles() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user_roles, setUserRoles] = useState([]);  

  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadUserRoles()
      })()
  }, []);

  
  const loadUserRoles = async () => {        
      const response = await dispatch(getUserRoles(setErrorMessage, setSuccessMessage, setIsLoading));
      setUserRoles(response.data) 
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> UserRoles </Header>
            <p>On this view you can manage company user_roles (branches) across different town and countries</p>
        </Message>
        <UserRoleTable isLoading={isLoading} setIsLoading={setIsLoading} loadUserRoles={loadUserRoles} user_roles={user_roles}/>
    </>
  )
}

export default UserRoles