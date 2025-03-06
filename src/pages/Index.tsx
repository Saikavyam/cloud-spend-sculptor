
import React from 'react';
import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import { ExpenseProvider } from '@/context/ExpenseContext';

const Index = () => {
  return (
    <ExpenseProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </ExpenseProvider>
  );
};

export default Index;
