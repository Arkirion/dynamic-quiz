import { useState } from "react";

export type AnswerFormProps = {
  nextQuestion: (event: React.SyntheticEvent, isValidAnswer: boolean) => void;
  placeholder?: string,
  answer: string
}

/**
 * TODO LIST
 * Un problema a la vez
 * Hace que funcione para modo imagen y luego refactorizar para modo multiple choice
 */


export function AnswerForm(
  {
    answer,
    placeholder = '',
    nextQuestion,
  }: AnswerFormProps
) {
  const [input, setInput] = useState('')
  const [isCorrectText, setIsCorrectText] = useState('');

  const forwardHandler = (e: React.SyntheticEvent) => {
    const isCorrectAnswer = answer === input
    setInput('')
    nextQuestion(e, isCorrectAnswer)
    setIsCorrectText( isCorrectAnswer ? 'good job!' : `La respuesta era ${answer}`)
  }

  // communicateAnswerResult()

  return (
    <>
      <div className="flex w-full">
        <div className="relative flex flex-grow">
          <input
            value={input}
            onKeyDown={e => e.key == 'Enter' && forwardHandler(e)}
            onChange={e => setInput(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
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
    </>
  )
}