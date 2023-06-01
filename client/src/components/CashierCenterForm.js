import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input,Message, TextArea, Select } from 'semantic-ui-react'
import { createCashierCenter, updateCashierCenter } from '../services/CashierCenterServices/CashierCenterServices'
import { clearErrors } from '../actions/authActions';
import { reduxForm } from "redux-form";
import { getCenters } from '../services/CenterServices/CenterServices';
import { getGeneralsGeneric } from '../services/GeneralServices/GeneralServices';
import { generateName } from '../utils/tools'
const CashierCenterForm = (props) => {
    
    const error = useSelector(state => state.errors);
    const user = useSelector(state => state.auth.currentUser);
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [centers, setCenters] = useState([]);
    const [cashiers, setCashiers] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {

        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async ()=>{
          console.log('-- CashierCenterForm props.cashier_center', props.cashier_center)
          await loadCenters()
          await loadCashiers()
        })()
    }, [])


    const [formValue, setFormValue] = React.useState({
        name: props.is_edit===true ? props.cashier_center?.name :  generateName('CSH_CTR'), center_id: props.is_edit===true ? props.cashier_center?.center_id : props.center?._id, cashier_id: props.is_edit===true ? props.cashier_center?.cashier_id : ''
    })

const handleChange = (e, { name, value }) => {setFormValue({ ...formValue, [name]: value })
}
const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('In handleSubmit', formValue);
    formValue.created_by = user
    
    formValue.cashier = cashiers.filter(item=>item._id== formValue.cashier_id)[0]
    
    formValue.center = centers.filter(item=>item._id== formValue.center_id)[0]

    // let res = 
    if(props.is_edit === true) {
      formValue._id = props.cashier_center._id
      await dispatch(updateCashierCenter(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));  
    } else{
      await dispatch(createCashierCenter(formValue, setErrorMessage, setSuccessMessage, props.setIsLoading));
    }
    setTimeout(async function() {
      props.is_edit !== true && props.setOpen(false)
      props.is_edit !== true && setFormValue({
      name: '', center_id: '', cashier_id: ''
      })
      setErrorMessage(null);
      setSuccessMessage(null);
      props.loadCashierCenters && await props.loadCashierCenters()
      props.loadCashierCenter && await props.loadCashierCenter()
  }, 5000)
}
const {
    name, center_id, cashier_id
} = formValue;

  const loadCashiers = async () => {        
    let query = {'role.name': 'cashier', is_staff: true}
    const response = await dispatch(getGeneralsGeneric(query, setErrorMessage, setSuccessMessage, props.setIsLoading));
    setCashiers(response.data) 
  }

const loadCenters = async () => {        
  const response = await dispatch(getCenters(setErrorMessage, setSuccessMessage, props.setIsLoading));
  setCenters(response.data) 
}

return (
    <>
    
    {errorMessage ? <Message className="alertMssg" basic="true" color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic="true" color='green'> {successMessage} </Message> : ""}
    
  <Form onSubmit={handleSubmit} id='cashier_center-form'>
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
            name='center_id'
            disabled={false}
            control={Select}
            options={centers.map(center=>{center.key = center._id.toString(); center.value = center._id.toString(); center.text = `${center.name}`; return center})}
            label={{ children: 'Center', htmlFor: 'form-select-control-center_id' }}
            placeholder='Center'
            search
            searchInput={{ id: 'form-select-control-center_id' }}
            value={center_id}
            onChange={handleChange}
        />
      
      <Form.Field
        name='cashier_id'
        control={Select}
        options={cashiers.map(cashier=>{cashier.key = cashier._id.toString(); cashier.value = cashier._id.toString(); cashier.text = `${cashier.first_name}, ${cashier.last_name}`; return cashier})}
        label={{ children: 'Cashier', htmlFor: 'form-select-control-cashier_id' }}
        placeholder='Cashier'
        search
        searchInput={{ id: 'form-select-control-cashier_id' }}
        value={cashier_id}
        onChange={handleChange}
      />      
      
    </Form.Group>

  </Form>
    </>
)
}

export default reduxForm({
    form: "cashiercenterform"
})(CashierCenterForm)