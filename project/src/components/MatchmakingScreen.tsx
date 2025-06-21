import React, { useEffect } from 'react';
import { Search, Users } from 'lucide-react';

interface MatchmakingScreenProps {
  playerName: string;
  onMatchFound: (opponentName: string) => void;
}

export const MatchmakingScreen: React.FC<MatchmakingScreenProps> = ({ 
  playerName, 
  onMatchFound 
}) => {
  useEffect(() => {
    // Simulate matchmaking
    const timer = setTimeout(() => {
      const opponents = ['QuizMaster', 'BrainBox', 'ThinkFast', 'Genius42', 'QuizKing'];
      const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
      onMatchFound(randomOpponent);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onMatchFound]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Finding Opponent</h2>
            <p className="text-gray-600">
              Welcome, <span className="font-semibold text-blue-600">{playerName}</span>!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">Searching for worthy opponents...</span>
            </div>

            {/* Loading animation */}
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                💡 Tip: Answer quickly and accurately to gain an advantage!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};