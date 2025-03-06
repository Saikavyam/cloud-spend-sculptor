
import { Expense } from '@/context/ExpenseContext';

export const mockExpenses: Expense[] = [
  {
    id: '1',
    amount: 45.67,
    description: 'Grocery shopping',
    category: 'food',
    date: '2023-06-01',
  },
  {
    id: '2',
    amount: 120.00,
    description: 'Monthly transit pass',
    category: 'transport',
    date: '2023-06-02',
  },
  {
    id: '3',
    amount: 57.50,
    description: 'Movie tickets and popcorn',
    category: 'entertainment',
    date: '2023-06-10',
  },
  {
    id: '4',
    amount: 130.42,
    description: 'Electricity bill',
    category: 'utilities',
    date: '2023-06-15',
  },
  {
    id: '5',
    amount: 95.34,
    description: 'New shoes',
    category: 'shopping',
    date: '2023-06-18',
  },
  {
    id: '6',
    amount: 75.00,
    description: 'Doctor appointment',
    category: 'health',
    date: '2023-06-20',
  },
  {
    id: '7',
    amount: 1200.00,
    description: 'Rent payment',
    category: 'housing',
    date: '2023-06-01',
  },
  {
    id: '8',
    amount: 35.99,
    description: 'Books',
    category: 'other',
    date: '2023-06-24',
  },
  {
    id: '9',
    amount: 28.50,
    description: 'Coffee shop meetup',
    category: 'food',
    date: '2023-07-03',
  },
  {
    id: '10',
    amount: 65.75,
    description: 'Gas refill',
    category: 'transport',
    date: '2023-07-07',
  },
  {
    id: '11',
    amount: 92.40,
    description: 'Concert tickets',
    category: 'entertainment',
    date: '2023-07-12',
  },
  {
    id: '12',
    amount: 80.00,
    description: 'Water bill',
    category: 'utilities',
    date: '2023-07-15',
  },
  {
    id: '13',
    amount: 149.99,
    description: 'Winter jacket',
    category: 'shopping',
    date: '2023-07-19',
  },
  {
    id: '14',
    amount: 32.50,
    description: 'Pharmacy',
    category: 'health',
    date: '2023-07-22',
  },
  {
    id: '15',
    amount: 1200.00,
    description: 'Rent payment',
    category: 'housing',
    date: '2023-07-01',
  },
  {
    id: '16',
    amount: 22.99,
    description: 'Office supplies',
    category: 'other',
    date: '2023-07-25',
  },
  {
    id: '17',
    amount: 62.34,
    description: 'Restaurant dinner',
    category: 'food',
    date: '2023-08-02',
  },
  {
    id: '18',
    amount: 48.00,
    description: 'Uber rides',
    category: 'transport',
    date: '2023-08-05',
  },
  {
    id: '19',
    amount: 37.80,
    description: 'Streaming subscriptions',
    category: 'entertainment',
    date: '2023-08-10',
  },
  {
    id: '20',
    amount: 110.25,
    description: 'Internet bill',
    category: 'utilities',
    date: '2023-08-15',
  }
];

export const categoryIcons: Record<string, string> = {
  food: '🍲',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '💡',
  shopping: '🛍️',
  health: '⚕️',
  housing: '🏠',
  other: '📦'
};

export const categoryLabels: Record<string, string> = {
  food: 'Food & Dining',
  transport: 'Transportation',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  shopping: 'Shopping',
  health: 'Healthcare',
  housing: 'Housing & Rent',
  other: 'Other'
};
