export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  category: string;
}

export type GameState = 'entry' | 'matching' | 'battle' | 'result';

export interface GameData {
  currentPlayer: Player;
  opponent: Player | null;
  currentQuestion: Question | null;
  questionNumber: number;
  totalQuestions: number;
  gameState: GameState;
  timeLeft: number;
  playerAnswer: string;
  opponentAnswer: string;
  showResults: boolean;
  winner: 'player' | 'opponent' | 'tie' | null;
}