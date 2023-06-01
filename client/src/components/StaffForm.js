
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, TextArea, Select } from 'semantic-ui-react'
import { addHead, } from '../services/headServices/HeadServices'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { getUserRoles } from '../services/UserRoleServices/UserRoleServices';
import { editGeneralsGeneric, getGeneralsGeneric } from '../services/GeneralServices/GeneralServices.js';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const StaffForm = (props) => {
    const { setIsLoading} =props
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [user_roles, setUserRoles] = useState([])
    const [generals, setGenerals] = useState([]);  
  

    const dispatch = useDispatch();

    useEffect(() => {

        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        
        (async () => {
            await loadUserRoles()
            await loadGenerals()
          })()

    }, [])


    const [formValue, setFormValue] = React.useState({
      role_id: props.is_edit===true ? props.staff?.role?._id : '', first_name: props.is_edit===true ? props.staff?.first_name : '', last_name: props.is_edit===true ? props.staff?.last_name : '', gender: props.is_edit===true ? props.staff?.gender : '', phone_number: props.is_edit===true ? props.staff?.phone_number : '', id_card: props.is_edit===true ? props.staff?.id_card : '', date_of_birth: props.is_edit===true ? props.staff?.date_of_birth : '', remarks: props.is_edit===true ? props.staff?.remarks : '', email: props.is_edit===true ? props.staff?.email : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
      
  if (name === 'parent_id') {
    let _user = generals.filter(item=> item._id == value)[0]
    setFormValue({ ...formValue, ..._user })
    // console.log('formValue', formValue)
    
  }
}
const loadGenerals = async () => { 
    let query = {'is_staff': true}       
    const response = await dispatch(getGeneralsGeneric(query,setErrorMessage, setSuccessMessage, setIsLoading));
    setGenerals(response.data) 
}

const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('In handleSubmit', formValue);
    if(props.is_edit === true) {
      let _user = generals.filter(item=> item._id === formValue.parent_id)
      formValue.role = user_roles.filter(item=> item._id == formValue.role_id)[0];
      formValue.query = {email: formValue.email}
      await dispatch(editGeneralsGeneric(formValue, setErrorMessage, setSuccessMessage, setIsLoading));  
    } else{
      await dispatch(addHead(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    // console.log('StaffForm : In handleSubmit addHead res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
       role_id:'', first_name: '', last_name: '', gender: '', phone_number: '', id_card: '', date_of_birth: '', remarks: '', email: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
  }, 5000)
}

    const loadUserRoles = async () => {        
        const response = await dispatch(getUserRoles(setErrorMessage, setErrorMessage, setIsLoading));
        // console.log('response', response)
        setUserRoles(response.data) 
    }

const {
  parent_id, role_id, first_name, last_name, gender, phone_number, id_card, date_of_birth, remarks, email
} = formValue;
return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='general_user-form'>

      {user_roles?.length > 0 && <Form.Field
              name='role_id'
              control={Select}
              options={user_roles.map(user_role=>{user_role.key = user_role._id.toString(); user_role.value = user_role._id.toString(); user_role.text = `${user_role.name}`; return user_role})}
              label={{ children: 'User Role', htmlFor: 'form-select-control-role_id' }}
              placeholder='User Role'
              search
              value={role_id}
              onChange={handleChange}
              searchInput={{ id: 'form-select-control-role_id' }}
          />}

      {generals?.length > 0 && <Form.Field
                  name='parent_id'
                  disabled={props.in_beneficiary_page ? false : false}
                  control={Select}
                  options={generals.filter(item=>item.is_staff === true).map(general=>{general.is_beneficiary = general.is_beneficiary.toString();general.is_collaborator = general.is_collaborator.toString();general.is_beneficiary = general.is_beneficiary.toString();general.is_lead = general.is_lead.toString();general.key = general._id.toString(); general.value = general._id.toString(); general.text = `${general.email}`; return general})}
                  label={{ children: 'Parent', htmlFor: 'form-select-control-parent' }}
                  placeholder='Parent'
                  search
                  searchInput={{ id: 'form-select-control-parent' }}
                  value={parent_id}
                  onChange={handleChange}
        />}

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
      value={email}
      onChange={handleChange}
    />
  </Form>
    </>
)
}

export default reduxForm({
    form: "staffform"
})(StaffForm)