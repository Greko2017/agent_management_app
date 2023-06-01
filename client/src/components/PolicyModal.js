import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function PolicyModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Policies</Button>}
    >
      <Modal.Header>Policies</Modal.Header>
      <Modal.Content image scrolling>
        <Image centered src='/images/img_policies.jpg' wrapped/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="I Agree"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default PolicyModal