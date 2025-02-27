import { useEffect, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ForwardIcon,
  BackwardIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import useWindowSize from "@hooks/use-window-size";
import { AnimatePresence, motion } from "framer-motion";
import truncate from "lodash/truncate";
import { useMusicPlayer } from "providers/MusicPlayerProvider";
import WaveSurfer from "wavesurfer.js";

type Props = {
  // likeTrack: (trackId: string) => void;
  // dislikeTrack: (trackId: string) => void;
  // mutating: boolean;
  // mutatingId: string;
  // removeTrackInteraction: (trackId: string) => void;
  isRaceExpired?: boolean | null;
};

function fmtMSS(s: number) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

export const MusicPlayer = (props: Props) => {
  const { isMobile } = useWindowSize();

  const [isSurferReady, setIsSurferReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [timePlayed, setTimePlayed] = useState<number>(0);

  const {
    mutatingTrack,
    currentTrack,
    getCurrentTrackDuration,
    play,
    playPause,
    waveSurferRef,
    isPlaying,
    playNext,
    playPrevious,
    getCurrentTrack,
    toggleLike,
  } = useMusicPlayer();

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current ?? "wavesurfer",
      waveColor: "#D9DCFF",
      progressColor: "#927ff5",
      barWidth: 2,
      barRadius: 2,
      cursorWidth: 1,
      barGap: 4,
      cursorColor: "transparent",
      backend: "MediaElement",
      responsive: true,
      normalize: true,
      height: 24,
    });

    waveSurferRef.current = waveSurfer;

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, [containerRef, waveSurferRef]);

  useEffect(() => {
    if (!waveSurferRef.current) return;

    setIsSurferReady(false);

    if (currentTrack?.songUrl) {
      if (!window.tracks[currentTrack?.songUrl]) {
        const audioEl = new Audio();
        audioEl.crossOrigin = "anonymous";
        audioEl.preload = "auto";
        audioEl.src = currentTrack?.songUrl ?? "";
        window.tracks[currentTrack?.songUrl ?? ""] = audioEl;
      }
      waveSurferRef.current.load(
        window.tracks[currentTrack?.songUrl],
        window.trackPeaks[currentTrack?.songUrl],
        undefined,
        window.trackDurations[currentTrack?.songUrl]
      );
    }
    // eslint-disable-next-line
  }, [currentTrack?.songUrl, waveSurferRef]);

  useEffect(() => {
    if (!waveSurferRef.current) return;

    waveSurferRef.current.on("waveform-ready", () => {
      setIsSurferReady(true);

      if (isPlaying()) {
        play();
      }

      if (currentTrack?.songUrl) {
        if (!window.trackDurations[currentTrack?.songUrl]) {
          const trackDuration = Number(
            waveSurferRef.current?.backend?.getDuration()
          );
          window.trackDurations[currentTrack?.songUrl] = trackDuration;
          setCurrentDuration(trackDuration);
        } else {
          setCurrentDuration(window.trackDurations[currentTrack?.songUrl]);
        }

        if (!window.trackPeaks[currentTrack?.songUrl]) {
          waveSurferRef.current?.exportPCM(1024, 10000, true).then((data) => {
            window.trackPeaks[currentTrack?.songUrl] = data;
          });
        }
      }
      if ("mediaSession" in navigator && getCurrentTrack()) {
        const metadata = new MediaMetadata({
          title: getCurrentTrack()?.name,
          artist: getCurrentTrack()?.artist,
          album: "0xStems",
          artwork: [
            {
              src: "/assets/logo-mark.svg",
              sizes: "512x512",
              type: "image/svg",
            },
          ],
        });

        navigator.mediaSession.metadata = metadata;

        navigator.mediaSession.setActionHandler("play", () => {
          playPause(getCurrentTrack()?.id ?? "");
        });
      }
    });

    waveSurferRef.current.on("loading", () => {
      if (isSurferReady) setIsSurferReady(false);
    });

    waveSurferRef.current.on("finish", () => {
      playNext();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.songUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePlayed(waveSurferRef?.current?.backend?.getCurrentTime() || 0);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTrack?.songUrl, waveSurferRef]);

  const playNextTrack = () => {
    playNext();
    const nowPlaying = getCurrentTrack();
    if (nowPlaying?.songUrl) {
      setCurrentDuration(window.trackDurations[nowPlaying.songUrl]);
    }
  };

  const playPreviousTrack = () => {
    playPrevious();
    const nowPlaying = getCurrentTrack();
    if (nowPlaying?.songUrl) {
      setCurrentDuration(window.trackDurations[nowPlaying.songUrl]);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full glass color-white flex flex-col  md:px-12 py-4 md:py-6 items-center ">
      {
        <div className="flex flex-col md:flex-row md:justify-between items-center w-full h-auto md:h-4">
          <div className="flex flex-row justify-between items-center w-3/4 md:w-auto md:gap-x-12 order-2 md:order-1">
            <div className="flex flex-col justify-center h-full w-44 ">
              {truncate(getCurrentTrack()?.name, {
                length: 24,
              })}
            </div>
            <div className="flex flex-row gap-x-4 items-center justify-center">
              <button onClick={playPreviousTrack}>
                <BackwardIcon className="h-5 w-5 text-gray-100" />
              </button>
              <button onClick={() => playPause(getCurrentTrack()?.id ?? "")}>
                {isPlaying() ? (
                  <PauseCircleIcon className="h-8 w-8 text-gray-100" />
                ) : (
                  <PlayCircleIcon className="h-8 w-8 text-gray-100" />
                )}
              </button>
              <button onClick={playNextTrack}>
                <ForwardIcon className="h-5 w-5 text-gray-100" />
              </button>
            </div>
          </div>
          <div className="flex-auto flex flex-col justify-center w-full h-12 order-1 md:order-2">
            <motion.div
              className="flex w-full items-center px-12"
              animate={{ opacity: isSurferReady ? 1 : 0 }}
              transition={{ ease: [0.25, 0.1, 0.25, 1.0], duration: 0.5 }}
            >
              <div className="w-full h-4 overflow-hidden cursor-pointer">
                <div
                  ref={containerRef}
                  key="wavesurf"
                  className="w-full cursor-pointer"
                />
              </div>
              {getCurrentTrackDuration() && (
                <p className="ml-5 text-sm">
                  {fmtMSS(
                    Math.floor(getCurrentTrackDuration() ?? 0) -
                      Math.floor(timePlayed)
                  )}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      }
    </div>
  );
};

export default MusicPlayer;
