"use client"
import { trpc } from '../../utils/trpc';
// import InstagramIcon from "../../public/logos/instagram.svg";
// import SpotifyIcon from "../../public/logos/spotify.svg";
// import TwitterIcon from "../../public/logos/twitter.svg";
// import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/20/solid";
// import useWindowSize from "@hooks/use-window-size";
// import * as Progress from "@radix-ui/react-progress";
// import * as TabsPrimitive from "@radix-ui/react-tabs";
// import { appRouter } from "@server/_app";
// import { createProxySSGHelpers } from "@trpc/react-query/ssg";
// import { useFirebaseAuth } from "@utils/firebase";
// import { getUser } from "@utils/firebaseAdmin";
// import prisma from "@utils/prisma";
// import truncate from "lodash/truncate";
// import dynamic from "next/dynamic";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import {
//   GetServerSideProps,
//   InferGetServerSidePropsType,
//   NextApiRequest,
//   NextLayoutPage,
// } from "next/types";
// import {
//   MusicPlayerProvider,
//   SortBy,
//   SortDirection,
//   useMusicPlayer,
// } from "providers/MusicPlayerProvider";
// import { useEffect, useState } from "react";
// import Marquee from "react-fast-marquee";
// import {
//   BsXCircle,
//   BsArrowUpCircle,
//   BsThreeDots,
//   BsTriangleFill,
// } from "react-icons/bs";
// import { OfferPopup } from "~/components/OfferPopup";
// import Layout from "~/components/layout";
// import HoverCardDemo from "~/components/shared/HoverCard";
// import { CopyLink, WebShare } from "~/components/shared/share";
// import Header from "~/components/soundRace/Header";

// const MusicPlayerComponent = dynamic(() => import("~/components/testplayer"), {
//   ssr: false,
// });

// function fmtMSS(s: number) {
//   return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
// }

// function getDuration(src: string): Promise<number> {
//   return new Promise(function (resolve) {
//     const audioEl = new Audio();
//     audioEl.src = src;

//     const preloadDuration = () => {
//       if (window.trackDurations) {
//         window.trackDurations[src] = Math.floor(audioEl.duration);
//       }
//       audioEl.removeEventListener("loadedmetadata", preloadDuration);
//       resolve(Math.floor(audioEl.duration));
//     };

//     audioEl.addEventListener("loadedmetadata", preloadDuration);
//   });
// }

// const Banner = ({ artistName }: { artistName?: string }) => {
//   return (
//     <div
//       style={{
//         background:
//           "linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)",
//         padding: "0.3rem",
//         zIndex: 0,
//       }}
//       className="mb-2 font-bold text-lg flex items-center justify-center text-white relative rounded-md"
//     >
//       <Marquee gradient={false} speed={40}>
//         <div className="flex gap-16">
//           <div className="ml-16"> Send a beat directly to the artist! </div>
//           <div> Send a beat directly to the artist! </div>
//           <div> Send a beat directly to the artist! </div>
//           <div> Send a beat directly to the artist! </div>
//           <div> Send a beat directly to the artist! </div>
//         </div>
//       </Marquee>
//     </div>
//   );
// };

// type artistSubmissionsSocials = {
//   imageUrl: string | null;
//   spotifyUrl: string | null;
//   twitterUrl: string | null;
//   instagramUrl: string | null;
// };

// type ProgressBarProps = {
//   time?: string | null;
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
//     <div className="flex-col items-center px-2 py-6 md:px-4 md:py-8 w-full">
//       <div className="">
//         <div className="w-full mt-4 md:mt-6">
//           <Progress.Root
//             value={progress}
//             className="w-full bg-white/30 h-1.5 rounded-[100vw] overflow-hidden"
//           >
//             <Progress.Indicator
//               className={`bg-gradient-to-br from-[#927FF5] to-[#6587FD] transition-transform h-full w-full rounded-[100vw]`}
//               style={{ transform: `translateX(-${100 - progress}%)` }}
//             />
//           </Progress.Root>
//         </div>
//         <p className="font-semibold flex items-center justify-center mt-4 md:hidden">
//           Votes left: {5 - getLikedTracks().length}
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
//   artist?: string;
// };

