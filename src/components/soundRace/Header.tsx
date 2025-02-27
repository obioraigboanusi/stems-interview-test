import InstagramIcon from "../../../public/logos/instagram.svg";
import SpotifyIcon from "../../../public/logos/spotify.svg";
import TwitterIcon from "../../../public/logos/x.svg";
import GeniusIcon from "../../../public/logos/genius.svg";
import HoverCardDemo from "../shared/HoverCard";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/20/solid";
import useWindowSize from "@hooks/use-window-size";
import * as Dialog from "@radix-ui/react-dialog";
import { useFirebaseAuth } from "@utils/firebase";
import Image from "next/image";
import Link from "next/link";
import { useMusicPlayer } from "providers/MusicPlayerProvider";
import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

type socials = {
  imageUrl: string | null;
  spotifyUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  geniusUrl?: string | null;
};
type results = {
  NftImageUrl: string | null;
  streamUrl: string | null;
  soundUrl: string | null;
  openSeaUrl: string | null;
};

type HeaderProps = {
  id?: string;
  name?: string;
  description?: string | null;
  socials?: socials | null;
  results?: results | null;
  isExpired?: boolean | null;
  isRace?: boolean | null;
  bio?: string | null;
  imageUrl?: string | null;
};

const ArtistPageHeader = (props: HeaderProps) => {
  const { isMobile } = useWindowSize();

  return (
    <div className=" flex-1 relative bg-gradient-to-br from-[#927FF5] to-[#6587FD] rounded-[0.75rem] mb-4 md:mb-auto py-3 px-5 md:px-6 md:py-8 overflow-hidden md:flex justify-between">
      {props.socials?.imageUrl && (
        <div className="flex absolute h-[300px] w-[300px] md:w-[500px] md:h-[500px] rounded-full -top-[20px] -right-[120px] md:-top-[20px] md:-right-[200px] overflow-hidden">
          <Image
            src={props.socials.imageUrl}
            width={isMobile ? 300 : 500}
            height={isMobile ? 300 : 500}
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] object-cover opacity-25 "
            alt={props.name || "artist"}
            priority
          />
        </div>
      )}{" "}
      <div className="flex flex-col relative z-[2] justify-evenly">
        <h1 className="text-6xl font-bold h-48 flex items-end">
          {props.name ?? "Artist"}
          <br />
        </h1>
        {props?.bio && <p>{props.bio}</p>}
      </div>
    </div>
  );
};

const RacePageHeader = (props: HeaderProps) => {
  const { isMobile } = useWindowSize();
  return (
    <div className="flex-1 relative bg-gradient-1 rounded-[0.75rem] py-3 px-5 md:px-6 md:py-5 overflow-hidden flex justify-between z-0 ">
      <div className="flex flex-col relative justify-evenly   absolute z-10">
        <h1 className={"text-4xl font-bold"}>
          {props.name}
          <br />
          Sound Race
        </h1>
        {props.results && (
          <div className=" flex items-center justify-start gap-2 mt-4">
            {
              <>
                <HoverCardDemo message="Collect NFT on Sound.xyz">
                  <span
                    className="hover:scale-110 bg-white flex items-center justify-center gap-2 text-vibrant p-2 rounded-[2rem]"
                    onClick={() => {
                      window.open(props.results?.soundUrl || "/", "_blank");
                    }}
                  >
                    <img className="w-6 h-6" src="/logos/soundlogo.png" />
                  </span>
                </HoverCardDemo>
                <HoverCardDemo message="Collect NFT on OpenSea">
                  <span
                    className="hover:scale-110 w-10 h-10 flex"
                    onClick={() => {
                      window.open(props.results?.openSeaUrl || "/", "_blank");
                    }}
                  >
                    <img
                      className="w-full h-full rounded-full"
                      src="https://firebasestorage.googleapis.com/v0/b/stems-app-v2.appspot.com/o/openSeaLogo.png?alt=media&token=a4962527-cc36-4098-8e26-dc69f40ebc05"
                    />
                  </span>
                </HoverCardDemo>
                <HoverCardDemo message="SJU on streaming platforms">
                  <span
                    onClick={() =>
                      window.open(props.results?.streamUrl || "/", "_blank")
                    }
                    className="-mb-4 py-2 px-3 text-xs md:text-sm bg-white rounded-[2rem] text-vibrant  hover:scale-110"
                  >
                    Stream
                  </span>
                </HoverCardDemo>
              </>
            }
          </div>
        )}
      </div>
      <div className="flex absolute h-[300px] w-[300px] md:w-[500px] md:h-[500px] rounded-full -top-[50px] -right-[150px] md:-top-[100px] md:-right-[200px] overflow-hidden z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {props.socials?.imageUrl && (
          <Image
            src={props.socials?.imageUrl}
            width={isMobile ? 300 : 500}
            height={isMobile ? 300 : 500}
            className="object-cover opacity-25"
            alt={props.name || "artist image"}
            priority
          />
        )}
      </div>
    </div>
  );
};

