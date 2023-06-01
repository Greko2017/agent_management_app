import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import UserRoleModal from './UserRoleModal';

const UserRoleTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
              <Table.HeaderCell>Created by</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.user_roles instanceof Array && props.user_roles.map((user_role, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/user_roles/${user_role._id}`}>{`${user_role.name}`}</Link></Table.Cell>
                      <Table.Cell>{user_role.created_at}</Table.Cell>
                      <Table.Cell>{user_role.created_by.email}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                
                <UserRoleModal open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadUserRoles={props.loadUserRoles} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default UserRoleTable