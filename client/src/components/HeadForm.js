
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, TextArea, Select } from 'semantic-ui-react'
import { addHead, editHead } from '../services/headServices/HeadServices'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const HeadForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {

        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
    }, [error,dispatch,props])


    const [formValue, setFormValue] = React.useState({
        first_name: props.is_edit===true ? props.head.first_name : '', last_name: props.is_edit===true ? props.head.last_name : '', gender: props.is_edit===true ? props.head.gender : '', phone_number: props.is_edit===true ? props.head.phone_number : '', id_card: props.is_edit===true ? props.head.id_card : '', date_of_birth: props.is_edit===true ? props.head.date_of_birth : '', remarks: props.is_edit===true ? props.head.remarks : '', email: props.is_edit===true ? props.head.email : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('In handleSubmit', formValue);
    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.head._id
      await dispatch(editHead(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } else{
      await dispatch(addHead(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    // console.log('HeadForm : In handleSubmit addHead res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      first_name: '', last_name: '', gender: '', phone_number: '', id_card: '', date_of_birth: '', remarks: '', email: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.is_edit !== true && await props.loadHeads()
      props.is_edit === true && await props.loadHead()
  }, 5000)
}
const {
    first_name, last_name, gender, phone_number, id_card, date_of_birth, remarks, email
} = formValue;
return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='head-form'>
    <Form.Group widths='equal'>
      <Form.Field
        name='first_name'
        id='form-input-control-first-name'
        control={Input}
        label='First name'
        placeholder='First name'
        value={first_name}
        onChange={handleChange}

      />
      <Form.Field
        name='last_name'
        id='form-input-control-last-name'
        control={Input}
        label='Last name'
        placeholder='Last name'
        value={last_name}
        onChange={handleChange}
      />
      <Form.Field
        name='gender'
        control={Select}
        options={genderOptions}
        label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
        placeholder='Gender'
        search
        searchInput={{ id: 'form-select-control-gender' }}
        value={gender}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field
        name='phone_number'
        id='form-input-control-phone-number'
        control={Input}
        label='Phone Number'
        placeholder='Phone Number'
        value={phone_number}
        onChange={handleChange}
      />
      <Form.Field>
      <label>ID Card Number</label>
        <Input 
          placeholder='ID Card Number'
            name='id_card'
            type='text' 
          value={id_card}
          onChange={handleChange} title="Please enter the 10 numbers on your National Id card" pattern="[0-9]{10}" />
      </Form.Field>
      <Form.Field>
        <label>Date of birth</label>
        <Input 
        name='date_of_birth'
        type='date'
        value={date_of_birth}
        onChange={handleChange}
        placeholder='Date of birth'/>
      </Form.Field>
    </Form.Group>
    <Form.Field
        name='remarks'
        id='form-textarea-control-remarks'
        control={TextArea}
        label='Remarks'
        placeholder='Remarks'
        value={remarks}
        onChange={handleChange}
    />
    <Form.Field
        name='email'
        type='email'
      id='form-input-control-error-email'
      control={Input}
      label='Email'
      placeholder='john.doe@company.com'
    //   error={{
    //     content: 'Please enter a valid email address',
    //     pointing: 'below',
    //   }}
      value={email}
      onChange={handleChange}
    />
  </Form>
    </>
)
}

export default reduxForm({
    form: "headform"
})(HeadForm)