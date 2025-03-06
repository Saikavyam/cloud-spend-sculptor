
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ExpenseProvider } from "./context/ExpenseContext";
import ExpenseForm from "./components/ExpenseForm";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ExpenseList from "./components/ExpenseList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ExpenseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add" element={
              <Layout>
                <ExpenseForm />
              </Layout>
            } />
            <Route path="/analytics" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route path="/reports" element={
              <Layout>
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Expense Reports</h1>
                    <p className="text-muted-foreground mt-1">View and manage all your expenses</p>
                  </div>
                  <ExpenseList />
                </div>
              </Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ExpenseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
