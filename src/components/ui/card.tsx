import * as React from "react"

import { cn } from "@/lib/utils"
import { useTilt } from "@/hooks/use-tilt"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = true, children, onMouseMove, onMouseLeave, ...props }, ref) => {
    const tilt = useTilt(4)
    const setRefs = (node: HTMLDivElement | null) => {
      tilt.ref.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    }
    return (
      <div
        ref={setRefs}
        onMouseMove={(e) => {
          if (interactive) tilt.onMouseMove(e)
          onMouseMove?.(e)
        }}
        onMouseLeave={(e) => {
          if (interactive) tilt.onMouseLeave()
          onMouseLeave?.(e)
        }}
        className={cn(
          "card-3d rounded-2xl border border-white/[0.08] bg-card/60 text-card-foreground backdrop-blur-xl shadow-[0_1px_0_hsl(var(--foreground)/0.04)_inset,0_20px_50px_-20px_hsl(225_60%_2%/0.6)]",
          interactive && "tilt-card glow-card",
          className
        )}
        {...props}
      >
        {interactive && <span aria-hidden className="card-glow" />}
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