// const Track = ({ trackId, title, liked, audioSrc, artist }: TrackProps) => {
//   const [duration, setDuration] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const {
//     getCurrentTrack,
//     isPlaying,
//     playPause,
//     setTrack,
//     toggleLike,
//     play,
//     shareTrack,
//   } = useMusicPlayer();
//   const { user } = useFirebaseAuth();
//   const { isMobile } = useWindowSize();
//   const router = useRouter();
//   const trackIdFromLink = router.query?.trackid;
//   useEffect(() => {
//     if (audioSrc && window.trackDurations) {
//       if (!window.trackDurations[audioSrc]) {
//         getDuration(audioSrc).then((duration) => {
//           setDuration(Number(duration));
//         });
//       } else {
//         setDuration(window.trackDurations[audioSrc]);
//       }
//       if (trackIdFromLink === trackId) {
//         setTrack(trackId);
//         play();
//       }
//     }
//   }, [duration, audioSrc]);

//   return (
//     <div className="border-b-2 border-gray-800/80 cursor-pointer">
//       <div
//         className="flex items-center px-2 py-2 w-full rounded-md hover:bg-vibrant/10"
//         style={{
//           background:
//             trackId === getCurrentTrack()?.id
//               ? "linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)"
//               : "",
//           // backgroundSize: '400% 400%',
//           animation:
//             trackId === getCurrentTrack()?.id && isPlaying()
//               ? "gradient 10s ease infinite"
//               : "",
//         }}
//         onClick={() => setTrack(trackId)}
//       >
//         <div className="flex items-center w-full">
//           <button
//             className="cursor-pointer rounded-full md:hover:opacity-80"
//             onClick={() => playPause(trackId)}
//           >
//             {isPlaying() && trackId === getCurrentTrack()?.id ? (
//               <PauseCircleIcon className="w-12 h-12 md:w-10 md:h-10" />
//             ) : (
//               <PlayCircleIcon className="w-12 h-12 md:w-10 md:h-10" />
//             )}
//           </button>
//           <div className=" ml-2 md:ml-4">
//             <p className="text-lg md:text-sm select-none">
//               {truncate(title, { length: isMobile ? 20 : 40 })}
//             </p>

//             <small className="text-xs">{artist}</small>
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-4">
//           <div className="opacity-60 select-none text-xs md:text-sm">
//             {fmtMSS(duration)}
//           </div>
//           <button
//             className="md:hover:opacity-80"
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsOpen(true);
//               toggleLike(trackId);
//             }}
//           >
//             {" "}
//             {!liked || !user ? (
//               <BsArrowUpCircle size={20} />
//             ) : (
//               <BsXCircle size={20} />
//             )}{" "}
//           </button>

//           <HoverCardDemo
//             message="options"
//             body={
//               <div className="flex gap-2">
//                 {" "}
//                 <OfferPopup trackId={trackId} shareTrack={shareTrack} />
//                 {isMobile ? (
//                   <WebShare size={20} trackId={trackId} />
//                 ) : (
//                   <div onClick={() => shareTrack(trackId)} className="flex items-center justify-center">
//                     {" "}
//                     <CopyLink trackId={trackId} />
//                   </div>
//                 )}
//               </div>
//             }
//           >
//             <div>
//               <BsThreeDots />
//             </div>
//           </HoverCardDemo>
//           {
//             //liked ? <BsXCircle /> : <BsArrowUpCircle />
//             /* <HeartIcon
//               className={`${
//                 liked ? "text-[#5D3EFF]" : "#fff"
//               } "w-5 h-5 md:w-6 md:h-6"`}
//             /> */
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// const Tracks = ({ artistSubmissionId }: { artistSubmissionId: string }) => {
//   const {
//     getLikedTracks,
//     getUnInteractedTracks,
//     getDemoTracks,
//     sortBy,
//     setSortBy,
//   } = useMusicPlayer();

