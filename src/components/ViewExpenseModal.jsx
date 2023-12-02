import { Button, Modal, Stack } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetsContext'
import { currencyFormater } from '../utils'
import PropTypes from 'prop-types'

function ViewExpanseModal({ budgetId, handleClose, onEditExpenseClick }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets()
  const expenses = getBudgetExpenses(budgetId)
  const budget =
    budgetId === UNCATEGORIZED_BUDGET_ID
      ? { name: 'UnCategorized', id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          <Stack direction='horizontal' gap='2'>
            <div>Expenses - {budget?.name}</div>
            {budgetId != UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant='outline-danger'
                onClick={() => {
                  deleteBudget(budget), handleClose()
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap='3'>
          {expenses.map(expense => (
            <Stack key={expense.id} direction='horizontal' gap='2'>
              <div className='fs-4 me-auto'>{expense.description}</div>
              <div className='fs-5'>
                {currencyFormater.format(expense.amount)}
              </div>
              <Button
                onClick={() => {
                  deleteExpense(expense)
                }}
                size='sm'
                variant='outline-danger'
              >
                &times;
              </Button>
              <Button
                onClick={() => {
                  onEditExpenseClick(expense.id)
                }}
                size='sm'
                variant='outline-secondary'
              >
                Edit
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
ViewExpanseModal.propTypes = {
  budgetId: PropTypes.string,
  handleClose: PropTypes.func,
  onEditExpenseClick: PropTypes.func,
}
export default ViewExpanseModal
