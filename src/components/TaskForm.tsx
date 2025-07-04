import React, { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { TaskFrequency } from '../entities/task';

interface TaskFormData {
  name: string;
  description: string;
  frequency: TaskFrequency;
}

interface TaskFormProps {
  onSubmit: (taskData: TaskFormData) => void;
  onCancel?: () => void;
  initialData?: TaskFormData;
  isEditing?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialData, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    description: '',
    frequency: 'daily',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      if (!isEditing) {
        setFormData({ name: '', description: '', frequency: 'daily' });
      }
    }
  };

  const handleChange = (field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        {isEditing ? (
          <Save className="w-5 h-5 text-blue-600" />
        ) : (
          <Plus className="w-5 h-5 text-blue-600" />
        )}
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-2">
            Task Name *
          </label>
          <input
            type="text"
            id="taskName"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter task name..."
            required
          />
        </div>

        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="taskDescription"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Optional description..."
          />
        </div>

        <div>
          <label htmlFor="taskFrequency" className="block text-sm font-medium text-gray-700 mb-2">
            Frequency *
          </label>
          <select
            id="taskFrequency"
            value={formData.frequency}
            onChange={(e) => handleChange('frequency', e.target.value as TaskFrequency)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Update Task
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Task
            </>
          )}
        </button>
        
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};