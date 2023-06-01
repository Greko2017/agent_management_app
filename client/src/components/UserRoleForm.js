
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, } from 'semantic-ui-react'
import { addUserRole, editUserRole } from '../services/UserRoleServices/UserRoleServices'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";

const UserRoleForm = (props) => {
    
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
        name: props.is_edit===true ? props.user_role.name : '',
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('In handleSubmit', formValue);
    formValue.created_by = user
    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.user_role._id
      await dispatch(editUserRole(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } else{
      await dispatch(addUserRole(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    // console.log('UserRoleForm : In handleSubmit addUserRole res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      name: '',
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadUserRoles && await props.loadUserRoles()
      props.loadUserRole && await props.loadUserRole()
  }, 5000)
}
const {
    name,
} = formValue;
return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='user_role-form'>
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
  </Form>
    </>
)
}

export default reduxForm({
    form: "user_roleform"
})(UserRoleForm)