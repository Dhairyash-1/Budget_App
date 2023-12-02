import { useContext, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from '../hook/useLocalStorage'

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'
const BudgetsContext = createContext()

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', [])
  const [expenses, setExpenses] = useLocalStorage('expenses', [])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }
  function addExpense({ budgetId, description, amount }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidv4(), budgetId, description, amount }]
    })
  }
  function addBudget({ name, max }) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budgets => budgets.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidv4(), name, max }]
    })
  }
  function deleteBudget({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }
  function editBudget({ id, name, max }) {
    setBudgets(prevBudgets => {
      return prevBudgets.map(budget => {
        return budget.id === id ? { ...budget, name, max } : budget
      })
    })
  }
  function editExpense({ id, budgetId, amount, description }) {
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        return expense.id === id
          ? { ...expense, budgetId, description, amount }
          : expense
      })
    })
  }
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        editBudget,
        editExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}
