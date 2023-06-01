
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, TextArea, Select, Divider, Header, Icon, Dropdown } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { addBeneficiary, editBeneficiary, getBeneficiariesByParentId } from '../services/BeneficiaryServices/BeneficiaryServices';
import { getGenerals } from '../services/GeneralServices/GeneralServices';
import { getAllAccountsOfParticipantByParticipantId } from '../services/ParticipantAccountParticipantServices/ParticipantAccountParticipantServices';
import { getParticipantAccounts } from '../services/ParticipantAccountServices/ParticipantAccountServices';
const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]


const accountTypeOptions = [
  { key: 'common', text: 'Common', value: 'common' },
  { key: 'elite', text: 'Elite', value: 'elite' },
  { key: 'collaborator', text: 'Collaborator', value: 'collaborator' },
]

const BeneficiaryForm = (props) => {
    
    const user = useSelector(state => state.auth.currentUser);
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [generals, setGenerals] = useState([]);  
    const [parent_collaborator_accounts, setParentCollaboratorAccounts] = useState([])
    const [collaborator_elite_accounts, setCollaboratorEliteAccounts] = useState([])
    const [parents_common_accounts, setParentsCommonAccounts] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('In BeneficiaryForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          // await loadCollaborators()
          await loadGenerals()
          .then(async tmp_generals=>{
            if (props.is_edit && props.parent) {
              // console.log('-- loadGenerals props.parent', props.parent?._id, tmp_participant)
              await loadAccounts(props.parent?._id, tmp_generals)
            }
          })
        })()
    }, [])
    
    const loadCollaboratorAccountByItsId = async (collaborator_id) => {        
          const response = await dispatch(getBeneficiariesByParentId(setErrorMessage, setSuccessMessage, props.setIsLoading));
          setGenerals(response.data) 
      }

      
    
  const loadParentCollaboratorAccounts = async (collaborator_id) => {         
      const body  =// {"participants.participant_id": {$all: [collaborator_id]}}
      {
        "participants": { $size: 1, $elemMatch: { "participant_id": collaborator_id } }
      }
      const response = await dispatch(getParticipantAccounts(body, setErrorMessage, setSuccessMessage, props.setIsLoading));
      setParentCollaboratorAccounts(response.data) 
  }

const loadCollaboratorEliteAccounts = async (elite_id) => {         
  // console.log('--loadCollaboratorEliteAccounts elite_id', elite_id)
  const body  = // {"participants.participant_id": {$all: [elite_id]}}
  {
    "participants": { $size: 1, $elemMatch: { "participant_id": elite_id } }
  }
  const response = await dispatch(getParticipantAccounts(body, setErrorMessage, setSuccessMessage, props.setIsLoading));
  // console.log('-- loadCollaboratorEliteAccounts', response.data)
  setCollaboratorEliteAccounts(response.data) 
}

const loadEliteCommonAccounts = async (elite_id ) => {
console.log('-- loadEliteCommonAccounts elite_id', elite_id)
  const body  = {
    "participants": {
        "$elemMatch": {
            "participant_id": elite_id
        }
    },
    "$where": "this.participants.length > 1"
}
  const response = await dispatch(getParticipantAccounts(body, setErrorMessage, setSuccessMessage, props.setIsLoading));
  setParentsCommonAccounts(response.data) 
  console.log('-- loadEliteCommonAccounts', response.date)
}

