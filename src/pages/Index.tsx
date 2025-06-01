import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import RevenueChart from '@/components/Dashboard/RevenueChart';
import TargetSection from '@/components/Dashboard/TargetSection';
import IncomeOverview from '@/components/Dashboard/IncomeOverview';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Info, CalendarDays, Printer, ChevronDown } from 'lucide-react';

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout title="Dashboard Overview | Architect">
      {/* Page Header: Title, Breadcrumbs, Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Minimal Dashboard</h1>
          <p className="text-sm text-muted-foreground flex items-center space-x-1.5">
            {/* In a real app, breadcrumb parts would likely be Link components from react-router-dom */}
            <span className="hover:underline cursor-pointer">Dashboards</span>
            <span>/</span>
            <span>Minimal Dashboard Example</span>
          </p>
        </div>
        <div className="flex items-center space-x-2 self-start sm:self-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>Select period</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>Last Month</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print</span>
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      <Alert className="bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="font-medium text-blue-800 dark:text-blue-200">FYI</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          This dashboard example was created using only the available elements and components, no additional SCSS was written!
        </AlertDescription>
      </Alert>

      <StatsCardGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart className="lg:col-span-2" />
        <IncomeOverview className="lg:col-span-1" />
      </div>

      {/* The section with small cards (Income $5,456, Expenses $4,764, etc.) is omitted 
          as it's not in the provided Component Hierarchy, adhering strictly to those defined organisms. 
          If required, it would be a grid of Card components here. */}

      <TargetSection />
    </MainAppLayout>
  );
};

export default IndexPage;
