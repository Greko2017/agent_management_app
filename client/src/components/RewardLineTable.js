import React, { useState } from 'react'
import {  Checkbox,  Table, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import RewardLineModal from './RewardLineModal';

const RewardLineTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Parent Reward</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Reward Type</Table.HeaderCell>
              <Table.HeaderCell>Reward percentage</Table.HeaderCell>
              <Table.HeaderCell>Is Elite</Table.HeaderCell>
              <Table.HeaderCell>Is Collaborator</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.reward_lines instanceof Array && props.reward_lines.map((reward_line, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell>{reward_line.parent.name}</Table.Cell>
                      <Table.Cell><Link to={`/reward_lines/${reward_line._id}`}>{`${reward_line.name}`}</Link></Table.Cell>
                      <Table.Cell>{reward_line.reward_type}</Table.Cell>
                      <Table.Cell>{reward_line.reward_percentage_of_amount}</Table.Cell>
                      <Table.Cell>{reward_line.is_elite ? <Icon name='check' color='green'/> : <Icon name='cancel' color='red'/>}</Table.Cell>
                      <Table.Cell>{reward_line.is_collaborator ? <Icon name='check' color='green'/> : <Icon name='cancel' color='red'/>}</Table.Cell>
                      
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='6'>
                
                <RewardLineModal parent={props.parent}  rewards={props.rewards} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadRewardLines={props.loadRewardLines} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default RewardLineTable