const loadParentsCommonAccounts = async (elite_id, collaborator_id) => {         
  const body  = {"participants.participant_id": {$all: [elite_id, collaborator_id]}
  }
  const response = await dispatch(getParticipantAccounts(body, setErrorMessage, setSuccessMessage, props.setIsLoading));
  setParentsCommonAccounts(response.data) 
  // console.log('-- loadParentsCommonAccounts', response.date)
}

  const loadGenerals = async () => {        
    const response = await dispatch(getGenerals(setErrorMessage, setSuccessMessage, props.setIsLoading));
    setGenerals(response.data) 
    return response.data
}

    const [formValue, setFormValue] = React.useState({
      parent_collaborator_account: props.is_edit===true ? props.beneficiary?.parent_collaborator_account_id : '', collaborator_elite_account: props.is_edit===true ? props.beneficiary?.collaborator_elite_account_id : '', parents_common_account: props.is_edit===true ? props.beneficiary?.parents_common_account_id : '',instalment_id: props.is_edit===true ? props.beneficiary?.instalment?._id : '', first_name: props.is_edit===true ? props.beneficiary.first_name : '', parent_id: props.is_edit===true ? props.beneficiary.parent_id : '', last_name: props.is_edit===true ? props.beneficiary.last_name : '', gender: props.is_edit===true ? props.beneficiary.gender : '', phone_number: props.is_edit===true ? props.beneficiary.phone_number : '', id_card: props.is_edit===true ? props.beneficiary.id_card : '', date_of_birth: props.is_edit===true ? props.beneficiary.date_of_birth : '', remarks: props.is_edit===true ? props.beneficiary.remarks : '', email: props.is_edit===true ? props.beneficiary.email : ''
    })
const loadAccounts = async (parent_id, _generals) => {
  let elite_id; let collaborator_id
  let tmp_participant = _generals.filter(item=> item._id == parent_id)[0]
  if (tmp_participant.is_collaborator === 'true') {
    collaborator_id = tmp_participant._id;
    elite_id = tmp_participant.parent_id;
    
    await loadParentCollaboratorAccounts(collaborator_id)
    await loadCollaboratorEliteAccounts(elite_id)
    await loadParentsCommonAccounts(elite_id, collaborator_id)
      

  } else if (tmp_participant.is_lead === 'true') {
    elite_id = tmp_participant._id
      console.log('handleChange elite_id, collaborator_id', elite_id, collaborator_id)
      await loadCollaboratorEliteAccounts(elite_id)
      await loadEliteCommonAccounts(elite_id)    
  }
}
const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
    if (name === 'Parent') {
      (async()=>{
        await loadAccounts(value, generals)
      } )()
    }
}
const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValue.parent_id === '') {
      formValue.parent_id = props.parent?._id
    }
    formValue.parent = generals.filter(item=>item._id == formValue.parent_id)[0]
    if (props.is_edit) {
      formValue.instalment = props.installments.filter(item=>item._id == formValue.instalment_id)[0]
      formValue.center = props.centers.filter(item=>item._id == formValue['Center'])[0]
      // console.log('In handleSubmit', formValue);
      // assign account:
      formValue.parents_common_account_id = formValue.parents_common_account
      formValue.parents_common_account = parents_common_accounts.filter(item=>item._id== formValue.parents_common_account)[0]
      
      formValue.collaborator_elite_account_id = formValue.collaborator_elite_account
      formValue.collaborator_elite_account = collaborator_elite_accounts.filter(item=>item._id== formValue.collaborator_elite_account)[0]
      
      formValue.parent_collaborator_account_id = formValue.parent_collaborator_account
      formValue.parent_collaborator_account = parent_collaborator_accounts.filter(item=>item._id== formValue.parent_collaborator_account)[0]
    }
    if(props.is_edit === true) {
      formValue._id = props.beneficiary?._id
      formValue.modified_by = user
      await dispatch(editBeneficiary(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } 
    else {
      if (!props.in_beneficiary_page ) {
        formValue.parent_id = props.parent?._id || formValue.parent_id
      }
      formValue.created_by = user
      // console.log('enter else formValue', formValue)
      await dispatch(addBeneficiary(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading, props.in_beneficiary_page));
    }
    // console.log('BeneficiaryForm : In handleSubmit addBeneficiary res', res)
    // return
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      first_name: '', last_name: '', gender: '', phone_number: '', id_card: '', date_of_birth: '', remarks: '', email: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.is_edit !== true && props.loadCollaborators && await props.loadCollaborators()
      props.is_edit === true && props.loadHead && await props.loadHead()
      props.loadBeneficiaries && await props.loadBeneficiaries()
  }, 5000)
}

const {
  parents_common_account, parent_collaborator_account,collaborator_elite_account,  reward_type, collaborator_account, first_name, last_name, gender, phone_number, id_card, date_of_birth, remarks, email, parent_id, center_id, instalment_id
} = formValue;

