import InstagramIcon from '../../../public/logos/instagram.svg';
import SpotifyIcon from '../../../public/logos/spotify.svg';
import TwitterIcon from '../../../public/logos/x.svg';
import GeniusIcon from '../../../public/logos/genius.svg';
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ForwardIcon,
  BackwardIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRelativeTime } from '@hooks/use-relative-time';
import * as Progress from '@radix-ui/react-progress';
import Image from 'next/image';
import Link from 'next/link';
import { NextLayoutPage } from 'next/types';
import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { BsTriangleFill } from 'react-icons/bs';
import { useMusicPlayer } from 'providers/MusicPlayerProvider';
import HoverCardDemo from '../shared/HoverCard';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import UnPreviewIcon from '../../../public/assets/unpreview.png';

const Banner = ({ raceName }: { raceName: string }) => {
  return (
    <div
      style={{
        // background:
        //   'linear-gradient(129.85deg, #fdba74 14.55%, #eab308 93.91%)',
        padding: '0.3rem',
        zIndex: 0,
      }}
      className='mb-2 font-bold text-lg flex items-center  bg-gradient-to-br from-[#927FF5] to-[#6587FD] justify-center text-white relative rounded-md'>
      <Marquee
        gradient={false}
        speed={40}>
        <div className='flex gap-16'>
          <div className='ml-16'>Send a beat to {raceName || 'the artist'}!</div>
          <div>Send a beat to {raceName || 'the artist'}!</div>
          <div>Send a beat to {raceName || 'the artist'}!</div>
          <div>Send a beat to {raceName || 'the artist'}!</div>
          <div>Send a beat to {raceName || 'the artist'}!</div>
        </div>
      </Marquee>
    </div>
  );
};

type raceSocials = {
  imageUrl: string | null;
  spotifyUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  geniusUrl: string | null;
};

type HeaderProps = {
  raceName?: string;
  raceDescription?: string | null;
  raceSocials?: raceSocials | null;
  id?: string;
  bio?: string | null;
  imageUrl?: string | null;
  styles?: string | null;
};

