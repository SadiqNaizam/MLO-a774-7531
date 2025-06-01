import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  isMobileOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ className, isMobileOpen = false }) => {
  return (
    <SidebarNav
      className={cn(
        // SidebarNav is 'fixed top-0 left-0 w-64 ...' by default.
        // We control its visibility on mobile by translating it horizontally.
        "transition-transform duration-300 ease-in-out z-30",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0", // Ensure it's visible and correctly positioned on desktop
        className
      )}
    />
  );
};

export default Sidebar;
