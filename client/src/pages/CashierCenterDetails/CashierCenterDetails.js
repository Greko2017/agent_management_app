import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Header} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import history from "../../history"
import { getCashierCenterById, deleteCashierCenter,  } from '../../services/CashierCenterServices/CashierCenterServices';
import CashierCenterForm from '../../components/CashierCenterForm';

function CashierCentersDetails(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [cashier_center, setCashierCenter] = useState({}); 

    const { cashier_center_id } = useParams() 
    const dispatch = useDispatch();   
    const user = useSelector(state => state.auth.currentUser);
    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    useEffect(() => {
        (async () => {
            console.log('cashier_center', cashier_center, cashier_center_id)
            let _permission = {}
            if (permissions instanceof Array) {
              _permission = permissions.filter(i => i.module_name === "centers")[0]
              setPermission(_permission)
            }
          await loadCashierCenter()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadCashierCenter = async () => {
        const response = await dispatch(getCashierCenterById(cashier_center_id, setErrorMessage, setSuccessMessage, setIsLoading));
        console.log('-- loadCashierCenter cashier_center', response.data)
        setCashierCenter(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteCashierCenter(cashier_center_id, setErrorMessage, setSuccessMessage, setIsLoading));
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
                                form='cashier_center-form'
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
    {Object.keys(cashier_center || {}).length >0 ? <CashierCenterForm loadCashierCenter={loadCashierCenter} isLoading={isLoading} setIsLoading={setIsLoading} cashier_center={cashier_center} is_edit={true} />: 
            <Message className="alertMssg" basic='true' > {'Cashier data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>
    </>
  )
}

export default CashierCentersDetails