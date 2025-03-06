
import React from 'react';
import { cn } from '@/lib/utils';
import { ExpenseCategory } from '@/context/ExpenseContext';
import { ShoppingBag, Car, Film, Lightbulb, ShoppingCart, Heart, Home, Package } from 'lucide-react';

interface CategoryBadgeProps {
  category: ExpenseCategory;
  large?: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, large = false }) => {
  const iconProps = {
    className: cn(
      "h-4 w-4",
      large && "h-5 w-5"
    ),
  };
  
  const categories: Record<ExpenseCategory, { icon: React.ReactNode; color: string }> = {
    food: {
      icon: <ShoppingBag {...iconProps} />,
      color: 'expense-food'
    },
    transport: {
      icon: <Car {...iconProps} />,
      color: 'expense-transport'
    },
    entertainment: {
      icon: <Film {...iconProps} />,
      color: 'expense-entertainment'
    },
    utilities: {
      icon: <Lightbulb {...iconProps} />,
      color: 'expense-utilities'
    },
    shopping: {
      icon: <ShoppingCart {...iconProps} />,
      color: 'expense-shopping'
    },
    health: {
      icon: <Heart {...iconProps} />,
      color: 'expense-health'
    },
    housing: {
      icon: <Home {...iconProps} />,
      color: 'expense-housing'
    },
    other: {
      icon: <Package {...iconProps} />,
      color: 'expense-other'
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-full text-white",
        `bg-${categories[category].color}`,
        large ? "w-10 h-10" : "w-8 h-8"
      )}
      style={{ backgroundColor: `hsl(var(--${categories[category].color}))` }}
    >
      {categories[category].icon}
    </div>
  );
};

export default CategoryBadge;
