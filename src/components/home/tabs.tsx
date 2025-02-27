import {
  MotionInView,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
  varFadeInUp,
} from '../animate';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';

interface TabContent {
  title: string;
  details: string;
  img: string;
  isShare?: boolean;
  image1?: string;
  isSm?: boolean;
}

interface Tab {
  name: string;
  secondaryName: string;
  content: TabContent;
}

const tabs: Tab[] = [
  {
    name: 'Quick Setup',
    secondaryName: 'Create',
    content: {
      title: '<span>Create</span> your page in minutes',
      isSm: true,
      details:
        'Showcase your vibe, connect your socials, and specify your needs.',
      img: '/assets/setup.png',
      image1: '/assets/setup-sm.png',
    },
  },
  {
    name: 'Easy Sharing',
    secondaryName: 'Share',
    content: {
      title: '<span>Share</span> it to receive submissions',
      isShare: true,
      isSm: true,
      details:
        'Broadcast your URL across all platforms that collaborators can find you on.',
      img: '/assets/sharing.png',
      image1: '/assets/sharing.png',
    },
  },
  {
    name: 'Efficient Review',
    secondaryName: 'Review',
    content: {
      title: '<span>Review</span> and <span>save</span> favorites',
      details:
        'Stop searching across different platforms. Easily pin your favorite content for quick reference.',
      img: '/assets/efficient.png',
      image1: '/assets/efficient.png',
    },
  },
  {
    name: 'Team Access',
    secondaryName: 'Permission',
    content: {
      title: 'Grant <span>access</span> to your team',
      details:
        'Set custom permissions to outsource your A&R efforts to your team and fans.',
      img: '/assets/team.png',
      image1: '/assets/team.png',
    },
  },
];

export default function Tabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(1);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [buttonText, setButtonText] = useState(false);

  const updateButtonText = () => {
    if (window.innerWidth >= 1024) {
      setButtonText(true);
    } else {
      setButtonText(false);
    }
  };

  useEffect(() => {
    // Update button text when component mounts
    updateButtonText();

    // Update button text when window resizes
    window.addEventListener('resize', updateButtonText);
    return () => {
      window.removeEventListener('resize', updateButtonText);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    sectionsRef.current.forEach((section, index) => {
      if (
        section &&
        section.offsetTop <= scrollPosition &&
        section.offsetTop + section.offsetHeight <= scrollPosition
      ) {
        setActiveTab(index);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(index);
  };

  return (
    <div
      className='tabs-section relative'
      id='tabs'>
      <div className=''>
        <div className='grid grid-cols-1 lg:grid-cols-3 md:gap-4  '>
          <div className='sticky top-16 lg:top-40  lg:h-screen z-[100] bg-[#181524] py-4 md:py-28'>
            <MotionInView variants={varFadeInLeft}>
              <div className='flex flex-row lg:flex-col items-center justify-center  gap-x-2 md:gap-4 '>
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    type='button'
                    className={`text-[12px] md:text-[24px]  hover:font-[500] lg:min-w-[223px] hover:bg-[#F8F7FD] hover:text-black transition-colors ease-in-out duration-[400ms]  rounded-lg px-3 py-1.5 md:px-5 md:py-2.5 text-center  ${
                      activeTab === index
                        ? 'text-black bg-[#F8F7FD] font-[500]'
                        : 'text-white bg-[#f8f7fd33] font-[500]'
                    }`}
                    style={{
                      boxShadow: ' 0px 2px 28px 5px #5D3EFF4D',
                    }}>
                    {buttonText ? tab.name : tab.secondaryName}
                  </button>
                ))}
              </div>
            </MotionInView>
          </div>
          <div className='md:col-span-2 relative overflow-hidden'>
            {tabs.map((tab, index) => (
              <div
                key={index}
                ref={(el: any) => (sectionsRef.current[index] = el)}
                className={`p-4 mb-10 md:mb-20 ${
                  sectionsRef.current[index] && 'pt-32 md:pt-28'
                }`}>
                <MotionInView variants={varFadeInRight}>
                  <h2 className=' text-[24px] md:text-[54px] font-[600] leading-tight mb-2'>
                    {tab.content.title.split('<span>').map((part, i) => (
                      <React.Fragment key={i}>
                        {i > 0 ? (
                          <span className='text-primary'>
                            {part.split('</span>')[0]}
                          </span>
                        ) : (
                          part.split('</span>')[0]
                        )}
                        {part.split('</span>').length > 1 &&
                          part.split('</span>')[1]}
                      </React.Fragment>
                    ))}
                  </h2>
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <p className='text-[10px] md:text-[18px]  font-[500] mb-10'>
                    {tab.content.details}
                  </p>
                </MotionInView>
                <MotionInView variants={varFadeInRight}>
                  <button
                    type='submit'
                    style={{
                      boxShadow: '0px 4px 25px 0px #5C5192',
                    }}
                    onClick={() => router.push('/auth/signup')}
                    className=' min-w-auto md:min-w-[270px] text-[14px] md:text-[24px] text-white pb-3 md:pb-5  pt-2 md:pt-4 rounded-100vw bg-primary hover:bg-[#22202E] px-6 md:px-14'>
                    Create your page now
                  </button>
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <div
                    className={`relative h-[200px] md:h-[500px] w-full mt-6 md:mt-20 transform
                        ${
                          !buttonText && tab.content.isSm
                            ? "'translate-x-[0%]"
                            : tab.content.isShare
                            ? 'translate-x-[0%] md:translate-x-[2%]'
                            : 'translate-x-[15%] md:translate-x-[20%]'
                        }`}>
                    <Image
                      src={
                        buttonText
                          ? tab.content.img
                          : (tab.content.image1 as any)
                      }
                      sizes='100vw'
                      alt='setup'
                      placeholder='blur'
                      blurDataURL={tab.content.img}
                      fill
                      priority
                      objectFit='contain'
                    />
                  </div>
                </MotionInView>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
