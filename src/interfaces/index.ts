export interface QuizDeck  {
  type: "text" | "image";
  question: string;
  answer: {
    options?: string[];
    correct: string;
  };
}


export type QuizType = {
  [key: string]: QuizDeck[]
  hiragana: QuizDeck[]
}
