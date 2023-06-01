import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Header} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getCenterById, deleteCenter } from '../../services/CenterServices/CenterServices';
import CenterForm from '../../components/CenterForm';
import history from "../../history"
import CashierCenterTable from '../../components/CashierCenterTable';
import { getCashierCenters } from '../../services/CashierCenterServices/CashierCenterServices';

function CentersDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [center, setCenter] = useState({});  
    const [cashier_centers, setCashierCenters] = useState([]); 

    const { center_id } = useParams() 
    const dispatch = useDispatch();   
    const user = useSelector(state => state.auth.currentUser);
    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    useEffect(() => {
        (async () => {
            let _permission = {}
            if (permissions instanceof Array) {
              _permission = permissions.filter(i => i.module_name === "centers")[0]
              setPermission(_permission)
            }
          await loadCenter()
          await loadCashierCenters()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadCenter = async () => {        
        const response = await dispatch(getCenterById(center_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setCenter(response.data) 
    }
    const loadCashierCenters = async () => {
        let query = {'center_id': center_id }
        const response = await dispatch(getCashierCenters(query, setErrorMessage, setSuccessMessage, setIsLoading));
        setCashierCenters(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteCenter(center_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
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
                                form='center-form'
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
        {Object.keys(center || {}).length >0 ? <CenterForm loadCenter={loadCenter} isLoading={isLoading} setIsLoading={setIsLoading} center={center} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>

    
    <Message className="message-container" size="huge" secondary="true">
            <Header size="huge"> Cashiers </Header>
            <p>All assigned cashier to this Center</p>
        </Message>
        <CashierCenterTable center={center} isLoading={isLoading} setIsLoading={setIsLoading} loadCashierCenters={loadCashierCenters} cashier_centers={cashier_centers}/>
    </>
  )
}

export default CentersDetails