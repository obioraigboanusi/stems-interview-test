import React, { useState, useEffect } from 'react';
import { OfferPopup } from "./OfferPopup";
import { CopyLink, WebShare } from "./shared/share";
import {
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import useWindowSize from "@hooks/use-window-size";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useFirebaseAuth } from "@utils/firebase";
import { clsx } from "clsx";
import { truncate } from "lodash";
import Marquee from "react-fast-marquee";
import { BsArrowUpCircle, BsXCircle } from "react-icons/bs";
import { useMusicPlayer } from "providers/MusicPlayerProvider";

interface MusicPlayerProps {}

function fmtMSS(s: number) {
  return s ? (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s : "0:00";
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

const TestPlayerNew: React.FC<MusicPlayerProps> = () => {
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { isMobile } = useWindowSize();
  const [showFullText, setShowFullText] = useState(false);
  const { user } = useFirebaseAuth();

  const {
    currentTrack,
    getCurrentTrackDuration,
    play,
    playPause,
    audioRef,
    isPlaying,
    playNext,
    playPrevious,
    getCurrentTrack,
    setCurrentTime,
    currentTime,
    updateTotalPlayedTime,
    shareTrack,
    toggleLike,
    setTrack,
    currentTrackUrl,
  } = useMusicPlayer();

  useEffect(() => {
    if (currentTrackUrl) {
      setLoaded(true);
    }
  }, [currentTrackUrl]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
    setDuration(getCurrentTrackDuration() ?? e.currentTarget.duration);
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const playNextTrack = () => {
    updateTotalPlayedTime();
    playNext();
    const nowPlaying = getCurrentTrack();
    if (nowPlaying?.songUrl) {
      setDuration(window.trackDurations[nowPlaying.songUrl]);
    }
  };

  const playPreviousTrack = () => {
    updateTotalPlayedTime();
    playPrevious();
    const nowPlaying = getCurrentTrack();
    if (nowPlaying?.songUrl) {
      setDuration(window.trackDurations[nowPlaying.songUrl]);
    }
  };

  useEffect(() => {
    if (currentTrack?.songUrl) {
      if (audioRef.current) 
      if (!window.trackDurations[currentTrack.songUrl]) {
        getDuration(currentTrack.songUrl).then((duration) => {
          setDuration(Number(duration));
        });
      } else {
        setDuration(window.trackDurations[currentTrack?.songUrl]);
      }
    }

    if (isPlaying()) {
      play();
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
    setLoaded(true);
  }, [currentTrack?.songUrl]);

  return (
    <div className="fixed bottom-0 left-0 w-full glass color-white flex flex-col justify-center h-20 md:h-16 ">
      {
        <div className=" w-full h-auto md:h-10 flex items-center justify-center">
          <div className="flex flex-row justify-between items-center w-full md:w-2/3">
            <div
              onMouseEnter={() => setShowFullText(true)}
              onMouseLeave={() => setShowFullText(false)}
              onTouchStart={() => setShowFullText(true)}
              onTouchEnd={() => setShowFullText(false)}
              className="h-full w-28 md:w-64  ml-5 mr-2  "
            >
              {((showFullText && getCurrentTrack()?.name?.length) || 0) > 30 ||
              (isMobile && (getCurrentTrack()?.name?.length || 0) > 11) ? (
                <Marquee gradient={false} speed={20}>
                  <div className="mr-2 md:mr-10 ">
                    {getCurrentTrack()?.name}
                  </div>
                </Marquee>
              ) : (
                <>
                  {" "}
                  {truncate(getCurrentTrack()?.name, {
                    length: isMobile ? 12 : 30,
                  })}
                </>
              )}
            </div>

            <div className="flex flex-row gap-x-4 items-center justify-center mr-5 lg:-ml-40">
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
            {loaded && (
              <div className="flex items-center w-2/5 md:w-24  justify-center md:justify-end">
                <div className="text-sm w-12 flex justify-center">
                  {fmtMSS(Math.floor(duration - currentTime))}
                </div>
                <div className="flex items-center justify-center  gap-3 flex-row mx-2 md:ml-5 md:-mr-10">
                  {!(
                    getCurrentTrack()?.isInspiration ||
                    getCurrentTrack()?.isDemo
                  ) && (
                    <>
                      <button
                        className="md:hover:opacity-80"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(getCurrentTrack()?.id || "");
                        }}
                      >
                        {" "}
                        {!getCurrentTrack()?.liked || !user ? (
                          <BsArrowUpCircle size={20} />
                        ) : (
                          <BsXCircle size={20} />
                        )}{" "}
                      </button>
                      {isMobile ? (
                        <WebShare
                          onClick={() => {
                            shareTrack(getCurrentTrack()?.id || "");
                          }}
                          size={22}
                          trackId={getCurrentTrack()?.id || ""}
                        />
                      ) : (
                        <>
                          <div
                            className="flex items-center justify-center"
                            onClick={() => {
                              shareTrack(getCurrentTrack()?.id || "");
                            }}
                          >
                            <CopyLink trackId={getCurrentTrack()?.id || ""} />
                          </div>
                          <OfferPopup
                            trackId={getCurrentTrack()?.id || ""}
                            shareTrack={shareTrack}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <audio
              ref={audioRef}
              src={currentTrackUrl} // updated to use currentTrack (from getCurrentTrack)
              onTimeUpdate={handleTimeUpdate}
              onEnded={playNextTrack}
            />
          </div>

          <div className="w-full absolute -top-3">
            <SliderPrimitive.Root
              value={[currentTime]}
              max={duration || 1}
              step={0.1}
              aria-label="Playback position"
              className="relative flex h-5  touch-none items-center w-full "
              onValueChange={handleSliderChange}
            >
              <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-800 hover:h-2 w-full">
                <SliderPrimitive.Range className="absolute h-full rounded-full bg-white " />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                onClick={() => {
                  play();
                }}
                className={clsx(
                  "block h-5 w-5 rounded-full bg-white hover:cursor-pointer",
                  "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                )}
              />
            </SliderPrimitive.Root>
          </div>
        </div>
      }
    </div>
  );
};

export default TestPlayerNew;
