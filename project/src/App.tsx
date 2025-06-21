import React, { useState, useCallback } from 'react';
import { NameEntry } from './components/NameEntry';
import { MatchmakingScreen } from './components/MatchmakingScreen';
import { BattleScreen } from './components/BattleScreen';
import { ResultScreen } from './components/ResultScreen';
import { GameState, GameData, Player } from './types/quiz';
import { sampleQuestions } from './data/questions';

function App() {
  const [gameData, setGameData] = useState<GameData>({
    currentPlayer: { id: '1', name: '', score: 0 },
    opponent: null,
    currentQuestion: null,
    questionNumber: 0,
    totalQuestions: 5,
    gameState: 'entry',
    timeLeft: 15,
    playerAnswer: '',
    opponentAnswer: '',
    showResults: false,
    winner: null,
  });

  const handleNameSubmit = useCallback((name: string) => {
    setGameData(prev => ({
      ...prev,
      currentPlayer: { ...prev.currentPlayer, name },
      gameState: 'matching'
    }));
  }, []);

  const handleMatchFound = useCallback((opponentName: string) => {
    const shuffled = [...sampleQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, gameData.totalQuestions);
    
    setGameData(prev => ({
      ...prev,
      opponent: { id: '2', name: opponentName, score: 0 },
      currentQuestion: selectedQuestions[0],
      questionNumber: 1,
      gameState: 'battle',
      questions: selectedQuestions
    }));
  }, [gameData.totalQuestions]);

  const handleAnswerSubmit = useCallback((answer: string) => {
    setGameData(prev => {
      if (!prev.currentQuestion) return prev;
      
      const isCorrect = answer.toLowerCase().trim() === prev.currentQuestion.correctAnswer.toLowerCase().trim();
      const newPlayerScore = prev.currentPlayer.score + (isCorrect ? 100 : 0);
      
      // Simulate opponent scoring
      const opponentCorrect = Math.random() > 0.4; // 60% chance opponent is correct
      const newOpponentScore = prev.opponent!.score + (opponentCorrect ? 100 : 0);

      const updatedData = {
        ...prev,
        currentPlayer: { ...prev.currentPlayer, score: newPlayerScore },
        opponent: { ...prev.opponent!, score: newOpponentScore },
        playerAnswer: answer,
      };

      // Check if this was the last question
      if (prev.questionNumber >= prev.totalQuestions) {
        let winner: 'player' | 'opponent' | 'tie' = 'tie';
        if (newPlayerScore > newOpponentScore) winner = 'player';
        else if (newOpponentScore > newPlayerScore) winner = 'opponent';
        
        return {
          ...updatedData,
          gameState: 'result' as GameState,
          winner
        };
      } else {
        // Move to next question
        const questions = (prev as any).questions;
        const nextQuestion = questions[prev.questionNumber];
        
        return {
          ...updatedData,
          currentQuestion: nextQuestion,
          questionNumber: prev.questionNumber + 1,
        };
      }
    });
  }, []);

  const handleBattleComplete = useCallback(() => {
    // This is handled in handleAnswerSubmit
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameData(prev => ({
      currentPlayer: { id: '1', name: prev.currentPlayer.name, score: 0 },
      opponent: null,
      currentQuestion: null,
      questionNumber: 0,
      totalQuestions: 5,
      gameState: 'matching',
      timeLeft: 15,
      playerAnswer: '',
      opponentAnswer: '',
      showResults: false,
      winner: null,
    }));
  }, []);

  const handleGoHome = useCallback(() => {
    setGameData({
      currentPlayer: { id: '1', name: '', score: 0 },
      opponent: null,
      currentQuestion: null,
      questionNumber: 0,
      totalQuestions: 5,
      gameState: 'entry',
      timeLeft: 15,
      playerAnswer: '',
      opponentAnswer: '',
      showResults: false,
      winner: null,
    });
  }, []);

  switch (gameData.gameState) {
    case 'entry':
      return <NameEntry onNameSubmit={handleNameSubmit} />;
    
    case 'matching':
      return (
        <MatchmakingScreen
          playerName={gameData.currentPlayer.name}
          onMatchFound={handleMatchFound}
        />
      );
    
    case 'battle':
      return gameData.currentQuestion && gameData.opponent ? (
        <BattleScreen
          currentPlayer={gameData.currentPlayer}
          opponent={gameData.opponent}
          question={gameData.currentQuestion}
          questionNumber={gameData.questionNumber}
          totalQuestions={gameData.totalQuestions}
          onAnswerSubmit={handleAnswerSubmit}
          onBattleComplete={handleBattleComplete}
        />
      ) : null;
    
    case 'result':
      return gameData.opponent ? (
        <ResultScreen
          currentPlayer={gameData.currentPlayer}
          opponent={gameData.opponent}
          winner={gameData.winner}
          onPlayAgain={handlePlayAgain}
          onGoHome={handleGoHome}
        />
      ) : null;
    
    default:
      return null;
  }
}

export default App;