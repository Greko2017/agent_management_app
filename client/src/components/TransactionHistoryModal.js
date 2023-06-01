import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon,  Modal } from 'semantic-ui-react'
import TransactionHistoryForm from './TransactionHistoryForm'

function TransactionHistoryModal(props) {
  const {isLoading, setIsLoading} =props
  const {role, permissions} = useSelector(state => state.auth);
  const [permission, setPermission] = useState({})

  useEffect(() => {
    let _permission = {}
    if (permissions instanceof Array) {
      _permission = permissions.filter(i => i.module_name === "stakeholder_account_histories")[0] 
      setPermission(_permission)
    }
  }, [])

  return (
    <>{
      permission && permission.has_create === true ? (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      trigger={<Button
        floated='right'
        icon
        labelPosition='left'
        primary
        size='small'
      >
        <Icon name='user' /> Add Transaction statement
      </Button>}
    >
      <Modal.Header>Write Transaction statement</Modal.Header>
      <Modal.Content>
        <TransactionHistoryForm loadStakeholderAccountHistories={props.loadStakeholderAccountHistories} loadTransactionHistories={props.loadTransactionHistories} participant_account={props.participant_account} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={isLoading} color='black' onClick={() => props.setOpen(false)}>
          Cancel
        </Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          content='Submit'
          labelPosition='right'
          form='transaction_history-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
      ) : null
    }</>
  )
}

export default TransactionHistoryModal