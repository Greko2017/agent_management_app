
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message,Select } from 'semantic-ui-react'
import { addReward, editReward,  } from '../services/RewardServices/RewardServices'
import { getCampaigns,  } from '../services/CampaignServices/CampaignServices'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import {generateName} from '../utils/tools'

const RewardForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const user = useSelector(state => state.auth.currentUser);
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [campaigns, setCampaigns] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await loadCampaigns()
        })()
    }, [])


    const [formValue, setFormValue] = React.useState({
       name: props.is_edit===true ? props.reward.name : generateName('RWD'), campaign_id: props.is_edit===true ? props.reward.campaign._id : '', reward_amount: props.is_edit===true ? props.reward.reward_amount : ''
    })

    
    const loadCampaigns = async () => {        
      let query = {}
      const response = await dispatch(getCampaigns(query, setErrorMessage, setSuccessMessage, props.setIsLoading));
      // console.log('In loadRewards response', response)
      setCampaigns(response.data) 
    }


const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    formValue.campaign = campaigns.filter(item=> item._id == campaign_id)[0]
    console.log('In handleSubmit', formValue);
    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.reward._id
      formValue.modified_by = user
      await dispatch(editReward(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } else{
      formValue.created_by = user
      await dispatch(addReward(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      name: '', campaign_id: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadRewards && await props.loadRewards()
      props.loadReward && await props.loadReward()
  }, 5000)
}
const {
    name, campaign_id, reward_amount
} = formValue;
return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='reward-form'>
    
  {campaigns?.length > 0 && <Form.Field
            name='campaign_id'
            disabled={props.in_beneficiary_page ? false : false}
            control={Select}
            options={campaigns.map(campaign=>{campaign.key = campaign._id.toString(); campaign.value = campaign._id.toString(); campaign.text = `${campaign.name}`; return campaign})}
            label={{ children: 'Campaign', htmlFor: 'form-select-control-campaign' }}
            placeholder='Campaign'
            search
            searchInput={{ id: 'form-select-control-campaign' }}
            // value={campaign_id}
            value={campaign_id}
            onChange={handleChange}
        />}

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
      <Form.Field
        name='reward_amount'
        id='form-input-control-first-reward_amount'
        control={Input}
        label='Amount'
        type='number'
        placeholder='Amount'
        value={reward_amount}
        onChange={handleChange}

      />

  </Form>
    </>
)
}

export default reduxForm({
    form: "rewardform"
})(RewardForm)