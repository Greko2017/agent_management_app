import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import AccountStakeholderModal from './AccountStakeholderModal';

const AccountStakeholderTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Parent Name</Table.HeaderCell>
              <Table.HeaderCell>Parent Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.participants instanceof Array && props.participants.map((participant, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/account_stakeholders/${participant._id}`}>{`${participant.name}`}</Link></Table.Cell>
                      <Table.Cell><Link to={`/${participant.participant?.is_collaborator ? 'collaborators' : participant.participant?.is_lead ? 'heads' : participant.participant?.is_beneficiary ? 'beneficiaries' : '#'}/${participant.participant?._id}`}>{`${participant.participant?.first_name}, ${participant.participant?.last_name}`}</Link></Table.Cell>
                      <Table.Cell>{participant.participant?.email}</Table.Cell>
                      <Table.Cell>{participant.participant?.first_name }</Table.Cell>     
                      <Table.Cell>{participant.participant?.last_name}</Table.Cell>    

                      <Table.Cell>{participant.participant?.parent && `${participant.participant?.parent.first_name}, ${participant.participant?.parent.last_name}` || 'n/a'}</Table.Cell>
                      <Table.Cell>{participant.participant?.parent && `${participant.participant?.parent.phone_number}` || 'n/a'}</Table.Cell>

                      <Table.Cell>{`${participant.participant?.is_collaborator ? 'Collaborator' : participant.participant?.is_elite ? ' Elite' : participant.participant?.is_beneficiary ? ' Beneficiary' : participant.participant?.is_lead ? 'Elite' : '#'}`}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='9'>
                
                <AccountStakeholderModal loadParticipants={props.loadParticipants} participant_account={props.participant_account} loadAccountStakeholders={props.loadAccountStakeholders}  open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default AccountStakeholderTable

