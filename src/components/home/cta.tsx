import { MotionInView, varFadeInDown, varFadeInUp } from '../animate';
import { useRouter } from 'next/router';
import React from 'react';

export default function BeatsToday() {
  const router = useRouter();

  return (
    <div className='beats-section relative overflow-hidden '>
      <div className='conatiner mx-auto relative z-[100]'>
        <MotionInView variants={varFadeInDown}>
          <div className='flex flex-col items-center justify-center text-center py-20 md:py-40'>
            <h1 className='text-[36px] md:text-[96px]  font-[600] mb-10'>
              Start receiving beats today.
            </h1>
            <button
              type='submit'
              style={{
                boxShadow: '0px 4px 25px 0px #5C5192',
              }}
              onClick={() => router.push('/auth/signup')}
              className=' min-w-auto md:min-w-[270px] text-[14px] md:text-[24px] text-white pb-3 md:pb-5  pt-2 md:pt-4 rounded-100vw bg-primary hover:bg-[#22202E] px-6 md:px-14'>
              Create your page now
            </button>
          </div>
        </MotionInView>
      </div>
    </div>
  );
}
