import { Button, Form, Modal } from 'react-bootstrap'
import { useRef } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetsContext'
import PropTypes from 'prop-types'

function EditExpenseModal({ handleClose, expenseId }) {
  const { editExpense, expenses, budgets } = useBudgets()
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const expense = expenses.find(expense => expense.id === expenseId)

  function handleSubmit(e) {
    e.preventDefault()
    editExpense({
      id: expenseId,
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
    handleClose()
  }

  if (!expenseId) return null

  return (
    <Modal show={expenseId} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              type='text'
              defaultValue={expense.description}
              required={true}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='max'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type='number'
              min={0}
              step={0.1}
              required={true}
              defaultValue={expense.amount}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='budgetId'>
            <Form.Label>Budget</Form.Label>

            <Form.Select
              ref={budgetIdRef}
              defaultValue={expense.budgetId}
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
              Edit Expense
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
EditExpenseModal.propTypes = {
  handleClose: PropTypes.func,
  expenseId: PropTypes.string,
}

export default EditExpenseModal
