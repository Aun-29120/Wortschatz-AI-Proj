import { Word } from './types';

const ADVANCED_SIMILAR_WORDS = [
  'trotzdem', 'dennoch', 'außerdem', 'allerdings',
  'deshalb', 'deswegen', 'inzwischen', 'übrigens',
  'währenddessen', 'gleichzeitig', 'dementsprechend',
  'immerhin', 'schließlich', 'zunächst', 'anschließend',
  'entsprechend', 'hinsichtlich', 'bezüglich', 'gegebenenfalls', 'beziehungsweise',
  'natürlich', 'eigentlich', 'vielleicht', 'obwohl'
].map(w => w.toLowerCase());

export const isValidDistractor = (activeWord: Word, candidate: Word): boolean => {
  if (activeWord.id === candidate.id) return false;
  if (activeWord.translation === candidate.translation) return false;
  
  // They shouldn't have the same actual german word (e.g. Essen vs essen)
  if (activeWord.word.toLowerCase() === candidate.word.toLowerCase()) {
    return false;
  }
  
  // They shouldn't both be in the confusing advanced words group
  const activeLower = activeWord.word.toLowerCase();
  const candidateLower = candidate.word.toLowerCase();
  if (ADVANCED_SIMILAR_WORDS.includes(activeLower) && ADVANCED_SIMILAR_WORDS.includes(candidateLower)) {
    return false;
  }

  return true;
};
