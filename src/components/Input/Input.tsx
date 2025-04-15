import * as React from 'react';

import { cn } from '@app/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  icon?: React.ReactNode;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, startIcon, icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {startIcon && (
        <div className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">{startIcon}</div>
      )}
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-border bg-inputBackground px-3 py-2 placeholder-placeholder ${startIcon && 'indent-7'} text-base !outline-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className
        )}
        ref={ref}
        {...props}
      />
      {icon && <div className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">{icon}</div>}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
