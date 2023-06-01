import React from 'react'
import { Button, Icon,  Modal } from 'semantic-ui-react'
import StaffForm from './StaffForm'

function AssignRoleModal(props) {
  const {isLoading, setIsLoading} =props
  return (
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
        <Icon name='user' /> Assign Role
      </Button>}
    >
      <Modal.Header>Assign Role</Modal.Header>
      <Modal.Content>
        <StaffForm is_edit={true} beneficiary={props.beneficiary} parent={props.parent} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
          form='general_user-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AssignRoleModal