import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import BeneficiaryTable from '../../components/BeneficiaryTable';
import { useDispatch, useSelector } from "react-redux";
import { getBeneficiaries } from '../../services/BeneficiaryServices/BeneficiaryServices';
import { getGeneralsGeneric } from '../../services/GeneralServices/GeneralServices';

function Beneficiaries() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);  
  const user = useSelector(state => state.auth.currentUser);
  const {role, permissions} = useSelector(state => state.auth);

  
  const dispatch = useDispatch();    
  useEffect(() => {
      (async () => {
        await loadBeneficiaries()
      })()
  }, []);

  
  const loadBeneficiaries = async () => {        
    let query = {is_beneficiary: true}
    switch (role.name) {
        case 'elite':
            query = {'parent._id': user._id, is_beneficiary: true}
            break;
        case 'collaborator':
          query = {'parent._id': user._id, is_beneficiary: true}
            break;        
        case 'cashier':
          query = {auth_user_id: user._id, role_name: true}
            break;
    
        default:
            break;
    }

    const response = await dispatch(getGeneralsGeneric(query, setErrorMessage, setSuccessMessage, setIsLoading));
      setBeneficiaries(response.data) 
  }

  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Beneficiaries </Header>
            <p>On this view you can manage beneficiaries</p>
        </Message>
        <BeneficiaryTable isLoading={isLoading} setIsLoading={setIsLoading} loadBeneficiaries={loadBeneficiaries} beneficiaries={beneficiaries}/>
    </>
  )
}

export default Beneficiaries