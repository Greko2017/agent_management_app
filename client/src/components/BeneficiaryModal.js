import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon,  Modal } from 'semantic-ui-react'
import BeneficiaryForm from './BeneficiaryForm'

function BeneficiaryModal(props) {
  const {isLoading, setIsLoading, in_collaborator_page, centers} =props
  const {role, permissions} = useSelector(state => state.auth);
  const [permission, setPermission] = useState({})
  
  useEffect(() => {
    let _permission = {}
    if (permissions instanceof Array) {
      _permission = permissions.filter(i => i.module_name === "beneficiaries")[0] 
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
        <Icon name='user' /> Add Beneficiary
      </Button>}
    >
      <Modal.Header>Register a Beneficiary</Modal.Header>
      <Modal.Content>
        <BeneficiaryForm installments={props.installments} centers={centers} loadBeneficiaries={props.loadBeneficiaries} loadCollaborators={props.loadCollaborators} in_collaborator_page={in_collaborator_page} loadCollaborator={props.loadCollaborator} parent={props.parent} loadHeads={props.loadHeads} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
          form='beneficiary-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
      ) : null
    }</>
  )
}

export default BeneficiaryModal