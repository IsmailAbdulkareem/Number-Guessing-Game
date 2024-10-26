import React, { forwardRef } from 'react';
import { cn } from 'some-cn-function'; // Replace with the actual import

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className || '' // Default to an empty string if className is undefined
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export { Input };
