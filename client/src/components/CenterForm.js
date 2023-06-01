
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, TextArea, Select } from 'semantic-ui-react'
import { addCenter, editCenter } from '../services/CenterServices/CenterServices'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";

const countryOptions = [
    { key: 'cm', text: 'Cameroun', value: 'cameroun' },
    { key: 'gb', text: 'Gabon', value: 'gabon' },
    { key: 'tc', text: 'Tchad', value: 'tchad' },
  ]
const cityOptions = [
  { key: 'dla', text: 'Douala', value: 'douala' },
  { key: 'yde', text: 'yaounde', value: 'yaounde' },
  { key: 'bue', text: 'Buea', value: 'buea' },
]

const CenterForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const user = useSelector(state => state.auth.currentUser);
    
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
        name: props.is_edit===true ? props.center.name : '', country: props.is_edit===true ? props.center.country : '', city: props.is_edit===true ? props.center.city : '', address: props.is_edit===true ? props.center.address : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('In handleSubmit', formValue);
    formValue.created_by = user
    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.center._id
      await dispatch(editCenter(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } else{
      await dispatch(addCenter(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    // console.log('CenterForm : In handleSubmit addCenter res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      name: '', country: '', city: '', address: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadCenters && await props.loadCenters()
      props.loadCenter && await props.loadCenter()
  }, 5000)
}
const {
    name, country, city, address
} = formValue;
return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='center-form'>
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
        name='country'
        control={Select}
        options={countryOptions}
        label={{ children: 'Country', htmlFor: 'form-select-control-country' }}
        placeholder='Country'
        search
        searchInput={{ id: 'form-select-control-country' }}
        value={country}
        onChange={handleChange}
      />
      
      <Form.Field
        name='city'
        control={Select}
        options={cityOptions}
        label={{ children: 'City', htmlFor: 'form-select-control-city' }}
        placeholder='City'
        search
        searchInput={{ id: 'form-select-control-city' }}
        value={city}
        onChange={handleChange}
      />
      
      
    </Form.Group>

    <Form.Field
        name='address'
        id='form-textarea-control-address'
        control={TextArea}
        label='Address'
        placeholder='Address'
        value={address}
        onChange={handleChange}
    />
  </Form>
    </>
)
}

export default reduxForm({
    form: "centerform"
})(CenterForm)