import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
import HeadTable from '../../components/HeadTable';
import { useDispatch } from "react-redux";
import { getHeads } from '../../services/headServices/HeadServices';
import { getGeneralsGeneric } from '../../services/GeneralServices/GeneralServices';


export const Heads = () => {
    // access to the currentUser property from the auth reducer state
    const user = useSelector(state => state.auth.currentUser);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [leads, setLeads] = useState([]);  
    const {role, permissions} = useSelector(state => state.auth);

    const dispatch = useDispatch();    
    useEffect(() => {
        (async () => {
          await loadHeads()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    const loadHeads = async () => {        
        let query = { is_lead: true}
        switch (role.name) {
            case 'elite':
                query = {'email': user.email, is_lead: true}
                break;
                case 'collaborator':
                    query = {not_allowed: true}
                    break;
        
            default:
                break;
        }

        const response = await dispatch(getGeneralsGeneric (query, setErrorMessage, setSuccessMessage, setIsLoading));
        setLeads(response.data) 

        // const response = await dispatch(getHeads(setErrorMessage, setSuccessMessage, setIsLoading));
        // // console.log('response', response)
        // setLeads(response.data) 
    }

    return (
        <>
        {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
        
        {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
        
            <Message className="message-container" size="huge" secondary="true">
                <Header size="huge"> Elites </Header>
                <p>Welcome {user ? user.email : ""}</p>
                <p>On this view you can manage head informations</p>
            </Message>
            <HeadTable isLoading={isLoading} setIsLoading={setIsLoading} loadHeads={loadHeads} leads={leads}/>
        </>
    )
}

export default Heads;
