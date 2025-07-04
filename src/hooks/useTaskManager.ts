import { useState, useEffect, useCallback } from 'react';
import { Task, DailyTasks, TaskFrequency } from '../entities/task';

const STORAGE_KEY = 'daily-tasks';

const generateTaskId = () => Math.random().toString(36).substr(2, 9);

const getTodayString = () => new Date().toISOString().split('T')[0];

const getRandomTasks = (pool: any[], count: number): any[] => {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

interface TaskPoolForSelection {
  name: string;
  description?: string;
  frequency: TaskFrequency;
}

const selectDailyTasks = (taskPool: TaskPoolForSelection[]): Task[] => {
  // Get all daily tasks
  const dailyTasks = taskPool.filter(task => task.frequency === 'daily');
  
  // Get random weekly tasks (1-2 tasks)
  const weeklyTasks = taskPool.filter(task => task.frequency === 'weekly');
  const selectedWeeklyTasks = getRandomTasks(weeklyTasks, Math.random() > 0.5 ? 2 : 1);
  
  // Get random monthly tasks (0-1 tasks, less frequent)
  const monthlyTasks = taskPool.filter(task => task.frequency === 'monthly');
  const selectedMonthlyTasks = Math.random() > 0.7 ? getRandomTasks(monthlyTasks, 1) : [];
  
  // Select random subset of daily tasks (3-5 tasks)
  const selectedDailyTasks = getRandomTasks(dailyTasks, Math.min(dailyTasks.length, 3 + Math.floor(Math.random() * 3)));
  
  // Combine all selected tasks
  const allSelectedTasks = [
    ...selectedDailyTasks,
    ...selectedWeeklyTasks,
    ...selectedMonthlyTasks,
  ];
  
  return allSelectedTasks.map(task => ({
    ...task,
    id: generateTaskId(),
    completed: false,
    createdAt: new Date(),
  }));
};

export const useTaskManager = (taskPool: TaskPoolForSelection[]) => {
  const [dailyTasks, setDailyTasks] = useState<DailyTasks | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(() => {
    const today = getTodayString();
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      const parsedTasks: DailyTasks = JSON.parse(stored);
      
      // Check if stored tasks are for today
      if (parsedTasks.date === today) {
        setDailyTasks(parsedTasks);
        setLoading(false);
        return;
      }
    }
    
    // Generate new tasks for today
    if (taskPool.length === 0) {
      setLoading(false);
      return;
    }
    
    const newTasks = selectDailyTasks(taskPool);
    const newDailyTasks: DailyTasks = {
      date: today,
      tasks: newTasks,
      allCompleted: false,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDailyTasks));
    setDailyTasks(newDailyTasks);
    setLoading(false);
  }, [taskPool]);

  /**
   * Toggles the completion status of a task with the given ID.
   * This updates the local storage and the state.
   */
  const toggleTaskCompletion = useCallback((taskId: string) => {
    if (!dailyTasks) return;

    const updatedTasks = dailyTasks.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const allCompleted = updatedTasks.every(task => task.completed);

    const updatedDailyTasks: DailyTasks = {
      ...dailyTasks,
      tasks: updatedTasks,
      allCompleted,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDailyTasks));
    setDailyTasks(updatedDailyTasks);
  }, [dailyTasks]);

  const getProgress = useCallback(() => {
    if (!dailyTasks) return 0;
    const completed = dailyTasks.tasks.filter(task => task.completed).length;
    return dailyTasks.tasks.length > 0 ? (completed / dailyTasks.tasks.length) * 100 : 0;
  }, [dailyTasks]);

  const refreshTasks = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    if (taskPool.length > 0) {
      loadTasks();
    }
  }, [loadTasks, taskPool]);

  return {
    dailyTasks,
    loading,
    toggleTaskCompletion,
    getProgress,
    refreshTasks,
  };
};