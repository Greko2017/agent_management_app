import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, Select } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { editUserRolePermission, addUserRolePermission } from '../services/UserRolePermissionServices/UserRolePermissionServices';
import { getUserRoles } from '../services/UserRoleServices/UserRoleServices';
const setIsLoading = ( ) => {
    console.log('loading data...', )
}

const UserRolePermissionForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [user_roles, setUserRoles] = useState([])
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In UserRolePermissionForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await loadUserRoles()
        })()
    }, [])

    const loadUserRoles = async () => {        
        const response = await dispatch(getUserRoles(setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setUserRoles(response.data) 
    }

    const [formValue, setFormValue] = React.useState({
        module_name: props.is_edit===true ? props.user_role_permissions.module_name : '', role_id: props.is_edit===true ? props.user_role_permissions.role?._id : '', has_create: props.is_edit===true ? props.user_role_permissions.has_create : false,has_read: props.is_edit===true ? props.user_role_permissions.has_read : false, has_update: props.is_edit===true ? props.user_role_permissions.has_update : false, has_delete: props.is_edit===true ? props.user_role_permissions.has_delete : false,
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleChangeCheckBox = (e, { name, value }) => {
  console.log('name, value', e.target.checked); setFormValue({ ...formValue, [name]: e.target.checked })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formValue.role_id) {
        setErrorMessage({message: 'Please, Fill all required fiel'})
        return
    }
    formValue.role = user_roles.filter(item=> item._id == formValue.role_id)[0];
   
    if(props.is_edit === true) {
        formValue.modified_by = user
      formValue._id = props.user_role_permissions?._id
      await dispatch(editUserRolePermission(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } 
    else {
        formValue.created_by = user
      console.log('enter else formValue', formValue)
      await dispatch(addUserRolePermission(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading, props.in_collaborator_page));
    }
    setTimeout(async function() {
            props.is_edit !== true && props.setOpen(false)
            props.is_edit !== true && setFormValue({
                module_name: '', role_id: '', has_create: false, has_delete: false, has_read: false, has_update: false
            })
            setErrorMessage(null);
            setSuccessMessage(null);
            props.loadUserRolePermissions && await props.loadUserRolePermissions()
        }, 5000)
    }

    const {
        module_name, role_id, has_create, has_delete,has_read, has_update
    } = formValue;

    return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='user_role_permissions-form'>
          
    <Form.Field
        name='module_name'
        id='form-input-control-first-name'
        control={Input}
        label='Name'
        placeholder='Name'
        value={module_name}
        onChange={handleChange}

      />      
    
      {user_roles?.length > 0 && <Form.Field
            name='role_id'
            control={Select}
            options={user_roles.map(user_role=>{user_role.key = user_role._id.toString(); user_role.value = user_role._id.toString(); user_role.text = `${user_role.name}`; return user_role})}
            label={{ children: 'User Role', htmlFor: 'form-select-control-role_id' }}
            placeholder='User Role'
            search
            searchInput={{ id: 'form-select-control-role_id' }}
            value={role_id}
            onChange={handleChange}
        />}

        <Form.Group widths='equal' >
                    
            <Form.Field
                name='has_create'
                control={Input}
                type='checkbox'
                label={{ children: 'Create', htmlFor: 'form-select-control-has_create' }}
                placeholder='Create'
                id='form-select-control-has_create'
                value={has_create}
                checked={has_create}
                onChange={handleChangeCheckBox}
                />
            
      <Form.Field      
          name='has_read'
          control={Input}
          type='checkbox'
          label={{ children: 'Read', htmlFor: 'form-select-control-has_read' }}
          placeholder='Read'
          id='form-select-control-has_read'
          value={has_read}
          checked={has_read}
          onChange={handleChangeCheckBox}
        />
        {/* </Form.Group>
        
        <Form.Group> */}
            
      <Form.Field      
          name='has_update'
          control={Input}
          type='checkbox'
          label={{ children: 'Update', htmlFor: 'form-select-control-has_update' }}
          placeholder='Update'
          id='form-select-control-has_update'
          value={has_update}
          checked={has_update}
          onChange={handleChangeCheckBox}
        />
        <Form.Field      
            name='has_delete'
            control={Input}
            type='checkbox'
            label={{ children: 'Delete', htmlFor: 'form-select-control-has_delete' }}
            placeholder='Delete'
            id='form-select-control-has_delete'
            value={has_delete}
            checked={has_delete}
            onChange={handleChangeCheckBox}
          />
        </Form.Group>
  </Form>
    </>
)
}

export default reduxForm({
    form: "beneficiaeryinstalmentihistoryform"
})(UserRolePermissionForm)