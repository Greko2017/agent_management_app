
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, Select } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { addParticipantAccount, editParticipantAccount } from '../services/ParticipantAccountServices/ParticipantAccountServices';
import { getGeneralsGeneric } from '../services/GeneralServices/GeneralServices';
import { generateName } from '../utils/tools';


const ParticipantAccountForm = (props) => {
    
    const user = useSelector(state => state.auth.currentUser);
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [campaigns, setCampaigns] = useState([]);
    const [generals, setGenerals] = useState([]);  

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In ParticipantAccountForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await loadGenerals()
        })()
    }, [])

   
    const loadGenerals = async () => { 
      let query = {'is_staff': true}       
      const response = await dispatch(getGeneralsGeneric(query, setErrorMessage, setSuccessMessage, props.setIsLoading));
      setGenerals(response.data) 
    }

    const [formValue, setFormValue] = React.useState({
      name: props.is_edit===true ? props.participant_account.name : generateName('PRT_ACC'), approver_id: props.is_edit===true ? props.participant_account.approver?._id : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    formValue.approver = generals.filter(item=>item._id == formValue.approver_id)[0]    

    if(props.is_edit === true) {
      formValue._id = props.approver?._id
      formValue.modified_by = user
      await dispatch(editParticipantAccount(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } 
    else {
      formValue.created_by = user
      console.log('enter else formValue', formValue)
      await dispatch(addParticipantAccount(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({        
        name: '', approver_id: '', campaign_id: '', 
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadParticipantAccounts && await props.loadParticipantAccounts()
  }, 5000)
}

const {
    name, approver_id, campaign_id
} = formValue;

return (
    <>
    
      {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
      
      {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
        
      <Form onSubmit={handleSubmit} id='participant_account-form'>
        
      <Form.Field
        name='name'
        id='form-input-control-first-name'
        control={Input}
        label='Name'
        placeholder='Name'
        value={name}
        onChange={handleChange}

      />


            {generals?.length > 0 && <Form.Field
                name='approver_id'
                disabled={props.in_campaign_participant_page ? false : false}
                control={Select}
                options={generals.map(general=>{general.is_elite = general.is_elite?.toString();general.is_staff = general.is_staff.toString();general.is_collaborator = general.is_collaborator.toString();general.is_beneficiary = general.is_beneficiary.toString();general.is_lead = general.is_lead.toString();general.key = general._id.toString(); general.value = general._id.toString(); general.text = `${general.email}`; return general})}
                label={{ children: 'Approver', htmlFor: 'form-select-control-approver_id' }}
                placeholder='Approver'
                search
                searchInput={{ id: 'form-select-control-approver_id' }}
                value={approver_id}
                onChange={handleChange}
            />}
            
      </Form>
    </>
)
}

export default reduxForm({
    form: "participant_Account_form"
})(ParticipantAccountForm)