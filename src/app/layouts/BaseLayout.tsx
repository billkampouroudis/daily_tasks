import React from 'react';
import { Calendar } from 'lucide-react';
import { useTaskManager } from '@/hooks/useTaskManager';
import { useTaskPool } from '@/hooks/useTaskPool';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { TabNavigation } from '@/components/TabNavigation';
import { Tab } from '@/entities';

interface BaseLayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BaseLayout(props: BaseLayoutProps) {
  const { children, activeTab, onTabChange } = props;
  const { getTaskPoolForSelection } = useTaskPool();
  const { loading } = useTaskManager(getTaskPoolForSelection());

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );  
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Daily Task Challenge
          </h1>
          
          <p className="text-gray-600 mb-6">
            Complete your personalized tasks to build better habits
          </p>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

        {children}
      </div>
    </div>
  );
}