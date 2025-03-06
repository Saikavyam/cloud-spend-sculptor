
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, BarChart, Plus, Home, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'Add Expense', icon: <Plus className="w-5 h-5" />, path: '/add' },
    { name: 'Analytics', icon: <PieChart className="w-5 h-5" />, path: '/analytics' },
    { name: 'Reports', icon: <BarChart className="w-5 h-5" />, path: '/reports' },
  ];

  const NavContent = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-medium tracking-tight">Cloud Expenses</h2>
        <p className="text-sm text-muted-foreground">Track and visualize your spending</p>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <aside className="w-64 border-r border-gray-200 bg-white">
          <div className="h-full p-4">
            <NavContent />
          </div>
        </aside>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header with menu */}
        {isMobile && (
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-medium">Cloud Expenses</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <div className="flex justify-between items-center h-10">
                    <h2 className="font-semibold">Menu</h2>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <NavContent />
                </SheetContent>
              </Sheet>
            </div>
          </header>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
