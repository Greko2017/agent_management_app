import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ParticipantAccountModal from './ParticipantAccountModal';

const ParticipantAccountTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Approver</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
              <Table.HeaderCell>Created By</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.participant_accounts instanceof Array && props.participant_accounts.map((participant_account, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/participant_accounts/${participant_account._id}`}>{`${participant_account.name}`}</Link></Table.Cell>
                      <Table.Cell>{participant_account.approver?.email}</Table.Cell> 

                      <Table.Cell>{new Date(participant_account.created_at).toDateString()}</Table.Cell>
                      <Table.Cell>{participant_account.created_by?.email}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='9'>
                
                <ParticipantAccountModal participant_account={props.participant_account} loadParticipantAccounts={props.loadParticipantAccounts}  open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default ParticipantAccountTable