return (
    <>
    {/* <p>parents_common_accounts: {JSON.stringify(parents_common_accounts )}</p>
    <p>collaborator_elite_accounts: {JSON.stringify(collaborator_elite_accounts )}</p>
    <p>parent_collaborator_accounts: {JSON.stringify(parent_collaborator_accounts )}</p> */}
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='beneficiary-form'>
    
    {generals?.length > 0 && <Form.Field
            name='parent_id'
            disabled={props.in_beneficiary_page ? false : false}
            control={Select}
            options={generals.map(general=>{general.is_beneficiary = general.is_beneficiary.toString();general.is_collaborator = general.is_collaborator.toString();general.is_beneficiary = general.is_beneficiary.toString();general.is_lead = general.is_lead.toString();general.key = general._id.toString(); general.value = general._id.toString(); general.text = ` ${general.last_name } | ${general.phone_number}`; return general})}
            label={{ children: 'Parent', htmlFor: 'form-select-control-parent_id' }}
            placeholder='Parent'
            search
            searchInput={{ id: 'form-select-control-parent_id' }}
            value={parent_id}
            onChange={handleChange}
        />}
        
  {props.installments?.length > 0 && <Form.Field
            name='instalment_id'
            disabled={props.in_beneficiary_page ? false : false}
            control={Select}
            options={props.installments.map(instalment=>{instalment.value = instalment._id.toString(); instalment.text = `${instalment.name}`; return instalment})}
            label={{ children: 'Instalment', htmlFor: 'form-select-control-instalment' }}
            placeholder='Instalment'
            search
            searchInput={{ id: 'form-select-control-instalment' }}
            value={instalment_id}
            onChange={handleChange}
        />}


    {props.centers?.length > 0 && <Form.Field
            name='Center'
            disabled={false}
            control={Select}
            options={props.centers.map(head=>{head.key = head._id.toString(); head.value = head._id.toString(); head.text = `${head.name}`; return head})}
            label={{ children: 'Center', htmlFor: 'form-select-control-center' }}
            placeholder='Center'
            search
            searchInput={{ id: 'form-select-control-center' }}
            value={center_id}
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
    
    <Divider horizontal>
      <Header as='h4'>
        <Icon name='setting' />
        Reward Configuration
      </Header>
    </Divider>
            {/* <>{JSON.stringify(props.parent)}</> */}
    {props.parent?.is_lead === "true" ? (  
        <>
          <h4>Parent {`${props.parent?.last_name}, ${props.parent?.first_name}` } is an Elite</h4>
          
          <Form.Group  widths='equal'>

          {generals?.length > 0 && <Form.Field
                  name='elite_and_collaborator'
                  // disabled={true}
                  control={Dropdown}
                  options={[...generals].map(_general=>{_general.is_beneficiary = _general.is_beneficiary.toString();_general.is_collaborator = _general.is_collaborator.toString();_general.is_beneficiary = _general.is_beneficiary.toString();_general.is_lead = _general.is_lead.toString();_general.key = _general._id.toString(); _general.value = _general._id.toString(); _general.text = `${_general.first_name} | ${_general.phone_number}`; return _general})}
                  label={{ children: 'Elite and Collaborators', htmlFor: 'form-select-control-elite_and_collaborator' }}
                  placeholder='Elite and Collaborators'
                  search  fluid multiple selection
                  searchInput={{ id: 'form-select-control-elite_and_collaborator' }}
                  value={[props.parent?._id]}
                  onChange={handleChange}
              />}

              {true > 0 && <Form.Field
                name='reward_type'
                disabled={false}
                control={Select}
                options={accountTypeOptions}
                label={{ children: 'Reward Type', htmlFor: 'form-select-control-center' }}
                placeholder='Reward Type'
                search
                searchInput={{ id: 'form-select-control-reward_type' }}
                value={'common'}
                onChange={handleChange}
            />} 
            
              {parents_common_accounts?.length > 0 && <Form.Field
                name='parents_common_account'
                disabled={false}
                control={Select}
                options={parents_common_accounts.map(parents_common_account=>{parents_common_account.value = parents_common_account._id.toString(); parents_common_account.text = `${parents_common_account.name}`; return parents_common_account})}
                label={{ children: 'Common Account', htmlFor: 'form-select-control-parents_common_account' }}
                placeholder="Collaborator's Common Account with is Elite"
                search
                searchInput={{ id: 'form-select-control-parents_common_account' }}
                value={parents_common_account}
                onChange={handleChange}
            />} 
          </Form.Group>

          
          <Form.Group  widths='equal'>

          {generals?.length > 0 && <Form.Field
                  name='elite'
                  // disabled={true}
                  control={Select}
                  options={generals.map(general=>{general.is_beneficiary = general.is_beneficiary.toString();general.is_collaborator = general.is_collaborator.toString();general.is_beneficiary = general.is_beneficiary.toString();general.is_lead = general.is_lead.toString();general.key = general._id.toString(); general.value = general._id.toString(); general.text = `${general.first_name} | ${general.phone_number}`; return general})}
                  label={{ children: 'Elite', htmlFor: 'form-select-control-elite' }}
                  placeholder='Elite'
                  search
                  searchInput={{ id: 'form-select-control-elite' }}
                  value={props.parent?._id}
                  onChange={handleChange}
              />}

              {true > 0 && <Form.Field
                name='reward_type'
                disabled={false}
                control={Select}
                options={accountTypeOptions}
                label={{ children: 'Reward Type', htmlFor: 'form-select-control-center' }}
                placeholder='Reward Type'
                search
                searchInput={{ id: 'form-select-control-reward_type' }}
                value={'elite'}
                onChange={handleChange}
            />} 
            
              {collaborator_elite_accounts?.length > 0 && <Form.Field
                name='collaborator_elite_account'
                disabled={false}
                control={Select}
                options={collaborator_elite_accounts.map(parents_common_account=>{parents_common_account.value = parents_common_account._id.toString(); parents_common_account.text = `${parents_common_account.name}`; return parents_common_account})}
                label={{ children: 'Elite Account', htmlFor: 'form-select-control-collaborator_elite_account' }}
                placeholder="Elite Account"
                search
                searchInput={{ id: 'form-select-control-collaborator_elite_account' }}
                value={collaborator_elite_account}
                onChange={handleChange}
            />} 
          </Form.Group>

        </>

        // to select the reward
        // then based on the is_elite on reward lines and is_lead on beneficiary parent ? load the percentage to reward
        // then for each reward_type list the account associated to the participant. e.g
    ) : props.parent?.is_collaborator === "true" ? (
        <>
          <h4>Parent {`${props.parent?.last_name}, ${props.parent?.first_name}` } is a Collaborator</h4>
          
          <Form.Group  widths='equal'>

          {generals?.length > 0 && <Form.Field
                  name='elite_and_collaborator'
                  // disabled={true}
                  control={Dropdown}
                  options={[...generals].map(_general=>{_general.is_beneficiary = _general.is_beneficiary.toString();_general.is_collaborator = _general.is_collaborator.toString();_general.is_beneficiary = _general.is_beneficiary.toString();_general.is_lead = _general.is_lead.toString();_general.key = _general._id.toString(); _general.value = _general._id.toString(); _general.text = `${_general.first_name} | ${_general.phone_number}`; return _general})}
                  label={{ children: 'Elite and Collaborator', htmlFor: 'form-select-control-elite_and_collaborator' }}
                  placeholder='Elite and Collaborator'
                  search  fluid multiple selection
                  searchInput={{ id: 'form-select-control-elite_and_collaborator' }}
                  value={[props.parent?._id, props.parent?.parent_id]}
                  onChange={handleChange}
              />}

              {true > 0 && <Form.Field
                name='reward_type'
                disabled={false}
                control={Select}
                options={accountTypeOptions}
                label={{ children: 'Reward Type', htmlFor: 'form-select-control-center' }}
                placeholder='Reward Type'
                search
                searchInput={{ id: 'form-select-control-reward_type' }}
                value={'common'}
                onChange={handleChange}
            />} 
            
              {parents_common_accounts?.length > 0 && <Form.Field
                name='parents_common_account'
                disabled={false}
                control={Select}
                options={parents_common_accounts.map(parents_common_account=>{parents_common_account.value = parents_common_account._id.toString(); parents_common_account.text = `${parents_common_account.name}`; return parents_common_account})}
                label={{ children: 'Common Account', htmlFor: 'form-select-control-parents_common_account' }}
                placeholder="Collaborator's Common Account with is Elite"
                search
                searchInput={{ id: 'form-select-control-parents_common_account' }}
                value={parents_common_account}
                onChange={handleChange}
            />} 
          </Form.Group>

          
          <Form.Group  widths='equal'>

          {generals?.length > 0 && <Form.Field
                  name='elite'
                  // disabled={true}
                  control={Select}
                  options={generals.map(general=>{general.is_beneficiary = general.is_beneficiary.toString();general.is_collaborator = general.is_collaborator.toString();general.is_beneficiary = general.is_beneficiary.toString();general.is_lead = general.is_lead.toString();general.key = general._id.toString(); general.value = general._id.toString(); general.text = `${general.first_name} | ${general.phone_number}`; return general})}
                  label={{ children: 'Elite', htmlFor: 'form-select-control-elite' }}
                  placeholder='Elite'
                  search
                  searchInput={{ id: 'form-select-control-elite' }}
                  value={props.parent?.parent_id}
                  onChange={handleChange}
              />}

              {true > 0 && <Form.Field
                name='reward_type'
                disabled={false}
                control={Select}
                options={accountTypeOptions}
                label={{ children: 'Reward Type', htmlFor: 'form-select-control-center' }}
                placeholder='Reward Type'
                search
                searchInput={{ id: 'form-select-control-reward_type' }}
                value={'elite'}
                onChange={handleChange}
            />} 
            
              {collaborator_elite_accounts?.length > 0 && <Form.Field
                name='collaborator_elite_account'
                disabled={false}
                control={Select}
                options={collaborator_elite_accounts.map(parents_common_account=>{parents_common_account.value = parents_common_account._id.toString(); parents_common_account.text = `${parents_common_account.name}`; return parents_common_account})}
                label={{ children: 'Elite Account', htmlFor: 'form-select-control-collaborator_elite_account' }}
                placeholder="Elite Account"
                search
                searchInput={{ id: 'form-select-control-collaborator_elite_account' }}
                value={collaborator_elite_account}
                onChange={handleChange}
            />} 
          </Form.Group>

          
          <Form.Group  widths='equal'>

          {generals?.length > 0 && <Form.Field
                  name='Collaborator'
                  control={Select}
                  options={generals.map(general=>{general.is_beneficiary = general.is_beneficiary.toString();general.is_collaborator = general.is_collaborator.toString();general.is_beneficiary = general.is_beneficiary.toString();general.is_lead = general.is_lead.toString();general.key = general._id.toString(); general.value = general._id.toString(); general.text = `${general.first_name} | ${general.phone_number}`; return general})}
                  label={{ children: 'Collaborator', htmlFor: 'form-select-control-collaborator' }}
                  placeholder='Collaborator'
                  search
                  searchInput={{ id: 'form-select-control-collaborator' }}
                  value={props.parent?._id}
                  onChange={handleChange}
              />}

              {true && <Form.Field
                name='reward_type'
                disabled={false}
                control={Select}
                options={accountTypeOptions}
                label={{ children: 'Reward Type', htmlFor: 'form-select-control-center' }}
                placeholder='Reward Type'
                search
                searchInput={{ id: 'form-select-control-reward_type' }}
                value={'collaborator'}
                onChange={handleChange}
            />} 
            
              {parent_collaborator_accounts?.length > 0 && <Form.Field
                name='parent_collaborator_account'
                disabled={false}
                control={Select}
                options={parent_collaborator_accounts.map(parents_common_account=>{parents_common_account.value = parents_common_account._id.toString(); parents_common_account.text = `${parents_common_account.name}`; return parents_common_account})}
                label={{ children: 'Collaborator Account', htmlFor: 'form-select-control-parent_collaborator_account' }}
                placeholder="Collaborator  Account"
                search
                searchInput={{ id: 'form-select-control-parent_collaborator_account' }}
                value={parent_collaborator_account}
                onChange={handleChange}
            />} 
          </Form.Group>

        </>

    ) : <h4>Parent Beneficiary parent can't be rewarded Please request Collaborator promotion</h4>}
    

  </Form>
    </>
)
}

export default reduxForm({
    form: "beneficiaryform"
})(BeneficiaryForm)