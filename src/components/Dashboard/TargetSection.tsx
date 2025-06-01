import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface TargetItemData {
  id: string;
  label: string;
  percentage: number;
  targetLabel: string;
  progressColor: string; // Tailwind class for progress bar color
}

const targetData: TargetItemData[] = [
  {
    id: 'income-target',
    label: '71%',
    percentage: 71,
    targetLabel: 'Income Target',
    progressColor: 'bg-accentRed',
  },
  {
    id: 'expenses-target',
    label: '54%',
    percentage: 54,
    targetLabel: 'Expenses Target',
    progressColor: 'bg-accentGreen',
  },
  {
    id: 'spendings-target',
    label: '32%',
    percentage: 32,
    targetLabel: 'Spendings Target',
    progressColor: 'bg-accentOrange',
  },
  {
    id: 'totals-target',
    label: '89%',
    percentage: 89,
    targetLabel: 'Totals Target',
    progressColor: 'bg-accentBlue',
  },
];

interface TargetItemProps {
  data: TargetItemData;
}

const TargetItem: React.FC<TargetItemProps> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between">
        <span className={`text-2xl font-bold ${data.progressColor.replace('bg-', 'text-')}`}>{data.label}</span>
      </div>
      <Progress value={data.percentage} className={`h-2 mt-1 ${data.progressColor}`} indicatorClassName={data.progressColor} />
      <p className="text-sm text-muted-foreground mt-1">{data.targetLabel}</p>
    </div>
  );
};

interface TargetSectionProps {
  className?: string;
}

const TargetSection: React.FC<TargetSectionProps> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Target Section</CardTitle>
          <CardDescription>Overview of key financial targets.</CardDescription>
        </div>
        <Button variant="link" className="text-sm text-primary">
          View Details
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {targetData.map((target) => (
          <TargetItem key={target.id} data={target} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TargetSection;
