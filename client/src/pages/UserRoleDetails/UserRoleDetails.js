import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow,  Header, HeaderContent} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getUserRoleById, deleteUserRole } from '../../services/UserRoleServices/UserRoleServices';
import UserRoleForm from '../../components/UserRoleForm';
import history from "../../history"
import PermissionTable from '../../components/PermissionTable';
import { getUserRolePermissionByRoleId } from '../../services/UserRolePermissionServices/UserRolePermissionServices';
import AssignRoleModal from '../../components/AssignRoleModal';

function UserRoleDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user_role, setUserRole] = useState({});  
    const [user_role_permissions, setUserRolePermissions] = useState({});
    const { user_role_id } = useParams() 
    const [open, setOpen] = useState(false); 

    const dispatch = useDispatch();   

    useEffect(() => {
        (async () => {
          await loadUserRole()
          await loadUserRolePermission()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadUserRole = async () => {        
        const response = await dispatch(getUserRoleById(user_role_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setUserRole(response.data) 
    }

    const loadUserRolePermission = async () => {    
        const response = await dispatch(getUserRolePermissionByRoleId(user_role_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setUserRolePermissions(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteUserRole(user_role_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
    }
  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <GridColumn>
            <GridRow>
                <Message style={{display: 'flex', justifyContent: 'space-between'}}>
                   <div>
                   <Button icon='arrow left' className="item mr-3" onClick={()=>{history.goBack()}}
                        />

                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        content='Edit'
                        labelPosition='right'
                        form='user_role-form'
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
                        <AssignRoleModal open={open} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={setOpen}  />
                    </div>
                </Message>
            </GridRow>
            <GridRow>

            </GridRow>
        </GridColumn>
    <Message>
        {Object.keys(user_role || {}).length >0 ? <UserRoleForm loadUserRole={loadUserRole} isLoading={isLoading} setIsLoading={setIsLoading} user_role={user_role} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>

    
    <Message>
        <Header>
            {user_role ? <HeaderContent>{`${user_role.name} permissions`}</HeaderContent> : <HeaderContent>{`Here you can manage to instalment history of a user_role`}</HeaderContent>}
        </Header>
        <p>List of this role permissions</p>
    </Message>
    <Message>
        <PermissionTable user_role={user_role} loadUserRolePermission={loadUserRolePermission} user_role_permissions={user_role_permissions}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Message>

    </>
  )
}

export default UserRoleDetails