
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground bg-[linear-gradient(135deg,hsl(var(--grad-from)),hsl(var(--grad-mid)))] shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_36px_-8px_hsl(var(--accent)/0.7)] hover:brightness-110 hover:-translate-y-px",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_8px_24px_-8px_hsl(var(--destructive)/0.5)]",
        outline:
          "border border-white/10 bg-white/[0.03] backdrop-blur-md text-foreground hover:bg-white/[0.06] hover:border-primary/40 hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.45)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/5",
        ghost: "text-foreground/80 hover:text-foreground hover:bg-white/[0.06]",
        link: "text-primary underline-offset-4 hover:underline",
        neon:
          "bg-white/[0.03] border border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.6)]",
        neonBlue:
          "bg-white/[0.03] border border-[hsl(var(--cyan))]/40 text-foreground hover:bg-[hsl(var(--cyan))]/10 hover:shadow-[0_0_24px_-4px_hsl(var(--cyan)/0.6)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3.5",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
