import React from 'react'
import { Button, Icon,  Modal } from 'semantic-ui-react'
import UserRolePermissionForm from './UserRolePermissionForm'

function UserRolePermissionModal(props) {
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
        <Icon name='user' /> Add Role Permission
      </Button>}
    >
      <Modal.Header>Set Role Permission</Modal.Header>
      <Modal.Content>
        <UserRolePermissionForm loadUserRolePermission={props.loadUserRolePermission} beneficiary={props.beneficiary} parent={props.parent} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
          form='user_role_permissions-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UserRolePermissionModal