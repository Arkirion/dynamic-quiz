import { useEffect, useRef, useState } from "react"
import { AnswerForm } from "./components/base/answer-form/answer-form"
import { Button } from "./components/base/button/button"
import { ProgressBar } from "./components/base/progress-bar/progress-bar"
import { QuestionSection } from "./components/base/question-section/question-section"
import { shuffle } from './utils/utils'
import { hiragana } from "./utils/questions"



function App() {
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
    <div className="flex flex-col h-screen justify-between">
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
      <div className="flex-grow border-t border-gray-200"></div>
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 gap-3">
          <li>
            <Button label={"Inicio"} onClick={() => { }} />
          </li>
          <li>
            <Button label={"Reiniciar Juego"} onClick={() => { console.log('') }} />
          </li>
          <li>
            <Button label={"Ver Diccionario"} onClick={() => { }} />
          </li>
        </ul>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Button label={"Siguiente"} onClick={() => { }} />
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default App
