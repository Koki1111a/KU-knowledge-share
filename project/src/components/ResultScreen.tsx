import React from 'react';
import { Trophy, Medal, RotateCcw, Home, Crown, Target } from 'lucide-react';
import { Player } from '../types/quiz';

interface ResultScreenProps {
  currentPlayer: Player;
  opponent: Player;
  winner: 'player' | 'opponent' | 'tie' | null;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  currentPlayer,
  opponent,
  winner,
  onPlayAgain,
  onGoHome
}) => {
  const getResultMessage = () => {
    if (winner === 'player') return 'Victory!';
    if (winner === 'opponent') return 'Defeat';
    return "It's a Tie!";
  };

  const getResultColor = () => {
    if (winner === 'player') return 'from-green-500 to-emerald-500';
    if (winner === 'opponent') return 'from-red-500 to-rose-500';
    return 'from-yellow-500 to-orange-500';
  };

  const getResultIcon = () => {
    if (winner === 'player') return <Crown className="w-12 h-12 text-white" />;
    if (winner === 'opponent') return <Target className="w-12 h-12 text-white" />;
    return <Medal className="w-12 h-12 text-white" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className={`w-24 h-24 bg-gradient-to-r ${getResultColor()} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            {getResultIcon()}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{getResultMessage()}</h1>
          <p className="text-gray-600 text-lg">Quiz Battle Complete!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Final Scores</h2>
          
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 rounded-xl ${
              winner === 'player' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Trophy className={`w-6 h-6 ${winner === 'player' ? 'text-green-600' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{currentPlayer.name}</h3>
                  <p className="text-sm text-gray-600">You</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{currentPlayer.score}</div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </div>

            <div className={`flex items-center justify-between p-4 rounded-xl ${
              winner === 'opponent' ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trophy className={`w-6 h-6 ${winner === 'opponent' ? 'text-red-600' : 'text-red-400'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{opponent.name}</h3>
                  <p className="text-sm text-gray-600">Opponent</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{opponent.score}</div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </div>
          </div>

          {winner === 'player' && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
              <p className="text-green-700 font-medium">🎉 Congratulations! You've proven your quiz mastery!</p>
            </div>
          )}

          {winner === 'tie' && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-xl text-center">
              <p className="text-yellow-700 font-medium">🤝 Great minds think alike! What a close match!</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
          <button
            onClick={onGoHome}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};