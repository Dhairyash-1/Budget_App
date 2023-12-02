import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useBudgets } from '../context/BudgetsContext'

function AddBudgetModal({ show, handleClose }) {
  const { addBudget } = useBudgets()
  const nameRef = useRef()
  const maxRef = useRef()
  function handleSubmit(e) {
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    })
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className='mb-3' controlId='name'>
            <FormLabel>Name</FormLabel>
            <FormControl ref={nameRef} type='text' required={true} />
          </FormGroup>
          <FormGroup className='mb-3' controlId='max'>
            <FormLabel>Maximum Spending</FormLabel>
            <FormControl
              ref={maxRef}
              type='number'
              min={0}
              step={0.1}
              required={true}
            />
          </FormGroup>
          <div className='d-flex justify-content-end'>
            <Button variant='primary' type='submit'>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
AddBudgetModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default AddBudgetModal
