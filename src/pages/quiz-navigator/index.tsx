import { useEffect, useReducer, useRef } from "react"
import { ProgressBar } from "@components/progress-bar"
import { shuffle } from '@utils/utils'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { QuizDeck } from "@interfaces/*"
import AnswerInput from "./components/AnswerInput";
import { Footer } from "@components/footer";
import { QuizConfig } from "@utils/quiz-configurations";

interface QuizState {
  questionSelected: number;
  points: number;
  questions: QuizDeck[];
}

type QuizAction = Partial<QuizState>;

const START_WITH_ZERO = 0;

export const QuizNavigator = () => {
  const load = useRef(true);
  const data = useLoaderData() as QuizConfig;
  const navigate = useNavigate()


  const [quiz, updateQuiz] = useReducer((state: QuizState, action: QuizAction): QuizState => {
    return { ...state, ...action };
  }, {
    questionSelected: START_WITH_ZERO, points: START_WITH_ZERO, questions: shuffle(data.quizDeck)
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
        <div className="flex w-full justify-center items-start h-100  mt-24">
          <div className="flex flex-col items-center justify-start">
            <div className="flex justify-center items-center flex-col relative">
              <span className="ml-6 mb-1 font-semibold tracking-wide">Adivina la respuesta en {data.name}!</span>
              <div className="flex bg-secondary rounded-2xl w-96 h-44 mb-10 justify-center items-center text-center">
                <span className="text-9xl text-text font-medium"> {getCurrentQuestion()?.question} </span>
              </div>
              <div className="
                absolute -top-4 -left-8
                 bg-secondary
                  h-24 w-24 border-spacing-12
                  border-8 border-background rounded-full
                  flex justify-center items-center
                  text-5xl text-accent font-bold leading-6 pb-1">
                ?
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