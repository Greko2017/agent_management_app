import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, Select } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { addAccountStakeholder, editAccountStakeholder } from '../services/AccountStakeholderServices/AccountStakeholderServices';
import { getGenerals } from '../services/GeneralServices/GeneralServices';
import { generateName } from '../utils/tools';
import { getParticipantAccounts } from '../services/ParticipantAccountServices/ParticipantAccountServices';


const AccountStakeholderForm = (props) => {
    
    const user = useSelector(state => state.auth.currentUser);
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [participant_accounts, setParticipantAccounts] = useState([]);  
    const [generals, setGenerals] = useState([]);  

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In AccountStakeholderForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await loadGenerals()
          await loadParticipantAccounts()
        })()
    }, [])

    const loadGenerals = async () => {        
      const response = await dispatch(getGenerals(setErrorMessage, setSuccessMessage, props.setIsLoading));
      setGenerals(response.data) 
  }
  
  const loadParticipantAccounts = async () => {        
    const body  = { }
    const response = await dispatch(getParticipantAccounts(body, setErrorMessage, setSuccessMessage, props.setIsLoading));
    setParticipantAccounts(response.data) 
}

    const [formValue, setFormValue] = React.useState({
      name: props.is_edit===true ? props.participant_account_participant.name : generateName('ACC_STK_HOLD_'), account_id: props.is_edit===true ? props.participant_account_participant.participant_account._id : props.participant_account ? props.participant_account._id : '', participant_id: props.is_edit===true ? props.participant_account_participant.participant._id : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValue.account_id === '') {
      formValue.account_id = props.participant_account?._id
    }
    formValue.participant = generals.filter(item=>item._id == formValue.participant_id)[0]    
    formValue.participant_account = participant_accounts.filter(item=> item._id == account_id)[0]

    if(props.is_edit === true) {
      formValue._id = props.participant_account_participant?._id
      formValue.modified_by = user
      await dispatch(editAccountStakeholder(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } 
    else {
      formValue.created_by = user
      console.log('enter else formValue', formValue)
      await dispatch(addAccountStakeholder(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading, props.in_participant_account_participant_page));
    }
    // console.log('AccountStakeholderForm : In handleSubmit addAccountStakeholder res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({        
        name: '', participant_id: '', account_id: '', 
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadAccountStakeholders && await props.loadAccountStakeholders()
      
  }, 5000)
}

const {
    name, participant_id, account_id
} = formValue;

return (
    <>
    
      {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
      
      {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
        
      <Form onSubmit={handleSubmit} id='account_stakeholder-form'>
        
      <Form.Field
        name='name'
        id='form-input-control-first-name'
        control={Input}
        label='Name'
        placeholder='Name'
        value={name}
        onChange={handleChange}

      />

        {participant_accounts?.length > 0 && <Form.Field
                  name='account_id'
                  disabled={props.in_beneficiary_page ? false : false}
                  control={Select}
                  options={participant_accounts.map(participant_account=>{participant_account.key = participant_account._id.toString(); participant_account.value = participant_account._id.toString(); participant_account.text = `${participant_account.name}`; return participant_account})}
                  label={{ children: 'Account', htmlFor: 'form-select-control-participant_account' }}
                  placeholder='Account'
                  search
                  searchInput={{ id: 'form-select-control-participant_account' }}
                  value={account_id}
                  onChange={handleChange}
              />}

            {generals?.length > 0 && <Form.Field
                name='participant_id'
                disabled={props.in_participant_account_participant_page ? false : false}
                control={Select}
                options={generals.map(general=>{general.is_collaborator = general.is_collaborator.toString();general.is_beneficiary = general.is_beneficiary.toString();general.is_lead = general.is_lead.toString();general.key = general._id.toString(); general.value = general._id.toString(); general.text = `${general.first_name}, ${general.last_name } | ${general.phone_number}`; return general})}
                label={{ children: 'Stakeholder', htmlFor: 'form-select-control-participant_id' }}
                placeholder='Stakeholder'
                search
                searchInput={{ id: 'form-select-control-participant_id' }}
                value={participant_id}
                onChange={handleChange}
            />}
            
      </Form>
    </>
)
}

export default reduxForm({
    form: "accounttakeholderform"
})(AccountStakeholderForm)