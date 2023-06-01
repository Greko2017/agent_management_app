import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Icon} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getBeneficiaryInstalmentHistoryById, deleteBeneficiaryInstalmentHistory, editBeneficiaryInstalmentHistory } from '../../services/BeneficiaryInstalmentHistoryServices/BeneficiaryInstalmentHistoryServices';
import BeneficiaryInstalmentHistoryForm from '../../components/BeneficiaryInstalmentHistoryForm';

import history from "../../history"
function BeneficiaryInstalmentHistoryDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [beneficiary_instalment_history, setBeneficiaryInstalmentHistory] = useState({});
    const {role, permissions} = useSelector(state => state.auth);  

    const { beneficiary_instalment_history_id } = useParams() 
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();   

    useEffect(() => {
        (async () => {
          await loadBeneficiaryInstalmentHistory()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadBeneficiaryInstalmentHistory = async () => {        
        const response = await dispatch(getBeneficiaryInstalmentHistoryById(beneficiary_instalment_history_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setBeneficiaryInstalmentHistory(response.data) 
    }

    const handleDelete = async () => {
         await dispatch(deleteBeneficiaryInstalmentHistory(beneficiary_instalment_history_id, setErrorMessage, setSuccessMessage, setIsLoading));
    }
    const handleConfirmPayment = async () => {
        let dataValue = beneficiary_instalment_history
        dataValue.status = 'paid';
        dataValue.payment_confirmed_by = user
        let response = await dispatch(editBeneficiaryInstalmentHistory(dataValue, setErrorMessage, setSuccessMessage, setIsLoading));   
        console.log('response', response)
        if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('status') ) {
            let status = response.data.status
            console.log('-- handleConfirmPayment status', status)
        }
    }
  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <GridColumn>
            <GridRow>
                <Message style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div><Button icon='arrow left' className="item mr-3" onClick={()=>{history.goBack()}}
                        />
                    
                    {role && role.name === 'Admin' ? (
                        <>
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            content='Edit'
                            labelPosition='right'
                            form='beneficiary-instalment-history-form'
                            icon='edit'
                            positive
                            />
                            <Button
                                loading={isLoading}
                                disabled={isLoading || beneficiary_instalment_history?.status === 'paid'}
                                content='Delete'
    
                                labelPosition='right'
                                onClick={handleDelete}
                                icon='cancel'
                                negative
                                />
                        </>
                            ) : null}
                            <strong style={{weight :'bold', size: '4em', paddingLeft: '1em'}}>{beneficiary_instalment_history.status}</strong>
                        </div>
                        <div>
                            {role && role.name === 'accountant' ? (
                                <Button
                                    loading={isLoading}
                                    disabled={isLoading || beneficiary_instalment_history?.status === 'paid'}
                                    content='Confirm Payment'

                                    labelPosition='right'
                                    onClick={handleConfirmPayment}
                                    icon='certificate'
                                    primary
                                    />
                            ) : null}
                        </div>
                </Message>
            </GridRow>
            <GridRow>

            </GridRow>
        </GridColumn>
    <Message>
        {Object.keys(beneficiary_instalment_history || {}).length >0 ? <BeneficiaryInstalmentHistoryForm loadBeneficiaryInstalmentHistory={loadBeneficiaryInstalmentHistory} isLoading={isLoading} setIsLoading={setIsLoading} beneficiary_instalment_history={beneficiary_instalment_history} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>
    </>
  )
}

export default BeneficiaryInstalmentHistoryDetails