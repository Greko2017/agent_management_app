import React from 'react'
import { Button, Icon,  Modal } from 'semantic-ui-react'
import UserRoleForm from './UserRoleForm'

function UserRoleModal(props) {
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
        <Icon name='user' /> Add UserRole
      </Button>}
    >
      <Modal.Header>Add UserRole</Modal.Header>
      <Modal.Content>
        <UserRoleForm loadUserRoles={props.loadUserRoles} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
          form='user_role-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UserRoleModal