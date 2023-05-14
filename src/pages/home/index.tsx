import { HugeButton } from "@components/hugeButton";
import { QuizConfig, quizzes } from "@utils/quiz-configurations";

export const Home = () => {

  return (
    <>
      <div className="flex items-center flex-grow justify-center">
        <div className="container flex flex-col justify-start items-center min-h-full ">
          <div className="align-middle flex justify-center items-center h-[30vh] p-10">
            <span>En esta web jugaras a adivinar las letras o palabras en japonés, selecciona el modo que desees jugar</span>
          </div>
          {
            Object.values(quizzes).map( (quiz : QuizConfig) => {
              return <HugeButton key={quiz.name}
              headline={`${quiz.name.toLocaleUpperCase()}`}
              subHeadline={`${quiz.originalName}`}
              toLink={`/quiz/${quiz.name}`}
              linkClassName={'flex justify-center'} />
            })
          }

        </div>
      </div>
    </>)
}
