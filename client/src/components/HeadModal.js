import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon,  Modal } from 'semantic-ui-react'
import HeadForm from './HeadForm'

function HeadModal(props) {
  const {isLoading, setIsLoading} =props
  const {role, permissions} = useSelector(state => state.auth);
  const [permission, setPermission] = useState({})

  useEffect(() => {
    let _permission = {}
    if (permissions instanceof Array) {
      _permission = permissions.filter(i => i.module_name === "elites")[0] // i.role.name === 'elite' && 
      console.log('permissions', permissions)
      setPermission(_permission)
      // console.log('permission', _permission)
      // console.log('permission.has_create', _permission?.has_create)
      // console.log('permission?.has_create?.has_create=== true', _permission?.has_create?.has_create=== true)
      // console.log('permission?.has_create?.has_create=== "true"', _permission?.has_create?.has_create=== "true")
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
      <Icon name='user' /> Add Head
    </Button>}
  >
    <Modal.Header>Register a head</Modal.Header>
    <Modal.Content>
      <HeadForm loadHeads={props.loadHeads} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
        form='head-form'
        icon='checkmark'
        // onClick={() => props.setOpen(false)}
        positive
      />
    </Modal.Actions>
  </Modal>
      ) : null
    }</>
  )
}

export default HeadModal