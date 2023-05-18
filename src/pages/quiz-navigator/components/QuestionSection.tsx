type QuestionSectionProps = {
  label?: string,
  question: string
} 

const Ornament = () => {
  return (
    <div className="
      absolute -top-4 -left-8
       bg-secondary
        h-24 w-24 border-spacing-12
        border-8 border-background rounded-full
        flex justify-center items-center
        text-5xl text-accent font-bold leading-6 pb-1">
      ?
    </div>
  )
}

export const QuestionSection = ({ question, label }: QuestionSectionProps) => {
  return (
    <div className="flex justify-center items-center flex-col relative">
      <Ornament />
      {label && <span className="ml-6 mb-1 font-semibold tracking-wide">{label}</span>}
    <div className="flex bg-secondary rounded-2xl w-96 h-44 mb-10 justify-center items-center text-center">
      <span className="text-9xl text-text font-medium"> {question} </span>
    </div>
  </div>
  )
}
