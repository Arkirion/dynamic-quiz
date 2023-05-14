export type ProgressBarProps = {
  current: number,
  total: number
}


export function ProgressBar({ current = 0, total }: ProgressBarProps) {
  let width = current * 100 / total;
  return (
    <div className="flex h-12 items-center justify-center mt-6 w-full">
      <div className=" w-4/5 flex items-center ">
        <span className="w-20 font-extralight">{current} / {total}</span>
        <div className="shrink w-full h-4  bg-primaryLight rounded-full">
          <div className="h-4 bg-primary rounded-full dark:bg-blue-500" style={{ width: `${width}%` }}></div>
        </div>
      </div>
    </div>
  )
}