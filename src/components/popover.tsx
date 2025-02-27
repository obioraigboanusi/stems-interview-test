"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import clsx from "clsx";
import * as React from "react";

type PopoverProps = PopoverPrimitive.PopoverProps;

export function Popover({ ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />;
}

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverPrimitive.PopoverTriggerProps
>(function PopoverTrigger({ ...props }, ref) {
  return <PopoverPrimitive.Trigger {...props} ref={ref} />;
});

export const PopoverPortal = PopoverPrimitive.Portal;

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverPrimitive.PopoverContentProps
>(function PopoverContent({ className, ...props }, ref) {
  return (
    <PopoverPortal>
      <PopoverPrimitive.Content
        ref={ref}
        align={props.align ?? "end"}
        sideOffset={5}
        className={clsx(
          "overflow-hidden rounded-md text-xs bg-dark2 text-gray-100 shadow-sm animate-in slide-in-from-top-1 py-1 px-2",
          className
        )}
        {...props}
      />
    </PopoverPortal>
  );
});
