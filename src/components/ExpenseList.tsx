
import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import ExpenseCard from './ui/ExpenseCard';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, ArrowDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ExpenseListProps {
  limit?: number;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ limit }) => {
  const { expenses } = useExpenses();
  const [sortBy, setSortBy] = React.useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
  });

  const displayExpenses = limit ? sortedExpenses.slice(0, limit) : sortedExpenses;

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No expenses yet</h3>
        <p className="text-muted-foreground">Add your first expense to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {limit ? 'Recent Expenses' : 'All Expenses'}
        </h3>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ArrowDownUp className="h-4 w-4" />
                Sort by {sortBy === 'date' ? 'Date' : 'Amount'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('date')}>
                Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('amount')}>
                Amount
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={toggleSortOrder}
          >
            <ArrowDown className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
            <span className="sr-only">Toggle sort order</span>
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {displayExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
