//

// import {
//   MotionInView,
//   varFadeInDown,
//   varFadeInLeft,
//   varFadeInRight,
//   varFadeInUp,
// } from '../animate';
// import Image from 'next/image';
// import React, { useState } from 'react';

// export default function Hero() {
//   const initialValue = '0xStems.xyz/';
//   const [inputValue, setInputValue] = useState('');
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     let newValue = event.target.value;
//     if (newValue === initialValue || newValue === '') {
//       setInputValue('');
//     } else {
//       if (!inputValue && !newValue.startsWith(initialValue)) {
//         newValue = initialValue + newValue;
//       }
//       setInputValue(newValue);
//     }
//   };

//   return (
//     <div className='hero-section min-h-screen md:min-h-full relative md:py-40 text-center flex flex-col items-center justify-center overflow-hidden'>
//       <Image
//         className='h-[120vh] md:h-full'
//         src='/assets/bg-main.png'
//         fill
//         alt='bg-main-img'
//         objectFit='cover'
//         priority
//         sizes='100vw'
//         placeholder='blur'
//         blurDataURL='/assets/bg-main.png'
//       />
//       <div className='container mx-auto relative z-50'>
//         <MotionInView variants={varFadeInDown}>
//           <h1 className='text-[40px] md:text-[96px]  font-[600] leading-tight mb-2 md:mb-6'>
//             Receive <span className='text-primary'>beats </span> from anyone,
//             <span className='text-primary'> all in one place</span>.
//           </h1>
//         </MotionInView>
//         <MotionInView variants={varFadeInUp}>
//           <p className='text-[13px] md:text-[26px]  font-medium'>
//             Set up your page to source and review new beats
//           </p>
//         </MotionInView>

//         <div className='my-10 md:my-40 flex flex-col md:flex-row max-w-xl gap-4 mx-auto'>
//           <MotionInView variants={varFadeInLeft}>
//             <input
//               type='text'
//               value={inputValue}
//               onChange={handleChange}
//               placeholder='0xStems.xyz/yourname'
//               required
//               className=' w-[185px] md:w-[355px] text-[12px] md:text-[24px] flex-auto rounded-md border-0 bg-white px-3.5 py-2 md:py-4 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-[24px] sm:leading-6'
//               style={{
//                 boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
//               }}
//             />
//           </MotionInView>
//           <MotionInView variants={varFadeInRight}>
//             <button
//               type='submit'
//               className=' min-w-[142px] md:min-w-[250px] w-[142px] flex items-center justify-center pb-2  md:w-full h-[45px] md:h-[60px] bg-[#000] text-[16px] md:text-[24px] text-white md:px-6 rounded-100vw hover:bg-primary'
//               style={{
//                 boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
//               }}>
//               Claim your URL
//             </button>
//           </MotionInView>
//         </div>
//         <a
//           href='#pro-made'
//           className=' absolute bottom-[-25%] transform translate-x-[-50%] md:bottom-[-10%] rounded-md hover:bg-white/5 p-2 hover:ring-1 hover:ring-white/10'>
//           <svg
//             className='h-4 md:h-8 w-4 md:w-8'
//             width='29'
//             height='18'
//             viewBox='0 0 29 18'
//             fill='none'
//             xmlns='http://www.w3.org/2000/svg'>
//             <path
//               fillRule='evenodd'
//               clipRule='evenodd'
//               d='M1.7516 1.71C2.80927 0.65233 4.52409 0.65233 5.58176 1.71L14.5 10.6283L23.4183 1.71C24.4759 0.652333 26.1908 0.652333 27.2484 1.71C28.3061 2.76767 28.3061 4.4825 27.2484 5.54016L16.4151 16.3735C15.3574 17.4312 13.6426 17.4312 12.5849 16.3735L1.7516 5.54016C0.693926 4.48249 0.693926 2.76767 1.7516 1.71Z'
//               fill='white'
//             />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// }

import {
  MotionInView,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
  varFadeInUp,
} from '../animate';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';

export default function Hero() {
  const initialValue = '0xStems.xyz/';
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
    }
  };

  const handleButtonClick = () => {
    const fullUrl = initialValue + inputValue;
    router.push({
      pathname: '/auth/signup',
      query: {
        url: fullUrl,
      },
    });
  };

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //     inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
  //   }
  // }, []);

  return (
    <div className='hero-section min-h-screen md:min-h-full relative md:py-40 text-center flex flex-col items-center justify-center overflow-hidden'>
      <Image
        className='h-[120vh] md:h-full'
        src='/assets/bg-main.png'
        fill
        alt='bg-main-img'
        style={{
          objectFit: 'cover',
        }}
        priority
        sizes='100vw'
        placeholder='blur'
        blurDataURL='/assets/bg-main.png'
      />
      <div className='container mx-auto relative z-50'>
        <MotionInView variants={varFadeInDown}>
          <h1 className='text-[40px] md:text-[96px] font-[600] leading-tight mb-2 md:mb-6'>
            Receive <span className='text-primary'>beats </span> from anyone,
            <span className='text-primary'> all in one place</span>.
          </h1>
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <p className='text-[13px] md:text-[26px] font-medium'>
            Set up your page to source new beats
          </p>
        </MotionInView>

        <div className='my-10 md:my-40 flex flex-col md:flex-row max-w-xl gap-4 mx-auto items-center justify-center'>
          <MotionInView variants={varFadeInLeft}>
            <div className='flex items-center w-[185px] md:w-[355px] text-[12px] md:text-[24px] rounded-md border-0 bg-white px-3.5 py-2 md:py-4 text-black shadow-sm ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:text-[14px] sm:leading-6'>
              <span className='text-black'>{initialValue}</span>
              <input
                type='text'
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                ref={inputRef}
                className='flex-auto bg-transparent outline-none text-black overflow-hidden'
                placeholder='yourname'
              />
            </div>
          </MotionInView>
          <MotionInView variants={varFadeInRight}>
            <button
              type='button'
              onClick={handleButtonClick}
              className=' min-w-[142px] md:min-w-[250px] flex items-center justify-center h-[45px] md:h-[60px] bg-[#000] text-[16px] md:text-[24px] text-white md:px-6 rounded-100vw hover:bg-primary'
              style={{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}>
              Claim your URL
            </button>
          </MotionInView>
        </div>
        <a
          href='#pro-made'
          className=' absolute bottom-[-25%] transform translate-x-[-50%] md:bottom-[-10%] rounded-md hover:bg-white/5 p-2 hover:ring-1 hover:ring-white/10'>
          <svg
            className='h-4 md:h-8 w-4 md:w-8'
            width='29'
            height='18'
            viewBox='0 0 29 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1.7516 1.71C2.80927 0.65233 4.52409 0.65233 5.58176 1.71L14.5 10.6283L23.4183 1.71C24.4759 0.652333 26.1908 0.652333 27.2484 1.71C28.3061 2.76767 28.3061 4.4825 27.2484 5.54016L16.4151 16.3735C15.3574 17.4312 13.6426 17.4312 12.5849 16.3735L1.7516 5.54016C0.693926 4.48249 0.693926 2.76767 1.7516 1.71Z'
              fill='white'
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
