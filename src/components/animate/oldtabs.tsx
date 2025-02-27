// components/Tabs.js

import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

const tabs = [
  {
    name: 'Quick Setup',
    content: {
      title: '<span>Create</span> your page in minutes',
      details:
        'Showcase your vibe, connect your socials, and specify your needs.',
      img: '/assets/setup.png',
    },
  },
  {
    name: 'Easy Sharing',
    content: {
      title: '<span>Share</span> it to receive submissions',
      isShare: true,
      details:
        'Broadcast your URL across all platforms that collaborators can find you on.',
      img: '/assets/sharing.png',
    },
  },
  {
    name: 'Efficient Review',
    content: {
      title: '<span>Review</span> and <span>save</span> favorites',
      details:
        'Stop searching across different platforms. Easily pin your favorite content for quick reference.',
      img: '/assets/efficient.png',
    },
  },
  {
    name: 'Team Access',
    content: {
      title: 'Grant <span>access</span> to your team',
      details:
        'Set custom permissions to outsource your A&R efforts to your team and fans.',
      img: '/assets/team.png',
    },
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='tabs-section my-40 relative overflow-hidden'>
      <div className='container mx-auto relative z-50'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='sticky flex flex-col items-center justify-start gap-4'>
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                type='button'
                className={`text-[24px] font-PPPangramSans  hover:font-[500] min-w-[223px] hover:bg-[#F8F7FD] hover:text-black transition-colors ease-in-out duration-[400ms]  shadow-2xl shadow-[#5d3eff4d]  rounded-lg px-5 py-2.5 text-center me-2 mb-2 ${
                  activeTab === index
                    ? 'text-black bg-[#F8F7FD] font-[500]'
                    : 'text-white bg-[#f8f7fd33] font-[500]'
                }`}>
                {tab.name}
              </button>
            ))}
          </div>
          <div className='col-span-2 relative'>
            <div className='p-4'>
              {/* <p>{tabs[activeTab].content}</p> */}
              <h2 className='font-PPPangramSans text-[54px]  font-[600] leading-tight mb-2'>
                {tabs[activeTab].content.title
                  .split('<span>')
                  .map((part: any, index) => (
                    <React.Fragment key={index}>
                      {index > 0 ? (
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
              <p className='text-[18px] font-PPPangramSans font-[500] mb-10'>
                {tabs[activeTab].content.details}
              </p>
              <button
                type='submit'
                style={{
                  boxShadow: '0px 4px 25px 0px #5C5192',
                }}
                className='font-PPPangramSans min-w-[270px]  text-[24px] text-white py-4 rounded-full bg-gradient-primary hover:bg-[#22202E] px-14'>
                Create your page now
              </button>
            </div>
            <div
              className='relative h-[500px] w-full mt-20'
              style={{
                transform: tabs[activeTab].content.isShare
                  ? 'unset'
                  : 'translateX(40%)',
              }}>
              <Image
                src={tabs[activeTab].content.img}
                alt='setup'
                placeholder='blur'
                blurDataURL={tabs[activeTab].content.img}
                fill
                priority
                objectFit='contain'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
