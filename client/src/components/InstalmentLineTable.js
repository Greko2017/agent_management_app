import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {  Checkbox,  Table } from 'semantic-ui-react'
import InstalmentLineModal from './InstalmentLineModal';

const InstalmentLineTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
              <Table.HeaderCell>Total Amount %</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.instalment_lines instanceof Array && props.instalment_lines.map((instalment_line, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/instalment_lines/${instalment_line._id}`}>{`${instalment_line.name}`}</Link></Table.Cell>
                      <Table.Cell>{instalment_line.amount}</Table.Cell>
                      <Table.Cell>{instalment_line.due_date}</Table.Cell>
                      <Table.Cell>{instalment_line.percentage_of_total_amount}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                
                <InstalmentLineModal parent={props.parent} loadInstalmentDetails={props.loadInstalmentDetails} installments={props.installments} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default InstalmentLineTable
