import Button from './button';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

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
  isLoading?: boolean;
};

const OTPInput = (props: NumberInputProps) => {
  const [pin, setPin] = useState('');
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const runSubmit = async (values: FormData): Promise<void> => {
    const success = await props.fn(values.number);
    if (success) {
      reset();
      props.onSuccess();
    } else {
      props.onError();
    }

    return;
  };

  const { onChange, onBlur, name, ref } = register('number', {
    validate: (value) => {
      return props.pattern.test(value);
    },
  });

  return (
    <form onSubmit={handleSubmit(runSubmit)}>
      <div className='relative z-0s'>
        <input
          type='text'
          id='floating_standard'
          className='block py-2.5 px-0 w-full text-sm md:text-2xl bg-transparent border-0 border-b-2 border-gray-300 focus:border-vibrant appearance-none focus:outline-none focus:ring-0 peer bg-dark1 text-white placeholder:text-dark1 focus:placeholder:text-dark2'
          placeholder={props.placeholder}
          onChange={onChange} // assign onChange event
          onBlur={onBlur} // assign onBlur event
          name={name} // assign name prop
          ref={ref} // assign ref prop
          autoComplete='one-time-code'
        />
        <label
          htmlFor='floating_standard'
          className='margin-9 absolute text-sm md:text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-vibrant peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
          {props.label}
        </label>

        {errors.number && (
          <p className='mt-2 text-xs text-error'>{errors.number.message}</p>
        )}
      </div>
      <Button
        className='mt-10 text-sm md:text-2xl flex items-center justify-center pb-3 md:pb-4'
        isLoading={isSubmitting || props.isLoading}
        type='submit'>
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

export default OTPInput;
