
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExpenses } from '@/context/ExpenseContext';
import SpendingChart from './Charts/SpendingChart';
import TrendChart from './Charts/TrendChart';
import ExpenseList from './ExpenseList';
import { DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { totalAmount, expenses } = useExpenses();
  
  // Calculate insights
  const currentMonthTotal = expenses
    .filter(e => {
      const today = new Date();
      const expenseDate = new Date(e.date);
      return expenseDate.getMonth() === today.getMonth() && 
             expenseDate.getFullYear() === today.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);
  
  const previousMonthTotal = expenses
    .filter(e => {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
      const expenseDate = new Date(e.date);
      return expenseDate.getMonth() === lastMonth.getMonth() && 
             expenseDate.getFullYear() === lastMonth.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);
  
  const monthlyChange = previousMonthTotal ? 
    ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 : 0;
  
  const largestExpense = [...expenses]
    .sort((a, b) => b.amount - a.amount)[0]?.amount || 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your expense overview at a glance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="text-3xl">
              ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="mr-1 h-4 w-4" />
              <span>All time spending</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-3xl">
              ${currentMonthTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              {monthlyChange > 0 ? (
                <div className="flex items-center text-red-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>{Math.abs(monthlyChange).toFixed(1)}% from last month</span>
                </div>
              ) : (
                <div className="flex items-center text-green-500">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  <span>{Math.abs(monthlyChange).toFixed(1)}% from last month</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Largest Expense</CardDescription>
            <CardTitle className="text-3xl">
              ${largestExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="mr-1 h-4 w-4" />
              <span>Highest single transaction</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Average Per Month</CardDescription>
            <CardTitle className="text-3xl">
              ${previousMonthTotal ? (totalAmount / (expenses.length > 0 ? 3 : 1)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="mr-1 h-4 w-4" />
              <span>Based on 3-month history</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Spending Overview</TabsTrigger>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="recent">Recent Expenses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0 animate-slide-up">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>How your expenses are distributed</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-80">
                <SpendingChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-0 animate-slide-up">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Monthly Spending Trends</CardTitle>
              <CardDescription>Your spending patterns over time</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-80">
                <TrendChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0 animate-slide-up">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseList limit={5} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
