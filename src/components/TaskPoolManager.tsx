import React, { useState } from 'react';
import { Edit2, Trash2, Clock, Calendar, CalendarDays, Filter } from 'lucide-react';
import { TaskFrequency } from '../entities/task';

interface TaskPoolItem {
  id: string;
  name: string;
  description?: string;
  frequency: TaskFrequency;
}

interface TaskPoolManagerProps {
  tasks: TaskPoolItem[];
  onEdit: (task: TaskPoolItem) => void;
  onDelete: (taskId: string) => void;
}

type FilterType = 'all' | TaskFrequency;

const getFrequencyIcon = (frequency: TaskFrequency) => {
  switch (frequency) {
    case 'daily':
      return <Clock className="w-4 h-4" />;
    case 'weekly':
      return <Calendar className="w-4 h-4" />;
    case 'monthly':
      return <CalendarDays className="w-4 h-4" />;
  }
};

const getFrequencyColor = (frequency: TaskFrequency) => {
  switch (frequency) {
    case 'daily':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'weekly':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'monthly':
      return 'text-purple-600 bg-purple-50 border-purple-200';
  }
};

const getFilterButtonStyle = (filter: FilterType, activeFilter: FilterType) => {
  const isActive = filter === activeFilter;
  
  if (filter === 'all') {
    return isActive
      ? 'bg-gray-600 text-white border-gray-600'
      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50';
  }
  
  const baseColors = {
    daily: isActive ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50',
    weekly: isActive ? 'bg-green-500 text-white border-green-500' : 'bg-white text-green-600 border-green-300 hover:bg-green-50',
    monthly: isActive ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-purple-600 border-purple-300 hover:bg-purple-50',
  };
  
  return baseColors[filter as TaskFrequency];
};

export const TaskPoolManager: React.FC<TaskPoolManagerProps> = ({ tasks, onEdit, onDelete }) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const handleDelete = (taskId: string) => {
    if (deleteConfirm === taskId) {
      onDelete(taskId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(taskId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const filteredTasks = activeFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.frequency === activeFilter);

  const getTaskCount = (frequency: FilterType) => {
    if (frequency === 'all') return tasks.length;
    return tasks.filter(task => task.frequency === frequency).length;
  };

  const filters: { key: FilterType; label: string; icon?: React.ReactNode }[] = [
    { key: 'all', label: 'All Tasks', icon: <Filter className="w-4 h-4" /> },
    { key: 'daily', label: 'Daily', icon: <Clock className="w-4 h-4" /> },
    { key: 'weekly', label: 'Weekly', icon: <Calendar className="w-4 h-4" /> },
    { key: 'monthly', label: 'Monthly', icon: <CalendarDays className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Pool Management</h3>
        <p className="text-gray-600 text-sm mb-6">
          Manage your task pool. Tasks are randomly selected from these pools based on their frequency.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 transform hover:scale-105 ${getFilterButtonStyle(filter.key, activeFilter)}`}
            >
              {filter.icon}
              {filter.label}
              <span className="ml-1 px-2 py-0.5 bg-black/10 rounded-full text-xs">
                {getTaskCount(filter.key)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Tasks Display */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">
            {activeFilter === 'all' ? 'All Tasks' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Tasks`}
          </h4>
          <span className="text-sm text-gray-500">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              {activeFilter === 'all' 
                ? 'No tasks in your pool yet. Create your first task above!' 
                : `No ${activeFilter} tasks yet. Add some ${activeFilter} tasks to get started!`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{task.name}</h4>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getFrequencyColor(task.frequency)}`}>
                      {getFrequencyIcon(task.frequency)}
                      {task.frequency}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600">{task.description}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onEdit(task)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Edit task"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(task.id)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      deleteConfirm === task.id
                        ? 'text-white bg-red-500 hover:bg-red-600'
                        : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                    title={deleteConfirm === task.id ? 'Click again to confirm' : 'Delete task'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};