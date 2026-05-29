export interface Word {
  id: string;
  word: string;
  translation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Hard';
  gender: 'der' | 'die' | 'das' | '';
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'other';
  example: string;
  exampleTranslation: string;
  pronunciation: string;
  frequency: number;
}

export interface WordProgress {
  correct: number;
  wrong: number;
  lastSeen: number | null; // ms timestamp
  halfLife: number; // in hours
  firstSeen: number; // ms timestamp
  introduced: boolean;
}

export interface UserStats {
  xp: number;
  streak: number;
  lastPracticeDate: string | null; // "YYYY-MM-DD"
  hasOnboarded: boolean;
}

export type LevelBadge = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface DailySnapshot {
  date: string; // "YYYY-MM-DD"
  avgRecall: number; // average recall percentage across all introduced or all 200 words
}

export interface ThetaWeights {
  thetaCorrect: number;
  thetaWrong: number;
  thetaLag: number;
  bias: number;
}

export interface PracticeAttempt {
  wordId: string;
  correct: number;
  wrong: number;
  lagHours: number;
  outcome: number; // 1.0 if correct, 0.0 if wrong
  timestamp: number;
}

export interface LocalStorageState {
  progress: Record<string, WordProgress>;
  stats: UserStats;
  snapshots: DailySnapshot[];
  isMuted: boolean;
  thetas?: ThetaWeights;
  history?: PracticeAttempt[];
}
