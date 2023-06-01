import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow} from "semantic-ui-react";
import { useParams } from 'react-router-dom'
import { getAccountStakeholderById, deleteAccountStakeholder } from '../../services/AccountStakeholderServices/AccountStakeholderServices';
import AccountStakeholderForm from '../../components/AccountStakeholderForm';
import history from "../../history"
function AccountStakeholderDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [account_stakeholder, setParticipantAccount] = useState({});  
    const { account_stakeholder_id } = useParams() 
    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    const dispatch = useDispatch();   

    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "participant_accounts")[0] // i.role.name === 'elite' && 
          setPermission(_permission)
        }
        (async () => {
          await loadParticipantAccount()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadParticipantAccount = async () => {        
        const response = await dispatch(getAccountStakeholderById(account_stakeholder_id, setErrorMessage, setSuccessMessage, setIsLoading));
        console.log('-- loadParticipantAccount response', response)
        setParticipantAccount(response.data) 
        if (response !== undefined && response.data) {
            // loadStakeholderAccountHistories(response.data)
        }
    }
    const handleDelete = async () => {
        await dispatch(deleteAccountStakeholder(account_stakeholder, setErrorMessage, setSuccessMessage, setIsLoading));
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
                        form='account_stakeholder-form'
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
        {Object.keys(account_stakeholder || {}).length >0 ? <AccountStakeholderForm loadParticipantAccount={loadParticipantAccount} isLoading={isLoading} setIsLoading={setIsLoading} participant_account_participant={account_stakeholder} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>


    </>
  )
}

export default AccountStakeholderDetails