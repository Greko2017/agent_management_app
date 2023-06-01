import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { Button, Message,GridColumn,GridRow,  Header, HeaderContent} from "semantic-ui-react";
import { useParams } from 'react-router-dom'
import history from '../../history';
import { deleteStakeholderTransactionHistory, getStakeholderTransactionHistoryById, editStakeholderTransactionHistory } from '../../services/StakeholderTransactionHistory/StakeholderTransactionHistory';
import TransactionHistoryForm from '../../components/TransactionHistoryForm';

function TransactionHistoryDetails(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [stakeholder, setStakeholder] = useState({});  
    const [transaction_history, setTransactionHistory] = useState([]);  
    const dispatch = useDispatch();   
    const { transaction_history_id } = useParams() 

    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    useEffect(()=>{
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "stakeholder_account_histories")[0] // i.role.name === 'elite' && 
          setPermission(_permission)
        }
        (async () => {
            loadTransactionHistory()
        })()
    },[])
    const handleDelete = async () => {        
        await dispatch(deleteStakeholderTransactionHistory(transaction_history, setErrorMessage, setSuccessMessage, setIsLoading));
    }
    const handleGeneratePdfInvoice = async () => {
    }
    const loadTransactionHistory = async () => {
        const response = await dispatch(getStakeholderTransactionHistoryById(transaction_history_id, setErrorMessage, setSuccessMessage, setIsLoading));
        setTransactionHistory(response.data) 
    }
    
    const handleReject = async () => {
        let formValue = transaction_history
        formValue.status = "rejected"
        await dispatch(editStakeholderTransactionHistory(formValue, setErrorMessage, setSuccessMessage, setIsLoading));
    }
    const handleApprove = async () => {
        let formValue = transaction_history
        formValue.status = "approved"
        await dispatch(editStakeholderTransactionHistory(formValue, setErrorMessage, setSuccessMessage, setIsLoading));
    }
    

  return (
    <>
        
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <GridColumn equals>
            <GridRow>
                <Message style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                    <Button icon='arrow left' className="item mr-3" onClick={()=>{history.goBack()}}
                        />
                        {permission && permission.has_update === true ? (
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        content='Edit'
                        labelPosition='right'
                        form='transaction_history-form'
                        icon='edit'
                        positive
                        />
                        ):null}
                        {permission && permission.has_delete === true ? (
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            content='Delete'

                            labelPosition='right'
                            onClick={handleDelete}
                            icon='cancel'
                            negative
                            />
                            ):null}

                            {transaction_history ? <span className='ml-3 mr-3'><strong> {"Status: "}</strong>{transaction_history.status}</span> : null}
                        </div>
                        <div>

                            {transaction_history.status === 'to_approve' ? <>
                            
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                content='Reject'

                                labelPosition='right'
                                onClick={handleReject}
                                icon='cancel'
                                negative
                                />
                                <Button
                                loading={isLoading}
                                disabled={isLoading}
                                content='Approve'

                                labelPosition='right'
                                onClick={handleApprove}
                                icon='thumbs up'
                                primary
                                /> 
                                </>: null}
                        </div>
                    
                </Message>
            </GridRow>
            <GridRow>
            </GridRow>
        </GridColumn>
            
    <Message>
        {Object.keys(transaction_history || {}).length >0 ? <TransactionHistoryForm loadTransactionHistory={loadTransactionHistory} isLoading={isLoading} setIsLoading={setIsLoading}  transaction_history={transaction_history} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Transaction History data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>
    </>
  )
}

export default TransactionHistoryDetails