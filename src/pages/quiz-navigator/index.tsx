import { useEffect, useReducer, useRef, useState } from "react"
import { ProgressBar } from "@components/progress-bar"
import { shuffle } from '@utils/utils'
import { useLoaderData } from 'react-router-dom';
import { QuizDeck } from "@interfaces/*"

interface QuizState {
  questionSelected: number;
  points: number;
  questions: QuizDeck[];
}

type QuizAction = Partial<QuizState>;
const START_WITH_ZERO = 0;

export const QuizNavigator = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const load = useRef(true);
  const data = useLoaderData() as QuizDeck[];

  const [isCorrectText, setIsCorrectText] = useState<string>('');

  const [quiz, updateQuiz] = useReducer((state: QuizState, action: QuizAction) : QuizState => {
    return { ...state, ...action };
  }, {
    questionSelected: START_WITH_ZERO, points: START_WITH_ZERO, questions: shuffle(data)
  })

  useEffect(() => {
    if (load.current) {
      load.current = false;
    }
  }, [])

  const getCurrentQuestion = () => {
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
    setIsCorrectText(isCorrectAnswer ? 'good job!' : `La respuesta era ${correctAnswer!}`)
  }

  return (
    <>
      <ProgressBar current={quiz.questionSelected} total={quiz.questions.length}/>
      <div className="flex w-full justify-center items-start h-full">
        <div className="flex flex-col items-center justify-start mt-24">
          <div className="flex justify-center items-center flex-col ">
            <span className="mb-1">Adivina la respuesta en hiragana!</span>
            <div className="flex bg-red-200 rounded-2xl w-96 h-36 mb-10 justify-center items-center text-center">
              <span className="text-7xl"> {getCurrentQuestion().question} </span>
            </div>
          </div>

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
            {isCorrectText}
          </div>
        </div>
      </div>
    </>
  )

}