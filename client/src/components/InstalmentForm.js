
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { addInstalment, editInstalment } from '../services/InstalmentServices/InstalmentServices';

const InstalmentForm = (props) => {
    
    const user = useSelector(state => state.auth.currentUser);
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In Instalment props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
    }, [])

    const [formValue, setFormValue] = React.useState({
        name: props.is_edit===true ? props.instalment.name : '', total_amount: props.is_edit===true ? props.instalment.total_amount : '',  number_of_payment_instalment: props.is_edit===true ? props.instalment.number_of_payment_instalment : '', 
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('In handleSubmit', formValue);
    formValue.created_by = user
    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.instalment?._id
      formValue.modified_by = user
      await dispatch(editInstalment(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } 
    else {
      if (!props.in_instalment_page ) {
        formValue.parent_id = props.parent?._id || null        
      }
      console.log('enter else formValue', formValue)
      await dispatch(addInstalment(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading, props.in_instalment_page));
    }
    // console.log('Instalment : In handleSubmit addInstalment res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
       name: '', total_amount: '', number_of_payment_instalment: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadInstallments && await props.loadInstallments()
  }, 5000)
}

const {
    name, total_amount, number_of_payment_instalment
} = formValue;

return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='instalment-form'>
    
        
    <Form.Group widths='equal'>      
        <Form.Field
            name='name'
            id='form-input-control-phone-name'
            control={Input}
            label='Name'
            placeholder='Name'
            value={name}
            onChange={handleChange}
        />
    </Form.Group>
    <Form.Group widths='equal'>      
      <Form.Field>
        <label>Total Amount'</label>
        <Input 
        name='total_amount'
        id='form-input-control-phone-total_amount'
        type='number'
        placeholder='Total Amount'
        value={total_amount}
        onChange={handleChange}/>
      </Form.Field>

      <Form.Field>
        <label>Nbr. of Payment Instalment</label>
        <Input 
        name='number_of_payment_instalment'
        id='form-input-control-phone-number_of_payment_instalment'
        type='number'
        placeholder='Nbr. of Payment Instalment'
        value={number_of_payment_instalment}
        onChange={handleChange}/>
      </Form.Field>

    </Form.Group>
  </Form>
    </>
)
}

export default reduxForm({
    form: "instalmentform"
})(InstalmentForm)