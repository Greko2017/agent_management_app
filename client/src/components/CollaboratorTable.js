import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import CollaboratorModal from './CollaboratorModal';

const CollaboratorTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Beneficiary Number</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.collaborators instanceof Array && props.collaborators.map((collaborator, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/collaborators/${collaborator._id}`}>{`${collaborator.first_name}, ${collaborator.last_name}`}</Link></Table.Cell>
                      <Table.Cell>{collaborator.created_at}</Table.Cell>
                      <Table.Cell>{collaborator.email}</Table.Cell>
                      <Table.Cell>0</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                
                <CollaboratorModal loadCollaborators={props.loadCollaborators} in_collaborator_page={props.in_collaborator_page} loadCollaborator={props.loadCollaborator} parent={props.parent} is_collaborator={true} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadHeads={props.loadHeads} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default CollaboratorTable