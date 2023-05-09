import { useReducer, useRef } from "react"
import { QuizDeck } from "@interfaces/*"

// TODO: put on common
interface QuizState {
  questionSelected: number;
  points: number;
  questions: QuizDeck[];
}

interface CorrectAnswer {
  isCorrect: null | true | false;
  answer: string;
}

type CorrectAnswerAction = Partial<CorrectAnswer>;

type AnswerInputProps = {
  quiz: QuizState,
  updateQuiz: React.Dispatch<Partial<QuizState>>
}

export const AnswerInput = ({ quiz, updateQuiz }: AnswerInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isCorrectAnswer, setIsCorrectAnswer] = useReducer((state: CorrectAnswer, action: CorrectAnswerAction) : CorrectAnswer => {
    return { ...state, ...action };
  }, {
    isCorrect: null, answer: ''
  })

  const getCurrentQuestion = () : QuizDeck => {
    return quiz.questions[quiz.questionSelected]
  }

  const forwardHandler = (e: React.SyntheticEvent) => {
    const correctAnswer = getCurrentQuestion().answer.correct
    const isCorrectAnswer = correctAnswer === inputRef?.current?.value
    if (isCorrectAnswer) {
      updateQuiz({ points: quiz.points + 1 })
    }

    inputRef.current !== null && (inputRef.current.value = '');
    updateQuiz({ questionSelected: quiz.questionSelected + 1 })
    setIsCorrectAnswer({ isCorrect: isCorrectAnswer , answer: correctAnswer })
  }



  return (
    <>
    <div className="flex w-full">
      <div className="relative flex flex-grow">
        <input
          ref={inputRef}
          onKeyDown={e => e.key == 'Enter' && forwardHandler(e)}
          type="search"
          id="default-search"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Escribe tu respuesta aquí"
          autoComplete="off" />
        <button
          type="button"
          onClick={(e) => forwardHandler(e)}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Validar
        </button>
      </div>
      </div>
      <div className="w-full flex justify-start pt-1">
            {
              isCorrectAnswer.isCorrect === null ? null : isCorrectAnswer.isCorrect ? 'good job!' : `La respuesta era ${isCorrectAnswer.answer}!`
            }
        </div>
    </>
  )
}


export default AnswerInput