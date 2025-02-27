import { Transition } from '@headlessui/react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';

type Props = {
  open: boolean;
  onOpenChange: (open?: boolean) => void;
  heading?: string;
  content?: string;
  actionLabel?: string;
  action?: () => void;
};

const Alert = (props: Props) => {
  return (
    <AlertDialogPrimitive.Root
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <Transition.Root show={props.open}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-100'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <AlertDialogPrimitive.Overlay
            forceMount
            className='fixed inset-0 z-20 bg-dark1/70 backdrop-blur-sm'
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-100'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <AlertDialogPrimitive.Content
            forceMount
            className={clsx(
              'fixed z-50',
              'max-w-md rounded-[0.75rem] p-6',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-dark2'
            )}
          >
            <AlertDialogPrimitive.Title className='text-base font-semi-bold text-gray-100'>
              {props.heading}
            </AlertDialogPrimitive.Title>
            <AlertDialogPrimitive.Description className='mt-4 text-xs text-gray-300'>
              {props.content}
            </AlertDialogPrimitive.Description>
            <div className='mt-8 flex justify-end space-x-2'>
              <AlertDialogPrimitive.Cancel
                className={clsx(
                  'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                  'transition-colors',
                  'text-gray-100 hover:text-primary'
                )}
              >
                Cancel
              </AlertDialogPrimitive.Cancel>
              <AlertDialogPrimitive.Action
                className={clsx(
                  'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  'bg-primary text-gray-100 border-primary border-2 hover:bg-gray-100 hover:border-gray-200 hover:text-dark1 rounded-100vw',
                  'border border-transparent'
                )}
                onClick={props.action}
              >
                {props.actionLabel}
              </AlertDialogPrimitive.Action>
            </div>
          </AlertDialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </AlertDialogPrimitive.Root>
  );
};

export default Alert;
