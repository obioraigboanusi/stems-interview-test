import Button from './button';
import { trpc } from '@utils/trpc';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
};

type UserNameProps = {
  onSuccess: () => void;
  suspend?: boolean;
  username?: string | null;
};

function UsernameInput(props: UserNameProps) {
  const mutation = trpc.users.createUser.useMutation({
    onSuccess: () => {
      props.onSuccess();
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const runSubmit = async (values: FormData): Promise<void> => {
    await mutation.mutateAsync({
      username: values.name,
    });
    return;
  };

  const { onChange, onBlur, name, ref } = register('name', {
    required: 'This field cannot be empty',
  });

  useEffect(() => {
    console.log(props.username);
    if (props.username != null) {
      props.onSuccess();
    }
  }, [props.username]);

  return (
    <form onSubmit={handleSubmit(runSubmit)}>
      <div className='relative z-0'>
        <label className='text-sm md:text-2xl text-white'> Username</label>
        <input
          type='text'
          id='floating_standard'
          className='block py-2.5 px-0 w-full text-sm md:text-2xl  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-dark1 text-white placeholder:text-gray-400 focus:placeholder:text-gray-400'
          placeholder='your-cool-username'
          onChange={onChange} // assign onChange event
          onBlur={onBlur} // assign onBlur event
          name={name} // assign name prop
          ref={ref} // assign ref prop
        />
        {/* <label
          htmlFor='floating_standard'
          className='margin-9 absolute text-sm md:text-2xl text-white duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
          Username
        </label> */}
        {errors.name && (
          <p className='mt-2 text-xs text-error'>Username is invalid</p>
        )}
      </div>
      <Button
        type='submit'
        className='mt-10 text-sm md:text-2xl flex items-center justify-center pb-3 md:pb-4'
        isLoading={isSubmitting || mutation.isLoading}>
        Complete registration
      </Button>
      {mutation.isError && (
        <div className='p-3 bg-dark2 text-xs text-center text-error rounded mt-6'>
          {' '}
          That username already exists. Please pick another
        </div>
      )}
    </form>
  );
}

export default UsernameInput;
