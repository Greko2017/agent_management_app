
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, TextArea, Select } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { addCampaignParticipant, editCampaignParticipant } from '../services/CampaignParticipantServices/CampaignParticipantServices';
import { getGenerals } from '../services/GeneralServices/GeneralServices';
import { getCampaigns } from '../services/CampaignServices/CampaignServices';
import { generateName } from '../utils/tools';
import { getRewards } from '../services/RewardServices/RewardServices';
import { getAllAccountsOfParticipantByParticipantId } from '../services/ParticipantAccountParticipantServices/ParticipantAccountParticipantServices';


const CampaignParticipantForm = (props) => {
    
    const user = useSelector(state => state.auth.currentUser);
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [campaigns, setCampaigns] = useState([]);
    const [generals, setGenerals] = useState([]);  
    const [rewards, setRewards] = useState([]);  
    const [participant_accounts, setParticipantAccounts] = useState([]);  

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In CampaignParticipantForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await loadGenerals()
          await loadCampaigns()
          // await loadRewards()
        })()
    }, [])

    
    const loadRewards = async () => {        
      const response = await dispatch(getRewards(setErrorMessage, setSuccessMessage, props.setIsLoading));
      setRewards(response.data)

  }

    const loadGenerals = async () => {        
      const response = await dispatch(getGenerals(setErrorMessage, setSuccessMessage, props.setIsLoading));
      setGenerals(response.data) 
      await loadParticipantAccounts(response.data)
  }

    const loadParticipantAccounts = async (_account_stakeholder) => {        
      const body  = { 'participant_id': _account_stakeholder._id }
      const response = await dispatch(getAllAccountsOfParticipantByParticipantId(body, setErrorMessage, setSuccessMessage, props.setIsLoading));
      setParticipantAccounts(response.data)
      if (formValue.account_id == '') {
        setFormValue({...formValue, account_id: props.is_edit===true ? props.campaign_participant?.account?._id : ''})
      }
    }

  
const handleChangeParticipants = async (e, { name, value }) => {
  setFormValue({ ...formValue, [name]: value })
  let _participant = generals.filter(item=>item._id == value)[0]    
  await loadParticipantAccounts(_participant)
}

const handleChangeParticipantAccounts = async (e, { name, value }) => {
  setFormValue({ ...formValue, [name]: value })
  let _rewards = rewards.filter(item=>item._id == value)[0]  
  await loadRewards(_rewards)
  // if (formValue.reward_id === '') { 
  // } 
}

  const loadCampaigns = async () => {        
    let query = {}
    const response = await dispatch(getCampaigns(query, setErrorMessage, setSuccessMessage, props.setIsLoading));
    // console.log('In loadRewards response', response)
    setCampaigns(response.data) 
  }

    const [formValue, setFormValue] = React.useState({
      name: props.is_edit===true ? props.campaign_participant.name : generateName('CMP_PRT'), campaign_id: props.is_edit===true ? props.campaign_participant.campaign._id : props.campaign ? props.campaign._id : '', participant_id: props.is_edit===true ? props.campaign_participant.participant._id : '', reward_id: props.is_edit===true ? props.campaign_participant?.reward?._id : '', account_id: props.is_edit===true ? props.campaign_participant?.account?._id : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValue.campaign_id === '') {
      formValue.campaign_id = props.campaign?._id
    }
    formValue.participant = generals.filter(item=>item._id == formValue.participant_id)[0]    
    formValue.campaign = campaigns.filter(item=> item._id == campaign_id)[0]
    formValue.account = participant_accounts.filter(item=> item._id == account_id)[0]?.participant_account
    formValue.reward = rewards.filter(item=> item._id == formValue.reward_id)[0]

    if(props.is_edit === true) {
      formValue._id = props.campaign_participant?._id
      formValue.modified_by = user
      await dispatch(editCampaignParticipant(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } 
    else {
      formValue.created_by = user
      console.log('enter else formValue', formValue)
      await dispatch(addCampaignParticipant(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading, props.in_campaign_participant_page));
    }
    // console.log('CampaignParticipantForm : In handleSubmit addCampaignParticipant res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({        
        name: '', participant_id: '', campaign_id: '', 
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadCampaignParticipants && await props.loadCampaignParticipants()
  }, 5000)
}
const {
    name, participant_id, campaign_id, reward_id, account_id
} = formValue;

return (
    <>
    
      {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
      
      {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
        
      <Form onSubmit={handleSubmit} id='campaign_participant-form'>
        
      <Form.Field
        name='name'
        id='form-input-control-first-name'
        control={Input}
        label='Name'
        placeholder='Name'
        value={name}
        onChange={handleChange}

      />

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

            {generals?.length > 0 && <Form.Field
                name='participant_id'
                disabled={props.in_campaign_participant_page ? false : false}
                control={Select}
                options={generals.map(general=>{general.is_collaborator = general.is_collaborator.toString();general.is_beneficiary = general.is_beneficiary.toString();general.is_lead = general.is_lead.toString();general.key = general._id.toString(); general.value = general._id.toString(); general.text = `${general.first_name}, ${general.last_name } | ${general.phone_number}`; return general})}
                label={{ children: 'Participant', htmlFor: 'form-select-control-participant_id' }}
                placeholder='Participant'
                search
                searchInput={{ id: 'form-select-control-participant_id' }}
                value={participant_id}
                onChange={handleChangeParticipants}
            />}
            
        {participant_accounts?.length > 0 && <Form.Field
                  name='account_id'
                  disabled={false}
                  control={Select}
                  options={participant_accounts.map(participant_account=>{participant_account.key = participant_account._id.toString(); participant_account.value = participant_account._id.toString(); participant_account.text = `${participant_account?.participant_account?.name}`; return participant_account})}
                  label={{ children: 'Account', htmlFor: 'form-select-control-participant_account' }}
                  placeholder='Account'
                  search
                  searchInput={{ id: 'form-select-control-participant_account' }}
                  value={account_id}
                  onChange={handleChangeParticipantAccounts}
              />}

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
      </Form>
    </>
)
}

export default reduxForm({
    form: "campaignparticipantform"
})(CampaignParticipantForm)