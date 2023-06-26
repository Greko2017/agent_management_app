import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon,  Modal } from 'semantic-ui-react'
import BeneficiaryInstalmentHistoryForm from './BeneficiaryInstalmentHistoryForm'

function BeneficiaryInstalmentHistoryModal(props) {
  const {isLoading, setIsLoading} =props
  const {role, permissions} = useSelector(state => state.auth);
  return (
  <>
  {role && (role.name === 'cashier' || role.name === 'Admin') ? (
      
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
        <Icon name='user' /> Add Instalment History
      </Button>}
    >
      <Modal.Header>Register an Instalment History</Modal.Header>
      <Modal.Content>
        <BeneficiaryInstalmentHistoryForm beneficiary={props.beneficiary} parent={props.parent} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
          form='beneficiary-instalment-history-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
      ) : null}
  </>
  )
}

export default BeneficiaryInstalmentHistoryModal