import React, { Fragment } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Button from './button';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

type Props = {
  name?: string;
  value?: string;
  onChange: (value?: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  options: { value?: string; label?: string }[];
  iconComponent: React.ElementType;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number | string;
  className?: string;
};

// const Select = (props: Props) => {
//   return (
//     <SelectPrimitive.Root
//       defaultValue="US"
//       value={props.value}
//       onValueChange={(value) => props.onChange(value)}
//       onOpenChange={(open) => (open ? props.onFocus() : props.onBlur())}
//     >
//       <SelectPrimitive.Trigger asChild aria-label="Countries">
//         <button className="flex flex-row h-full my-1 py-2 px-2 hover:bg-dark2 rounded-sm focus:outline-none">
//           <props.iconComponent
//             aria-hidden
//             country={props.value}
//             label={props.value}
//             classname="h-20"
//           />
//           <SelectPrimitive.Icon className="ml-2">
//             <ChevronDownIcon />
//           </SelectPrimitive.Icon>
//         </button>
//       </SelectPrimitive.Trigger>

//       <SelectPrimitive.Content className={cx('z-50', props.className)}>
//         <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-white">
//           <ChevronUpIcon />
//         </SelectPrimitive.ScrollUpButton>
//         <SelectPrimitive.Viewport className="bg-dark2 rounded-md shadow-lg z-50 max-w-sm p-2">
//           <ScrollAreaPrimitive.Root className="w-60 h-64 rounded-md overflow-hidden ">
//             <ScrollAreaPrimitive.Viewport className="w-full h-full rounded-md">
//               <SelectPrimitive.Group className="z-50 ">
//                 {props.options.map((f, i) => (
//                   <SelectPrimitive.Item
//                     key={`${f.value ?? 'value'}-${i}`}
//                     value={f.value ?? ''}
//                     className={cx(
//                       'relative flex items-center px-6 py-3 rounded-md text-xs text-white font-medium focus:bg-dark1',
//                       'radix-disabled:opacity-50',
//                       'focus:outline-none select-none z-100 cursor-pointer overflow-hidden',
//                       'radix-state-checked:bg-dark1'
//                     )}
//                   >
//                     <SelectPrimitive.ItemText>
//                       {f.label}
//                     </SelectPrimitive.ItemText>
//                     <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
//                       <CheckIcon />
//                     </SelectPrimitive.ItemIndicator>
//                   </SelectPrimitive.Item>
//                 ))}
//               </SelectPrimitive.Group>
//             </ScrollAreaPrimitive.Viewport>
//             <ScrollAreaPrimitive.Scrollbar
//               orientation="vertical"
//               // className="flex select-none touch-none p-1 bg-gray-700 hover:bg-gray-800 radix-orientation-vertical:w-2"
//             >
//               <ScrollAreaPrimitive.Thumb />
//               {/* <ScrollAreaPrimitive.Thumb className="flex-1 bg-dark1 rounded-2xl relative before:absolute before:top-[50%] before:left-[50%] before:translate-x-[50%] before:translate-y-[50%] before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" /> */}
//             </ScrollAreaPrimitive.Scrollbar>
//           </ScrollAreaPrimitive.Root>
//         </SelectPrimitive.Viewport>
//       </SelectPrimitive.Content>
//     </SelectPrimitive.Root>
//   );
// };

const SecondSelect = (props: Props) => {
  return (
    <Listbox
      value={props.value}
      onChange={props.onChange}>
      <div className='relative'>
        <Listbox.Button className='relative flex flex-row h-full items-center my-1 py-2 px-2 hover:bg-dark2 rounded-md focus:outline-none'>
          <props.iconComponent
            aria-hidden
            country={props.value}
            label={props.value}
            className='h-20'
          />
          <ChevronDownIcon className='h-5 w-5 ml-2 text-white' />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <Listbox.Options className='absolute mt-1 w-60 h-64 overflow-auto px-2 py-3 rounded-lg text-xs text-white font-medium bg-dark2 z-50'>
            {props.options.map((country, countryIdx) => (
              <Listbox.Option
                key={countryIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-3 px-8 rounded-md ${
                    active ? 'bg-dark1' : ''
                  }`
                }
                value={country.value}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}>
                      {country.label}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-1 '>
                        <CheckIcon
                          className='h-5 w-5'
                          aria-hidden='true'
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

type FormData = {
  number: string;
};

type NumberInputProps = {
  onSuccess: () => void;
  onError: () => void;
  error: boolean;
  pattern: RegExp;
  fn: (number: string) => Promise<boolean>;
  label: string;
  placeholder: string;
  buttonText: string;
  isOTP: boolean;
};

// eslint-disable-next-line react/display-name
const CustomInput = React.forwardRef((props: any, ref) => {
  return (
    <input
      name={props.name}
      ref={ref}
      {...props}
      className='ml-2 block my-0 py-1 px-2 w-full h-full rounded-tr-md rounded-br-md text-sm md:text-2xl bg-transparent  border-1 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-vibrant bg-dark1 text-white'
    />
  );
});

const NumberInput = (props: NumberInputProps) => {
  const [number, setNumber] = useState('');
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const runSubmit = async (values: FormData): Promise<void> => {
    const success = await props.fn(number);
    if (success) {
      reset();
      props.onSuccess();
    } else {
      props.onError();
    }

    return;
  };

  const { name, ref } = register('number', {
    required: 'This field cannot be empty',
    validate: () => {
      return isValidPhoneNumber(number);
    },
  });

  return (
    <form onSubmit={handleSubmit(runSubmit)}>
      <div className='flex flex-col items-start w-full'>
        <label className='text-sm md:text-2xl text-white'>{props.label}</label>
        <div className='md:mt-4 border-b-2 border-gray-700  focus-within:border-vibrant w-full'>
          <PhoneInput
            onChange={(value) => setNumber(value ?? '')} // assign onChange event
            name={name} // assign name prop
            ref={ref} // assign ref prop
            defaultCountry='US'
            international
            inputComponent={CustomInput}
            countrySelectComponent={SecondSelect}
            style={{
              paddingLeft: 2,
            }}
          />
        </div>

        {errors.number && (
          <p className='mt-2 text-xs text-error'>Invalid phone number</p>
        )}
      </div>
      <Button
        type='submit'
        className='mt-8 mx-0 text-sm md:text-2xl flex items-center justify-center pb-3 md:pb-4'
        isLoading={isSubmitting}>
        {props.buttonText}
      </Button>
      {props.error && (
        <div className='p-3 bg-dark2 text-xs text-center text-error rounded mt-6'>
          {' '}
          Sorry, we couldn&apos;t complete your request at this time. Please try
          again later.
        </div>
      )}
      <div
        id='captchaContainer'
        className='z-[9999] absolute'></div>
    </form>
  );
};

export default NumberInput;
