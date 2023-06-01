import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message,Select, Radio } from 'semantic-ui-react'
import { addRewardLine, editRewardLine,  } from '../services/RewardLineServices/RewardLineServices.js'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import {generateName} from '../utils/tools'

const rewardTypeOptions = [
  { key: 'common', value: 'common', text: 'Common' },
  { key: 'elite', value: 'elite', text: 'Elite' },
  { key: 'collaborator', value: 'collaborator', text: 'Collaborator' },
]
const RewardLineForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const user = useSelector(state => state.auth.currentUser);
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [accounts, setAccounts] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
        })()
    }, [])


    const [formValue, setFormValue] = React.useState({
       name: props.is_edit===true ? props.reward_line.name : generateName('RWD_LN'), parent_id: props.is_edit===true ? props.reward_line.parent._id : props.parent ? props.parent._id : '', reward_type: props.is_edit===true ? props.reward_line.reward_type : '', reward_percentage_of_amount: props.is_edit===true ? props.reward_line.reward_percentage_of_amount : '', reward_amount: props.is_edit===true ? props.reward_line.reward_amount : '',
    })

    


const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValue.parent_id === '') {
      formValue.parent_id = props.parent?._id
    }
    formValue.parent = props.rewards.filter(item=> item._id == formValue.parent_id)[0]
    formValue.is_collaborator = formValue.is_elite === '1' ? false : true;
    formValue.is_elite = formValue.is_elite === '1' ? true : false;
    console.log('In handleSubmit', formValue);
    // return
    if(props.is_edit === true) {
      formValue._id = props.reward_line._id
      formValue.modified_by = user
      await dispatch(editRewardLine(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } else{
      formValue.created_by = user
      await dispatch(addRewardLine(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    

    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
        name: '', reward_type: '', parent_id: '', reward_percentage_of_amount: '', reward_amount: '', is_elite: props.is_edit===true ? props.transaction_history?.is_elite ? '1' : '0' : '1'
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadRewardLines && await props.loadRewardLines()
      props.loadRewardLine && await props.loadRewardLine()
  }, 5000)
}
// const loadAccounts = async () => {
//   const response = await dispatch(getCenters(setErrorMessage, setSuccessMessage, setIsLoading));
//   setAccounts(response.data)
// }
const {
    name, reward_type, parent_id, reward_percentage_of_amount, reward_amount//reward_amount, account_id
} = formValue;
return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='reward_line-form'>
    
    
  {props.rewards?.length > 0 && <Form.Field
            name='parent_id'
            control={Select}
            options={props.rewards.map(reward=>{reward.key = reward._id.toString(); reward.value = reward._id.toString(); reward.text = `${reward.name}`; return reward})}
            label={{ children: 'Reward', htmlFor: 'form-select-control-parent' }}
            placeholder='Reward'
            search
            searchInput={{ id: 'form-select-control-parent' }}
            value={parent_id}
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

    {/* <Form.Group widths='equal'>
      <Form.Field
        name='ranking_order'
        id='form-input-control-first-ranking_order'
        control={Input}
        label='Ranking Order'
        placeholder='Ranking Order'
        value={ranking_order}
        type='number'
        min='0'
        onChange={handleChange}
      />

      <Form.Field
        name='beneficiary_target'
        id='form-input-control-first-beneficiary_target'
        control={Input}
        label='Beneficiary target'
        placeholder='Beneficiary target'
        value={beneficiary_target}
        type='number'
        min='0'
        onChange={handleChange}
      />
      <Form.Field
        name='reward_amount'
        id='form-input-control-first-reward_amount'
        control={Input}
        label='Reward Price'
        placeholder='Reward Price'
        value={reward_amount}
        type='number'
        min='0'
        onChange={handleChange}
      />
    </Form.Group> */}

<Form.Group widths='equal'>
     <Form.Field
            name='reward_type'
            control={Select}
            options={rewardTypeOptions}
            label={{ children: 'Reward Type', htmlFor: 'form-select-control-reward_type' }}
            placeholder='Reward Type'
            search
            searchInput={{ id: 'form-select-control-reward_type' }}
            value={reward_type}
            onChange={handleChange}
        />

      <Form.Field
        name='reward_percentage_of_amount'
        id='form-input-control-first-reward_percentage_of_amount'
        control={Input}
        label='Reward Percentage'
        placeholder='Reward Percentage'
        value={reward_percentage_of_amount}
        type='number'
        max='100'
        min='0'
        onChange={handleChange}
      />
    </Form.Group>
    
    <Form.Field>
            <Radio
                label='Is Elite'
                name='is_elite'
                value='1'
                checked={formValue.is_elite === '1'}
                onChange={handleChange}
            />
        </Form.Field>
        <Form.Field>
            <Radio
                label='Is Collaborator'
                value='0'
                name='is_elite'
                checked={formValue.is_elite === '0'}
                onChange={handleChange}
            />
        </Form.Field>

  </Form>
    </>
)
}

export default reduxForm({
    form: "rewardlineform"
})(RewardLineForm)