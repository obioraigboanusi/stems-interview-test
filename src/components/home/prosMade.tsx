import {
  MotionInView,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
  varFadeInUp,
} from '../animate';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { IoIosPlay } from 'react-icons/io';
import { IoIosPause } from 'react-icons/io';
import Slider from 'react-slick';

function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <MotionInView variants={varFadeInRight}>
      <div
        className={className}
        onClick={onClick}>
        <HiOutlineArrowNarrowRight
          size={36}
          className='text-primary'
        />
      </div>
    </MotionInView>
  );
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <MotionInView variants={varFadeInLeft}>
      <div
        className={className}
        onClick={onClick}>
        <HiOutlineArrowNarrowLeft
          size={36}
          className='text-primary'
        />
      </div>
    </MotionInView>
  );
}

export default function ProMade() {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (audioUrl: string) => {
    const audio = audioRef.current;
    if (audio) {
      if (currentAudio === audioUrl && !audio.paused) {
        audio.pause();
      } else {
        audio.src = audioUrl;
        audio.play();
        setCurrentAudio(audioUrl);
      }
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      id='pro-made'
      className='relative overflow-hidden py-4 md:py-20 '>
      <div className='container mx-auto'>
        <div className='text-start mb-4 md:mb-10'>
          <MotionInView variants={varFadeInRight}>
            <h1 className='text-primary font-PPPangramSans text-[24px] md:text-[72px] font-[600]'>
              Used by pros who’ve made
            </h1>
          </MotionInView>
        </div>
        <Slider
          {...settings}
          className='pb-16'>
          {data.map((item, index) => (
            <MotionInView
              key={index}
              variants={varFadeInDown}>
              <div className='relative rounded-lg px-1 md:px-4'>
                <div className='relative h-[100px] md:h-[250px] w-full rounded-2xl mb-2'>
                  <Image
                    src={item.img}
                    alt='slider-img'
                    fill
                    sizes='100vw'
                    placeholder='blur'
                    blurDataURL={item.img}
                    className='rounded-2xl'
                    objectFit='cover'
                  />
                  <button
                    onClick={() => togglePlay(item.audio)}
                    className='p-0 absolute left-[50%] md:left-6 bottom-[50%] transform translate-x-[-50%] md:translate-x-auto translate-y-[50%] md:translate-y-auto md:bottom-6 flex items-center justify-center rounded-full bg-[#ffffff59] md:bg-white text-primary h-[44px] w-[44px] z-[100] transition-colors ease-in-out duration-[400ms] hover:text-white hover:bg-primary'>
                    {currentAudio === item.audio &&
                    !audioRef.current?.paused ? (
                      <IoIosPause size={30} />
                    ) : (
                      <IoIosPlay
                        size={30}
                        className='ml-1'
                      />
                    )}
                  </button>
                </div>
                <Link
                  href='/'
                  className='text-white font-PPPangramSans text-[14px] md:text-[33px] mb-2'>
                  {item.title}
                </Link>
                <p className='text-white font-PPPangramSans font-[400] text-[10px] md:text-[20px] '>
                  {item.detail}
                </p>
              </div>
            </MotionInView>
          ))}
        </Slider>
      </div>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop>
        <source
          src=''
          type='audio/mpeg'
        />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}

const data = [
  {
    title: 'Unforgettable',
    detail: 'French Montana',
    img: '/assets/pros.png',
    audio: '/audio/Unforgettable - French Montana.mp3',
  },
  {
    title: 'Fallin 4 U',
    detail: 'Nicki Minaj',
    img: '/assets/pros1.png',
    audio: '/audio/Nicki Minaj - Fallin 4 U.mp3',
  },
  {
    title: 'Times Like This',
    detail: 'Meek Mill',
    img: '/assets/pros2.png',
    audio: '/audio/Times Like This.mp3',
  },
  {
    title: 'Rewind',
    detail: 'Rema',
    img: '/assets/Rema Album.png',
    audio: '/audio/Rema - Rewind.mp3',
  },
  {
    title: 'Like Me',
    detail: 'Pop Smoke',
    img: '/assets/Like Me Album Cover.png',
    audio: '/audio/Pop_Smoke-Like_Me.mp3',
  },
  {
    title: 'Destined 2 Win',
    detail: 'Lil Tjay',
    img: '/assets/Destined 2 Win Album.png',
    audio: '/audio/Destined 2 Win - Lil Tjay.mp3',
  },
  {
    title: 'Nobody Special',
    detail: 'Hotboii, Future',
    img: '/assets/Nobody Special Album.png',
    audio: '/audio/Nobody Special (with Future)-Hotboii, Future.mp3',
  },
  {
    title: 'Care For You',
    detail: 'Tory Lanez',
    img: '/assets/Care For You Album.png',
    audio: '/audio/Care For You - Tory Lanez.mp3',
  },
  // {
  //   title: 'Unforgettable',
  //   detail: 'French Montana',
  //   img: '/assets/pros.png',
  //   audio: '/audio/Unforgettable - French Montana.mp3',
  // },
  // {
  //   title: 'Fallin 4 U',
  //   detail: 'Nicki Minaj',
  //   img: '/assets/pros1.png',
  //   audio: '/audio/Nicki Minaj - Fallin 4 U.mp3',
  // },
  // {
  //   title: 'Times Like This',
  //   detail: 'Meek Mill',
  //   img: '/assets/pros2.png',
  //   audio: '/audio/Times Like This.mp3',
  // },
  // {
  //   title: 'Rewind',
  //   detail: 'Rema',
  //   img: '/assets/pros3.png',
  //   audio: '/audio/Rema - Rewind.mp3',
  // },
];
