import { trpc } from '../utils/trpc';
import useCounter from '@hooks/use-counter';
// import { IPoolSong } from '../server/routers/PoolSongRouter';
import { RaceTrack } from '@server/routers/tracks';
import { useFirebaseAuth } from '@utils/firebase';
import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';
import {
  createContext,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  useContext,
  useCallback,
} from 'react';
import WaveSurfer from 'wavesurfer.js';
import Alert from '~/components/alert';

type PlayerContext = {
  id: string;
  mutatingTrack: string;
  currentTrack: RaceTrack | undefined;
  getCurrentTrack: () => RaceTrack | undefined;
  getCurrentTrackDuration: () => number | undefined;
  allTracks: RaceTrack[] | undefined;
  setTrack: (trackId: string) => void; // eslint-disable-line no-unused-vars
  setTrackIndex: (n: number) => void; // eslint-disable-line no-unused-vars
  waveSurferRef: MutableRefObject<WaveSurfer | null>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  isPlaying: () => boolean;
  play: () => void;
  pause: () => void;
  currentTime: number;
  setCurrentTime: (n: number) => void; // eslint-disable-line no-unused-vars
  playPause: (trackId: string) => void; // eslint-disable-line no-unused-vars
  playNext: () => void;
  playPrevious: () => void;
  getDemoTracks: () => RaceTrack[];
  getInspirationTracks: () => RaceTrack[];
  getLikedTracks: () => RaceTrack[];
  getUnInteractedTracks: () => RaceTrack[];
  updateTotalPlayedTime: () => void; // eslint-disable-line no-unused-vars
  toggleLike: (trackId: string) => void; // eslint-disable-line no-unused-vars
  setShowNotLoggedInModal: (show: boolean) => void;
  shareTrack: (trackId: string) => void; // eslint-disable-line no-unused-vars
  sortBy: { base: string; direction: string };
  setSortBy: (input: { base: string; direction: string }) => void; // eslint-disable-line no-unused-vars
  currentTrackUrl: string | undefined;
};

export const SortDirection = {
  asc: 'asc',
  desc: 'desc',
};
export const SortBy = {
  uploaded_at: 'uploaded_at',
  percentages: 'percentages',
  points: 'points',
};
const MusicPlayerContext = createContext<PlayerContext>({} as PlayerContext);
export const useMusicPlayer = () => useContext(MusicPlayerContext);

const preloadSong = (src: string) => {
  if (window) {
    const audioEl = new Audio();
    audioEl.crossOrigin = 'anonymous';
    audioEl.preload = 'auto';
    audioEl.src = src;
    window.tracks[src] = audioEl;
  }
};

