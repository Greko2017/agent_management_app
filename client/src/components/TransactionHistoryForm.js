import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, Radio, Select, TextArea } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { editStakeholderTransactionHistory, addStakeholderTransactionHistory } from '../services/StakeholderTransactionHistory/StakeholderTransactionHistory';
import {generateName} from '../utils/tools'
import { getGeneralsGeneric } from '../services/GeneralServices/GeneralServices';
import { getParticipantAccountParticipantsByAccountId } from '../services/ParticipantAccountParticipantServices/ParticipantAccountParticipantServices';
import { getParticipantAccounts } from '../services/ParticipantAccountServices/ParticipantAccountServices';

const TransactionHistoryForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [generals, setGenerals] = useState([]);  
    const [participant_accounts, setParticipantAccounts] = useState([])
    
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In TransactionHistoryForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await loadGenerals()
          if (props.participant_account) {
            await loadParticipantAccounts()
          };
        })()
    }, [])

    const [formValue, setFormValue] = React.useState({
        account_id: props.is_edit===true ? props.transaction_history?.participant_account?._id : props.participant_account ? props.participant_account?._id : '', note: props.is_edit===true ? props.transaction_history?.note : '',participant_account_id: props.is_edit===true ? props.transaction_history?.participant_account_participant?._id : props.participant_account?._id, name: props.is_edit===true ? props.transaction_history?.name : generateName('ACC'), approver_id: props.is_edit===true ? props.transaction_history?.approver?._id : '', amount: props.is_edit===true ? props.transaction_history?.amount : '', is_credit: props.is_edit===true ? props.transaction_history?.is_credit ? '1' : '0' : '1'
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })}


const loadParticipantAccounts = async () => {        
    const body  = { }
    const response = await dispatch(getParticipantAccounts(body, setErrorMessage, setSuccessMessage, props.setIsLoading));
    // console.log('response', response)
    setParticipantAccounts(response.data) 
}


const loadGenerals = async () => { 
    let query = {'is_staff': true}
    const response = await dispatch(getGeneralsGeneric(query, setErrorMessage, setSuccessMessage, props.setIsLoading));
    setGenerals(response.data) 
  }

const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formValue.amount) {
        setErrorMessage('Please, Fill all required fiel')
        return
    }
    formValue.approver = generals.filter(item=> item._id == formValue.approver_id)[0];
    formValue.participant_account = participant_accounts.filter(item=> item._id == account_id)[0]
    if(props.is_edit === true) {
        formValue.modified_by = user
      formValue._id = props.transaction_history?._id
      await dispatch(editStakeholderTransactionHistory(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    } 
    else {
        formValue.created_by = user
      await dispatch(addStakeholderTransactionHistory(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    setTimeout(async function() {
            props.is_edit !== true && props.setOpen(false)
            props.is_edit !== true && setFormValue({
                name: '', is_credit: '', amount: '', approver_id: ''
            })
            setErrorMessage(null);
            setSuccessMessage(null);
            props.loadTransactionHistories &&  await props.loadTransactionHistories(props.participant_account)
            props.loadStakeholderAccountHistories && await props.loadStakeholderAccountHistories(props.participant_account)
        }, 5000)
    }

    const {
        name, is_credit,amount, approver_id, participant_account_id, note, account_id
    } = formValue;

    return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='transaction_history-form'>
           

    {participant_accounts?.length > 0 && <Form.Field
            name='account_id'
            control={Select}
            options={participant_accounts.map(participant_account=>{participant_account.key = participant_account._id.toString(); participant_account.value = participant_account._id.toString(); participant_account.text = `${participant_account.name}`; return participant_account})}
            label={{ children: 'Account', htmlFor: 'form-select-control-account_id' }}
            placeholder='Account'
            search
            searchInput={{ id: 'form-select-control-account_id' }}
            value={account_id}
            onChange={handleChange}
        />}
        <Form.Field
            name='name'
            id='form-input-control-first-name'
            control={Input}
            label='Name'
            placeholder='Name'
            value={name}
            onChange={handleChange}
    
          />     

        <Form.Group widths='two'>
            {generals?.length > 0 && <Form.Field
                    name='approver_id'
                    disabled={props.in_campaign_participant_page ? false : false}
                    control={Select}
                    options={generals.map(general=>{general.is_elite = general.is_elite?.toString();general.is_staff = general.is_staff?.toString();general.is_collaborator = general.is_collaborator?.toString();general.is_beneficiary = general.is_beneficiary?.toString();general.is_lead = general.is_lead?.toString();general.key = general._id?.toString(); general.value = general._id?.toString(); general.text = `${general.email}`; return general})}
                    label={{ children: 'Approver', htmlFor: 'form-select-control-approver_id' }}
                    placeholder='Approver'
                    search
                    searchInput={{ id: 'form-select-control-approver_id' }}
                    value={approver_id}
                    onChange={handleChange}
                />}
        
            <Form.Field>
            <label>Amount</label>
                <Input 
                placeholder='Amount'
                    name='amount'
                    type='number' 
                value={amount}
                onChange={handleChange} />
            </Form.Field>
            
        </Form.Group>
      
      
    <Form.Field
        name='note'
        id='form-textarea-control-note'
        control={TextArea}
        label='Notes'
        placeholder='Notes'
        value={note}
        onChange={handleChange}
    />

      <Form.Field>
            <Radio
                label='Is Credit'
                name='is_credit'
                value='1'
                checked={formValue.is_credit === '1'}
                onChange={handleChange}
            />
        </Form.Field>
        <Form.Field>
            <Radio
                label='Is Debit'
                value='0'
                name='is_credit'
                checked={formValue.is_credit === '0'}
                onChange={handleChange}
            />
        </Form.Field>
        
    
  </Form>
    </>
)
}

export default reduxForm({
    form: "transaction_historyform"
})(TransactionHistoryForm)