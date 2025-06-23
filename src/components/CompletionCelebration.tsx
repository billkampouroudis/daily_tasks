import React from 'react';
import { Trophy, Sparkles, RotateCcw } from 'lucide-react';

interface CompletionCelebrationProps {
  onRefresh: () => void;
}

export const CompletionCelebration: React.FC<CompletionCelebrationProps> = ({ onRefresh }) => {
  return (
    <div className="text-center py-8 px-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200">
      <div className="relative inline-block mb-4">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
        <Sparkles className="w-4 h-4 text-yellow-400 absolute -bottom-1 -left-1 animate-pulse delay-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Congratulations! 🎉
      </h2>
      
      <p className="text-gray-700 mb-6 max-w-md mx-auto">
        You've completed all your tasks for today! Take a moment to celebrate your achievement. New tasks will be available tomorrow.
      </p>
      
      <button
        onClick={onRefresh}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
      >
        <RotateCcw className="w-4 h-4" />
        Generate New Tasks
      </button>
    </div>
  );
};