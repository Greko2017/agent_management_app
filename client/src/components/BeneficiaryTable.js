import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import BeneficiaryModal from './BeneficiaryModal';

const BeneficiaryTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Parent</Table.HeaderCell>
              <Table.HeaderCell>Center</Table.HeaderCell>
              <Table.HeaderCell>Installments</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.beneficiaries instanceof Array && props.beneficiaries.map((beneficiary, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/beneficiaries/${beneficiary._id}`}>{`${beneficiary.first_name}, ${beneficiary.last_name}`}</Link></Table.Cell>
                      <Table.Cell>{beneficiary.email}</Table.Cell>
                      <Table.Cell>{beneficiary.parent?.first_name}</Table.Cell>
                      <Table.Cell>{beneficiary.center?.name}</Table.Cell>                      
                      <Table.Cell>{beneficiary.instalment?.name}</Table.Cell>
                      <Table.Cell>{beneficiary.created_at}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='6'>
                
                <BeneficiaryModal installments={props.installments} centers={props.centers} loadBeneficiaries={props.loadBeneficiaries} in_collaborator_page={props.in_collaborator_page} loadBeneficiary={props.loadBeneficiary} parent={props.parent} is_collaborator={true} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadHeads={props.loadHeads} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default BeneficiaryTable