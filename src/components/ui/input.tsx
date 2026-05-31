import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-base text-foreground ring-offset-background transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:border-primary/70 focus-visible:bg-white/[0.06] focus-visible:shadow-[0_0_0_4px_hsl(var(--primary)/0.18),0_0_24px_-6px_hsl(var(--accent)/0.55)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
