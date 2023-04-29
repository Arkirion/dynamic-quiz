import { useEffect, useRef, useState } from "react"
import { AnswerForm } from "@components/answer-form"

import { ProgressBar } from "@components/progress-bar"
import { QuestionSection } from "@components/question-section"
import { shuffle } from '@utils/utils'
import { hiragana } from "@utils/questions"


export const QuizNavigator = () => {
  // const [score, setScore] = useState<number>(0)
  const load = useRef(true);
  const [allQuestions, setAllQuestions] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<string>()
  const [currentAnswer, setCurrentAnswer] = useState<string>()


  useEffect(() => {
    /** suffle, set all questions and first question */
    const initiateAllQuestions = () => {
      const shuffledQuestions = shuffle(hiragana)
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


  return (
    <>
      <ProgressBar />

      <div className="flex w-full justify-center items-start h-full">
        <div className="flex flex-col items-center justify-start mt-24">
          <QuestionSection question={currentQuestion} label='Adivina la respuesta en hiragana!' />
          <AnswerForm
            answer={currentAnswer!}
            nextQuestion={nextQuestionHandler}
            placeholder="Escribe tu respuesta aquí" />
        </div>
      </div>
    </>
  )

}