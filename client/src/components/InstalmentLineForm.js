
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, Select } from 'semantic-ui-react'
import { addInstalmentLine, editInstalmentLine } from '../services/InstalmentServices/InstalmentServices'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import {generateName} from '../utils/tools'
import { getRewards } from '../services/RewardServices/RewardServices';

const InstalmentLineLineForm = (props) => {
    
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


    const [formValue, setFormValue] = React.useState({
      reward_id: props.is_edit===true ? props.instalment_line?.reward?._id : '', is_first_instalment: props.is_edit===true ? props.instalment_line.is_first_instalment : false, name: props.is_edit===true ? props.instalment_line.name : generateName('INS_LN'), due_date: props.is_edit===true ? props.instalment_line.due_date.substring(0,10) : '', percentage_of_total_amount: props.is_edit===true ? props.instalment_line.percentage_of_total_amount : '', amount: props.is_edit===true ? props.instalment_line.amount : '', parent_id: props.is_edit===true ? props.instalment_line.parent?._id : props.parent ? props.parent._id : '',
    })

    const loadRewards = async () => {    
      const response = await dispatch(getRewards(setErrorMessage, setSuccessMessage, props.setIsLoading));
      setRewards(response.data) 
  }

const handleChange = (e, { name, value }) => {
  console.log('name, value', e.target.checked); setFormValue({ ...formValue, [name]: value })
}
const handleChangeCheckBox = (e, { name, value }) => {
  console.log('name, value', e.target.checked); setFormValue({ ...formValue, [name]: e.target.checked })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    formValue.parent = props.installments.filter(item => item._id === formValue.parent_id)[0];
    formValue.reward = rewards.filter(item=> item._id == formValue.reward_id)[0]
    console.log('In handleSubmit', formValue);
    // return
    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.instalment_line._id
      formValue.modified_by = user
      await dispatch(editInstalmentLine(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } else{
      formValue.created_by = user
      await dispatch(addInstalmentLine(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    // console.log('InstalmentLineLineForm : In handleSubmit addInstalmentLine res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      name: '', due_date: '', percentage_of_total_amount: '', amount: '', 
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadInstalmentLineLines && await props.loadInstalmentLineLines()
      props.loadInstalmentLine && await props.loadInstalmentLine()
      props.loadInstalmentDetails && await props.loadInstalmentDetails()
  }, 5000)
}
const {
  reward_id, name, due_date, percentage_of_total_amount, amount, parent_id, is_first_instalment
} = formValue;
return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='instalmentline-form'>
    
  {props.installments?.length > 0 && <Form.Field
            name='parent_id'
            control={Select}
            options={props.installments.map(instalment=>{instalment.key = instalment._id.toString(); instalment.value = instalment._id.toString(); instalment.text = `${instalment.name}`; return instalment})}
            label={{ children: 'Parent', htmlFor: 'form-select-control-parent' }}
            placeholder='Parent'
            search
            id= 'form-select-control-parent'
            value={props.parent && Object.keys(props.parent).length > 0 ? props.parent._id : parent_id}
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
    <Form.Group widths='equal'>    
      
      <Form.Field
        name='percentage_of_total_amount'
        control={Input}
        label={{ children: '% of Toatal Amount', htmlFor: 'form-select-control-percentage_of_total_amount' }}
        placeholder='% of Toatal Amount'
        id='form-select-control-percentage_of_total_amount'
        value={percentage_of_total_amount}
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

    <Form.Group  widths='equal'>
      <Form.Field
          name='amount'
          id='form-textarea-control-amount'
          control={Input}
          label='Amount'
          placeholder='Amount'
          value={amount}
          onChange={handleChange}
      />

      <Form.Field
          name='due_date'
          control={Input}
          type='date'
          label={{ children: 'Due Date', htmlFor: 'form-select-control-due_date' }}
          placeholder='Due Date'
          id='form-select-control-due_date'
          value={due_date}
          onChange={handleChange}
        />

      <Form.Field      
          name='is_first_instalment'
          control={Input}
          type='checkbox'
          label={{ children: 'Is this the 1st Instalment ?', htmlFor: 'form-select-control-is_first_instalment' }}
          placeholder='iIs this the 1st Instalment ?'
          id='form-select-control-is_first_instalment'
          title='Pay attention ! This will be use to reward participant'
          value={is_first_instalment}
          checked={is_first_instalment}
          onChange={handleChangeCheckBox}
        />

    </Form.Group>
    
  </Form>
    </>
)
}

export default reduxForm({
    form: "instalmentlineform"
})(InstalmentLineLineForm)

