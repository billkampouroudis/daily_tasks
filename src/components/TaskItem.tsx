import React from 'react';
import { CheckCircle2, Circle, Clock, Calendar, CalendarDays } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

const getFrequencyIcon = (frequency: Task['frequency']) => {
  switch (frequency) {
    case 'daily':
      return <Clock className="w-4 h-4" />;
    case 'weekly':
      return <Calendar className="w-4 h-4" />;
    case 'monthly':
      return <CalendarDays className="w-4 h-4" />;
  }
};

const getFrequencyColor = (frequency: Task['frequency']) => {
  switch (frequency) {
    case 'daily':
      return 'text-blue-600 bg-blue-50';
    case 'weekly':
      return 'text-green-600 bg-green-50';
    case 'monthly':
      return 'text-purple-600 bg-purple-50';
  }
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div
      className={`group relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
        task.completed
          ? 'border-green-200 bg-green-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={() => onToggle(task.id)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 transition-transform duration-200 group-hover:scale-110" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 transition-colors duration-200 group-hover:text-gray-600" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium transition-colors duration-200 ${
              task.completed ? 'text-green-700 line-through' : 'text-gray-900'
            }`}>
              {task.name}
            </h3>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(task.frequency)}`}>
              {getFrequencyIcon(task.frequency)}
              {task.frequency}
            </span>
          </div>
          
          {task.description && (
            <p className={`text-sm transition-colors duration-200 ${
              task.completed ? 'text-green-600' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
        </div>
      </div>
      
      {task.completed && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};