import { Button, Form, Modal } from 'react-bootstrap'
import { useRef } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetsContext'
import PropTypes from 'prop-types'

function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  const { addExpense, budgets } = useBudgets()
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  function handleSubmit(e) {
    e.preventDefault()
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type='text' required={true} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='max'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type='number'
              min={0}
              step={0.1}
              required={true}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='budgetId'>
            <Form.Label>Budget</Form.Label>

            <Form.Select
              ref={budgetIdRef}
              defaultValue={defaultBudgetId}
              required={true}
            >
              <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map(budget => (
                <option value={budget.id} key={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
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
AddExpenseModal.propTypes = {
  show: PropTypes.bool,
  defaultBudgetId: PropTypes.string,
  handleClose: PropTypes.func,
}

export default AddExpenseModal
