import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import InstalmentForm from '../../components/InstalmentForm';
import { getInstalmentById, deleteInstalment, getInstalmentLinesByInstalmentId, getInstallments } from '../../services/InstalmentServices/InstalmentServices';
import { Button, Message,GridColumn,GridRow, Icon, HeaderContent, Header } from "semantic-ui-react";
import InstalmentLineTable from '../../components/InstalmentLineTable';
import history from "../../history"

function InstalmentDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [instalment, setInstalment] = useState({});  
    const [installments, setInstallments] = useState([]);  
    const [instalment_lines, setInstalmentDetails] = useState([]);  

    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    const { instalment_id } = useParams() 
    const dispatch = useDispatch();   

    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "installments")[0]
          setPermission(_permission)
        }
        (async () => {
          await loadInstalment()
          await loadInstalmentDetails()
          await loadInstallments()
        })()
    }, []);

    const loadInstalment = async () => {        
        const response = await dispatch(getInstalmentById(instalment_id, setErrorMessage, setSuccessMessage, setIsLoading));
        
        setInstalment(response.data) 
    }
    
  const loadInstallments = async () => {        
        const response = await dispatch(getInstallments(setErrorMessage, setSuccessMessage, setIsLoading));
        setInstallments(response.data)       
    }

    const loadInstalmentDetails = async () => {        
        const response = await dispatch(getInstalmentLinesByInstalmentId(instalment_id, setErrorMessage, setSuccessMessage, setIsLoading));
        
        setInstalmentDetails(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteInstalment(instalment_id, setErrorMessage, setSuccessMessage, setIsLoading));
    }

    return (
        <>
        {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
        
        {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}

             <GridColumn>
            <GridRow>
                <Message>
                    <Button icon='arrow left' className="item mr-3" onClick={()=>{history.goBack()}}
                        />

                    {permission && permission.has_update === true ? (
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            content='Edit'
                            labelPosition='right'
                            form='instalment-form'
                            icon='edit'
                            positive
                            />
                        ):null}
                        {permission && permission.has_delete === true ? (
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            content='Delete'

                            labelPosition='right'
                            onClick={handleDelete}
                            icon='cancel'
                            negative
                            />
                        ):null}
                </Message>
            </GridRow>
            <GridRow>

            </GridRow>
        </GridColumn>


        <Message>
        {Object.keys(instalment || {}).length >0 ? <InstalmentForm isLoading={isLoading} setIsLoading={setIsLoading} instalment={instalment} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'instalment data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>

    <Message>
        <Header>
            {instalment ? <HeaderContent>{`${instalment?.name}'s Lines`}</HeaderContent> : <HeaderContent>{`This instalment isn't register`}</HeaderContent>}
        </Header>
        <p>List of Instalment Line</p>
    </Message>

    <Message>
        <InstalmentLineTable loadInstalmentDetails={loadInstalmentDetails} installments={installments} instalment_lines={instalment_lines} parent={instalment}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Message>

        </>
  )
}

export default InstalmentDetails