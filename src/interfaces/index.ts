export interface QuizDeck  {
  type: "text" | "image";
  question: string;
  answer: {
    options?: string[];
    correct: string;
  };
}


