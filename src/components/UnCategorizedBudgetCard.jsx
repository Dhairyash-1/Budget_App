import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetsContext'
import BudgetCard from './BudgetCard'

function UnCategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  )

  if (amount === 0) return null
  return (
    <>
      <BudgetCard
        name='Uncategorized'
        amount={amount}
        gray
        editBudget
        {...props}
      />
    </>
  )
}

export default UnCategorizedBudgetCard
