import React from 'react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  Users,
  FileText,
  Layers,
  Settings2,
  ChevronRight,
  Shield,
  Component as ComponentIcon, // Renamed to avoid conflict with React.Component
  TableCells,
  PieChart as PieChartIcon, // Renamed for clarity
  UserCircle,
  ClipboardList,
  BarChartBig,
  AppWindow
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  subItems?: NavItem[];
  isHeader?: boolean;
}

const navItemsData: NavItem[] = [
  { id: 'menu-header', label: 'MENU', icon: () => null, isHeader: true }, 
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    subItems: [
      { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '#' },
      { id: 'commerce', label: 'Commerce', icon: ShoppingCart, href: '#' },
      { id: 'sales', label: 'Sales', icon: Users, href: '#' }, // Using Users for Sales as an example
      { id: 'minimal', label: 'Minimal', icon: Shield, href: '#', subItems: [
        { id: 'variation1', label: 'Variation 1', icon: ChevronRight, href: '#' },
        { id: 'variation2', label: 'Variation 2', icon: ChevronRight, href: '#' },
      ]},
    ],
  },
  { id: 'crm', label: 'CRM', icon: Users, href: '#' },
  {
    id: 'pages',
    label: 'Pages',
    icon: FileText,
    subItems: [
      { id: 'page-1', label: 'Page 1', icon: ChevronRight, href: '#' },
      { id: 'page-2', label: 'Page 2', icon: ChevronRight, href: '#' },
    ],
  },
  { id: 'applications', label: 'Applications', icon: AppWindow, href: '#' }, 
  { id: 'ui-components-header', label: 'UI COMPONENTS', icon: () => null, isHeader: true }, 
  {
    id: 'ui-components',
    label: 'Elements',
    icon: Layers,
    subItems: [
      { id: 'elements-sub', label: 'Elements Item', icon: ChevronRight, href: '#' },
    ]
  },
  { id: 'components', label: 'Components', icon: ComponentIcon, href: '#' }, 
  { id: 'tables', label: 'Tables', icon: TableCells, href: '#' }, 
  { id: 'dashboard-widgets-header', label: 'DASHBOARD WIDGETS', icon: () => null, isHeader: true }, 
  { id: 'chart-boxes1', label: 'Chart Boxes 1', icon: PieChartIcon, href: '#' },
  { id: 'profile-boxes', label: 'Profile Boxes', icon: UserCircle, href: '#' },
  { id: 'forms-header', label: 'FORMS', icon: () => null, isHeader: true }, 
  { id: 'forms-elements', label: 'Elements', icon: ClipboardList, href: '#' },
  { id: 'charts-header', label: 'CHARTS', icon: () => null, isHeader: true }, 
  { id: 'chart-js', label: 'ChartJS', icon: BarChartBig, href: '#' },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activePath, setActivePath] = React.useState<string>('#'); // Example active path

  const renderNavItem = (item: NavItem, isSubItem = false, level = 0) => {
    const Icon = item.icon;
    const isActive = activePath === item.href;

    if (item.isHeader) {
      return (
        <h3 key={item.id} className={cn(
          "px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70",
          level > 0 && "pl-8"
        )}>
          {item.label}
        </h3>
      );
    }

    if (item.subItems) {
      return (
        <AccordionItem value={item.id} key={item.id} className="border-none">
          <AccordionTrigger className={cn(
            "w-full flex items-center justify-between py-2 px-4 rounded-md text-sm hover:bg-sidebar-accent focus:ring-2 focus:ring-sidebar-ring outline-none",
            isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground",
            isSubItem && "pl-8",
            `pl-${4 + level * 4}`
          )}>
            <div className="flex items-center">
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.label}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            {item.subItems.map((subItem) => renderNavItem(subItem, true, level + 1))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <a
        key={item.id}
        href={item.href}
        onClick={() => item.href && setActivePath(item.href)}
        className={cn(
          "flex items-center py-2 px-4 rounded-md text-sm hover:bg-sidebar-accent focus:ring-2 focus:ring-sidebar-ring outline-none",
          isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground",
          isSubItem && "pl-8",
          `pl-${4 + level * 4}`
        )}
      >
        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        {item.label}
      </a>
    );
  };

  return (
    <aside className={cn("w-64 bg-sidebar text-sidebar-foreground h-screen fixed top-0 left-0 flex flex-col", className)}>
      <div className="p-4 border-b border-sidebar-border">
        <a href="#" className="text-2xl font-bold text-white">Architect</a>
      </div>
      <ScrollArea className="flex-grow">
        <Accordion type="multiple" className="w-full p-2 space-y-1">
          {navItemsData.map((item) => renderNavItem(item))}
        </Accordion>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center py-2 px-4 rounded-md text-sm hover:bg-sidebar-accent text-sidebar-foreground">
          <Settings2 className="w-5 h-5 mr-3" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default SidebarNav;