const ArtistSubmissionsPageHeader = (props: HeaderProps) => {
  const { setShowNotLoggedInModal } = useMusicPlayer();
  const { user } = useFirebaseAuth();
  const { isMobile } = useWindowSize();
  return (
    <div
      style={{ minHeight: 160 }}
      className="flex-1 relative bg-gradient-1 rounded-[0.75rem]  px-5 md:px-6  overflow-hidden flex justify-between items-end z-0 "
    >
      <div className=" relative z-10 bottom-0 ">
        <div className="flex flex-col justify-end items-start  mt-6 ">
          <h1 className={"text-4xl font-bold"}>{props.name}</h1>
          {props.bio ? (
            <span className="text-sm mt-2">{props.bio}</span>
          ) : (
            <></>
          )}
          <div className="w-auto  h-auto mt-2 ">
            <Link
              href={user ? `/submit-beat?artistSubmissionId=${props.id}` : `#`}
              onClick={() => setShowNotLoggedInModal(true)}
            >
              <button className="text-gray-100 bg-black hover:bg-black/60 rounded-3xl text-sm px-2 md:px-5 py-2.5 text-center mb-2 w-auto self-center">
                + Submit a track
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex absolute h-[300px] w-[300px] md:w-[500px] md:h-[500px] rounded-full -top-[50px] -right-[150px] md:-top-[100px] md:-right-[200px] overflow-hidden z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {props.socials?.imageUrl && (
          <Image
            src={props.socials?.imageUrl}
            width={isMobile ? 300 : 500}
            height={isMobile ? 300 : 500}
            className="object-cover opacity-25"
            alt={props.name || "artist image"}
            priority
          />
        )}
      </div>
    </div>
  );
};

