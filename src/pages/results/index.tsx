import { HugeButton } from "@components/hugeButton"
import { useLocation } from "react-router-dom"

interface LocationState {
  points: number,
  totalQuestions: number
}

export const Results = () => {
  const { state } = useLocation()
  const { points, totalQuestions } = state as LocationState
  return (
    <div  className="container mx-auto flex flex-col justify-center">
      <div className="mx-auto grid gap-6 justify-center text-center">
        <span className="text-2xl my-10">Haz hecho {points} de  {totalQuestions} puntos </span>
        <HugeButton headline="JUGAR DE NUEVO" toLink="/quiz/hiragana" />
        <HugeButton headline="MENÚ DE INICIO" toLink="/" />
      </div>
    </div>
  )
}
