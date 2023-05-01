import { useEffect, useRef, useState } from "react"
import { AnswerForm } from "@components/answer-form"

import { ProgressBar } from "@components/progress-bar"
import { QuestionSection } from "@components/question-section"
import { getImgUrl, shuffle } from '@utils/utils'
import { hiragana } from "@utils/questions"
import { useLoaderData, useParams } from 'react-router-dom';

export type QuizNavigatorProps = {
  QuizGameConfiguration?: any,
}

export const QuizNavigator = ( {QuizGameConfiguration } : QuizNavigatorProps ) => {
  // const [score, setScore] = useState<number>(0)
  const load = useRef(true);
  const data = useLoaderData() as string[]; // TODO: change to complete type

  const [allQuestions, setAllQuestions] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<string>()
  const [currentAnswer, setCurrentAnswer] = useState<string>()
  const [input, setInput] = useState<string>('')
  const [isCorrectText, setIsCorrectText] = useState<string>('');

  useEffect(() => {
    /** suffle, set all questions and first question */
    const initiateAllQuestions = () => {
      const shuffledQuestions = shuffle(data)
      const currentQuestion = shuffledQuestions.shift()
      setAllQuestions((prevQuestions) => [...prevQuestions, ...shuffledQuestions]);
      setCurrentQuestion(currentQuestion);
      setCurrentAnswer(currentQuestion)
    }

    if (load.current) {
      load.current = false;
      initiateAllQuestions()
    }
  }, [])

  const nextQuestionHandler = (event: React.SyntheticEvent, isValidAnswer: boolean) => {
    const questionsCopy = [...allQuestions]
    const nextQuestion = questionsCopy.shift()
    setCurrentQuestion(nextQuestion)
    setCurrentAnswer(nextQuestion)
    setAllQuestions(questionsCopy)
    console.log(isValidAnswer)
  }

  const forwardHandler = (e: React.SyntheticEvent) => {
    const isCorrectAnswer = currentAnswer! === input
    setInput('')
    nextQuestionHandler(e, isCorrectAnswer)
    setIsCorrectText(isCorrectAnswer ? 'good job!' : `La respuesta era ${currentAnswer!}`)
  }



  return (
    <>
      <ProgressBar />
      <div className="flex w-full justify-center items-start h-full">
        <div className="flex flex-col items-center justify-start mt-24">
          {/* <QuestionSection question={currentQuestion} label='Adivina la respuesta en hiragana!' /> */}

          <div className="flex justify-center items-center flex-col ">
            <span className="mb-1">Adivina la respuesta en hiragana!</span>
            <div className="flex bg-red-200 rounded-2xl w-96 h-36 mb-10 justify-center items-center text-center">
              <img className="" src={getImgUrl(currentQuestion as string)}></img>
              {/* <span> {question} </span> */}
            </div>
          </div>

          <div className="flex w-full">
            <div className="relative flex flex-grow">
              <input
                value={input}
                onKeyDown={e => e.key == 'Enter' && forwardHandler(e)}
                onChange={e => setInput(e.target.value)}
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