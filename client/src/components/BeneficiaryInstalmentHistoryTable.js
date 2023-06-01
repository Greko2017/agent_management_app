import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import BeneficiaryInstalmentHistoryModal from './BeneficiaryInstalmentHistoryModal';

const BeneficiaryInstalmentHistoryTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Instalment Line</Table.HeaderCell>
              <Table.HeaderCell>Amount Paid</Table.HeaderCell>
              <Table.HeaderCell>Percentage</Table.HeaderCell>
              <Table.HeaderCell>Payment Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.beneficiary_instalment_histories instanceof Array && props.beneficiary_instalment_histories.map((beneficiary_instalment_history, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/beneficiary_instalment_histories/${beneficiary_instalment_history._id}`}>{`${beneficiary_instalment_history.name}`}</Link></Table.Cell>
                      <Table.Cell>{beneficiary_instalment_history.paid_instalment_line.amount}</Table.Cell>
                      <Table.Cell>{beneficiary_instalment_history.paid_instalment_line.percentage_of_total_amount}</Table.Cell>
                      <Table.Cell>{beneficiary_instalment_history.paid_date}</Table.Cell>
                      <Table.Cell>{beneficiary_instalment_history.status}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='5'>
                
                <BeneficiaryInstalmentHistoryModal beneficiary={props.beneficiary} loadBeneficiaryInstalmentHistory={props.loadBeneficiaryInstalmentHistory} in_beneficiary_instalment_history_page={props.in_beneficiary_instalment_history_page} parent={props.parent} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default BeneficiaryInstalmentHistoryTable