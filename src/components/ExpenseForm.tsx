
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExpenses, ExpenseCategory } from '@/context/ExpenseContext';
import { categoryLabels } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import CategoryBadge from './ui/CategoryBadge';

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category || !date) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate a network request
    setTimeout(() => {
      addExpense({
        amount: parseFloat(amount),
        description,
        category,
        date
      });
      
      toast({
        title: "Expense Added",
        description: "Your expense has been successfully recorded.",
      });
      
      // Reset form
      setAmount('');
      setDescription('');
      setCategory('food');
      setDate(new Date().toISOString().split('T')[0]);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto mt-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Add Expense</h1>
        <p className="text-muted-foreground mt-1">Record a new expense</p>
      </div>
      
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>New Expense</CardTitle>
          <CardDescription>Enter the details of your expense</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What was this expense for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={category} 
                onValueChange={(value) => setCategory(value as ExpenseCategory)}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <CategoryBadge category={value as ExpenseCategory} />
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Expense'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ExpenseForm;
