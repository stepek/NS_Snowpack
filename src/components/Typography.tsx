import React, {ReactText} from "react"

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "body1"

interface TypographyProps {
  variant?: Variant
  children?: ReactText
}
export function Typography({variant, children = ""}: TypographyProps) {
  switch (variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "body":
    case "body1":
    default:
      return <span>{children}</span>
  }
}
export default Typography
