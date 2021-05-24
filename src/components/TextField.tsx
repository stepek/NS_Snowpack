import React, {useCallback} from "react"

interface TextFieldProps {
  placeholder?: string
  onChange?: (value: string) => void
  value?: string
}
export function TextField({placeholder, value, onChange}: TextFieldProps) {
  const handleChange = useCallback(
    event => {
      if (onChange) {
        onChange(event.target.value)
      }
    },
    [onChange],
  )

  return (
    <input placeholder={placeholder} onChange={handleChange} value={value} />
  )
}
export default TextField
