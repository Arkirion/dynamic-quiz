
type ButtonProps = {
  label: string,
  onClick?: () => void

}

export function Button({
  label,
  onClick
}: ButtonProps) {

  return (
    <button
      onClick={onClick}
      type="button"
      className="
        inline-flex items-center
        px-5 py-2.5 rounded-lg
        font-medium text-sm text-center
        text-white bg-blue-700 hover:bg-blue-800
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300
        ">
      {label}
      <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  )

}