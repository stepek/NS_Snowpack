import React, {useCallback} from "react"

interface ButtonProps {
  label: string
  onClick?: () => void
}
export function Button({label, onClick}: ButtonProps) {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    }
  }, [onClick])

  return <button onClick={handleClick}>{label}</button>
}
export default Button
