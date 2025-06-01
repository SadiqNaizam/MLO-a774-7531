import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ListFilter } from 'lucide-react'; // ListFilter icon from image
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label
} from 'recharts';

interface IncomeOverviewProps {
  className?: string;
}

const overviewData = {
  percentage: 75,
  goalLabel: 'Percent',
  targetDescription: '32% Spendings Target',
  colors: ['hsl(var(--accent-green))', 'hsl(var(--accent-blue))', 'hsl(var(--border))'] // Green, Blue, Background for unfilled
};

const IncomeOverview: React.FC<IncomeOverviewProps> = ({ className }) => {
  const pieData = [
    { name: 'Completed Gradient Start', value: overviewData.percentage / 2, color: overviewData.colors[0] },
    { name: 'Completed Gradient End', value: overviewData.percentage / 2, color: overviewData.colors[1] },
    { name: 'Remaining', value: 100 - overviewData.percentage, color: overviewData.colors[2] },
  ];

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Income</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <ListFilter className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={overviewData.colors[0]} />
                  <stop offset="100%" stopColor={overviewData.colors[1]} />
                </linearGradient>
              </defs>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                startAngle={90}
                endAngle={90 + (overviewData.percentage / 100) * 360}
                paddingAngle={0}
                dataKey="value"
                cornerRadius={50} // Gives rounded ends to the active part
              >
                {/* This part is for the active segment with gradient */} 
                <Cell fill="url(#progressGradient)" stroke="none" />
              </Pie>
              {/* Background for the remaining part */}
              <Pie
                data={[{ value: 100 }]}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                startAngle={90}
                endAngle={450}
                paddingAngle={0}
                dataKey="value"
                isAnimationActive={false}
              >
                 <Cell fill={overviewData.colors[2]} stroke="none" />
              </Pie>
              <Label
                content={({ viewBox }) => {
                  if (viewBox) {
                    const { cx, cy } = viewBox;
                    return (
                      <React.Fragment>
                        <text x={cx} y={cy && cy - 5} textAnchor="middle" dominantBaseline="central" className="text-xs text-muted-foreground">
                          {overviewData.goalLabel}
                        </text>
                        <text x={cx} y={cy && cy + 20} textAnchor="middle" dominantBaseline="central" className="text-4xl font-bold fill-foreground">
                          {`${overviewData.percentage}`}
                        </text>
                      </React.Fragment>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <CardDescription className="mt-4 text-center">
          {overviewData.targetDescription}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default IncomeOverview;
