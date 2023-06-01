import React from 'react'
import { Button, Icon,  Modal } from 'semantic-ui-react'
import RewardForm from './RewardForm'

function RewardModal(props) {
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
        <Icon name='user' /> Add Reward
      </Button>}
    >
      <Modal.Header>Add Reward</Modal.Header>
      <Modal.Content>
        <RewardForm loadRewards={props.loadRewards} isLoading={isLoading} setIsLoading={setIsLoading} setOpen={props.setOpen} />
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
          form='reward-form'
          icon='checkmark'
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default RewardModal