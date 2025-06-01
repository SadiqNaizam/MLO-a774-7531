import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string; // Optional title for the page
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className, title }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const handleToggleSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  useEffect(() => {
    // Set document title if 'title' prop is provided
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <div className={cn("flex h-screen bg-background", className)}>
      <Sidebar isMobileOpen={isMobileSidebarOpen} />

      {/* Overlay for mobile when sidebar is open */} 
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={handleToggleSidebar}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header is fixed with z-10 (managed by TopHeader component) */}
        <Header onToggleSidebar={handleToggleSidebar} />

        <main
          className={cn(
            "flex-1 overflow-x-hidden overflow-y-auto bg-background",
            "p-6", // mainContent.layout: p-6
            "mt-[72px]", // mainContent.layout: mt-[72px] (header height)
            "md:ml-64" // Account for fixed desktop sidebar (width w-64)
          )}
        >
          {/* Inner container as per mainContent.container: flex flex-col gap-6 */}
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
