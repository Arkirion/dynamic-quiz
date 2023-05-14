type ButtonProps = {
  label: string,
  icon?: React.ReactNode
  onClick?: () => void
}

export function Button({
  label,
  icon,
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
        text-white bg-gray-700 hover:bg-gray-800
        ">
      {label.toLocaleUpperCase()}
      <span className="ml-3"> {icon}</span>
    </button>
  )
}