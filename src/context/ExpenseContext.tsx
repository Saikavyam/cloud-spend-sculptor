
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { mockExpenses } from '@/lib/data';

export type ExpenseCategory = 
  'food' | 
  'transport' | 
  'entertainment' | 
  'utilities' | 
  'shopping' | 
  'health' | 
  'housing' | 
  'other';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  editExpense: (id: string, expense: Partial<Omit<Expense, 'id'>>) => void;
  totalAmount: number;
  getExpensesByCategory: () => Record<ExpenseCategory, number>;
  getExpensesByMonth: () => { month: string; amount: number }[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load mock data on initial render
  useEffect(() => {
    setExpenses(mockExpenses);
  }, []);

  // Update total amount whenever expenses change
  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const editExpense = (id: string, updatedExpense: Partial<Omit<Expense, 'id'>>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

  const getExpensesByCategory = () => {
    const categorySums: Record<ExpenseCategory, number> = {
      food: 0,
      transport: 0,
      entertainment: 0,
      utilities: 0,
      shopping: 0,
      health: 0,
      housing: 0,
      other: 0,
    };

    expenses.forEach((expense) => {
      categorySums[expense.category] += expense.amount;
    });

    return categorySums;
  };

  const getExpensesByMonth = () => {
    const monthlyData: Record<string, number> = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      
      monthlyData[monthYear] += expense.amount;
    });

    // Convert to array and sort by date
    return Object.entries(monthlyData)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split(' ');
        const [bMonth, bYear] = b.month.split(' ');
        
        if (aYear !== bYear) {
          return parseInt(aYear) - parseInt(bYear);
        }
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.indexOf(aMonth) - months.indexOf(bMonth);
      });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        editExpense,
        totalAmount,
        getExpensesByCategory,
        getExpensesByMonth,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