//   const [isDemo, setIsDemo] = useState(false);
//   return (
//     <div className="px-1 py-2 w-full my-2 pb-28 md:pb-16">
//       <div className="flex flex-row justify-between flex-wrap">
//         <TabsPrimitive.Root defaultValue={"submissions"}>
//           <TabsPrimitive.List aria-label="filters" className="font-bold">
//             <TabsPrimitive.Trigger
//               value="submissions"
//               className="px-2 mb-2 tab md:hover:opacity-80 text-gray-400"
//               onClick={() => setIsDemo(false)}
//             >
//               Submissions
//             </TabsPrimitive.Trigger>
//             {/* 
//             <TabsPrimitive.Trigger
//               value="demos"
//               className="px-2 py-2 tab md:hover:opacity-80 text-gray-400"
//               onClick={() => setIsDemo(true)}
//             >
//               Unreleased
//             </TabsPrimitive.Trigger> */}
//           </TabsPrimitive.List>
//         </TabsPrimitive.Root>

//         <div className="flex flex-row items-center justify-center gap-4">
//           {sortBy.base != SortBy.points ||
//           sortBy.direction == SortDirection.desc ? (
//             <span
//               className={
//                 sortBy.base == SortBy.points
//                   ? "text-xs cursor-pointer text-primary"
//                   : "text-xs cursor-pointer"
//               }
//               onClick={() => {
//                 if (sortBy.base == SortBy.points)
//                   setSortBy({
//                     base: SortBy.points,
//                     direction: SortDirection.asc,
//                   });
//                 else
//                   setSortBy({
//                     base: SortBy.points,
//                     direction: SortDirection.desc,
//                   });
//               }}
//             >
//               Most Popular
//             </span>
//           ) : (
//             <span
//               className={"text-xs cursor-pointer text-primary"}
//               onClick={() =>
//                 setSortBy({
//                   base: SortBy.points,
//                   direction: SortDirection.desc,
//                 })
//               }
//             >
//               Least Popular
//             </span>
//           )}

//           {sortBy.base != SortBy.uploaded_at ||
//           sortBy.direction == SortDirection.desc ? (
//             <span
//               className={
//                 sortBy.base == SortBy.uploaded_at
//                   ? "text-xs cursor-pointer text-primary"
//                   : "text-xs cursor-pointer"
//               }
//               onClick={() => {
//                 if (sortBy.base == SortBy.uploaded_at)
//                   setSortBy({
//                     base: SortBy.uploaded_at,
//                     direction: SortDirection.asc,
//                   });
//                 else
//                   setSortBy({
//                     base: SortBy.uploaded_at,
//                     direction: SortDirection.desc,
//                   });
//               }}
//             >
//               Newest First
//             </span>
//           ) : (
//             <span
//               className={"text-xs cursor-pointer text-primary "}
//               onClick={() =>
//                 setSortBy({
//                   base: SortBy.uploaded_at,
//                   direction: SortDirection.desc,
//                 })
//               }
//             >
//               Oldest First
//             </span>
//           )}

