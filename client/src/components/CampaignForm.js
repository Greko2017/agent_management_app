
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, Select } from 'semantic-ui-react'
import { addCampaign, editCampaign } from '../services/CampaignServices/CampaignServices'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import {generateName} from '../utils/tools'
import { getRewards } from '../services/RewardServices/RewardServices';

const CampaignForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const user = useSelector(state => state.auth.currentUser);
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [rewards, setRewards] = useState([]);  

    const dispatch = useDispatch();

    useEffect(() => {
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async ()=>{
          await loadRewards()
        })()
    }, [])

    
  const loadRewards = async () => {    
      const response = await dispatch(getRewards(setErrorMessage, setSuccessMessage, props.setIsLoading));
      setRewards(response.data) 
  }

    const [formValue, setFormValue] = React.useState({
       name: props.is_edit===true ? props.campaign.name : generateName('CMP'), start_period: props.is_edit===true ? props.campaign.start_period.substring(0,10) : '', end_period: props.is_edit===true ? props.campaign.end_period.substring(0,10) : '', reward_id: props.is_edit===true ? props.campaign?.reward?._id : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    formValue.reward = rewards.filter(item=> item._id == formValue.reward_id)[0]
    console.log('In handleSubmit', formValue);
    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.campaign._id
      formValue.modified_by = user
      await dispatch(editCampaign(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } else{
      formValue.created_by = user
      await dispatch(addCampaign(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    // console.log('CampaignForm : In handleSubmit addCampaign res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      name: '', country: '', city: '', address: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadCampaigns && await props.loadCampaigns()
      props.loadCampaign && await props.loadCampaign()
  }, 5000)
}
const {
    name, start_period, end_period, reward_id
} = formValue;
return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='campaign-form'>
    <Form.Group widths='equal'>
      <Form.Field
        name='name'
        id='form-input-control-first-name'
        control={Input}
        label='Name'
        placeholder='Name'
        value={name}
        onChange={handleChange}

      />
    </Form.Group>
    
  {rewards?.length > 0 && <Form.Field
            name='reward_id'
            control={Select}
            options={rewards.map(reward=>{reward.key = reward._id.toString(); reward.value = reward._id.toString(); reward.text = `${reward.name}`; return reward})}
            label={{ children: 'Reward', htmlFor: 'form-select-control-reward' }}
            placeholder='Reward'
            search
            searchInput={{ id: 'form-select-control-reward' }}
            value={reward_id}
            onChange={handleChange}
        />}

    <Form.Group widths='equal'>
      
        <Form.Field
          name='start_period'
          control={Input}
          type='date'
          label={{ children: 'Due Date', htmlFor: 'form-select-control-start_period' }}
          placeholder='Due Date'
          id='form-select-control-start_period'
          value={start_period}
          onChange={handleChange}
        />
        
        <Form.Field
          name='end_period'
          control={Input}
          type='date'
          label={{ children: 'Due Date', htmlFor: 'form-select-control-end_period' }}
          placeholder='Due Date'
          id='form-select-control-end_period'
          value={end_period}
          onChange={handleChange}
        />
            
    </Form.Group>

  </Form>
    </>
)
}

export default reduxForm({
    form: "campaignform"
})(CampaignForm)