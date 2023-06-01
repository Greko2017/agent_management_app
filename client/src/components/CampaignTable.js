import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import CampaignModal from './CampaignModal';

const CampaignTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
              <Table.HeaderCell>Created By</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.campaigns instanceof Array && props.campaigns.map((campaign, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/campaigns/${campaign._id}`}>{`${campaign.name}`}</Link></Table.Cell>
                      <Table.Cell>{new Date(campaign.start_period).toDateString() }</Table.Cell>
                      <Table.Cell>{new Date(campaign.end_period).toDateString()}</Table.Cell>
                      <Table.Cell>{new Date(campaign.created_at).toDateString()}</Table.Cell>
                      <Table.Cell>{campaign.created_by?.email}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='5'>
                
                <CampaignModal open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadCampaigns={props.loadCampaigns} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default CampaignTable