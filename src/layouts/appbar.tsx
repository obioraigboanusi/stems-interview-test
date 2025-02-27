import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [navbarBg, setNavbarBg] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 5) {
      setNavbarBg(true);
    } else {
      setNavbarBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  return (
    <nav
      className={`fixed w-full h-12 flex items-center justify-between px-4 md:px-10  py-8 md:py-10 z-[999] font-PPPangramSans transition-all duration-300 ${
        navbarBg ? 'bg-[#181524]' : 'bg-transparent'
      }`}>
      <div className='relative h-[28px] w-[100px] md:[130px]'>
        <Image
          src='/assets/logo.png'
          alt='logo'
          placeholder='blur'
          blurDataURL='/assets/logo.png'
          fill
          objectFit='contain'
        />
      </div>
      <div className='space-x-4'>
        <button
          onClick={() => router.push('/auth/login')}
          className='bg-[#22202E] text-white px-4 md:px-6 rounded-100vw h-10 md:h-12 transition ease-in-out duration-300 hover:bg-primary'>
          Login
        </button>
        <button
          onClick={() => router.push('/auth/signup')}
          className='bg-white text-black px-4 md:px-6 rounded-100vw h-10 md:h-12 transition ease-in-out duration-300 hover:bg-gray-200'>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
