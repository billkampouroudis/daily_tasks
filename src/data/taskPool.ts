import { Task, TaskFrequency } from '../entities/task';

const createTask = (
  name: string,
  frequency: TaskFrequency,
  description?: string
): Omit<Task, 'id' | 'completed' | 'createdAt'> => ({
  name,
  frequency,
  description,
});

export const TASK_POOL = [
  // Daily tasks
  createTask('Drink 8 glasses of water', 'daily', 'Stay hydrated throughout the day'),
  createTask('Take a 10-minute walk', 'daily', 'Get some fresh air and light exercise'),
  createTask('Read for 15 minutes', 'daily', 'Expand your knowledge or enjoy fiction'),
  createTask('Practice gratitude', 'daily', 'Write down 3 things you\'re grateful for'),
  createTask('Meditate for 5 minutes', 'daily', 'Take time to center yourself'),
  createTask('Tidy up your workspace', 'daily', 'Keep your environment organized'),
  createTask('Do 20 pushups or stretches', 'daily', 'Keep your body active'),
  createTask('Plan tomorrow\'s priorities', 'daily', 'Set yourself up for success'),

  // Weekly tasks
  createTask('Deep clean one room', 'weekly', 'Focus on thoroughly cleaning one area'),
  createTask('Call a friend or family member', 'weekly', 'Maintain important relationships'),
  createTask('Try a new recipe', 'weekly', 'Explore different cuisines and flavors'),
  createTask('Review and organize finances', 'weekly', 'Check budgets and expenses'),
  createTask('Learn something new online', 'weekly', 'Take a course or watch educational content'),
  createTask('Go for a nature walk or hike', 'weekly', 'Connect with the outdoors'),
  createTask('Declutter a drawer or closet', 'weekly', 'Organize and donate unused items'),
  createTask('Write in a journal', 'weekly', 'Reflect on your thoughts and experiences'),
  createTask('Practice a hobby or skill', 'weekly', 'Dedicate time to something you enjoy'),
  createTask('Plan a future adventure', 'weekly', 'Research and plan an upcoming trip or activity'),

  // Monthly tasks
  createTask('Deep clean and organize home', 'monthly', 'Complete thorough cleaning session'),
  createTask('Review and update goals', 'monthly', 'Assess progress and adjust objectives'),
  createTask('Backup important files', 'monthly', 'Secure your digital data'),
  createTask('Schedule health checkups', 'monthly', 'Maintain your physical health'),
  createTask('Review subscriptions and memberships', 'monthly', 'Cancel unused services'),
  createTask('Plan next month\'s budget', 'monthly', 'Set financial goals and limits'),
  createTask('Update resume or LinkedIn', 'monthly', 'Keep professional profiles current'),
  createTask('Try a new activity or experience', 'monthly', 'Step out of your comfort zone'),
  createTask('Reconnect with old friends', 'monthly', 'Reach out to people you haven\'t spoken to'),
  createTask('Donate items you no longer need', 'monthly', 'Give back to the community'),
];