
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, TextArea, Select } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { getHeads } from '../services/headServices/HeadServices';
import { addCollaborator, editCollaborator } from '../services/collaboratorServices/collaboratorServices';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const CollaboratorForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const user = useSelector(state => state.auth.currentUser);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [heads, setLeads] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In CollaboratorForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await loadHeads()
        })()
    }, [])

    const loadHeads = async () => {        
      const response = await dispatch(getHeads(setErrorMessage, setSuccessMessage, props.setIsLoading));
      // console.log('In loadHeads response', response)
      setLeads(response.data) 
    }

    const [formValue, setFormValue] = React.useState({
        first_name: props.is_edit===true ? props.collaborator.first_name : '', parent_id: props.is_edit===true ? props.collaborator.parent_id : '', last_name: props.is_edit===true ? props.collaborator.last_name : '', gender: props.is_edit===true ? props.collaborator.gender : '', phone_number: props.is_edit===true ? props.collaborator.phone_number : '', id_card: props.is_edit===true ? props.collaborator.id_card : '', date_of_birth: props.is_edit===true ? props.collaborator.date_of_birth : '', remarks: props.is_edit===true ? props.collaborator.remarks : '', email: props.is_edit===true ? props.collaborator.email : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValue.parent_id === '') {
      formValue.parent_id = props.parent?._id
    }
    formValue.parent = heads.filter(item=>item._id == formValue.parent_id)[0]
    console.log('In handleSubmit', formValue);
    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.collaborator?._id
      formValue.modified_by = user
      await dispatch(editCollaborator(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } 
    else {
      if (!props.in_collaborator_page ) {
        formValue.parent_id = props.parent?._id || null        
      }
      formValue.created_by = user
      console.log('enter else formValue', formValue)
      await dispatch(addCollaborator(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading, props.in_collaborator_page));
    }
    // console.log('CollaboratorForm : In handleSubmit addCollaborator res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      first_name: '', last_name: '', gender: '', phone_number: '', id_card: '', date_of_birth: '', remarks: '', email: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadHeads && props.is_edit !== true && await props.loadHeads()
      props.loadHead && await props.loadHead()
      props.loadCollaborators && await props.loadCollaborators()
  }, 5000)
}

const {
    first_name, last_name, gender, phone_number, id_card, date_of_birth, remarks, email, parent_id
} = formValue;

return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='collaborator-form'>
    
    {heads.length > 0 && <Form.Field
            name='parent_id'
            disabled={props.in_collaborator_page ? false : false}
            control={Select}
            options={heads.map(head=>{head.is_beneficiary = head.is_beneficiary.toString();head.is_collaborator = head.is_collaborator.toString();head.is_lead = head.is_lead.toString();head.key = head._id.toString(); head.value = head._id.toString(); head.text = `${head.first_name}, ${head.last_name }`; return head})}
            label={{ children: 'Parent', htmlFor: 'form-select-control-parent_id' }}
            placeholder='Parent'
            search
            searchInput={{ id: 'form-select-control-parent_id' }}
            // value={parent_id}
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
    form: "collaboratorform"
})(CollaboratorForm)