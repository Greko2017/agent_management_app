import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Message,GridColumn,GridRow, Icon} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getInstalmentLineById, deleteInstalmentLine, getInstallments } from '../../services/InstalmentServices/InstalmentServices';
import InstalmentLineForm from '../../components/InstalmentLineForm';
import history from "../../history"

function InstalmentLineDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [instalment_line, setInstalmentLine] = useState({}); 
    const [installments, setInstallments] = useState([]); 

    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    const { instalment_line_id } = useParams() 
    const dispatch = useDispatch();   

    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "installments")[0] // i.role.name === 'elite' && 
          setPermission(_permission)
        }
        (async () => {
          await loadInstalmentLine()
          await loadInstallments()
        })()
    }, []);
    
    const loadInstallments = async () => {        
        const response = await dispatch(getInstallments(setErrorMessage, setSuccessMessage, setIsLoading));
        setInstallments(response.data)       
    }

    const loadInstalmentLine = async () => {        
        const response = await dispatch(getInstalmentLineById(instalment_line_id, setErrorMessage, setSuccessMessage, setIsLoading));
        setInstalmentLine(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteInstalmentLine(instalment_line_id, setErrorMessage, setSuccessMessage, setIsLoading));
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
                        form='instalmentline-form'
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
        {Object.keys(instalment_line || {}).length >0 ? <InstalmentLineForm installments={installments} loadInstalmentLine={loadInstalmentLine} isLoading={isLoading} setIsLoading={setIsLoading} instalment_line={instalment_line} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>
    </>
  )
}

export default InstalmentLineDetails