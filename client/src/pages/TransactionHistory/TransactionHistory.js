import React, { useEffect, useState } from 'react'
import {  useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow,  Header, HeaderContent} from "semantic-ui-react";
import TransactionHistoryTable from '../../components/TransactionHistoryTable';
import history from '../../history';
import { getStakeholderAccountHistoriesByQuery, getStakeholderTransactionHistoriesByStakeholderId } from '../../services/StakeholderTransactionHistory/StakeholderTransactionHistory';

function TransactionHistory(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [stakeholder, setStakeholder] = useState({});  
    const [transaction_histories, setTransactionHistories] = useState([]);  
    const dispatch = useDispatch();   

    useEffect(()=>{
        (async () => {
            if (props.stakeholder) {
                setStakeholder(stakeholder)
                loadTransactionHistories()
            };
        })()
    },[])
    const loadTransactionHistories = async (_participant_account) => {
        console.log('-- loadTransactionHistories', _participant_account)
        let query = {'participant_account._id': _participant_account._id}
        const response = await dispatch(getStakeholderAccountHistoriesByQuery(query, setErrorMessage, setSuccessMessage, setIsLoading));
        setTransactionHistories(response.data)
    }

  return (
    <>
        
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
        <Message>
            <TransactionHistoryTable stakeholder_account_histories={props.stakeholder_account_histories} loadStakeholderAccountHistories={props.loadStakeholderAccountHistories} participant_account={props.participant_account} loadTransactionHistories={loadTransactionHistories} transaction_histories={props.stakeholder_account_histories} isLoading={isLoading} setIsLoading={setIsLoading}  />
        </Message>

    </>
  )
}

export default TransactionHistory