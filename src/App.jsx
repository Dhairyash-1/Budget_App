import { Button, Container, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import { useState } from 'react'
import { useBudgets } from './context/BudgetsContext'
import AddExpenseModal from './components/AddExpenseModal'
import { UNCATEGORIZED_BUDGET_ID } from './context/BudgetsContext'
import UnCategorizedBudgetCard from './components/UnCategorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpanseModal from './components/ViewExpenseModal'
import EditBudgetModal from './components/EditBudgetModal'
import EditExpenseModal from './components/EditExpenseModal'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [editBudgetModalBudgetId, setEditBudgetModalBudgetId] = useState()
  const [editExpenseModalId, setEditExpanseModalId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    if (typeof budgetId === 'object') return
    setAddExpenseModalBudgetId(budgetId)
    console.log(budgetId, typeof budgetId)
  }
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    alignItems: 'flex-start',
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap={3} className='mb-4'>
          <h2 className='me-auto '>Budgets</h2>
          <Button
            className='fs-10'
            variant='primary'
            onClick={() => setShowAddBudgetModal(true)}
          >
            Add Budget
          </Button>
          <Button onClick={openAddExpenseModal} variant='outline-primary'>
            Add Expense
          </Button>
        </Stack>

        <div style={containerStyle}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                maxAmount={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpenseModalBudgetId(budget.id)
                }
                onEditBudgetClick={() => setEditBudgetModalBudgetId(budget.id)}
              />
            )
          })}
          <UnCategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpanseModal
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId()}
        onEditExpenseClick={setEditExpanseModalId}
      />
      <EditBudgetModal
        budgetId={editBudgetModalBudgetId}
        handleClose={() => setEditBudgetModalBudgetId()}
      />
      <EditExpenseModal
        handleClose={() => setEditExpanseModalId()}
        expenseId={editExpenseModalId}
      />
    </>
  )
}

export default App
