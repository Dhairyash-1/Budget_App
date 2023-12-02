import {
  Modal,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from 'react-bootstrap'
import { useBudgets } from '../context/BudgetsContext'
import { useRef } from 'react'
import PropTypes from 'prop-types'

function EditBudgetModal({ budgetId, handleClose }) {
  const { editBudget, budgets } = useBudgets()
  const nameRef = useRef()
  const maxAmountRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    editBudget({
      id: budgetId,
      name: nameRef.current.value,
      max: Number(maxAmountRef.current.value),
    })
    handleClose()
  }

  const budget = budgets.find(budget => budget.id === budgetId)
  if (!budget) return null

  return (
    <Modal show={budgetId} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>{budget.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className='mb-3' controlId='name'>
            <FormLabel>Name</FormLabel>
            <FormControl
              ref={nameRef}
              defaultValue={budget.name}
              type='text'
              required={true}
            />
          </FormGroup>
          <FormGroup className='mb-3' controlId='max'>
            <FormLabel>Maximum Spending</FormLabel>
            <FormControl
              ref={maxAmountRef}
              type='number'
              min={0}
              defaultValue={budget.max}
              step={0.1}
              required={true}
            />
          </FormGroup>
          <div className='d-flex justify-content-end'>
            <Button variant='primary' type='submit'>
              Edit Budget
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
EditBudgetModal.propTypes = {
  budgetId: PropTypes.string,
  handleClose: PropTypes.func,
}
export default EditBudgetModal
