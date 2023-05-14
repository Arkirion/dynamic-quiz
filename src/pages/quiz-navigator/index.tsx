import { useEffect, useReducer, useRef } from "react"
import { ProgressBar } from "@components/progress-bar"
import { shuffle } from '@utils/utils'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { QuizDeck } from "@interfaces/*"
import AnswerInput from "./components/AnswerInput";
import { Footer } from "@components/footer";

interface QuizState {
  questionSelected: number;
  points: number;
  questions: QuizDeck[];
}

type QuizAction = Partial<QuizState>;

const START_WITH_ZERO = 0;

export const QuizNavigator = () => {
  const load = useRef(true);
  const data = useLoaderData() as QuizDeck[];
  const navigate = useNavigate()


  const [quiz, updateQuiz] = useReducer((state: QuizState, action: QuizAction): QuizState => {
    return { ...state, ...action };
  }, {
    questionSelected: START_WITH_ZERO, points: START_WITH_ZERO, questions: shuffle(data)
  })

  const getCurrentQuestion = (): QuizDeck => {
    return quiz.questions[quiz.questionSelected]
  }

  useEffect(() => {
    if (load.current) {
      load.current = false;
    }
  }, [])

  if (quiz.questionSelected === quiz.questions.length) {
    navigate('/results', { state: { points: quiz.points, totalQuestions: quiz.questions.length } })
  }


  return (
    <>
      <main className='flex-grow'>
        <ProgressBar current={quiz.questionSelected} total={quiz.questions.length} />
        <div className="flex w-full justify-center items-start h-100">
          <div className="flex flex-col items-center justify-start mt-20">
            <div className="flex justify-center items-center flex-col ">
              <span className="mb-1 font-semibold">Adivina la respuesta en hiragana!</span>
              <div className="flex bg-primaryLight rounded-2xl w-96 h-36 mb-10 justify-center items-center text-center">
                <span className="text-7xl text-primaryDark font-medium"> {getCurrentQuestion().question} </span>
              </div>
            </div>
            <AnswerInput quiz={quiz} updateQuiz={updateQuiz} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )

}