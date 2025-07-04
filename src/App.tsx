import { useState } from 'react';
import { Target, RefreshCw } from 'lucide-react';
import { useTaskManager } from './hooks/useTaskManager';
import { useTaskPool } from './hooks/useTaskPool';
import { TaskItem } from './components/TaskItem';
import { ProgressBar } from './components/ProgressBar';
import { CompletionCelebration } from './components/CompletionCelebration';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ControlPanel } from './components/ControlPanel';
import { BaseLayout } from './app/layouts';
import { Tab } from './entities';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.tasks);
  const { taskPool, addTask, editTask, deleteTask, getTaskPoolForSelection } = useTaskPool();
  const { dailyTasks, loading, toggleTaskCompletion, getProgress, refreshTasks } = useTaskManager(getTaskPoolForSelection());

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <BaseLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'tasks' ? (
          <div className="max-w-2xl mx-auto">
            {!dailyTasks ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No tasks available</p>
                <p className="text-sm text-gray-500">Add some tasks in the Control Panel to get started</p>
              </div>
            ) : (
              <>
                {/* Progress Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Progress</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        {dailyTasks.tasks.filter(task => task.completed).length} of {dailyTasks.tasks.length} completed
                      </span>
                      <button
                        onClick={refreshTasks}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Generate new tasks"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <ProgressBar progress={getProgress()} className="mb-2" />
                  
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      {Math.round(getProgress())}%
                    </span>
                  </div>
                </div>

                {/* Tasks Section */}
                {dailyTasks.allCompleted ? (
                  <CompletionCelebration onRefresh={refreshTasks} />
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <span>Today's Tasks</span>
                      <span className="text-sm text-gray-500 font-normal">
                        ({dailyTasks.tasks.length - dailyTasks.tasks.filter(task => task.completed).length} remaining)
                      </span>
                    </h2>
                    
                    {dailyTasks.tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={toggleTaskCompletion}
                      />
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="text-center mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Tasks refresh daily with a new random selection
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <ControlPanel
              taskPool={taskPool}
              onAddTask={addTask}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
            />
          </div>
        )}
    </BaseLayout>
  );
}

export default App;