//           <span>
//             {sortBy.direction == SortDirection.asc ? (
//               <BsTriangleFill
//                 className=" cursor-pointer"
//                 size={12}
//                 onClick={() =>
//                   setSortBy({
//                     base: sortBy.base,
//                     direction: SortDirection.desc,
//                   })
//                 }
//               />
//             ) : (
//               <BsTriangleFill
//                 size={12}
//                 className="rotate-180 curso"
//                 onClick={() =>
//                   setSortBy({ base: sortBy.base, direction: SortDirection.asc })
//                 }
//               />
//             )}{" "}
//           </span>
//         </div>
//       </div>
//       {isDemo ? (
//         <>
//           {getDemoTracks()?.map((track) => {
//             return (
//               <Track
//                 audioSrc={track.url}
//                 liked={track.liked}
//                 title={track.name}
//                 trackId={track.id}
//                 artist={track.artist}
//                 key={`track-${track.id}`}
//               />
//             );
//           })}
//         </>
//       ) : (
//         <>
//           {getLikedTracks()?.map((track) => {
//             return (
//               <Track
//                 audioSrc={track.url}
//                 liked={track.liked}
//                 title={track.name}
//                 trackId={track.id}
//                 artist={track.artist}
//                 key={`track-${track.id}`}
//               />
//             );
//           })}
//           {getUnInteractedTracks()?.map((track) => {
//             return (
//               <Track
//                 audioSrc={track.url}
//                 liked={track.liked}
//                 title={track.name}
//                 trackId={track.id}
//                 artist={track.artist}
//                 key={`track-${track.id}`}
//               />
//             );
//           })}
//         </>
//       )}
//     </div>
//   );
// };

// const Home = (
//   props: InferGetServerSidePropsType<typeof getServerSideProps>
// ) => {
//   const { artistSubmission } = props;
//   const [rendered, setRendered] = useState(false);
//   const artistSubmissionId = props.id as string;

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
//         <meta
//           property="og:title"
//           content={`Send a beat directly to ${artistSubmission?.name} on Stems`}
//         />
//         <meta
//           name="description"
//           content={`Stems connects artists worldwide by facilitating collaboration with producers and fans. Submit your beats directly to artists and let fans vote on their favorite submissions`}
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta
//           property="og:image"
//           content={
//             artistSubmission?.ArtistSubmissionsSocials?.imageUrl ||
//             "https://0xstems.xyz/assets/og-image.png"
//           }
//         />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <MusicPlayerProvider id={props.id} isArtistSubmissions>
//         <>
//           <Banner artistName={artistSubmission?.name} />
//           <Header
//             id={artistSubmissionId}
//             name={artistSubmission?.name}
//             description={artistSubmission?.description}
//             socials={artistSubmission?.ArtistSubmissionsSocials}
//             bio={artistSubmission?.bio}
//           />
//           <Tracks ={artistSubmissionId} />
//           {/* <MusicPlayer isArtistSubmissionExpired={false} /> */}
//           <MusicPlayerComponent />
//         </>
//       </MusicPlayerProvider>
//     </>
//   );
// };

// export default Home;

// // Home.getLayout = (page) => <Layout artist>{page}</Layout>;

// // export const getServerSideProps: GetServerSideProps = async (context) => {
// //   const { req, query } = context;
// //   const user = await getUser(req as NextApiRequest);

// //   const ssg = createProxySSGHelpers({
// //     router: appRouter,
// //     ctx: {
// //       user,
// //       prisma,
// //       session: "",
// //     },
// //   });
// //   const id = query.artist || "755ac230-85f0-468c-9c0d-251160b917b6";

// //   let data = await ssg.artistSubmissions.getArtistSubmissions.fetch(
// //     id as string
// //   );

// //   return {
// //     props: {
// //       trpcState: ssg.dehydrate(),
// //       id,
// //       artistSubmission: data,
// //     },
// //   };
// // };

import supabase from "../../utils/supabase";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/20/solid";
import useWindowSize from "@hooks/use-window-size";
import * as Progress from "@radix-ui/react-progress";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { appRouter } from "@server/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useFirebaseAuth } from "@utils/firebase";
import { getUser } from "@utils/firebaseAdmin";
import prisma from "@utils/prisma";
import truncate from "lodash/truncate";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextApiRequest,
  NextLayoutPage,
} from "next/types";
import {
  MusicPlayerProvider,
  SortBy,
  SortDirection,
  useMusicPlayer,
} from "providers/MusicPlayerProvider";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  BsXCircle,
  BsArrowUpCircle,
  BsThreeDots,
  BsTriangleFill,
} from "react-icons/bs";
import { OfferPopup } from "~/components/OfferPopup";
import Layout, { SimpleLayout } from "~/components/layout";
import HoverCardDemo from "~/components/shared/HoverCard";
import { CopyLink, WebShare } from "~/components/shared/share";
import Header from "~/components/soundRace/Header";
import TestPlayerNew from "~/components/TestPlayerNew";

