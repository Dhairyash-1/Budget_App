import { Card, ProgressBar, Button, Stack } from 'react-bootstrap'
import { currencyFormater } from '../utils'
import PropTypes from 'prop-types'

function BudgetCard({
  name,
  maxAmount,
  amount,
  gray,
  editBudget,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  onEditBudgetClick,
}) {
  let classNames = []
  if (amount > maxAmount) {
    classNames.push('bg-danger', 'bg-opacity-10')
  } else if (gray) {
    classNames.push('bg-light')
  }

  return (
    <Card>
      <Card.Body className={classNames.join(' ')}>
        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-4'>
          <div className='me-2'>{name}</div>
          <div className='d-flex align-items-baseline'>
            {currencyFormater.format(amount)}
            {maxAmount && (
              <span className='text-muted fs-6 ms-1'>
                {' '}
                / {currencyFormater.format(maxAmount)}
              </span>
            )}
          </div>
        </Card.Title>
        {maxAmount && (
          <ProgressBar
            className='rounded-pill'
            now={amount}
            min={0}
            max={maxAmount}
            variant={getProgressBarVariant(amount, maxAmount)}
          />
        )}
        {!hideButtons && (
          <Stack direction='horizontal' className='mt-4 mr-auto' gap={2}>
            {!editBudget && (
              <Button onClick={onEditBudgetClick} variant='primary'>
                Edit Budget
              </Button>
            )}
            <Button
              onClick={onAddExpenseClick}
              className='ms-auto'
              variant='outline-primary'
            >
              Add Expenses
            </Button>
            <Button variant='outline-secondary' onClick={onViewExpensesClick}>
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}
BudgetCard.propTypes = {
  name: PropTypes.string,
  maxAmount: PropTypes.number,
  amount: PropTypes.number,
  gray: PropTypes.bool,
  editBudget: PropTypes.bool,
  hideButtons: PropTypes.bool,
  onAddExpenseClick: PropTypes.func,
  onViewExpensesClick: PropTypes.func,
  onEditBudgetClick: PropTypes.func,
}

export default BudgetCard

function getProgressBarVariant(amt, max) {
  let ratio = amt / max

  if (ratio < 0.5) return 'primary'
  if (ratio < 0.75) return 'warning'
  return 'danger'
}
