import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import RewardModal from './RewardModal';

const RewardTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Campaign</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
              <Table.HeaderCell>Created by</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.rewards instanceof Array && props.rewards.map((reward, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/rewards/${reward?._id}`}>{`${reward?.name}`}</Link></Table.Cell>
                      <Table.Cell>{reward?.campaign?.name}</Table.Cell>
                      <Table.Cell>{new Date(reward?.created_at).toDateString()}</Table.Cell>
                      <Table.Cell>{reward?.created_by.email}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                
                <RewardModal open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadRewards={props.loadRewards} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default RewardTable