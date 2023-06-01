import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Divider, Form, Header, Icon, Input,Message, Select } from 'semantic-ui-react'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { getHeads } from '../services/headServices/HeadServices';
import { getInstallments, getInstalmentLinesByInstalmentId } from '../services/InstalmentServices/InstalmentServices';
import { getBeneficiaries } from '../services/BeneficiaryServices/BeneficiaryServices';
import { editBeneficiaryInstalmentHistory, addBeneficiaryInstalmentHistory } from '../services/BeneficiaryInstalmentHistoryServices/BeneficiaryInstalmentHistoryServices';
import {generateName} from '../utils/tools'
import { getRewards } from '../services/RewardServices/RewardServices';
const setIsLoading = ( ) => {
    console.log('loading data...', )
}

const BeneficiaryInstalmentHistoryForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [heads, setLeads] = useState([]);
    const [instalment_lines, setInstalmentLines] = useState([]);
    const [beneficiaries, setBeneficiaries] = useState([])
    const [installments, setInstallments] = useState([]);  
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In BeneficiaryInstalmentHistoryForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await loadHeads()
          await loadInstallments()
          await loadBeneficiaries()
        })()
    }, [])

    const loadHeads = async () => {        
      const response = await dispatch(getHeads(setErrorMessage, setSuccessMessage, props.setIsLoading));
      // console.log('In loadHeads response', response)
      setLeads(response.data) 
    }
    const loadInstallments = async () => {        
        const response = await dispatch(getInstallments(setErrorMessage, setSuccessMessage, setIsLoading));
        
        if (props.is_edit===true && props.beneficiary_instalment_history ) {
            console.log('response.data.paid_instalment_line.parent._id', response.data)
            let parant_instalment_line = response.data.filter(item => item._id === props.beneficiary_instalment_history.paid_instalment_line.parent._id)[0]
            console.log('parant_instalment_line', parant_instalment_line)
            await loadInstalmentLines(parant_instalment_line._id)
        }
        setInstallments(response.data) 
    }

    const loadBeneficiaries = async () => {        
        const response = await dispatch(getBeneficiaries(setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setBeneficiaries(response.data) 
    }

    const [formValue, setFormValue] = React.useState({
        name: props.is_edit===true ? props.beneficiary_instalment_history.name : generateName('INS'), beneficiary_id: props.is_edit===true ? props.beneficiary_instalment_history.beneficiary._id : props.beneficiary ? props.beneficiary._id : '', paid_date: props.is_edit===true ? props.beneficiary_instalment_history?.paid_date && props.beneficiary_instalment_history?.paid_date.substring(0, 10) : '', amount_paid: props.is_edit===true ? props.beneficiary_instalment_history.amount_paid : '', paid_instalment_line_id: props.is_edit===true ? props.beneficiary_instalment_history.paid_instalment_line._id : '', paid_instalment_id: props.is_edit===true ? props.beneficiary_instalment_history.paid_instalment_line.parent._id : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
// console.log('name, value', name, value)
    if (name === 'paid_instalment_line_id') {
        let instalment_line = instalment_lines.filter(item=> item._id == value)[0]
        // console.log('instalment_line', instalment_line)
        setFormValue({ ...formValue, 'amount_paid': instalment_line.amount.toString(), 'paid_instalment_line_id': instalment_line._id })
        // console.log('formValue', formValue)
        
    }
}
const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formValue.paid_instalment_line_id) {
        setErrorMessage({message: 'Please, Fill all required fiel'})
        return
    }
    formValue.beneficiary = beneficiaries.filter(item=> item._id == formValue.beneficiary_id)[0];
    formValue.paid_instalment_line = instalment_lines.filter(item=> item._id == formValue.paid_instalment_line_id)[0];
    formValue.paid_instalment_line.parent = installments.filter(item=> item._id == formValue.paid_instalment_id)[0];
    // console.log('beneficiary-instalment-history In handleSubmit', formValue);
    // // let res = 
    // return
    if(props.is_edit === true) {
        formValue.modified_by = user
      formValue._id = props.beneficiary_instalment_history?._id
      await dispatch(editBeneficiaryInstalmentHistory(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } 
    else {
        formValue.created_by = user
      console.log('enter else formValue', formValue)
      await dispatch(addBeneficiaryInstalmentHistory(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading, props.in_collaborator_page));
    }
    setTimeout(async function() {
            props.is_edit !== true && props.setOpen(false)
            props.is_edit !== true && setFormValue({
                name: '', paid_date: '', paid_instalment_id: '', amount_paid: ''
            })
            setErrorMessage(null);
            setSuccessMessage(null);
            props.loadHeads && props.is_edit !== true && await props.loadHeads()
            props.loadHead && await props.loadHead()
            props.loadCollaborators && await props.loadCollaborators()
        }, 5000)
    }
    const handleChangeInstallments = async (e, { name, value }) => {
        setFormValue({ ...formValue, [name]: value })
        console.log('handleChangeInstallments', name, value)
        await loadInstalmentLines(value)
    }


    const loadInstalmentLines = async (instalment_id) => { 
        console.log('loadInstalmentLines', instalment_id)       
        const response = await dispatch(getInstalmentLinesByInstalmentId(instalment_id, setErrorMessage, setSuccessMessage, setIsLoading));
        
        setInstalmentLines(response.data) 
    }
    const {
        name, beneficiary_id,paid_date,paid_instalment_line_id,amount_paid, paid_instalment_id
    } = formValue;

    return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='beneficiary-instalment-history-form'>
          
    <Form.Field
        name='name'
        id='form-input-control-first-name'
        control={Input}
        label='Name'
        placeholder='Name'
        value={name}
        onChange={handleChange}

      />      
    
      {beneficiaries?.length > 0 && <Form.Field
            name='beneficiary_id'
            control={Select}
            options={beneficiaries.map(beneficiary=>{beneficiary.is_beneficiary = beneficiary.is_beneficiary.toString();beneficiary.is_collaborator = beneficiary.is_collaborator.toString();beneficiary.is_lead = beneficiary.is_lead.toString();beneficiary.key = beneficiary._id.toString(); beneficiary.value = beneficiary._id.toString(); beneficiary.text = `${beneficiary.first_name}, ${beneficiary.last_name }`; return beneficiary})}
            label={{ children: 'Beneficiary', htmlFor: 'form-select-control-beneficiary_id' }}
            placeholder='Beneficiary'
            search
            searchInput={{ id: 'form-select-control-beneficiary_id' }}
            value={beneficiary_id}
            onChange={handleChange}
        />}

        <Form.Field>
            <label>Paid date</label>
            <Input 
            name='paid_date'
            type='date'
            value={paid_date}
            onChange={handleChange}
            placeholder='Paid date'/>
        </Form.Field>

        
        {installments?.length > 0 && <Form.Field
            name='paid_instalment_id'
            control={Select}
            options={installments.map(instalment=>{instalment.key = instalment._id.toString(); instalment.value = instalment._id.toString(); instalment.text = `${instalment.name}, ${instalment.total_amount} `; return instalment})}
            label={{ children: 'Instalment', htmlFor: 'form-select-control-paid_instalment_id' }}
            placeholder='Instalment'
            search
            id= 'form-select-control-paid_instalment_id'
            value={paid_instalment_id}
            onChange={handleChangeInstallments}
        />}

        {instalment_lines?.length > 0 && <Form.Field
            name='paid_instalment_line_id'
            control={Select}
            options={instalment_lines.map(instalment_line=>{instalment_line.key = instalment_line._id.toString(); instalment_line.value = instalment_line._id.toString(); instalment_line.text = `${instalment_line.name} - ${instalment_line.amount} - ${instalment_line.percentage_of_total_amount} %`; return instalment_line})}
            label={{ children: 'Instalment Line', htmlFor: 'form-select-control-paid_instalment_line_id' }}
            placeholder='Instalment Line'
            search
            id= 'form-select-control-paid_instalment_line_id'
            value={paid_instalment_line_id}
            onChange={handleChange}
        />}
    
      
        <Form.Field>
        <label>Amount Paid</label>
            <Input 
            disabled
            placeholder='Amount'
                name='amount_paid'
                type='number' 
            value={amount_paid}
            onChange={handleChange} />
        </Form.Field>
      
  </Form>
    </>
)
}

export default reduxForm({
    form: "beneficiaeryinstalmentihistoryform"
})(BeneficiaryInstalmentHistoryForm)