import React, { useState, useEffect } from 'react';
import { Clock, User, Trophy, Send, CheckCircle, XCircle } from 'lucide-react';
import { Player, Question } from '../types/quiz';

interface BattleScreenProps {
  currentPlayer: Player;
  opponent: Player;
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (answer: string) => void;
  onBattleComplete: () => void;
}

export const BattleScreen: React.FC<BattleScreenProps> = ({
  currentPlayer,
  opponent,
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  onBattleComplete
}) => {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [opponentAnswered, setOpponentAnswered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!isSubmitted) {
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate opponent answering
    const opponentTimer = setTimeout(() => {
      setOpponentAnswered(true);
    }, Math.random() * 8000 + 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(opponentTimer);
    };
  }, [question, isSubmitted]);

  const handleSubmit = () => {
    if (isSubmitted) return;
    
    setIsSubmitted(true);
    const correct = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);
    
    onAnswerSubmit(answer);

    // Move to next question or complete battle
    setTimeout(() => {
      if (questionNumber >= totalQuestions) {
        onBattleComplete();
      } else {
        // Reset for next question
        setAnswer('');
        setIsSubmitted(false);
        setShowResult(false);
        setTimeLeft(15);
        setOpponentAnswered(false);
      }
    }, 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !isSubmitted) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">
              Question {questionNumber} of {totalQuestions}
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              timeLeft <= 5 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-bold">{timeLeft}s</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentPlayer.name}</h3>
                <p className="text-sm text-gray-600">You</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-gray-900">{currentPlayer.score}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{opponent.name}</h3>
                <p className="text-sm text-gray-600">Opponent</p>
              </div>
              {opponentAnswered && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-gray-900">{opponent.score}</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="mb-4">
            <span className="inline-block bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
              {question.category}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
            {question.question}
          </h2>

          {/* Answer Input */}
          {!showResult ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  disabled={isSubmitted}
                />
              </div>
              <button
                type="submit"
                disabled={!answer.trim() || isSubmitted}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitted ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitted
                  </>
                ) : (
                  <>
                    Submit Answer
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Correct!
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    Incorrect
                  </>
                )}
              </div>
              <p className="mt-4 text-gray-600">
                The correct answer was: <span className="font-semibold">{question.correctAnswer}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};