import { Link } from "react-router-dom";

type HugeButtonProps = {
  headline: string,
  subHeadline?: string,
  toLink: string,
  color?: string
  linkClassName?: string
}

export const HugeButton = ({ headline, subHeadline, toLink, color = 'bg-gray-300', linkClassName = '' }: HugeButtonProps) => {
  return (
    <Link to={toLink} className={linkClassName}>
      <div className={`${color} p-4 flex flex-col w-80 text-center h-32 justify-center items-center bg-primary rounded-sm hover:bg-accent`}>
        <h2 className="font-semibold text-4xl">{headline}</h2>
        { subHeadline && <span className="font-thin text-2xl">{subHeadline}</span>}
      </div>
    </Link>
  )
}
