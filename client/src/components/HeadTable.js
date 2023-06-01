import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import HeadModal from './HeadModal'
import { Link } from "react-router-dom";

const HeadTable = (props) => {
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
              <Table.HeaderCell>Collaborator Number</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.leads instanceof Array && props.leads.map((lead, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/heads/${lead._id}`}>{`${lead.first_name}, ${lead.last_name}`}</Link></Table.Cell>
                      <Table.Cell>{lead.created_at}</Table.Cell>
                      <Table.Cell>{lead.email}</Table.Cell>
                      <Table.Cell>0</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                
                <HeadModal open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadHeads={props.loadHeads} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default HeadTable