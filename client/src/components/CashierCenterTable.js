import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import CashierCenterModal from './CashierCenterModal';

const CashierCenterTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Cashier</Table.HeaderCell>
              <Table.HeaderCell>Center</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.cashier_centers instanceof Array && props.cashier_centers.map((cashier_center, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/cashier_centers/${cashier_center._id}`}>{`${cashier_center.name}`}</Link></Table.Cell>
                      <Table.Cell>{cashier_center.cashier?.first_name}</Table.Cell>
                      <Table.Cell>{cashier_center.center?.name}</Table.Cell>
                      <Table.Cell>{cashier_center.created_at}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                
                <CashierCenterModal center={props.center} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadCashierCenters={props.loadCashierCenters} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default CashierCenterTable