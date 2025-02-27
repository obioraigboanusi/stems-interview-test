import { CheckIcon } from '@heroicons/react/20/solid';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import * as React from 'react';

interface CheckBoxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  error?: Partial<Error>;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckBoxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={clsx(
      'peer h-4 w-4 shrink-0 bg-dark1/60 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-vibrant rounded transition-colors',
      className,
      props.error?.message && 'border border-error'
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={clsx('flex items-center justify-center')}
    >
      <CheckIcon className='h-2.5 w-2.5' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
