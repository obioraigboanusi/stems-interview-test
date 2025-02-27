import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import NextLink from 'next/link';

type NavigationRef = HTMLDivElement;

export const NavigationContent = React.forwardRef<
  NavigationRef,
  NavigationMenu.NavigationMenuContentProps
>(({ children, ...props }, forwardedRef) => (
  <NavigationMenu.Content
    className={clsx(
      'absolute w-auto left-[-50%] rounded-md animate-in slide-in-from-top-1 bg-dark2',
      props.className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className='w-64 lg:w-[18rem] p-3'>
      <div className='w-full flex flex-col space-y-2'>{children}</div>
    </div>
  </NavigationMenu.Content>
));

NavigationContent.displayName = 'Navigation content';

export const NavigationRoot = ({
  children,
  ...props
}: NavigationMenu.NavigationMenuListProps) => {
  return (
    <NavigationMenu.Root className='relative'>
      <NavigationMenu.List className='flex flex-row p-1 space-x-2'>
        {children}
      </NavigationMenu.List>
      <div
        className={clsx(
          'absolute flex justify-center',
          'w-full left-[-20%] top-[100%] z-20'
        )}
        style={{
          perspective: '2000px',
        }}
      >
        <NavigationMenu.Viewport
          className={clsx(
            'relative origin-center mt-0 w-full h-radix-navigation-menu-viewport transition-all bg-dark2'
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
};

export const NavigationLink = ({
  href,
  ...props
}: NavigationMenu.NavigationMenuLinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NavigationMenu.Link
      className={clsx(
        'w-full px-2 py-2.5 hover:bg-dark1/40 rounded-lg cursor-pointer'
      )}
      active={isActive}
      {...props}
      onClick={() => router.push(href ?? '#')}
    >
      {props.children}
    </NavigationMenu.Link>
  );
};

export const NavigationTrigger = NavigationMenu.Trigger;
export const NavigationItem = NavigationMenu.Item;
