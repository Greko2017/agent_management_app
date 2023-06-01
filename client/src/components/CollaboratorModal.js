import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon,  Modal } from 'semantic-ui-react'
import CollaboratorForm from './CollaboratorForm'

function CollaboratorModal(props) {
  const {isLoading, setIsLoading, in_collaborator_page} =props
  const {role, permissions} = useSelector(state => state.auth);
  const [permission, setPermission] = useState({})
  
  useEffect(() => {
    let _permission = {}
    if (permissions instanceof Array) {
      _permission = permissions.filter(i => i.module_name === "collaborators")[0] // i.role.name === 'elite' && 
      console.log('permissions', permissions)
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
        <Icon name='user' /> Add Collaborator
      </Button>}
    >
      <Modal.Header>Register a Collaborator</Modal.Header>
      <Modal.Content>
        <CollaboratorForm loadCollaborators={props.loadCollaborators} in_collaborator_page={in_collaborator_page} loadCollaborator={props.loadCollaborator} parent={props.parent} loadHeads={props.loadHeads} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
          form='collaborator-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
      ) : null
    }</>
  )
}

export default CollaboratorModal