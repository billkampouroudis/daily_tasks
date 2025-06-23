import React, { useState } from 'react';
import { TaskForm } from './TaskForm';
import { TaskPoolManager } from './TaskPoolManager';
import { TaskFrequency } from '../types/Task';

interface TaskPoolItem {
  id: string;
  name: string;
  description?: string;
  frequency: TaskFrequency;
}

interface TaskFormData {
  name: string;
  description: string;
  frequency: TaskFrequency;
}

interface ControlPanelProps {
  taskPool: TaskPoolItem[];
  onAddTask: (taskData: TaskFormData) => void;
  onEditTask: (taskId: string, taskData: TaskFormData) => void;
  onDeleteTask: (taskId: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  taskPool,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [editingTask, setEditingTask] = useState<TaskPoolItem | null>(null);

  const handleEdit = (task: TaskPoolItem) => {
    setEditingTask(task);
  };

  const handleEditSubmit = (taskData: TaskFormData) => {
    if (editingTask) {
      onEditTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Control Panel</h2>
        <p className="text-gray-600">Manage your task pool and customize your daily challenges</p>
      </div>

      <TaskForm
        onSubmit={editingTask ? handleEditSubmit : onAddTask}
        onCancel={editingTask ? handleEditCancel : undefined}
        initialData={editingTask ? {
          name: editingTask.name,
          description: editingTask.description || '',
          frequency: editingTask.frequency,
        } : undefined}
        isEditing={!!editingTask}
      />

      <TaskPoolManager
        tasks={taskPool}
        onEdit={handleEdit}
        onDelete={onDeleteTask}
      />
    </div>
  );
};