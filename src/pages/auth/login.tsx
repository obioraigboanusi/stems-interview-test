import { useFirebaseAuth } from '@utils/firebase';
import { trpc } from '@utils/trpc';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextLayoutPage } from 'next/types';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AspectRatio } from '~/components/aspect-ratio';
import PhoneInput from '~/components/phone-input';
import OTPInput from '~/components/shared/otp-input';
import PhoneNumberInput from '~/components/shared/phoneNumberInput';
import UsernameInput from '~/components/shared/username-input';
import styles from '~/styles/Login.module.css';

const variants = {
  visible: (i: any) => ({
    opacity: 1,
    transition: {
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0 },
};

const Login: NextLayoutPage = (props) => {
  const {
    data: userData,
    refetch,
    isRefetching,
  } = trpc.users.getUser.useQuery();

  const [showUserNameRegistration, setShowUserNameRegistration] =
    useState(false);
  const [buttonText, setButtonText] = useState('Send verification code');
  const router = useRouter();
  const { user, requestOTP, verifyOTP } = useFirebaseAuth();
  const [otp, setOTP] = useState(false);
  const [error, setError] = useState(false);
  const [suspend, setSuspend] = useState(false);
  const [redirect, setRedirect] = useState('/');

  const items = ['Discover', 'Listen', 'Vote', 'Support'];
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  let i = 0;

  useEffect(() => {
    textRefs.current[i].classList.add(styles.highlightText);
    setRedirect(localStorage.getItem('redirect') || '/');

    setInterval(() => {
      if (i < 3) {
        textRefs.current[i].classList.remove(styles.highlightText);
        i++;
        textRefs.current[i].classList.add(styles.highlightText);
      } else {
        textRefs.current[i].classList.remove(styles.highlightText);
        i = 0;
        textRefs.current[i].classList.add(styles.highlightText);
      }
    }, 3200);
  }, [textRefs.current]);

  const addToRefs = (el: HTMLParagraphElement) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const postOTP = async () => {
    setSuspend(true);
    const { data } = await refetch();
    if (data?.username) {
      router.push(redirect);
      console.log('redirecting to: ', redirect);
    } else {
      setSuspend(false);
      setShowUserNameRegistration(true);
      return;
    }
  };

  const numberInputs = otp ? (
    <OTPInput
      error={error}
      onSuccess={postOTP}
      onError={() => setError(true)}
      pattern={/^\d{6}$/}
      fn={verifyOTP}
      buttonText='Verify Code'
      label='OTP Code'
      placeholder='123456'
      isLoading={suspend}
      isOTP
    />
  ) : (
    <PhoneNumberInput
      error={error}
      onSuccess={() => setOTP(true)}
      onError={() => setError(true)}
      pattern={/^\d{10}$/}
      fn={requestOTP}
      buttonText='Get verification code'
      label='Phone number'
      placeholder='1234567890'
      isOTP={false}
    />
  );

  return (
    <div className='w-full flex flex-row justify-center items-center h-screen'>
      <div className='flex-1 py-2 h-full w-full flex flex-col'>
        <div className='h-full px-4 w-full'>
          <Link
            href='/'
            passHref>
            <div className='w-32 h-16 relative ml-4'>
              <Image
                src='/assets/Logo.svg'
                alt='logo'
                fill
              />
            </div>
          </Link>
          <div className='h-full flex flex-col justify-start pt-16 px-4 md:w-full md:max-w-md 2xl:max-w-xl xl:mx-auto'>
            <h1 className='mt-8 text-4xl md:text-6xl'>Log in to Stems</h1>
            <div className='h-24 w-full mt-16 md:mt-40'>
              {!showUserNameRegistration && numberInputs}
              {showUserNameRegistration && (
                <UsernameInput
                  onSuccess={() => {
                    let redirect = localStorage.getItem('redirect') || '/';
                    router.push(redirect);
                  }}
                  suspend={isRefetching}
                  username={userData?.username ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='hidden md:flex flex-col flex-1 h-full w-full justify-center overflow-hidden bg-dark2 relative border-l-1 border-l-gray-100 shadow-highlight rounded-l-xl'>
        <div className='mt-[-10px] z-20 flex flex-col gap-4'>
          {items.map((item, key) => (
            <p
              className={`text-4xl md:text-6xl text-center font-bold mt-[4px]`}
              key={key}
              ref={addToRefs}>
              {item}
            </p>
          ))}
        </div>
        <div className={clsx('flex absolute h-full w-full', styles.track)}>
          <div className='relative h-full w-full mr-[35%] shrink-0'>
            <div className='w-[10.5vw] rounded overflow-hidden absolute top-[6vh] -left-[3.5vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src='/assets/images/login/login-artwork-7.png'
                  fill
                  alt='Overlay image'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute top-[35vh] left-[4vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-6.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute -top-[1.5vw] right-[14vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-2.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute bottom-[30vh] right-[8vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-1.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute bottom-[2vh] left-[5vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-3.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute top-[12.5vh] -right-[2vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-5.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute bottom-[4vh] right-[3.5vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-4.png'
                />
              </AspectRatio>
            </div>
          </div>

          <div className='relative w-full h-full shrink-0'>
            <div className='w-[10.5vw] rounded overflow-hidden absolute top-[6vh] -left-[3.5vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src='/assets/images/login/login-artwork-7.png'
                  fill
                  alt='Overlay image'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute top-[35vh] left-[4vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-6.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute -top-[1.5vw] right-[14vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-2.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute bottom-[30vh] right-[8vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-1.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute bottom-[2vh] left-[5vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-3.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute top-[12.5vh] -right-[2vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-5.png'
                />
              </AspectRatio>
            </div>

            <div className='w-[10.5vw] rounded overflow-hidden absolute bottom-[4vh] right-[3.5vw]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  alt='Overlay image'
                  src='/assets/images/login/login-artwork-4.png'
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
