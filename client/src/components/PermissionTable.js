import React, { useState } from 'react'
import {  Checkbox,  Table, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import UserRolePermissionModal from './UserRolePermissionModal';

function PermissionTable(props) {
    const [open, setOpen] = useState(false); 
  return (
    <>
                <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Module Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Create</Table.HeaderCell>
              <Table.HeaderCell>Read</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.user_role_permissions instanceof Array && props.user_role_permissions.map((user_role_permission, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/user_role_permissions/${user_role_permission._id}`}>{`${user_role_permission.module_name}`}</Link></Table.Cell>
                      <Table.Cell>{user_role_permission.role?.name || 'n/a'}</Table.Cell>
                      <Table.Cell>{user_role_permission.has_create ? <Icon name='check' color='green'/> : <Icon name='cancel' color='red'/>}</Table.Cell>
                      <Table.Cell>{user_role_permission.has_read  ? <Icon name='check' color='green'/> : <Icon name='cancel' color='red'/>}</Table.Cell>
                      <Table.Cell>{user_role_permission.has_update  ? <Icon name='check' color='green'/> : <Icon name='cancel' color='red'/>}</Table.Cell>
                      <Table.Cell>{user_role_permission.has_delete  ? <Icon name='check' color='green'/> : <Icon name='cancel' color='red'/>}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='6'>
                
                <UserRolePermissionModal loadUserRolePermission={props.loadUserRolePermission} beneficiary={props.beneficiary} loadBeneficiaryInstalmentHistory={props.loadBeneficiaryInstalmentHistory} in_user_role_permission_page={props.in_user_role_permission_page} parent={props.parent} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
    </>
  )
}

export default PermissionTable