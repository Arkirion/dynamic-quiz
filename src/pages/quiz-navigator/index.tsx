import { useEffect, useReducer, useRef } from "react"
import { ProgressBar } from "@components/progress-bar"
import { shuffle } from '@utils/utils'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { QuizDeck } from "@interfaces/*"
import AnswerInput from "./components/AnswerInput";
import { Footer } from "@components/footer";
import { QuizConfig } from "@utils/quiz-configurations";
import { QuestionSection } from "./components/QuestionSection";

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
            <QuestionSection question={getCurrentQuestion()?.question} label={`Adivina la respuesta en ${data.name}!`} />
            <AnswerInput quiz={quiz} updateQuiz={updateQuiz} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )

}