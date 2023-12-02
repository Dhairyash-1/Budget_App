import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetsContext'
import BudgetCard from './BudgetCard'

function TotalBudgetCard() {
  const { budgets, expenses } = useBudgets()

  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const maxAmount = budgets.reduce((total, budget) => total + budget.max, 0)
  if (maxAmount === 0) return null

  return (
    <>
      <BudgetCard
        name='Total'
        maxAmount={maxAmount}
        amount={amount}
        gray
        hideButtons
      />
    </>
  )
}

export default TotalBudgetCard