const MusicPlayerComponent = dynamic(() => import("~/components/testplayer"), {
  ssr: false,
});

type ArtistSubmission = {
    name: string;
    description: string;
    bio: string;
    ArtistSubmissionsSocials: {
      imageUrl: string | null;
      spotifyUrl: string | null;
      twitterUrl: string | null;
      instagramUrl: string | null;
      geniusUrl: string | null;
    };
  };

function fmtMSS(s: number) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

function getDuration(src: string): Promise<number> {
  return new Promise(function (resolve) {
    const audioEl = new Audio();
    audioEl.src = src;

    const preloadDuration = () => {
      if (window.trackDurations) {
        window.trackDurations[src] = Math.floor(audioEl.duration);
      }
      audioEl.removeEventListener("loadedmetadata", preloadDuration);
      resolve(Math.floor(audioEl.duration));
    };

    audioEl.addEventListener("loadedmetadata", preloadDuration);
  });
}

const Banner = ({ artistName }: { artistName?: string }) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)",
        padding: "0.3rem",
        zIndex: 0,
      }}
      className="mb-2 font-bold text-lg flex items-center justify-center text-white relative rounded-md"
    >
      <Marquee gradient={false} speed={40}>
        <div className="flex gap-16">
          <div className="ml-16"> Send a beat directly to {artistName || 'the artist'}! </div>
          <div> Send a beat directly to {artistName || 'the artist'}! </div>
          <div> Send a beat directly to {artistName || 'the artist'}! </div>
          <div> Send a beat directly to {artistName || 'the artist'}! </div>
          <div> Send a beat directly to {artistName || 'the artist'}! </div>
        </div>
      </Marquee>
    </div>
  );
};

type artistSubmissionsSocials = {
  imageUrl: string | null;
  spotifyUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
};

type ProgressBarProps = {
  time?: string | null;
};

