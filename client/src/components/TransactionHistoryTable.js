import React, { useState } from 'react'
import {  Checkbox,  Icon,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import TransactionHistoryModal from './TransactionHistoryModal';

const TransactionHistoryTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Credit</Table.HeaderCell>
              <Table.HeaderCell>Debit</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Approver</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>              
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.transaction_histories instanceof Array && props.transaction_histories.map((transaction_history, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/stakeholder_transaction_histories/${transaction_history._id}`}>{`${transaction_history.name}`}</Link></Table.Cell>
                      <Table.Cell> {transaction_history.is_credit ? <Icon name='check' color='green'/> : <Icon name='cancel' color='red'/>}</Table.Cell>
                      <Table.Cell> {!transaction_history.is_credit ? <Icon name='check' color='green'/> : <Icon name='cancel' color='red'/>}</Table.Cell>
                      <Table.Cell textAlign='right'>{transaction_history.amount}</Table.Cell>
                      <Table.Cell>{transaction_history.approver?.email || 'n/a'}</Table.Cell>
                      <Table.Cell>{new Date(transaction_history.created_at).toDateString()}</Table.Cell>
                      <Table.Cell >{transaction_history.status || ''}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='7'>
                
                <TransactionHistoryModal loadStakeholderAccountHistories={props.loadStakeholderAccountHistories} participant_account={props.participant_account} loadTransactionHistories={props.loadTransactionHistories} in_transaction_history_page={props.in_transaction_history_page} open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default TransactionHistoryTable