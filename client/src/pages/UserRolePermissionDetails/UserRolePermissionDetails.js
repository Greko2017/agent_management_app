import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Icon} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getUserRolePermissionById, deleteUserRolePermission } from '../../services/UserRolePermissionServices/UserRolePermissionServices';
import UserRolePermissionForm from '../../components/UserRolePermissionForm';
import history from "../../history"
import AssignRoleModal from '../../components/AssignRoleModal';

function UserRolePermissionsDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user_role_permissions, setUserRolePermission] = useState({});  

    const { user_role_permissions_id } = useParams() 
    const dispatch = useDispatch();   
    const user = useSelector(state => state.auth.currentUser);

    const [open, setOpen] = useState(false); 

    useEffect(() => {
        (async () => {
          await loadUserRolePermission()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadUserRolePermission = async () => {        
        const response = await dispatch(getUserRolePermissionById(user_role_permissions_id, setErrorMessage, setSuccessMessage, setIsLoading));
        console.log(' loadUserRolePermission response', response)
        setUserRolePermission(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteUserRolePermission(user_role_permissions_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
    }
  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <GridColumn>
            <GridRow>
                <Message  style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                    <Button icon='arrow left' className="item mr-3" onClick={()=>{history.goBack()}}
                        />

                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        content='Edit'
                        labelPosition='right'
                        form='user_role_permissions-form'
                        icon='edit'
                        positive
                        />
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            content='Delete'

                            labelPosition='right'
                            onClick={handleDelete}
                            icon='cancel'
                            negative
                            />
                    </div>
                    <div>
                    </div>
                </Message>
            </GridRow>
            <GridRow>

            </GridRow>
        </GridColumn>
    <Message>
        {Object.keys(user_role_permissions || {}).length >0 ? <UserRolePermissionForm loadUserRolePermission={loadUserRolePermission} isLoading={isLoading} setIsLoading={setIsLoading} user_role_permissions={user_role_permissions} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>
    </>
  )
}

export default UserRolePermissionsDetails