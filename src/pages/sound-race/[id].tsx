import InstagramIcon from '../../../public/logos/instagram.svg';
import SpotifyIcon from '../../../public/logos/spotify.svg';
import TwitterIcon from '../../../public/logos/twitter.svg';
import {
  PlayCircleIcon,
  PauseCircleIcon,
  HeartIcon,
} from '@heroicons/react/20/solid';
import { useRelativeTime } from '@hooks/use-relative-time';
import useWindowSize from '@hooks/use-window-size';
import * as Progress from '@radix-ui/react-progress';
import { appRouter } from '@server/_app';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { getUser } from '@utils/firebaseAdmin';
import prisma from '@utils/prisma';
import { trpc } from '@utils/trpc';
import { confetti } from 'dom-confetti';
import truncate from 'lodash/truncate';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextApiRequest,
  NextLayoutPage,
} from 'next/types';
import { useClaimNFT } from 'providers/ClaimNFTProvider';
import {
  MusicPlayerProvider,
  SortBy,
  SortDirection,
  useMusicPlayer,
} from 'providers/MusicPlayerProvider';
import { ChangeEvent, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { BsTriangleFill } from 'react-icons/bs';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { ClaimNFTFlow } from '~/components/claimNftFlow';
import Layout from '~/components/layout';
import Header from '~/components/soundRace/Header';
import MusicPlayer2 from '~/components/testplayer';

function fmtMSS(s: number) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}

function getDuration(src: string): Promise<number> {
  return new Promise(function (resolve) {
    const audioEl = new Audio();
    audioEl.src = src;

    const preloadDuration = () => {
      if (window.trackDurations) {
        window.trackDurations[src] = Math.floor(audioEl.duration);
      }
      audioEl.removeEventListener('loadedmetadata', preloadDuration);
      resolve(Math.floor(audioEl.duration));
    };

    audioEl.addEventListener('loadedmetadata', preloadDuration);
  });
}