const ProgressBar = (props: ProgressBarProps) => {
  const { getLikedTracks } = useMusicPlayer();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [votingEnd, setVotingEnd] = useState(
    new Date(currentDate.getTime() + 86400000)
  );

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (props.time != null && props.time) {
      const nowTime = new Date(props.time);

      setCurrentDate(nowTime);
      const newEnd = new Date(nowTime.getTime() + 86400000 * 3);
      setVotingEnd(newEnd);
    }
  }, [props.time]);

  useEffect(() => {
    setProgress(getLikedTracks().length * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-col items-center px-2 py-6 md:px-4 md:py-8 w-full">
      <div className="">
        <div className="w-full mt-4 md:mt-6">
          <Progress.Root
            value={progress}
            className="w-full bg-white/30 h-1.5 rounded-[100vw] overflow-hidden"
          >
            <Progress.Indicator
              className={`bg-gradient-to-br from-[#927FF5] to-[#6587FD] transition-transform h-full w-full rounded-[100vw]`}
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </div>
        <p className="font-semibold flex items-center justify-center mt-4 md:hidden">
          Votes left: {5 - getLikedTracks().length}
        </p>
      </div>
    </div>
  );
};

type TrackProps = {
  trackId: string;
  title: string;
  liked: boolean;
  audioSrc: string;
  artist?: string;
};

const Track = ({ trackId, title, liked, audioSrc, artist }: TrackProps) => {
  const [duration, setDuration] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const {
    getCurrentTrack,
    isPlaying,
    playPause,
    setTrack,
    toggleLike,
    play,
    shareTrack,
  } = useMusicPlayer();
  const { user } = useFirebaseAuth();
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const trackIdFromLink = router.query?.trackid;
  useEffect(() => {
    if (audioSrc && window.trackDurations) {
      if (!window.trackDurations[audioSrc]) {
        getDuration(audioSrc).then((duration) => {
          setDuration(Number(duration));
        });
      } else {
        setDuration(window.trackDurations[audioSrc]);
      }
      if (trackIdFromLink === trackId) {
        setTrack(trackId);
        play();
      }
    }
  }, [duration, audioSrc]);

  return (
    <div className="border-b-2 border-gray-800/80 cursor-pointer">
      <div
        className="flex items-center px-2 py-2 w-full rounded-md hover:bg-vibrant/10"
        style={{
          background:
            trackId === getCurrentTrack()?.id
              ? "linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)"
              : "",
          // backgroundSize: '400% 400%',
          animation:
            trackId === getCurrentTrack()?.id && isPlaying()
              ? "gradient 10s ease infinite"
              : "",
        }}
        onClick={() => setTrack(trackId)}
      >
        <div className="flex items-center w-full">
          <div
            className="cursor-pointer rounded-full md:hover:opacity-80"
            onClick={(e) => {
                e.stopPropagation();
                playPause(trackId);
            }}
          >
            {isPlaying() && trackId === getCurrentTrack()?.id ? (
              <PauseCircleIcon className="w-12 h-12 md:w-10 md:h-10" />
            ) : (
              <PlayCircleIcon className="w-12 h-12 md:w-10 md:h-10" />
            )}
          </div>
          <div className=" ml-2 md:ml-4">
            <p className="text-lg md:text-sm select-none">
              {truncate(title, { length: isMobile ? 20 : 40 })}
            </p>

            <small className="text-xs">{artist}</small>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="opacity-60 select-none text-xs md:text-sm">
            {fmtMSS(duration)}
          </div>
          <button
            className="md:hover:opacity-80"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
              toggleLike(trackId);
            }}
          >
            {" "}
            {!liked || !user ? (
              <BsArrowUpCircle size={20} />
            ) : (
              <BsXCircle size={20} />
            )}{" "}
          </button>

          <HoverCardDemo
            message="options"
            body={
              <div className="flex gap-2">
                {" "}
                <OfferPopup trackId={trackId} shareTrack={shareTrack} />
                {isMobile ? (
                  <WebShare size={20} trackId={trackId} />
                ) : (
                  <div onClick={() => shareTrack(trackId)} className="flex items-center justify-center">
                    {" "}
                    <CopyLink trackId={trackId} />
                  </div>
                )}
              </div>
            }
          >
            <div>
              <BsThreeDots />
            </div>
          </HoverCardDemo>
          {
            //liked ? <BsXCircle /> : <BsArrowUpCircle />
            /* <HeartIcon
              className={`${
                liked ? "text-[#5D3EFF]" : "#fff"
              } "w-5 h-5 md:w-6 md:h-6"`}
            /> */
          }
        </div>
      </div>
    </div>
  );
};

