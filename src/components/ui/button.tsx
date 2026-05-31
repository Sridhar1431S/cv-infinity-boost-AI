
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn-3d relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground bg-[linear-gradient(135deg,hsl(var(--grad-from)),hsl(var(--grad-mid)))] shadow-[0_1px_0_hsl(0_0%_100%/0.18)_inset,0_8px_24px_-8px_hsl(var(--primary)/0.65),0_2px_6px_-1px_hsl(225_60%_2%/0.5)] hover:shadow-[0_1px_0_hsl(0_0%_100%/0.22)_inset,0_18px_42px_-12px_hsl(var(--accent)/0.75),0_6px_14px_-2px_hsl(var(--primary)/0.55)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_8px_24px_-8px_hsl(var(--destructive)/0.5)]",
        outline:
          "border border-white/10 bg-white/[0.03] backdrop-blur-md text-foreground hover:bg-white/[0.07] hover:border-primary/50 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_10px_28px_-10px_hsl(var(--primary)/0.55)]",
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
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget as HTMLElement
      if (target && target.getBoundingClientRect) {
        const rect = target.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const ripple = document.createElement("span")
        ripple.className = "ripple"
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`
        target.appendChild(ripple)
        setTimeout(() => ripple.remove(), 650)
      }
      onClick?.(e)
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
