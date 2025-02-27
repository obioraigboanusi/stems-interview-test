import React, { Fragment } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';

type DialogRef = HTMLDivElement;

type DialogContentProps = DialogPrimitive.DialogContentProps & {
  title?: string;
  isopen?: string;
};

export const DialogContent = React.forwardRef<DialogRef, DialogContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal forceMount>
      <Transition.Root show={props.isopen=="true"}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-100'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <DialogPrimitive.Overlay className='fixed inset-0 bg-dark1/10 backdrop-blur-sm' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-100'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-100'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <DialogPrimitive.Content
            {...props}
            ref={forwardedRef}
            className={clsx(
              'w-[95vw] max-w-md rounded-[0.75rem] p-6 md:w-full',
              'fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark2 overflow-y-auto p-2 md:p-4 flex flex-col justify-between gap-2',
              'rounded-md',
              'text-xs px-4 py-3 md:px-6 md:py-4'
            )}
          >
            {props.title && (
              <DialogPrimitive.Title className='text-base font-semi-bold text-gray-100 mb-4'>
                {props.title}
              </DialogPrimitive.Title>
            )}
            {children}
            <DialogPrimitive.Close
              aria-label='Close'
              className='h-6 w-6 rounded-full flex flex-col justify-center items-centers bg-transparent hover:bg-dark1 absolute top-3 right-3'
            >
              <XMarkIcon className='h-4 w-4 text-gray-100 self-center' />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  )
);

DialogContent.displayName = 'Dialog Content';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
