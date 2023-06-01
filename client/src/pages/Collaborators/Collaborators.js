import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getCollaborators } from '../../services/collaboratorServices/collaboratorServices';
import CollaboratorTable from '../../components/CollaboratorTable';
import { getGeneralsGeneric } from '../../services/GeneralServices/GeneralServices';


export const Collaborators = () => {
    // access to the currentUser property from the auth reducer state
    const user = useSelector(state => state.auth.currentUser);
    const state = useSelector(state => state);
    const {role, permissions} = useSelector(state => state.auth);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [collaborators, setCollaborators] = useState([]);  

    const dispatch = useDispatch();    
    console.log('-- Collaborators state', state)
    useEffect(() => {
        (async () => {
          await loadCollaborators()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    const loadCollaborators = async () => {        
        let query = {is_collaborator: true}
        switch (role.name) {
            case 'elite':
                query = {'parent._id': user?._id, is_collaborator: true}
                break;
            case 'collaborator':
                query = {'email': user?.email, is_collaborator: true}
                break;
        
            default:
                break;
        }

        const response = await dispatch(getGeneralsGeneric(query, setErrorMessage, setSuccessMessage, setIsLoading));
        setCollaborators(response.data) 

        // const response = await dispatch(getCollaborators(setErrorMessage, setSuccessMessage, setIsLoading));
        // // console.log('response', response)
        // setCollaborators(response.data) 
    }

    return (
        <>
        {/* <p>state :{JSON.stringify(state)}</p> */}
        {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
        
        {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
        
            <Message className="message-container" size="huge" secondary="true">
                <Header size="huge"> Collaborators </Header>
                <p>Welcome {user ? user.email : ""}</p>
                <p>On this view you can manage Collaborators informations</p>
            </Message>
            <CollaboratorTable in_collaborator_page={true} isLoading={isLoading} setIsLoading={setIsLoading} loadCollaborators={loadCollaborators} collaborators={collaborators}/>
        </>
    )
}

export default Collaborators;