const Banner = ({ isExpired }: { isExpired?: boolean }) => {
  let text = isExpired
    ? 'FINISHED RACE: Xcelencia selected SJU!'
    : 'PREVIEW RACE: Stay tuned for race debut!';
  return (
    <div
      style={{
        background:
          'linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)',
        padding: '0.3rem',
        zIndex: 0,
      }}
      className='mb-2 font-bold text-lg flex items-center justify-center text-white relative rounded-md'
    >
      <Marquee gradient={false} speed={40} className='absolute '>
        <div className='flex gap-16'>
          <div className='ml-16'>{text}</div>
          <div>{text}</div>
          <div>{text}</div>
          <div>{text}</div>
          <div>{text}</div>
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
};

type ProgressBarProps = {
  time?: number | string | null;
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
    <div className='flex-col items-center px-2 py-6 md:px-4 md:py-8 w-full'>
      <div className=''>
        <div className='md:flex justify-between'>
          <p className='font-semibold hidden md:flex items-center justify-center mt-4'>
            Votes left: {5 - getLikedTracks().length}
          </p>
          <div className='flex-col text-xs'>
            <div className='flex md:justify-end justify-between'>
              <span className='mr-1 font-semibold'>Submissions end: </span>
              <span className='text-gray-500'>
                {useRelativeTime(currentDate)}
              </span>
            </div>
            <div className='flex md:justify-end justify-between md:mt-2'>
              <span className='mr-1 font-semibold'>Voting ends: </span>
              <span className='text-gray-500'>
                {useRelativeTime(votingEnd)}
              </span>
            </div>
          </div>
        </div>
        <div className='w-full mt-4 md:mt-6'>
          <Progress.Root
            value={progress}
            className='w-full bg-white/30 h-1.5 rounded-[100vw] overflow-hidden'
          >
            <Progress.Indicator
              className={`bg-gradient-to-br from-[#927FF5] to-[#6587FD] transition-transform h-full w-full rounded-[100vw]`}
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </div>
        <p className='font-semibold flex items-center justify-center mt-4 md:hidden'>
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
  isExpired?: boolean | null;
  percentage?: number;
};

const Track = ({
  trackId,
  title,
  liked,
  audioSrc,
  isExpired,
  percentage,
}: TrackProps) => {
  const [duration, setDuration] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { getCurrentTrack, isPlaying, playPause, setTrack, toggleLike } =
    useMusicPlayer();
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (audioSrc && window.trackDurations) {
      if (!window.trackDurations[audioSrc]) {
        getDuration(audioSrc).then((duration) => {
          setDuration(Number(duration));
        });
      } else {
        setDuration(window.trackDurations[audioSrc]);
      }
    }
  }, [duration, audioSrc]);

  return (
    <div className='border-b-2 border-gray-800/80 cursor-pointer'>
      <div
        className='flex items-center px-2 py-2 w-full rounded-md hover:bg-vibrant/10'
        style={{
          background:
            trackId === getCurrentTrack()?.id
              ? 'linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)'
              : '',
          animation:
            trackId === getCurrentTrack()?.id && isPlaying()
              ? 'gradient 10s ease infinite'
              : '',
        }}
        onClick={() => setTrack(trackId)}
      >
        <div className='flex items-center w-full'>
          <button
            className='cursor-pointer rounded-full md:hover:opacity-80'
            onClick={() => playPause(trackId)}
          >
            {isPlaying() && trackId === getCurrentTrack()?.id ? (
              <PauseCircleIcon className='w-10 h-10 md:w-8 md:h-8' />
            ) : (
              <PlayCircleIcon className='w-10 h-10 md:w-8 md:h-8' />
            )}
          </button>
          <p className='ml-2 md:ml-4 text-sm md:text-lg select-none'>
            {truncate(title, { length: isMobile ? 20 : 40 })}
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='opacity-60 select-none text-xs md:text-sm'>
            {fmtMSS(duration)}
          </div>
          {!isExpired ? (
            <button
              className='md:hover:opacity-80'
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
                toggleLike(trackId);
              }}
            >
              <HeartIcon
                className={`${
                  liked ? 'text-[#5D3EFF]' : '#fff'
                } "w-5 h-5 md:w-6 md:h-6"`}
              />
            </button>
          ) : (
            <>
              {' '}
              <HeartIcon
                className={`${
                  liked ? 'text-[#5D3EFF]' : '#fff'
                } "w-5 h-5 md:w-6 md:h-6"`}
              />
              <div className='flex flex-col md:flex-row md:gap-1 items-center md:w-28'>
                <p className='text-md'>{percentage + '% '}</p>
                <span
                  className='block text-right text-[0.5rem] md:text-sm'
                  style={{ whiteSpace: 'nowrap' }}
                >
                  of voters
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const WinningTrack = ({ raceResults }: any) => {
  const { isPlaying, playPause, getCurrentTrack } = useMusicPlayer();

  useEffect(() => {
    const banner = document.querySelector('#winner') as HTMLElement;

    const shootConfetti = () =>
      confetti(banner, {
        colors: ['#927FF5', '#36587FD'],
        angle: 90,
      });
    banner?.addEventListener('mouseover', shootConfetti);

    return () => {
      banner?.removeEventListener('mouseover', shootConfetti);
    };
  });

  return (
    <>
      <div className='w-full mt-3'>
        <div className='text-sm uppercase text-gray-400 px-2'>New Track</div>
        <div
          className='p-2 px-4 rounded-xl flex flex-row justify-between items-center mt-1 w-full max-[590px]:flex-col'
          style={{
            background:
              'linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 90.91%)',
            backgroundSize: '400% 400%',
            animation: 'gradient 5s ease infinite',
          }}
        >
          <div className='flex flex-row'>
            <div
              id='winner'
              className='relative mr-4 w-[120px] h-[120px] min-w-[120px] '
            >
              {raceResults?.NftImageUrl && (
                <img
                  width={120}
                  height={120}
                  src={raceResults.NftImageUrl}
                  className='rounded-lg'
                  alt='NFT'
                />
              )}
              <button className='absolute bottom-[10px] left-[10px] cursor-pointer rounded-full md:hover:opacity-80 bg-indigo-500 opacity-50'>
                {isPlaying() &&
                getCurrentTrack()?.id == raceResults.releasedSong.uid ? (
                  <FaPauseCircle
                    className='w-6 h-6 md:w-8 md:h-8'
                    onClick={() => playPause(raceResults?.releasedSong?.uid)}
                  />
                ) : (
                  <FaPlayCircle
                    className='w-6 h-6 md:w-8 md:h-8'
                    onClick={() => playPause(raceResults?.releasedSong?.uid)}
                  />
                )}
              </button>
            </div>
            <div className='mr-auto'>
              <b className='text-xl md:text-2xl lg:text-3xl font-bold'>
                {' '}
                {raceResults?.releasedSong?.name}
              </b>
              <p className='md:my-2 w-full md:w-11/12 text-gray-200 md:text-2xl'>
                Listen to the track Xcelencia created with the winning
                submission.
              </p>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <ClaimNFTFlow />
          </div>
        </div>
      </div>
      <div className='w-full mt-3 mb-1'>
        <div className='text-sm uppercase text-gray-400 px-2'>
          Winning submission
        </div>
        <div className='p-4 rounded-xl flex justify-between items-center mt-2 border border-[#6587FD]'>
          <div>
            <p className='text-xl md:text-2xl'>SJU</p>
            <p className='mt-2 w-full text-gray-200 text-sm md:text-base pr-2'>
              Xcelencia has selected this submission as the winner. 53% of
              voters voted for this song.
            </p>
          </div>
          <span
            className='text-base font-bold bg-white text-black px-4 py-2 mt-4 rounded-lg flex items-center justify-center'
            style={{ whiteSpace: 'nowrap' }}
          >
            🎉 Winner
          </span>
        </div>
      </div>
    </>
  );
};
const Tracks = ({
  raceId,
  isExpired,
}: {
  raceId: string;
  isExpired?: boolean | null;
}) => {
  const { getLikedTracks, getUnInteractedTracks, setSortBy, sortBy } =
    useMusicPlayer();
  useEffect(() => {
    if (isExpired)
      setSortBy({ base: SortBy.percentages, direction: SortDirection.desc });
  }, []);
  return (
    <div className='px-1 py-2 w-full pb-28 md:pb-16'>
      <div className='flex flex-row justify-between'>
        <div className='font-semibold text-base text-gray-100 mb-2 self-center flex gap-4 flex-wrap'>
          {' '}
          Submitted Tracks
          <div className='flex flex-row items-center justify-center gap-4'>
            {isExpired ? (
              <span
                className={
                  sortBy.base == SortBy.percentages
                    ? 'text-xs cursor-pointer text-primary'
                    : 'text-xs cursor-pointer'
                }
                onClick={() => {
                  setSortBy({
                    base: SortBy.percentages,
                    direction:
                      sortBy.direction == SortDirection.desc
                        ? SortDirection.asc
                        : SortDirection.desc,
                  });
                }}
              >
                {sortBy.direction == SortDirection.desc ? (
                  <>Highest Percentage</>
                ) : (
                  <>lowest Percentage</>
                )}
              </span>
            ) : (
              <>
                {sortBy.base != SortBy.points ||
                sortBy.direction == SortDirection.desc ? (
                  <span
                    className={
                      sortBy.base == SortBy.points
                        ? 'text-xs cursor-pointer text-primary'
                        : 'text-xs cursor-pointer'
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
                    className={'text-xs cursor-pointer text-primary'}
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
                        ? 'text-xs cursor-pointer text-primary'
                        : 'text-xs cursor-pointer'
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
                    className={'text-xs cursor-pointer text-primary'}
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
              </>
            )}

            <span>
              {sortBy.direction == SortDirection.asc ? (
                <BsTriangleFill
                  className='cursor-pointer'
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
                  className='rotate-180 curso'
                  onClick={() =>
                    setSortBy({
                      base: sortBy.base,
                      direction: SortDirection.asc,
                    })
                  }
                />
              )}{' '}
            </span>
          </div>
        </div>
        {!isExpired && (
          <div className='w-auto self-center h-auto'>
            <Link href={`/submit-beat?raceId=${raceId}`}>
              <button className='text-gray-100 bg-primary hover:bg-primary/60 rounded-3xl text-sm px-5 py-2.5 text-center mb-2 w-auto self-center'>
                + Submit a track
              </button>
            </Link>
          </div>
        )}
      </div>
      {getLikedTracks()?.map((track) => {
        return (
          <Track
            audioSrc={track.songUrl}
            liked={track.liked}
            title={track.name}
            trackId={track.id}
            key={`track-${track.id}`}
            isExpired={isExpired}
            percentage={track.percentage || 0}
          />
        );
      })}
      {getUnInteractedTracks()?.map((track) => {
        return (
          <Track
            audioSrc={track.songUrl}
            liked={track.liked}
            title={track.name}
            trackId={track.id}
            key={`track-${track.id}`}
            isExpired={isExpired}
            percentage={track.percentage || 0}
          />
        );
      })}
    </div>
  );
};

const Home: NextLayoutPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // const race = props.race;
  const [rendered, setRendered] = useState(false);
  const raceId = props.id as string;
  useEffect(() => {
    window.tracks = {};
    window.trackPeaks = {};
    window.trackDurations = {};
    setRendered(true);
  }, []);
  const { data: race } = trpc.race.getRace.useQuery(raceId);

  return (
    <>
      <Head>
        <title>Stems - Music Creating Platform</title>
        <meta
          name='description'
          content='0xStems enables artists to create with producers and fans'
        />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta
          property='og:url'
          content='0xstems.xyz/sound-race-1'
          key='ogurl'
        />
        <meta
          property='og:image'
          content='https://0xstems.xyz/assets/og-image.png'
          key='ogimage'
        />
        <meta property='og:site_name' content='0xStems' key='ogsitename' />
        <meta
          property='og:title'
          content='0xStems - Creating Music Reimagined'
          key='ogtitle'
        />
        <meta
          property='og:description'
          content='0xStems enables artists to create with producers and fans'
          key='ogdesc'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@0xstems' />
        <meta
          name='twitter:title'
          content='0xStems - Creating Music Reimagined'
        />
        <meta
          name='twitter:description'
          content='enabling artists to create with producers and fans'
        />
        <meta name='twitter:creator' content='@0xstems' />
      </Head>

      <MusicPlayerProvider id={props.id} tracks={[]}>
        <>
          <Banner isExpired={race?.isExpired ?? false} />
          <Header
            id={raceId}
            name={race?.name}
            description={race?.description}
            socials={race?.RaceSocials}
            isExpired={race?.isExpired}
            results={race?.RaceResults}
            isRace
          />
          {race && (
            <>
              {race.isExpired ? (
                <WinningTrack raceResults={race.RaceResults} />
              ) : (
                <ProgressBar time={race?.launches_on} />
              )}
            </>
          )}
          <Tracks raceId={raceId} isExpired={!race || race?.isExpired} />
          {/* <MusicPlayer isRaceExpired={false} /> */}
          {/* <MusicPlayerComponent isRaceExpired={race?.isExpired} /> */}
          <MusicPlayer2 />
        </>
      </MusicPlayerProvider>
    </>
  );
};

export default Home;

Home.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const id = query.id as string;

  return {
    props: {
      id: id,
    },
  };
};
