
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, Trash } from 'lucide-react';
import { Expense, useExpenses } from '@/context/ExpenseContext';
import { formatDate } from '@/lib/utils';
import CategoryBadge from './CategoryBadge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
  const { deleteExpense } = useExpenses();
  const { toast } = useToast();

  const handleDelete = () => {
    deleteExpense(expense.id);
    toast({
      title: "Expense deleted",
      description: "The expense has been removed."
    });
  };

  // Format date
  const formattedDate = formatDate(new Date(expense.date));

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-none shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <CategoryBadge category={expense.category} large />
            
            <div>
              <h3 className="font-medium line-clamp-1">{expense.description}</h3>
              <p className="text-muted-foreground text-sm">{formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <p className="font-medium text-lg">
              ${expense.amount.toFixed(2)}
            </p>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