export const MusicPlayerProvider = ({
  id,
  isArtistSubmissions,
  children,
  votesModalDispatch,
  tracks, // Added tracks prop
}: {
  id: string;
  isArtistSubmissions?: boolean;
  setShowModal?: (b: boolean) => void; // eslint-disable-line no-unused-vars
  isRaceExpired?: boolean;
  votesModalDispatch?: Dispatch<{
    type: 'show' | 'hide';
  }>;
  children: React.ReactElement;
  tracks: RaceTrack[]; // Added tracks prop
}) => {
  const { user } = useFirebaseAuth();
  const [isPreLoaded, setIsPreloaded] = useState(false);
  // const queryContext = trpc.useContext();
  const [showModal, setShowNotLoggedInModal] = useState(false);
  const [mutatingTrack, setMutatingTrack] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [totalTimePlayed, setTotalTimePlayed] = useState(0);
  const [sortBy, setSortBy] = useState({
    base: SortBy.points,
    direction: SortDirection.desc,
  });

  // Replace the trpc query with a state
  const [trackState, setTrackState] = useState<RaceTrack[]>(tracks || []);
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | undefined>(undefined);

  // const getTracks = (id: string) => {
  //   return isArtistSubmissions
  //     // ? tracks
  //     // : [];
  //     ? trpc.tracks.getArtistSubmissionsTracks.useQuery(id)
  //     : trpc.tracks.getTracks.useQuery(id);
  // };


  // const getTracks = (id: string) => {
  //   {data, error}
  // };
  // COMMENTED OUT BELOW AS WE ARE PASSING TRACKS TO THE PROVIDER
  // const { data: tracks } = getTracks(id);

  const router = useRouter();

  const sortTracks = (
    tracks: any[],
    sortBy?: string,
    sortDirection?: string
  ) => {
    switch (sortBy) {
      case SortBy.uploaded_at:
        return tracks.sort((a, b) => {
          if (sortDirection === SortDirection.asc) {
            return (
              new Date(a.uploaded_at).getTime() -
              new Date(b.uploaded_at).getTime()
            );
          } else {
            return (
              new Date(b.uploaded_at).getTime() -
              new Date(a.uploaded_at).getTime()
            );
          }
        });
      case SortBy.percentages:
        return tracks.sort((a, b) => {
          if (sortDirection === SortDirection.asc) {
            return a.percentage - b.percentage;
          } else {
            return b.percentage - a.percentage;
          }
        });
      case SortBy.points:
        return tracks.sort((a, b) => {
          if (sortDirection === SortDirection.asc) {
            return a.points - b.points;
          } else {
            return b.points - a.points;
          }
        });
      default:
        return tracks;
    }
  };
  // Get methods
  const getInspirationTracks = () => {
    return (
      trackState // updated to use trackState (from tracks)
        ?.filter((track) => track.isInspiration)
        ?.sort((a, b) => {
          if (a.isWinning && !b.isWinning) {
            return -1; // a should come before b
          } else if (!a.isWinning && b.isWinning) {
            return 1; // a should come after b
          } else {
            return 0; // no sorting needed
          }
        }) ?? []
    );
  };

  const getLikedTracks = () => {
    return sortTracks(
      trackState?.filter( // updated to use trackState (from tracks)
        (track: { liked: any; isInspiration: any }) =>
          track.liked && !track.isInspiration
      ) ?? [],
      sortBy.base,
      sortBy.direction
    );
  };

  const getUnInteractedTracks = () => {
    return sortTracks(
      trackState?.filter( // updated to use trackState (from tracks)
        (track: RaceTrack) =>
          !track.liked && !track.isInspiration && !track.isDemo !==true
      ) ?? [],
      sortBy.base,
      sortBy.direction
    );
  };

  const getDemoTracks = () => {
    return (
      trackState?.filter( // updated to use trackState (from tracks)
        (track: RaceTrack) =>
          track.isDemo && !track.isInspiration !==true
      ) ?? []
    );
  };
  const sharesMutation = trpc.tracks.share.useMutation({});
  const shareTrack = (trackId: string) => {
    sharesMutation.mutate({ trackId });
  };

  const likesMutation = trpc.likes.update.useMutation({
    onMutate: async (mutatedTrack) => {
      setMutatingTrack(mutatedTrack.track);
      // await queryContext.tracks.getTracks.cancel();

      const inspirationTracks =
        trackState?.filter( // updated to use trackState (from tracks)
          (track: { isInspiration: any }) => track.isInspiration
        ) ?? [];

      let previousLiked =
        trackState?.filter( // updated to use trackState (from tracks)
          (track: { liked: any; isInspiration: any }) =>
            track.liked && !track.isInspiration
        ) ?? [];

      let previousUnLiked =
        trackState?.filter( // updated to use trackState (from tracks)
          (track: { liked: any; isInspiration: any }) =>
            !track.liked && !track.isInspiration
        ) ?? [];

      const selectedTrack = trackState?.find( // updated to use trackState (from tracks)
        (track: { id: string }) => track.id === mutatedTrack?.track
      );

      if (selectedTrack) {
        selectedTrack.liked = mutatedTrack.likeStatus;
        if (mutatedTrack.likeStatus) {
          previousLiked = [...previousLiked, selectedTrack];
          previousUnLiked = previousUnLiked.filter(
            (track: { id: string }) => track.id !== mutatedTrack.track
          );
        } else {
          previousLiked = previousLiked.filter(
            (track: { id: string }) => track.id !== mutatedTrack.track
          );
          previousUnLiked = [...previousUnLiked, selectedTrack];
        }
      }

      const newLikes = [
        ...inspirationTracks,
        ...previousLiked,
        ...previousUnLiked,
      ];
      // queryContext.tracks.getTracks.setData(id, newLikes);
      return newLikes;
    },
    onSettled: () => {
      // queryContext.tracks.getTracks.invalidate();
      setMutatingTrack('');
    },
  });

  // const playedTimeMutation = trpc.tracks.updatePlayedTime.useMutation({});

  // player controls
  const { trackid: trackId } = router.query;

  const trackIndexCounter = useCounter(0);
  const waveSurferRef = useRef<WaveSurfer>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const setTrackIndex = useCallback(
    (value: number) => {
      trackIndexCounter.setValue(value);
    },
    [trackIndexCounter]
  );

  const isPlaying = () => {
    return isAudioPlaying;
    // return     // return waveSurferRef.current?.isPlaying() ?? false;
  };

  const getCurrentTrack = () => {
    return tracks?.[trackIndexCounter.count];
  };

  const play = useCallback(() => {
    setStartTime(new Date().getTime());
    setIsAudioPlaying(true);
    // updated to use audioRef (from waveSurferRef)
    if (audioRef.current) {
      // console.log('Audio ref current', audioRef.current);
      audioRef.current.play().catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error);
        }
      });
      // waveSurferRef.current?.play();
      // audioRef.current?.play();
    }
  }, []);

  const pause = useCallback(() => {
    setTotalTimePlayed(prevTotal => prevTotal + (new Date().getTime() - startTime));
    setStartTime(0);
    setIsAudioPlaying(false);
    // updated to use audioRef (from waveSurferRef)
    if (audioRef.current) {
      audioRef.current.pause();
    }
    // waveSurferRef.current?.pause();
    // audioRef.current?.pause();
  }, [startTime]);

  const updateTotalPlayedTime = useCallback(() => {
    let trackPlayedTime =
      totalTimePlayed - startTime + (isPlaying() ? new Date().getTime() : 0);
    setTotalTimePlayed(0);
    // playedTimeMutation.mutate({
    //   trackId: trackState[trackIndexCounter.count].id, // updated to use trackState (from tracks)
    //   playedTime: parseInt((trackPlayedTime / 1000).toFixed(0)),
    // });
  }, [totalTimePlayed, startTime, isAudioPlaying, trackState, trackIndexCounter.count]);

  const setTrack = useCallback((trackId: string) => {
    if (trackId === '') return;
    updateTotalPlayedTime();

    const idx = trackState?.findIndex((track) => track.id === trackId) ?? 0; // updated to use trackState (from tracks)
    setTrackIndex(idx);
    // trackIndexCounter.setCount(idx);

    const track = trackState[idx];
    if (track) {
      setCurrentTrackUrl(track.songUrl);
      if (audioRef.current) {
        audioRef.current.pause(); 
        audioRef.current.currentTime = 0;
        audioRef.current.src = track.songUrl;
        audioRef.current.load();
        setTimeout(() => {
          play();
        }, 100);
      }
    }
  }, [trackState, updateTotalPlayedTime, setTrackIndex, play]);

  const playPause = useCallback((trackId: string) => {

    // not logged in
    // removed not logged in condition
    if (!user) {
      // setShowNotLoggedInModal(true);
      // return;
    }

    if (isPlaying() && trackId === getCurrentTrack()?.id) {
      pause();
    } else if (!isPlaying() && trackId === getCurrentTrack()?.id) {
      play();
    } else {
      setTrack(trackId);
      play(); // updated to use play (from playPause)
    }
  }, [isPlaying, getCurrentTrack, pause, play, setTrack]);



  const getCurrentTrackDuration = () => {
    const track = tracks?.[trackIndexCounter.count];
    return window.trackDurations[track?.songUrl ?? ''];
  };

  const toggleLike = (trackId: string) => {
    if (!user) {
      setShowNotLoggedInModal(true);
      return;
    }
    const track = trackState?.find((track: { id: string }) => track.id === trackId); // updated to use trackState (from tracks)
    if (getLikedTracks()?.length >= 5 && !track?.liked) {
      votesModalDispatch?.({ type: 'show' });
      return;
    }
    if (track) {
      likesMutation.mutate({
        track: trackId,
        likeStatus: !track.liked,
      });
    }
  };

  useEffect(() => {
    if (!trackState || isPreLoaded) return; // updated to use trackState (from tracks)
    console.log(trackState.map((t: { name: string }) => t.name));

    if (!window.tracks) window.tracks = {};
    if (!window.trackPeaks) window.trackPeaks = {};
    if (!window.trackDurations) window.trackDurations = {};

    trackState?.forEach(({ songUrl }: { songUrl: string }) => preloadSong(songUrl)); // updated to use trackState (from tracks)
    setIsPreloaded(true);
  }, [isPreLoaded, trackState]); // updated to use trackState (from tracks)

  useEffect(() => {
    if (trackId) {
      const filteredId = Array.isArray(trackId)
        ? trackId.length > 0
          ? trackId[0]
          : ''
        : trackId;

      setTrack(filteredId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackState, trackId]); // updated to use trackState (from tracks)

  useEffect(() => {
    trackIndexCounter.updateMaximum(trackState?.length ?? 0); // updated to use trackState (from tracks)
  }, [trackState?.length, trackIndexCounter]);

  const value = {
    id,
    mutatingTrack,
    currentTrack: trackState?.[trackIndexCounter.count], // updated to use trackState (from tracks)
    setTrack,
    getCurrentTrack,
    getCurrentTrackDuration,
    getDemoTracks,
    getInspirationTracks,
    getLikedTracks,
    getUnInteractedTracks,
    playPause,
    play,
    currentTime,
    setCurrentTime,
    allTracks: tracks,
    pause,
    isPlaying: () => isAudioPlaying, // updated
    waveSurferRef,
    audioRef,
    playNext: trackIndexCounter.increment,
    playPrevious: trackIndexCounter.decrement,
    setTrackIndex,
    updateTotalPlayedTime,
    toggleLike,
    setShowNotLoggedInModal,
    shareTrack,
    sortBy,
    setSortBy,
    currentTrackUrl,
  };

  return (
    <MusicPlayerContext.Provider 
      value={{
        ...value,
        currentTrackUrl,
      }}
    >
      <Alert
        open={showModal}
        onOpenChange={(open?: boolean) =>
          setShowNotLoggedInModal(open ?? false)
        }
        heading='You are not logged in.'
        content='To perform this action, you need to be logged in. Please press the
        button below to proceed to the login page.'
        actionLabel='Proceed to login'
        action={() => router.push('/auth/login')}
      />
      {children}
    </MusicPlayerContext.Provider>
  );
};
