import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import CampaignParticipantModal from './CampaignParticipantModal';

const CampaignParticipantTable = (props) => {
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
              {props.campaign_participants instanceof Array && props.campaign_participants.map((campaign_participant, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/campaign_participants/${campaign_participant._id}`}>{`${campaign_participant.name}`}</Link></Table.Cell>
                      <Table.Cell><Link to={`/${campaign_participant.participant?.is_collaborator ? 'collaborators' : campaign_participant.participant?.is_lead ? 'heads' : campaign_participant.participant?.is_beneficiary ? 'beneficiaries' : '#'}/${campaign_participant.participant?._id}`}>{`${campaign_participant.participant?.first_name}, ${campaign_participant.participant?.last_name}`}</Link></Table.Cell>
                      <Table.Cell>{campaign_participant.participant?.email}</Table.Cell>
                      <Table.Cell>{campaign_participant.participant?.first_name }</Table.Cell>     
                      <Table.Cell>{campaign_participant.participant?.last_name}</Table.Cell>    

                      <Table.Cell>{campaign_participant.participant?.parent && `${campaign_participant.participant?.parent.first_name}, ${campaign_participant.participant?.parent.last_name}` || 'n/a'}</Table.Cell>
                      <Table.Cell>{campaign_participant.participant?.parent && `${campaign_participant.participant?.parent.phone_number}` || 'n/a'}</Table.Cell>

                      <Table.Cell>{campaign_participant.participant?.phone_number}</Table.Cell>   
                      <Table.Cell>{`${campaign_participant.participant?.is_collaborator ? 'Collaborator' : campaign_participant.participant?.is_head ? ' Elite' : campaign_participant.participant?.is_beneficiary ? ' Beneficiary' : campaign_participant.participant?.is_lead ? 'Elit' : '#'}`}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='9'>
                
                <CampaignParticipantModal campaign={props.campaign} loadCampaignParticipants={props.loadCampaignParticipants}  open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default CampaignParticipantTable

