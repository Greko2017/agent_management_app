import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import InstalmentModal from './InstalmentModal';

const InstalmentTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Total Amount</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
              <Table.HeaderCell>Created by</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.installments instanceof Array && props.installments.map((instalment, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/installments/${instalment._id}`}>{`${instalment.name}`}</Link></Table.Cell>
                      <Table.Cell>{instalment.total_amount}</Table.Cell>
                      <Table.Cell>{instalment.created_at}</Table.Cell>
                      <Table.Cell>{instalment.created_by.name}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                
                <InstalmentModal loadInstallments={props.loadInstallments} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadHeads={props.loadHeads} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default InstalmentTable