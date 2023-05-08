export type ProgressBarProps = {
  current: number,
  total: number
}


export function ProgressBar({ current = 0, total }: ProgressBarProps) {
  let width = current * 100 / total;
  return (
    <div className="flex h-12 items-center justify-center mt-6 w-full">
      <div className=" w-4/5 flex items-center ">
        <span className="w-20">{current} / {total}</span>
        <div className="shrink w-full h-4  bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="h-4 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: `${width}%` }}></div>
        </div>
      </div>
    </div>
  )
}