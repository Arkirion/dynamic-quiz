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

  const [isCorrectAnswer, setIsCorrectAnswer] = useReducer((state: CorrectAnswer, action: CorrectAnswerAction): CorrectAnswer => {
    return { ...state, ...action };
  }, {
    isCorrect: null, answer: ''
  })

  const getCurrentQuestion = (): QuizDeck => {
    return quiz?.questions[quiz.questionSelected]
  }

  const forwardHandler = (e: React.SyntheticEvent) => {
    const correctAnswer = getCurrentQuestion().answer.correct
    const isCorrectAnswer = correctAnswer === inputRef?.current?.value
    if (isCorrectAnswer) {
      updateQuiz({ points: quiz.points + 1 })
    }

    inputRef.current !== null && (inputRef.current.value = '');
    updateQuiz({ questionSelected: quiz.questionSelected + 1 })
    setIsCorrectAnswer({ isCorrect: isCorrectAnswer, answer: correctAnswer })
  }

  const ResultText = () => {
    if (isCorrectAnswer.isCorrect === null) {
      return null
    }
    if (!isCorrectAnswer.isCorrect) {
      return (
        <span>
          La respuesta era <span className="text-color underline">{isCorrectAnswer.answer}</span> !
        </span>
      )
    }
    return (
      <span>
        good job!
      </span>
    )
  }



  return (
    <>
      <div className="flex w-full">
        <div className="relative flex flex-grow items-center">
          <input
            ref={inputRef}
            onKeyDown={e => e.key == 'Enter' && forwardHandler(e)}
            type="search"
            id="default-search"
            className="block w-full p-4 text-sm border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Escribe tu respuesta aquí"
            autoComplete="off" />
          <button
            type="button"
            onClick={(e) => forwardHandler(e)}
            className="text-white absolute right-2.5 bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center">
            <span className="mr-2 leading-6">Validar</span>
            <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0' />
              <g transform="matrix(0.43 0 0 0.43 12 12)" >
                <path transform=" translate(-25, -25)" d="M 25 2 C 22.25 2 20 4.25 20 7 L 20 20 L 7 20 C 4.25 20 2 22.25 2 25 L 2 43 C 2 45.75 4.25 48 7 48 L 43 48 C 45.75 48 48 45.75 48 43 L 48 7 C 48 4.25 45.75 2 43 2 Z M 25 4 L 43 4 C 44.667969 4 46 5.332031 46 7 L 46 43 C 46 44.667969 44.667969 46 43 46 L 7 46 C 5.332031 46 4 44.667969 4 43 L 4 25 C 4 23.332031 5.332031 22 7 22 L 20 22 C 21.09375 22 22 21.09375 22 20 L 22 7 C 22 5.332031 23.332031 4 25 4 Z M 33.90625 14.96875 C 33.863281 14.976563 33.820313 14.988281 33.78125 15 C 33.316406 15.105469 32.988281 15.523438 33 16 L 33 28 C 33 30.773438 30.773438 33 28 33 L 13.4375 33 L 17.71875 28.71875 C 18.042969 28.417969 18.128906 27.941406 17.933594 27.546875 C 17.742188 27.148438 17.308594 26.929688 16.875 27 C 16.652344 27.023438 16.441406 27.125 16.28125 27.28125 L 10.4375 33.15625 C 10.382813 33.191406 10.328125 33.234375 10.28125 33.28125 C 10.257813 33.300781 10.238281 33.320313 10.21875 33.34375 C 10.171875 33.402344 10.128906 33.464844 10.09375 33.53125 C 10.082031 33.550781 10.070313 33.574219 10.0625 33.59375 C 10.0625 33.605469 10.0625 33.613281 10.0625 33.625 C 10.050781 33.644531 10.039063 33.667969 10.03125 33.6875 C 10.019531 33.726563 10.007813 33.769531 10 33.8125 C 9.984375 33.917969 9.984375 34.019531 10 34.125 C 10 34.144531 10 34.167969 10 34.1875 C 10 34.199219 10 34.207031 10 34.21875 C 10.007813 34.238281 10.019531 34.261719 10.03125 34.28125 C 10.03125 34.292969 10.03125 34.300781 10.03125 34.3125 C 10.039063 34.332031 10.050781 34.355469 10.0625 34.375 C 10.070313 34.394531 10.082031 34.417969 10.09375 34.4375 C 10.09375 34.449219 10.09375 34.457031 10.09375 34.46875 C 10.128906 34.535156 10.171875 34.597656 10.21875 34.65625 C 10.238281 34.679688 10.257813 34.699219 10.28125 34.71875 C 10.3125 34.742188 10.34375 34.761719 10.375 34.78125 L 16.28125 40.71875 C 16.679688 41.117188 17.320313 41.117188 17.71875 40.71875 C 18.117188 40.320313 18.117188 39.679688 17.71875 39.28125 L 13.4375 35 L 28 35 C 31.855469 35 35 31.855469 35 28 L 35 16 C 35.011719 15.710938 34.894531 15.433594 34.6875 15.238281 C 34.476563 15.039063 34.191406 14.941406 33.90625 14.96875 Z" stroke-linecap="round" />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full flex justify-start pt-1 font-light">
        {ResultText()}
      </div>
    </>
  )
}


export default AnswerInput