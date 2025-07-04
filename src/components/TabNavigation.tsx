import React from 'react';
import { Home, Settings } from 'lucide-react';
import { Tab } from '../entities';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = (props: TabNavigationProps) => {
  const { activeTab, onTabChange } = props;

  const changeTab = (tab: Tab) => {
    onTabChange(tab);
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
        <div className="flex gap-1">
          <button
            onClick={() => changeTab(Tab.tasks)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === Tab.tasks
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Home className="w-4 h-4" />
            Tasks
          </button>
          <button
            onClick={() => changeTab(Tab.control)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === Tab.control
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Control Panel
          </button>
        </div>
      </div>
    </div>
  );
};