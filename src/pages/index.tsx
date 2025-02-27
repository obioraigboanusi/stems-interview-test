// import InstagramIcon from '../../public/logos/instagram.svg';
// import SpotifyIcon from '../../public/logos/spotify.svg';
// import TwitterIcon from '../../public/logos/twitter.svg';
// import {
//   PlayCircleIcon,
//   PauseCircleIcon,
//   HeartIcon,
// } from '@heroicons/react/20/solid';
// import { useRelativeTime } from '@hooks/use-relative-time';
// import useWindowSize from '@hooks/use-window-size';
// import { Inter } from '@next/font/google';
// import * as Progress from '@radix-ui/react-progress';
// import { appRouter } from '@server/_app';
// import { createContext } from '@server/context';
// // import { createProxySSGHelpers } from '@trpc/react-query/ssg';
// import { getUser } from '@utils/firebaseAdmin';
// import prisma from '@utils/prisma';
// import { RouterInput, RouterOutput, trpc } from '@utils/trpc';
// import { UserRecord } from 'firebase-admin/auth';
// import truncate from 'lodash/truncate';
// import dynamic from 'next/dynamic';
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import {
//   GetServerSideProps,
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
//   NextApiRequest,
//   NextApiResponse,
//   NextLayoutPage,
//   NextPage,
// } from 'next/types';
// import nookies from 'nookies';
// import {
//   MusicPlayerProvider,
//   useMusicPlayer,
// } from 'providers/MusicPlayerProvider';
// import { useEffect, useState } from 'react';
// import Marquee from 'react-fast-marquee';
// // import { NextLayoutPage } from 'next';
// import Layout from '~/components/layout';
// import MusicPlayer from '~/components/player';
// import styles from '~/styles/Home.module.css';

// const MusicPlayerComponent = dynamic(() => import('~/components/player'), {
//   ssr: false,
// });

// function fmtMSS(s: number) {
//   return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
// }

// function getDuration(src: string): Promise<number> {
//   return new Promise(function (resolve) {
//     const audioEl = new Audio();
//     audioEl.src = src;

//     const preloadDuration = () => {
//       if (window.trackDurations) {
//         window.trackDurations[src] = Math.floor(audioEl.duration);
//       }
//       audioEl.removeEventListener('loadedmetadata', preloadDuration);
//       resolve(Math.floor(audioEl.duration));
//     };

//     audioEl.addEventListener('loadedmetadata', preloadDuration);
//   });
// }

// const Banner = () => {
//   return (
//     <div
//       style={{
//         background:
//           'linear-gradient(129.85deg, #fdba74 14.55%, #eab308 93.91%)',
//         padding: '0.3rem',
//         zIndex: 0,
//       }}
//       className='mb-2 font-bold text-lg flex items-center justify-center text-white relative rounded-md'
//     >
//       <Marquee gradient={false} speed={40}>
//         <div className='flex gap-16'>
//           <div className='ml-16'>PREVIEW RACE: Stay tuned for race debut!</div>
//           <div>PREVIEW RACE: Stay tuned for race debut!</div>
//           <div>PREVIEW RACE: Stay tuned for race debut!</div>
//           <div>PREVIEW RACE: Stay tuned for race debut!</div>
//           <div>PREVIEW RACE: Stay tuned for race debut!</div>
//         </div>
//       </Marquee>
//     </div>
//   );
// };

// type raceSocials = {
//   imageUrl: string | null;
//   spotifyUrl: string | null;
//   twitterUrl: string | null;
//   instagramUrl: string | null;
// };

// type HeaderProps = {
//   raceName?: string;
//   raceDescription?: string | null;
//   raceSocials?: raceSocials | null;
// };

// const Header = (props: HeaderProps) => {
//   const { getInspirationTracks, getCurrentTrack, isPlaying, playPause } =
//     useMusicPlayer();

//   return (
//     <div className='flex flex-col w-full md:flex-row max-h-96 overflow-y-hidden'>
//       <div className='hidden flex-1 relative bg-gradient-to-br from-[#927FF5] to-[#6587FD] rounded-[0.75rem] py-3 px-5 md:px-6 md:py-8 overflow-hidden md:flex justify-between'>
//         <div className='flex flex-col relative z-[2] justify-evenly'>
//           <h1 className='text-3xl font-bold'>
//             {props.raceName ?? ''}
//             <br />
//             Sound Race
//           </h1>
//         </div>
//       </div>
//       <div className='bg-[#22202E]/50 border border-1 border-gray-700 md:ml-2 rounded-[0.75rem] px-2 py-3 md:px-3 md:py-4'>
//         <div className='text-base font-bold flex flex-row justify-between items-center'>
//           <div>About {props.raceName}</div>
//           <div className='flex flex-row gap-4 items-center'>
//             {props.raceSocials?.spotifyUrl && (
//               <a
//                 href={props.raceSocials?.spotifyUrl}
//                 target='_blank'
//                 className='icons'
//                 rel='noreferrer'
//               >
//                 <SpotifyIcon className='fill-gray-100 scale-50 hover:fill-green-500' />
//               </a>
//             )}
//             {props.raceSocials?.twitterUrl && (
//               <a
//                 href={props.raceSocials?.twitterUrl}
//                 target='_blank'
//                 className='icons'
//                 rel='noreferrer'
//               >
//                 <TwitterIcon className='fill-gray-100 hover:fill-blue-400' />
//               </a>
//             )}
//             {props.raceSocials?.instagramUrl && (
//               <a
//                 href={props.raceSocials?.instagramUrl}
//                 target='_blank'
//                 rel='noreferrer'
//               >
//                 <InstagramIcon className='fill-gray-100 hover:fill-purple-600' />
//               </a>
//             )}
//           </div>
//         </div>
//         <div className='text-xs mt-3 uppercase text-gray-500 '>
//           The Artist is Looking for
//         </div>
//         <p className='text-sm mt-1 w-[400px] max-w-full'>
//           {props.raceDescription}
//         </p>
//         <p className='text-xs mt-3 uppercase text-gray-500 font-bold'>
//           The Artist&apos;s Recent Songs
//         </p>
//         <div className='mt-0 flex flex-col text-sm border-t border-t-white/10'>
//           {getInspirationTracks()?.map((track, i) => {
//             return (
//               <button
//                 key={track.id}
//                 className='flex items-center px-2 py-2 md:hover:opacity-80 rounded-md'
//                 style={{
//                   background:
//                     track.id === getCurrentTrack()?.id
//                       ? 'linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)'
//                       : 'transparent',
//                 }}
//                 onClick={() => {
//                   playPause(track.id);
//                 }}
//               >
//                 {track.id === getCurrentTrack()?.id && isPlaying() ? (
//                   <PauseCircleIcon className='h-8 w-8 md:h-6 md:w-6' />
//                 ) : (
//                   <PlayCircleIcon className='h-8 w-8 md:h-6 md:w-6' />
//                 )}
//                 <p className='ml-2 text-xs md:text-sm'>{track.name}</p>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// type ProgressBarProps = {
//   time?: number;
// };

// const ProgressBar = (props: ProgressBarProps) => {
//   const { getLikedTracks } = useMusicPlayer();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [votingEnd, setVotingEnd] = useState(
//     new Date(currentDate.getTime() + 86400000)
//   );

//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     if (props.time != null && props.time) {
//       const nowTime = new Date(props.time);
//       setCurrentDate(nowTime);
//       const newEnd = new Date(nowTime.getTime() + 86400000 * 3);
//       setVotingEnd(newEnd);
//     }
//   }, [props.time]);

//   useEffect(() => {
//     setProgress(getLikedTracks().length * 100);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className='flex-col items-center px-2 py-6 md:px-4 md:py-8 w-full'>
//       <div className=''>
//         <div className='md:flex justify-between'>
//           <p className='font-semibold hidden md:flex items-center justify-center mt-4'>
//             Votes left: {5 - getLikedTracks().length}
//           </p>
//           <div className='flex-col text-xs'>
//             <div className='flex md:justify-end justify-between'>
//               <span className='mr-1 font-semibold'>Submissions end: </span>
//               <span className='text-gray-500'>
//                 {useRelativeTime(currentDate)}
//               </span>
//             </div>
//             <div className='flex md:justify-end justify-between md:mt-2'>
//               <span className='mr-1 font-semibold'>Voting ends: </span>
//               <span className='text-gray-500'>
//                 {useRelativeTime(votingEnd)}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className='w-full mt-4 md:mt-6'>
//           <Progress.Root
//             value={(getLikedTracks().length / 5) * 100}
//             className='w-full bg-white/30 h-1.5 rounded-[100vw] overflow-hidden'
//           >
//             <Progress.Indicator
//               className={`bg-gradient-to-br from-[#927FF5] to-[#6587FD] transition-transform h-full w-full rounded-[100vw]`}
//               style={{
//                 transform: `translateX(-${
//                   100 - (getLikedTracks().length / 5) * 100
//                 }%)`,
//               }}
//             />
//           </Progress.Root>
//         </div>
//         <p className='font-semibold flex items-center justify-center mt-4 md:hidden'>
//           Votes left: {5 - (getLikedTracks().length / 5) * 100}
//         </p>
//       </div>
//     </div>
//   );
// };

// type TrackProps = {
//   trackId: string;
//   title: string;
//   liked: boolean;
//   audioSrc: string;
// };

// const Track = ({ trackId, title, liked, audioSrc }: TrackProps) => {
//   const [duration, setDuration] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const {
//     getInspirationTracks,
//     getCurrentTrack,
//     isPlaying,
//     playPause,
//     setTrack,
//     toggleLike,
//   } = useMusicPlayer();
//   const { isMobile } = useWindowSize();

//   useEffect(() => {
//     if (audioSrc && window.trackDurations) {
//       if (!window.trackDurations[audioSrc]) {
//         getDuration(audioSrc).then((duration) => {
//           setDuration(Number(duration));
//         });
//       } else {
//         setDuration(window.trackDurations[audioSrc]);
//       }
//     }
//   }, [duration, audioSrc]);

//   return (
//     <div className='border-b-2 border-gray-800/80 cursor-pointer'>
//       <div
//         className='flex items-center px-2 py-2 w-full rounded-md hover:bg-vibrant/10'
//         style={{
//           background:
//             trackId === getCurrentTrack()?.id
//               ? 'linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)'
//               : '',
//           // backgroundSize: '400% 400%',
//           animation:
//             trackId === getCurrentTrack()?.id && isPlaying()
//               ? 'gradient 10s ease infinite'
//               : '',
//         }}
//         onClick={() => setTrack(trackId)}
//       >
//         <div className='flex items-center w-full'>
//           <button
//             className='cursor-pointer rounded-full md:hover:opacity-80'
//             onClick={() => playPause(trackId)}
//           >
//             {isPlaying() && trackId === getCurrentTrack()?.id ? (
//               <PauseCircleIcon className='w-10 h-10 md:w-8 md:h-8' />
//             ) : (
//               <PlayCircleIcon className='w-10 h-10 md:w-8 md:h-8' />
//             )}
//           </button>
//           <p className='ml-2 md:ml-4 text-xs md:text-sm select-none'>
//             {truncate(title, { length: isMobile ? 20 : 40 })}
//           </p>
//         </div>
//         <div className='flex items-center gap-4'>
//           <div className='opacity-60 select-none text-xs md:text-sm'>
//             {fmtMSS(duration)}
//           </div>
//           <button
//             className='md:hover:opacity-80'
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsOpen(true);
//               toggleLike(trackId);
//             }}
//           >
//             <HeartIcon
//               className={`${
//                 liked ? 'text-[#5D3EFF]' : '#fff'
//               } "w-5 h-5 md:w-6 md:h-6"`}
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Tracks = ({ raceId }: { raceId: string }) => {
//   const { getLikedTracks, getUnInteractedTracks } = useMusicPlayer();
//   return (
//     <div className='px-1 py-2 w-full'>
//       <div className='flex flex-row justify-between'>
//         <div className='font-semibold text-base text-gray-100 mb-2 self-center'>
//           {' '}
//           Submitted Tracks
//         </div>
//         <div className='w-auto self-center h-auto'>
//           <Link href={`/submit-beat?raceId=${raceId}`}>
//             <button className='text-gray-100 bg-primary hover:bg-primary/60 rounded-3xl text-sm px-5 py-2.5 text-center mb-2 w-auto self-center'>
//               Submit a track
//             </button>
//           </Link>
//         </div>
//       </div>
//       {getLikedTracks()?.map((track) => {
//         return (
//           <Track
//             audioSrc={track.url}
//             liked={track.liked}
//             title={track.name}
//             trackId={track.id}
//             key={`track-${track.id}`}
//           />
//         );
//       })}
//       {getUnInteractedTracks()?.map((track) => {
//         return (
//           <Track
//             audioSrc={track.url}
//             liked={track.liked}
//             title={track.name}
//             trackId={track.id}
//             key={`track-${track.id}`}
//           />
//         );
//       })}
//     </div>
//   );
// };

// const Home: NextLayoutPage = (
//   props: InferGetServerSidePropsType<typeof getServerSideProps>
// ) => {
//   const { data: race } = trpc.race.getRace.useQuery(props.id);
//   const [rendered, setRendered] = useState(false);
//   const raceId = props.id as string;

//   useEffect(() => {
//     window.tracks = {};
//     window.trackPeaks = {};
//     window.trackDurations = {};
//     setRendered(true);
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>Stems - Music Creating Platform</title>
//         <meta property='og:title' content={race?.name} />
//         <meta
//           name='description'
//           content='Send a beat directly to the artist!'
//         />
//         <meta name='viewport' content='width=device-width, initial-scale=1' />
//         <meta
//           property='og:image'
//           content={
//             race?.RaceSocials?.imageUrl ||
//             'https://0xstems.xyz/assets/og-image.png'
//           }
//         />
//         <link rel='icon' href='/favicon.ico' />
//       </Head>
//       <MusicPlayerProvider id={props.id}>
//         <>
//           <Banner />
//           <Header
//             raceName={race?.name}
//             raceDescription={race?.description}
//             raceSocials={race?.RaceSocials}
//           />
//           <ProgressBar time={race?.launches_on} />
//           <Tracks raceId={raceId} />
//           {/* <MusicPlayer isRaceExpired={false} /> */}
//           <MusicPlayerComponent isRaceExpired={false} />
//         </>
//       </MusicPlayerProvider>
//     </>
//   );
// };

// export default Home;

// Home.getLayout = (page) => <Layout>{page}</Layout>;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { req } = context;
//   const user = await getUser(req as NextApiRequest);

//   const trpcContext = {
//     user,
//     prisma,
//     session: '',
//   };

//   const id = '755ac230-85f0-468c-9c0d-251160b917b6';

//   const race = await appRouter.createCaller(trpcContext).race.getRace(id);

//   return {
//     props: {
//       trpcState: {
//         queries: [
//           {
//             queryKey: ['race.getRace', { id }],
//             state: { data: race },
//           },
//         ],
//       },
//       id,
//     },
//   };
// };
//SECOND TRY
// import LandingPage2 from './landingpage-2';

// export default LandingPage2;

import BeatsToday from '~/components/home/cta';
import Hero from '~/components/home/hero';
import ProMade from '~/components/home/prosMade';
import Tabs from '~/components/home/tabs';
import OurCustomers from '~/components/home/testimonial';
import Navbar from '~/layouts/appbar';
import Footer from '~/layouts/footer';

export default function Home() {
  return (
    <div className='bg-[#181524]'>
      <Navbar />
      <Hero />
      <ProMade />
      <Tabs />
      <OurCustomers />
      <BeatsToday />
      <Footer />
    </div>
  );
}