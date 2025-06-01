import React from 'react';
import TopHeader from '../Dashboard/TopHeader';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, onToggleSidebar }) => {
  // TopHeader component handles its own fixed positioning and styling:
  // h-[72px], fixed top-0, responsive left (0 on mobile, 64px on md+), right-0, z-10,
  // bg-card, border-b. It also includes the mobile menu toggle button.
  return (
    <TopHeader
      className={cn(className)}
      onToggleSidebar={onToggleSidebar}
    />
  );
};

export default Header;
