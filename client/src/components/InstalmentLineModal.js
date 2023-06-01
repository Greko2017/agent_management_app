import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon,  Modal } from 'semantic-ui-react'
import InstalmentLineForm from './InstalmentLineForm'

function InstalmentLineModal(props) {
  const {isLoading, setIsLoading} =props
  const {role, permissions} = useSelector(state => state.auth);
  const [permission, setPermission] = useState({})

  useEffect(() => {
    let _permission = {}
    if (permissions instanceof Array) {
      _permission = permissions.filter(i => i.module_name === "installments")[0] 
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
        <Icon name='user' /> Add Instalment Line
      </Button>}
    >
      <Modal.Header>Add Instalment Line</Modal.Header>
      <Modal.Content>
        <InstalmentLineForm parent={props.parent} loadInstalmentDetails={props.loadInstalmentDetails} installments={props.installments} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
          form='instalmentline-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
      ) : null
    }</>
  )
}

export default InstalmentLineModal


