import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Circle, Square } from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface RevenueChartProps {
  className?: string;
}

const chartData = [
  { name: 'Jan 00', websiteBlog: 400, socialMedia: 240 },
  { name: '02 Jan', websiteBlog: 500, socialMedia: 398 },
  { name: '03 Jan', websiteBlog: 400, socialMedia: 600 },
  { name: '04 Jan', websiteBlog: 650, socialMedia: 300 },
  { name: '05 Jan', websiteBlog: 220, socialMedia: 708 },
  { name: '06 Jan', websiteBlog: 450, socialMedia: 200 },
  { name: '07 Jan', websiteBlog: 180, socialMedia: 480 },
  { name: '08 Jan', websiteBlog: 380, socialMedia: 320 },
  { name: '09 Jan', websiteBlog: 780, socialMedia: 220 },
  { name: '10 Jan', websiteBlog: 280, socialMedia: 500 },
  { name: '11 Jan', websiteBlog: 150, socialMedia: 120 },
  { name: '12 Jan', websiteBlog: 350, socialMedia: 180 },
];

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border">
        <p className="label text-sm font-semibold">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-xs">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Website Blog vs Social Media performance</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-accentOrange text-white hover:bg-accentOrange/90">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Download Report</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" वर्टिकल={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                yAxisId="left"
                orientation="left" 
                stroke="hsl(var(--muted-foreground))" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right" 
                stroke="hsl(var(--muted-foreground))" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }}/>
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconSize={10}
                formatter={(value, entry) => {
                  const { color } = entry;
                  return <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>;
                }}
                payload={[
                    { value: 'Website Blog', type: 'rect', id: 'ID01', color: 'hsl(var(--primary))' },
                    { value: 'Social Media', type: 'line', id: 'ID02', color: 'hsl(var(--accent-green))', iconType:'line' }, // Using tailwind.config.ts accentGreen
                ]}
              />
              <Bar yAxisId="left" dataKey="websiteBlog" fill="hsl(var(--primary))" barSize={20} radius={[4, 4, 0, 0]} name="Website Blog"/>
              <Line yAxisId="right" type="monotone" dataKey="socialMedia" stroke="hsl(var(--accent-green))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--accent-green))', strokeWidth:2, stroke: 'hsl(var(--card))' }} activeDot={{ r: 6 }} name="Social Media"/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
