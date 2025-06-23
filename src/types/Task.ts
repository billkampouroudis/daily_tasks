export type TaskFrequency = 'daily' | 'weekly' | 'monthly';

export interface Task {
  id: string;
  name: string;
  description?: string;
  frequency: TaskFrequency;
  completed: boolean;
  createdAt: Date;
}

export interface DailyTasks {
  date: string;
  tasks: Task[];
  allCompleted: boolean;
}