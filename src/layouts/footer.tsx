import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// icons
import { FaXTwitter } from 'react-icons/fa6';
import { TfiLayoutLineSolid } from 'react-icons/tfi';

export default function Footer() {
  const [screen, setScreen] = useState(false);

  const updateScreen = () => {
    if (window.innerWidth >= 768) {
      setScreen(true);
    } else {
      setScreen(false);
    }
  };

  useEffect(() => {
    // Update button text when component mounts
    updateScreen();

    // Update button text when window resizes
    window.addEventListener('resize', updateScreen);
    return () => {
      window.removeEventListener('resize', updateScreen);
    };
  }, []);
  return (
    <div className='px-4 md:px-10'>
      <div className='flex items-center justify-between gap-x-4 py-4'>
        <p className=' text-[14px] md:text-[18px] text-[#F8F7FD]  md:min-w-[120px] text-center'>
          Stems © 2024
        </p>
        <div className='h-[1px] w-[25px] md:w-full bg-white ' />
        <Link
          href='https://x.com/0xStems'
          target='_blank'
          className='text-white text-[14px] md:text-[18px] '>
          <FaXTwitter size={24} />
        </Link>
        <div className='h-[1px] w-[25px] md:w-full bg-white ' />
        <Link
          className='text-[14px] md:text-[18px] text-[#F8F7FD]   md:min-w-[150px] text-center'
          href='https://0xstems.notion.site/Terms-of-Service-90d2d074bb324f5b920bf562d4a0298f'>
          Privacy & Terms
        </Link>
      </div>
      {/* {!screen ? (
        <div className='flex items-center justify-between py-4'>
          <p className=' text-[18px] text-[#F8F7FD] '>
            Stems ©2024
          </p>
          <TfiLayoutLineSolid size={20} />
          <Link
            href='#'
            className='text-white text-[18px] '>
            <FaXTwitter size={24} />
          </Link>
          <TfiLayoutLineSolid size={20} />
          <Link
            className='text-[18px] text-[#F8F7FD] '
            href='#'>
            Privacy & Terms
          </Link>
        </div>
      ) : (
        <>
          <div className='flex items-center justify-between border-b border-primary py-6'>
            <div className='flex items-center gap-6'>
              <Link
                href='#'
                className='text-primary text-[18px] '>
                Contact
              </Link>
              <Link
                href='#'
                className='text-primary text-[18px] '>
                Report a bug
              </Link>
            </div>
            <Link
              href='#'
              className='text-white text-[18px] '>
              <FaXTwitter size={30} />
            </Link>
          </div>
          <div className='flex items-center justify-between py-6'>
            <div className='flex items-center gap-3 text-[#F8F7FD]'>
              <p className=' text-[18px] text-[#F8F7FD] '>
                Contact
              </p>
              <TfiLayoutLineSolid size={40} />
              <p className=' text-[18px] text-[#F8F7FD] '>
                ©2024
              </p>
            </div>
            <div className='flex items-center gap-3 text-[#F8F7FD]'>
              <Link
                className='text-[18px] text-[#F8F7FD] '
                href='#'>
                Privacy
              </Link>
              <TfiLayoutLineSolid size={40} />
              <Link
                className='text-[18px] text-[#F8F7FD] '
                href='#'>
                Terms
              </Link>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}
