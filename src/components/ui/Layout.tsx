import React, { useState } from 'react';
import { Users, GraduationCap, BookOpen, Calendar, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Calendar },
  { id: 'teachers', label: 'Teachers', icon: Users },
  { id: 'faculties', label: 'Faculties', icon: GraduationCap },
  { id: 'subjects', label: 'Subjects', icon: BookOpen },
  { id: 'routine', label: 'Generate Routine', icon: Calendar },
];

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
 <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex">
  {/* Sidebar */}
  <aside className={cn(
    "fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out",
    "bg-white/95 backdrop-blur-lg border-r border-border shadow-soft",
    sidebarOpen ? "translate-x-0" : "-translate-x-full",
    "lg:translate-x-0 lg:static lg:inset-0"
  )}>
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            RoutinePro
          </h1>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
              
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left font-normal",
                isActive && "bg-gradient-primary shadow-soft"
              )}
              onClick={() => {
                onTabChange(item.id);
                setSidebarOpen(false);
              }}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  </aside>

  {/* MAIN AREA */}
  <div className="flex-1 lg:ml-64 flex flex-col">
    {/* Header */}
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-lg border-b border-border shadow-soft flex items-center px-6">
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-4 h-4" />
      </Button>

      <h2 className="text-xl font-semibold text-foreground ml-4">
        {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
      </h2>
    </header>

    {/* CONTENT */}
    <main className="p-6 flex-1">
      {children}
    </main>
  </div>
</div>

  );
}