const Header = (props: HeaderProps) => {
  const { getInspirationTracks, getCurrentTrack, isPlaying, playPause } = useMusicPlayer();
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className='flex flex-col w-full gap-2 max-h-96 overflow-y-hidden'>
      <div className=' flex-1 relative bg-gradient-to-br from-[#927FF5] to-[#6587FD] rounded-[0.75rem] py-3 px-5  overflow-hidden'>
        <div className='flex flex-col relative z-[2] mt-10 justify-evenly'>
          <h1 className='text-3xl font-bold'>
            {props.raceName || ''}
          </h1>
          {props.imageUrl && (
            <div className='flex absolute h-[300px] w-[300px] md:w-[500px] md:h-[500px] rounded-full -top-[50px] -right-[150px] md:-top-[100px] md:-right-[200px] overflow-hidden z-0'>
              <Image
                src={props.imageUrl}
                width={500}
                height={500}
                className='object-cover opacity-25'
                alt={props.raceName || 'artist image'}
                priority
              />
            </div>
          )}
          {props.bio && (
            <p className='mt-1 text-lg whitespace-normal'>
              {props.bio}
            </p>
          )}
          <div className="w-auto h-auto mt-2">
            <button className="text-gray-100 bg-black hover:bg-black/60 rounded-3xl text-sm px-2 md:px-5 py-2.5 text-center mb-2 w-auto self-center">
              + Submit a track
            </button>
          </div>
        </div>
      </div>
      <div className='bg-[#22202E]/50 border border-1 border-gray-700 rounded-[0.75rem] px-2 py-3'>
        <div className='text-base font-bold flex flex-row justify-between items-center'>
          <div>About {props.raceName}</div>
          <div className='flex flex-row gap-4 items-center'>
            {props.raceSocials?.spotifyUrl && (
              <a className='icons cursor-pointer'>
                <SpotifyIcon className='fill-gray-100 scale-50 hover:fill-green-500' />
              </a>
            )}
            {props.raceSocials?.twitterUrl && (
              <a className='icons cursor-pointer'>
                <TwitterIcon className='fill-gray-100 hover:fill-blue-400' />
              </a>
            )}
            {props.raceSocials?.instagramUrl && (
              <a className='icons cursor-pointer'>
                <InstagramIcon className='fill-gray-100 hover:fill-purple-600' />
              </a>
            )}
            {props.raceSocials?.geniusUrl && (
              <a className='icons cursor-pointer'>
                <GeniusIcon className='fill-gray-100 hover:fill-yellow-300' />
              </a>
            )}
          </div>
        </div>
        {props.styles && (
            <>
              <div className='text-xs mt-3 uppercase text-gray-500 '>
                The Artist is Looking for
              </div>
              <p className='mt-1 text-lg whitespace-normal'>
                {props.styles}
              </p>
            </>
          )}
        {/* <p className='text-xs mt-3 uppercase text-gray-500 font-bold'>
          The Artist&apos;s Recent Songs
        </p> */}
      </div>
      <div className='flex flex-row justify-between'>
        <div className='font-semibold text-base text-gray-100 mb-2 self-center flex gap-4 flex-wrap'>
          {' '}
          Submitted Tracks
          <div className='flex flex-row items-center justify-center gap-4'>
            <span className={'text-xs cursor-pointer text-primary'}>
              <>Newest First</>
            </span>

            <span>
              <BsTriangleFill
                className='cursor-pointer'
                size={12}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

type ProgressBarProps = {
  time?: number;
};

const ProgressBar = (props: ProgressBarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [votingEnd, setVotingEnd] = useState(
    new Date(currentDate.getTime() + 86400000)
  );

  useEffect(() => {
    if (props.time != null && props.time) {
      const nowTime = new Date(props.time);
      setCurrentDate(nowTime);
      const newEnd = new Date(nowTime.getTime() + 86400000 * 3);
      setVotingEnd(newEnd);
    }
  }, [props.time]);

  return (
    <div className='flex-col items-center px-2 py-2 md:px-4  w-full'>
      <div className=''>
        <div className='w-full mt-4 md:mt-6'>
          <Progress.Root
            value={(0 / 5) * 100}
            className='w-full bg-white/30 h-1.5 rounded-[100vw] overflow-hidden'>
            <Progress.Indicator
              className={`bg-gradient-to-br from-[#927FF5] to-[#6587FD] transition-transform h-full w-full rounded-[100vw]`}
              style={{
                transform: `translateX(-${100 - (0 / 5) * 100}%)`,
              }}
            />
          </Progress.Root>
        </div>
      </div>
    </div>
  );
};
interface PreviewProps {
  formState: {
    url: string;
    name: string;
    instagram: string;
    spotify: string;
    twitter: string;
    bio: string;
    styles: string;
    imageUrl: string;
    genius: string;
  };
  togglePreview: () => void;
}

const Preview = (props: PreviewProps) => {
  const { formState, togglePreview } = props;

  return (
    // <div className='md:px-20 lg:px-0'>
    <div className='bg-[#080617] px-2 '>
      <button className='flex justify-end md:hidden ml-auto' onClick={togglePreview}>
        <Image src={UnPreviewIcon} alt='Back to Register' width={96} height={96} />
      </button>
      <div className='relative flex w-full items-center justify-between py-3 h-16'>
        <div className='relative w-48 '>
            <Image
              src='/assets/Logo.svg'
              alt='Stems Logo'
              width={256}
              height={128}
            />
        </div>
        <div className='flex gap-3 w-full justify-end mr-4'>
          <InformationCircleIcon className='ml-1 h-6 w-6 transform font-bold transition-transform duration-150 ease-in-out group-radix-state-open:-rotate-180' />
          <div className='flex flex-col items-center w-5'>
            <span
              className={`block h-px bg-white w-5 transition-transform duration-300 ease-in-out my-1`}></span>
            <span className={`block h-px bg-white w-5 my-1`}></span>
            <span
              className={`block h-px bg-white w-5 transition-transform duration-300 ease-in-out my-1`}></span>
          </div>
        </div>
      </div>
      <Banner raceName={formState?.name} />
      <Header
        raceName={formState?.name}
        raceDescription={formState?.bio}
        raceSocials={{
          imageUrl: formState?.imageUrl,
          spotifyUrl: formState?.spotify,
          twitterUrl: formState?.twitter,
          instagramUrl: formState?.instagram,
          geniusUrl: formState?.genius,
        }}
        id={formState?.url}
        imageUrl={formState?.imageUrl}
        bio={formState?.bio}
        styles={formState?.styles}
      />
      <div className='h-[300px]' />
      <ProgressBar time={10} />
      <div className='flex justify-between items-center pt-4 pb-6'>
        <div className='text-transparent'>sddsfdsfd</div>
        <div className='flex flex-row gap-x-4 items-center justify-center'>
          <button>
            <BackwardIcon className='h-5 w-5 text-gray-100' />
          </button>
          <button>
            <PlayCircleIcon className='h-8 w-8 text-gray-100' />
          </button>
          <button>
            <ForwardIcon className='h-5 w-5 text-gray-100' />
          </button>
        </div>
        <div className='flex items-center'>
          <div className='text-sm w-12 flex justify-center'>0:00</div>
          <div className='flex items-center justify-center gap-3 flex-row mx-2'>
            <button className='md:hover:opacity-80'>
              {' '}
              <svg
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 16 16'
                height='20'
                width='20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'></path>
              </svg>{' '}
            </button>
            <button className=' items-center flex justify-center hover:opacity-50'>
              <svg
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 24 24'
                height='22'
                width='22'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Preview;