const Tracks = ({ tracks }: { tracks: any[] }) => {
  const [sortBy, setSortBy] = useState({ base: SortBy.points, direction: SortDirection.desc });
  const [isDemo, setIsDemo] = useState(false);

  const sortTracks = (tracksToSort: any[], base: string, direction: string) => {
    return [...tracksToSort].sort((a, b) => {
      if (direction === SortDirection.asc) {
        return a[base] - b[base];
      } else {
        return b[base] - a[base];
      }
    });
  };

  const getLikedTracks = () => {
    return sortTracks(
      tracks.filter((track) => track.liked && !track.isInspiration),
      sortBy.base,
      sortBy.direction
    );
  };

  const getUnInteractedTracks = () => {
    return sortTracks(
      tracks.filter((track) => !track.liked && !track.isInspiration && !track.isDemo),
      sortBy.base,
      sortBy.direction
    );
  };

  const getDemoTracks = () => {
    return tracks.filter((track) => track.isDemo && !track.isInspiration);
  };

  return (
    <div className="px-1 py-2 w-full my-2 pb-28 md:pb-16">
      <div className="flex flex-row justify-between flex-wrap">
        <TabsPrimitive.Root defaultValue={"submissions"}>
          <TabsPrimitive.List aria-label="filters" className="font-bold">
            <TabsPrimitive.Trigger
              value="submissions"
              className="px-2 mb-2 tab md:hover:opacity-80 text-gray-400"
              onClick={() => setIsDemo(false)}
            >
              Submissions
            </TabsPrimitive.Trigger>
            {/* 
            <TabsPrimitive.Trigger
              value="demos"
              className="px-2 py-2 tab md:hover:opacity-80 text-gray-400"
              onClick={() => setIsDemo(true)}
            >
              Unreleased
            </TabsPrimitive.Trigger> */}
          </TabsPrimitive.List>
        </TabsPrimitive.Root>

        <div className="flex flex-row items-center justify-center gap-4">
          {sortBy.base != SortBy.points ||
          sortBy.direction == SortDirection.desc ? (
            <span
              className={
                sortBy.base == SortBy.points
                  ? "text-xs cursor-pointer text-primary"
                  : "text-xs cursor-pointer"
              }
              onClick={() => {
                if (sortBy.base == SortBy.points)
                  setSortBy({
                    base: SortBy.points,
                    direction: SortDirection.asc,
                  });
                else
                  setSortBy({
                    base: SortBy.points,
                    direction: SortDirection.desc,
                  });
              }}
            >
              Most Popular
            </span>
          ) : (
            <span
              className={"text-xs cursor-pointer text-primary"}
              onClick={() =>
                setSortBy({
                  base: SortBy.points,
                  direction: SortDirection.desc,
                })
              }
            >
              Least Popular
            </span>
          )}

          {sortBy.base != SortBy.uploaded_at ||
          sortBy.direction == SortDirection.desc ? (
            <span
              className={
                sortBy.base == SortBy.uploaded_at
                  ? "text-xs cursor-pointer text-primary"
                  : "text-xs cursor-pointer"
              }
              onClick={() => {
                if (sortBy.base == SortBy.uploaded_at)
                  setSortBy({
                    base: SortBy.uploaded_at,
                    direction: SortDirection.asc,
                  });
                else
                  setSortBy({
                    base: SortBy.uploaded_at,
                    direction: SortDirection.desc,
                  });
              }}
            >
              Newest First
            </span>
          ) : (
            <span
              className={"text-xs cursor-pointer text-primary "}
              onClick={() =>
                setSortBy({
                  base: SortBy.uploaded_at,
                  direction: SortDirection.desc,
                })
              }
            >
              Oldest First
            </span>
          )}

          <span>
            {sortBy.direction == SortDirection.asc ? (
              <BsTriangleFill
                className=" cursor-pointer"
                size={12}
                onClick={() =>
                  setSortBy({
                    base: sortBy.base,
                    direction: SortDirection.desc,
                  })
                }
              />
            ) : (
              <BsTriangleFill
                size={12}
                className="rotate-180 curso"
                onClick={() =>
                  setSortBy({ base: sortBy.base, direction: SortDirection.asc })
                }
              />
            )}{" "}
          </span>
        </div>
      </div>
      {isDemo ? (
        <>
          {getDemoTracks()?.map((track) => {
            return (
              <Track
                audioSrc={track.url}
                liked={track.liked}
                title={track.name}
                trackId={track.id}
                artist={track.artist}
                key={`track-${track.id}`}
              />
            );
          })}
        </>
      ) : (
        <>
          {getLikedTracks()?.map((track) => {
            return (
              <Track
                audioSrc={track.url}
                liked={track.liked}
                title={track.name}
                trackId={track.id}
                artist={track.artist}
                key={`track-${track.id}`}
              />
            );
          })}
          {getUnInteractedTracks()?.map((track) => {
            return (
              <Track
                audioSrc={track.url}
                liked={track.liked}
                title={track.name}
                trackId={track.id}
                artist={track.artist}
                key={`track-${track.id}`}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

const Home: NextLayoutPage = () => {
    const router = useRouter();
    const { artist } = router.query;
    
    const [rendered, setRendered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [artistSubmission, setArtistSubmission] = useState<ArtistSubmission | null>(null);
    const [tracks, setTracks] = useState(null);

    // const { data: artistSubmission, isLoading, error } = trpc.artistSubmissions.getArtistSubmissions.useQuery(
    //   artist as string,
    //   { enabled: !!artist }
    // );

    const getUserData = async () => {
        setIsLoading(true);
      
        const { data: artistData, error: artistError } = await supabase
            .from('ArtistSubmissions')
            .select('*')
            .eq('uid', artist as string)
            .single();


        if (artistError) {
          //@ts-ignore
          setError(artistError.message);
          setIsLoading(false);
          return;
        }
      
        const { data: tracksData, error: tracksError } = await supabase
          .from('Track')
          .select('*')
          .eq('artistSubmissionId', artist as string);
      
        if (tracksError) {
          //@ts-ignore
          setError(tracksError.message);
          setIsLoading(false);
          return;
        }
        
        // Fetch ArtistSubmissionsSocials data
        const { data: socialsData, error: socialsError } = await supabase
          .from('ArtistSubmissionsSocials')
          .select('*')
          .eq('artistSubmissionId', artist as string)
          .single();

        if (socialsError) {
          console.error('Error fetching ArtistSubmissionsSocials:', socialsError);
        } else {
          artistData.ArtistSubmissionsSocials = socialsData;
        }
    
        console.log(artistData);
        setArtistSubmission(artistData);
        console.log(tracksData);
        //@ts-ignore
        setTracks(tracksData);
        setIsLoading(false);
      };
  
    useEffect(() => {
      getUserData();

      window.tracks = {};
      window.trackPeaks = {};
      window.trackDurations = {};
      setRendered(true);
    }, []);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <>
        <Head>
          <title>Stems - Music Creating Platform</title>
          <meta
            property="og:title"
            content={`Send a beat directly on Stems`}
          />
          <meta
            name="description"
            content={`Stems connects artists worldwide by facilitating collaboration with producers and fans. Submit your beats directly to artists and let fans vote on their favorite submissions`}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            property="og:image"
            content={
            //   artistSubmission.ArtistSubmissionsSocials?.imageUrl ||
              "https://0xstems.xyz/assets/og-image.png"
            }
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {rendered && artistSubmission && !isLoading && (
            //ADDED TRACKS - passing tracks to the provider
          <MusicPlayerProvider id={artist as string} isArtistSubmissions tracks={tracks || []}>
            <>
              <Banner artistName={artistSubmission.name} />
              <Header
                id={artist as string}
                name={artistSubmission.name}
                description={artistSubmission.description}
                socials={artistSubmission.ArtistSubmissionsSocials}
                bio={artistSubmission.bio}
                imageUrl={artistSubmission.ArtistSubmissionsSocials?.imageUrl}
              />
              <Tracks tracks={tracks || []} />
              {/* <Tracks /> */}
              <TestPlayerNew />
            </>
          </MusicPlayerProvider>
        )}
      </>
    );
  };

export default Home;

Home.getLayout = (page) => <SimpleLayout artist>{page}</SimpleLayout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const user = await getUser(req as NextApiRequest);

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      user,
      prisma,
      session: "",
    },
  });
  const id = query.artist || "755ac230-85f0-468c-9c0d-251160b917b6";

  let data = await ssg.artistSubmissions.getArtistSubmissions.fetch(
    id as string
  );

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      artistSubmission: data || null,
    },
  };
};

