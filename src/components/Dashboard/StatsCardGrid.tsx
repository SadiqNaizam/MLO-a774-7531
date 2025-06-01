import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowUpRight,
  ArrowDownRight,
  UsersRound,
  CreditCard,
  Landmark,
  UserPlus,
} from 'lucide-react';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  percentageChange: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
  changeColor: string;
}

const statsData: StatCardData[] = [
  {
    id: 'new-accounts',
    title: 'NEW ACCOUNTS',
    value: '234%',
    percentageChange: 58, // This seems to be a progress value in the image, not a percentage change
    changeType: 'increase' as const,
    icon: UsersRound,
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-accentBlue',
    changeColor: 'text-accentGreen',
  },
  {
    id: 'total-expenses',
    title: 'TOTAL EXPENSES',
    value: '71%',
    percentageChange: 62,
    changeType: 'decrease' as const,
    icon: CreditCard,
    iconBgColor: 'bg-red-100',
    iconColor: 'text-accentRed',
    changeColor: 'text-accentRed',
  },
  {
    id: 'company-value',
    title: 'COMPANY VALUE',
    value: '$ 1,45M',
    percentageChange: 72,
    changeType: 'neutral' as const, // No up/down arrow in image, value itself is positive
    icon: Landmark,
    iconBgColor: 'bg-orange-100',
    iconColor: 'text-accentOrange',
    changeColor: 'text-foreground', // Neutral color or could be a slight positive like green
  },
  {
    id: 'new-employees',
    title: 'NEW EMPLOYEES',
    value: '+ 34 hires',
    percentageChange: 81,
    changeType: 'increase' as const,
    icon: UserPlus,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-accentGreen',
    changeColor: 'text-accentGreen',
  },
];

interface StatsCardProps {
  data: StatCardData;
}

const StatCard: React.FC<StatsCardProps> = ({ data }) => {
  const ChangeIcon = data.changeType === 'increase' ? ArrowUpRight : data.changeType === 'decrease' ? ArrowDownRight : null;
  const IconComponent = data.icon;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className={cn("text-3xl font-bold", data.changeColor)}>
              {ChangeIcon && <ChangeIcon className={cn("inline-block h-6 w-6 mr-1", data.changeColor)} />}
              {data.value}
            </div>
          </div>
          <div className={cn("flex items-center justify-center h-12 w-12 rounded-full", data.iconBgColor)}>
            <IconComponent className={cn("h-6 w-6", data.iconColor)} />
          </div>
        </div>
         {/* The small number (e.g., 58) next to the circle in the image seems like a progress indicator rather than percentage change */}
         {/* For now, I'm interpreting it as part of the design with the circle. */}
         {/* If it were a progress, a small progress circle would be used. The image shows it as a number within/near the colored circle. */}
         {/* The data.percentageChange is used in the context of the main value's trend, not the small circle value directly. */}
         {/* The image is slightly ambiguous. I'll represent the number next to the icon for consistency with image. */}
        <div className="text-xs text-muted-foreground mt-1 text-right">
          <span className={cn("font-semibold", data.iconColor)}>{data.percentageChange}</span>
           {/* This could be a label like 'vs last period' or just the value as in image */} 
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsCardGridProps {
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {statsData.map((stat) => (
        <StatCard key={stat.id} data={stat} />
      ))}
    </div>
  );
};

export default StatsCardGrid;
