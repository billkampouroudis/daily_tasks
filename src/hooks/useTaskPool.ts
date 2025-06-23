import { useState, useEffect, useCallback } from 'react';
import { TaskFrequency } from '../types/Task';
import { TASK_POOL } from '../data/taskPool';

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

const TASK_POOL_STORAGE_KEY = 'custom-task-pool';

const generateTaskId = () => Math.random().toString(36).substr(2, 9);

const convertToTaskPoolItems = (tasks: typeof TASK_POOL): TaskPoolItem[] => {
  return tasks.map(task => ({
    id: generateTaskId(),
    name: task.name,
    description: task.description,
    frequency: task.frequency,
  }));
};

export const useTaskPool = () => {
  const [taskPool, setTaskPool] = useState<TaskPoolItem[]>([]);

  const loadTaskPool = useCallback(() => {
    const stored = localStorage.getItem(TASK_POOL_STORAGE_KEY);
    
    if (stored) {
      try {
        const parsedPool = JSON.parse(stored);
        setTaskPool(parsedPool);
      } catch (error) {
        console.error('Error parsing stored task pool:', error);
        // Fallback to default tasks
        const defaultTasks = convertToTaskPoolItems(TASK_POOL);
        setTaskPool(defaultTasks);
        localStorage.setItem(TASK_POOL_STORAGE_KEY, JSON.stringify(defaultTasks));
      }
    } else {
      // Initialize with default tasks
      const defaultTasks = convertToTaskPoolItems(TASK_POOL);
      setTaskPool(defaultTasks);
      localStorage.setItem(TASK_POOL_STORAGE_KEY, JSON.stringify(defaultTasks));
    }
  }, []);

  const saveTaskPool = useCallback((newTaskPool: TaskPoolItem[]) => {
    localStorage.setItem(TASK_POOL_STORAGE_KEY, JSON.stringify(newTaskPool));
    setTaskPool(newTaskPool);
  }, []);

  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask: TaskPoolItem = {
      id: generateTaskId(),
      name: taskData.name.trim(),
      description: taskData.description.trim() || undefined,
      frequency: taskData.frequency,
    };

    const updatedPool = [...taskPool, newTask];
    saveTaskPool(updatedPool);
  }, [taskPool, saveTaskPool]);

  const editTask = useCallback((taskId: string, taskData: TaskFormData) => {
    const updatedPool = taskPool.map(task =>
      task.id === taskId
        ? {
            ...task,
            name: taskData.name.trim(),
            description: taskData.description.trim() || undefined,
            frequency: taskData.frequency,
          }
        : task
    );
    saveTaskPool(updatedPool);
  }, [taskPool, saveTaskPool]);

  const deleteTask = useCallback((taskId: string) => {
    const updatedPool = taskPool.filter(task => task.id !== taskId);
    saveTaskPool(updatedPool);
  }, [taskPool, saveTaskPool]);

  const getTaskPoolForSelection = useCallback(() => {
    return taskPool.map(task => ({
      name: task.name,
      description: task.description,
      frequency: task.frequency,
    }));
  }, [taskPool]);

  useEffect(() => {
    loadTaskPool();
  }, [loadTaskPool]);

  return {
    taskPool,
    addTask,
    editTask,
    deleteTask,
    getTaskPoolForSelection,
  };
};