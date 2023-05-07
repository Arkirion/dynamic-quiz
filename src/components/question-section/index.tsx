import {getImgUrl} from '@utils/utils'

export type QuestionSectionProps = {
  label?: string,
  question?: string, // TODO: it can be an image, even a children
}

export function QuestionSection({ label, question }: QuestionSectionProps) {
  return (
    <div className="flex justify-center items-center flex-col ">
      {label && <span className="mb-1">{label}</span>}
      <div className="flex bg-red-200 rounded-2xl w-96 h-36 mb-10 justify-center items-center text-center">
        <img className="" src={getImgUrl(question as string)}></img>
        {/* <span> {question} </span> */}
      </div>
    </div>
  )
}
