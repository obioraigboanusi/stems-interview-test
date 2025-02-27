import { Label } from '@radix-ui/react-label';
import clsx from 'clsx';
import React from 'react';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label?: string;
  error?: Error | Partial<Error>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className='group w-full'>
        <label
          htmlFor='floating_standard'
          className='text-xs text-gray-300 ml-1'
        >
          {props.label}
        </label>
        <input
          type={props.type ?? 'text'}
          className={clsx(
            'block py-2 px-3 w-full text-sm rounded placeholder:text-gray-600 focus:placeholder:text-dark2',
            'focus:outline focus:outline-primary',
            className
          )}
          ref={ref} // assign ref prop
          {...props}
        />
        {props.error && (
          <p className='ml-1 mt-0.5 text-xs text-error'>
            {props.error.message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