export default function Header(props: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useWindowSize();

  const [showDetails, setShowDetails] = useState(!props.isRace);
  const [showFullText, setShowFullText] = useState(false);
  const [showFullSongsList, setShowFullSongsList] = useState(!props.isRace);
  const { getInspirationTracks, getCurrentTrack, isPlaying, playPause } =
    useMusicPlayer();
  const inspirationTracks = getInspirationTracks();
  const hasInspirationTracks = inspirationTracks && inspirationTracks.length > 0;

  return (
    <div>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <div className="w-full">
          <div className="flex flex-col w-full lg:flex-row lg:gap-2">
            {props.isRace ? (
              <RacePageHeader
                name={props.name}
                description={props.description}
                socials={props.socials}
                results={props.results}
              />
            ) : (
              <ArtistSubmissionsPageHeader
                id={props.id}
                name={props.name}
                description={props.description}
                socials={props.socials}
                bio={props.bio}
              />
            )}
            <div className="flex-none bg-[#22202E] mt-2 lg:mt-0 rounded-[0.75rem] px-2 py-2 md:px-4 md:py-1 -z-1">
              <h2 className="text-base md:text-lg font-bold flex gap-2 items-center">
                About {props.name}
                <span className="flex gap-4 ml-4 items-center">
                  {props.socials?.spotifyUrl && (
                    <a
                      href={props.socials?.spotifyUrl}
                      target="_blank"
                      className="icons"
                      rel="noreferrer"
                    >
                      <SpotifyIcon className="fill-gray-100 scale-50 hover:fill-green-500" />
                    </a>
                  )}
                  {props.socials?.twitterUrl && (
                    <a
                      href={props.socials?.twitterUrl}
                      target="_blank"
                      className="icons"
                      rel="noreferrer"
                    >
                      <TwitterIcon className="fill-gray-100 hover:fill-blue-400" />
                    </a>
                  )}
                  {props.socials?.instagramUrl && (
                    <a
                      href={props.socials?.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <InstagramIcon className="fill-gray-100 hover:fill-purple-600" />
                    </a>
                  )}
                  {props.socials?.geniusUrl && (
                    <a
                      href={props.socials?.geniusUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GeniusIcon className="fill-gray-100 hover:fill-yellow-500" />
                    </a>
                  )}
                </span>
              </h2>
              {props.description && (
                <>
                  <h3
                    onClick={() => setShowDetails(!showDetails)}
                    className="cursor-pointer text-xs mt-3 uppercase text-gray-500 hover:text-white underline font-bold flex items-center"
                  >
                    The Artist is Looking for
                    {showDetails ? <FaAngleDown /> : <FaAngleRight />}
                  </h3>
                  <div className="text-sm mt-1 w-[400px] max-w-full">
                    {showDetails && (
                      <p className="text-sm  w-[400px] max-w-full">
                        {props.description}
                      </p>
                    )}
                  </div>
                </>
              )}

              {hasInspirationTracks && (
                <>
                  <h3
                    onClick={() => {
                    if (isMobile) setShowFullSongsList(!showFullSongsList);
                  }}
                  className="text-xs mt-3 uppercase text-gray-500 font-bold cursor-pointer hover:text-white md:hover:text-gray-500 underline md:no-underline flex items-center"
                >
                  The Artist`s Recent Songs
                  {isMobile && (
                    <> {showFullSongsList ? <FaAngleDown /> : <FaAngleRight />}</>
                  )}
                </h3>
                <div className="mt-0 flex flex-col text-sm border-t border-t-white/10">
                  {isMobile && !showFullSongsList ? (
                    <></>
                  ) : (
                    inspirationTracks.map((track, i) => (
                      <button
                        key={track.id}
                        className="flex items-center px-2 py-2 md:hover:opacity-80 rounded-md"
                        style={{
                          background:
                            track.id === getCurrentTrack()?.id
                              ? "linear-gradient(129.85deg, #927FF5 14.55%, #6587FD 93.91%)"
                              : "transparent",
                        }}
                        onClick={() => {
                          playPause(track.id);
                        }}
                      >
                        {track.id === getCurrentTrack()?.id && isPlaying() ? (
                          <PauseCircleIcon className="h-8 w-8 md:h-6 md:w-6" />
                        ) : (
                          <PlayCircleIcon className="h-8 w-8 md:h-6 md:w-6" />
                        )}
                        <p className="ml-2 text-xs md:text-sm">
                          {track.name}
                        </p>
                        {track.isWinning && (
                          <HoverCardDemo message="SJU on streaming platforms">
                            <span
                              onClick={() =>
                                window.open(
                                  props.results?.streamUrl || "/",
                                  "_blank"
                                )
                              }
                              className=" ml-10 py-2 px-3 text-xs md:text-sm bg-white rounded-[2rem] text-vibrant hover:scale-110"
                            >
                              Stream
                            </span>
                          </HoverCardDemo>
                        )}
                      </button>
                    ))
                  )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Dialog.Root>
    </div>
  );
}
