import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import HoverCardDemo from "./shared/HoverCard";
import Loader from "./shared/Loader";
import Button from "./shared/button";
import useWindowSize from "@hooks/use-window-size";
import { usePrivy } from "@privy-io/react-auth";
import { useFirebaseAuth } from "@utils/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useClaimNFT } from "providers/ClaimNFTProvider";
import { useMusicPlayer } from "providers/MusicPlayerProvider";
import { useEffect } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { CopyLink, ShareTwitter, WebShare } from "~/components/shared/share";

export const ClaimedNFTPopup = ({ text }: { text?: boolean }) => {
  const { claim, openClaimPopUp, setOpenClaimPopUp } = useClaimNFT();

  return (
    <Dialog
      onOpenChange={(open) => setOpenClaimPopUp(open)}
      open={openClaimPopUp}
    >
      <DialogTrigger>
        <HoverCardDemo message="view claimed NFT">
          <div className="pr-1 cursor-pointer flex items-center">
            <MdVideoLibrary size={24} className="hover:scale-110" />
            {text && <p className=" ml-1">NFTs</p>}
          </div>
        </HoverCardDemo>
      </DialogTrigger>
      <DialogContent isopen={`${openClaimPopUp}`}>
        {claim?.claimed ? <SuccessfullyClaimedPopUp /> : <FailedClaimPopUp />}
      </DialogContent>
    </Dialog>
  );
};

const SuccessfullyClaimedPopUp = () => {
  const { claim, raceResults, isRacePage } = useClaimNFT();
  const { playPause, isPlaying, getCurrentTrack } = useMusicPlayer();
  const { isMobile } = useWindowSize();
  useEffect(() => {}, []);
  return (
    <>
      <h3 className="text-lg text-center font-bold text-white">
        Successfully Claimed NFT!
      </h3>
      <p className="text-sm text-center mt-2">
        Proof that you sourced Xcelencia&apos;s next hit 🔥
      </p>

      <div className="mt-4 text-sm font-normal text-white text-center">
        <div
          className="flex relative items-center justify-center"
          onClick={() => {
            playPause(raceResults?.releasedSong?.uid);
          }}
        >
          <Image
            width={400}
            height={400}
            src={
              "https://bbafbtqycmgvlyungeqn.supabase.co/storage/v1/object/public/images/NFTs/sju.jpg"
            }
            className="rounded-lg"
            alt="SJU NFT"
          />

          {isRacePage && (
            <button className="absolute bottom-[5px] left-[5px] cursor-pointer rounded-full md:hover:opacity-80 bg-indigo-500 opacity-50">
              {isPlaying &&
              isPlaying() &&
              getCurrentTrack()?.id == raceResults.releasedSong.uid ? (
                <FaPauseCircle className="w-6 h-6 md:w-8 md:h-8" />
              ) : (
                <FaPlayCircle className="w-6 h-6 md:w-8 md:h-8" />
              )}
            </button>
          )}
        </div>
        <h2 className="font-bold mt-2 mb-1">
          {" "}
          {raceResults.releasedSong.name || <>SJU (feat. Los Hitmen, Stems)</>}
        </h2>
        <p className="text-sm mb-2">{<>Xcelencia</>}</p>

        {claim.tx && (
          <a
            href={claim.etherscanUrl}
            className="text-sm cursor-pointer underline hover:text-vibrant hover:underline-vibrant"
            target="_blank" rel="noreferrer"
          >
            Transaction Details
          </a>
        )}
        <br />
        <small>(NFT can take a few minutes to show up in wallet)</small>
      </div>

      <div className="flex w-full items-center justify-center gap-8 mt-5">
        <button
          className="hover:scale-110 bg-white flex items-center justify-center gap-2 text-vibrant p-2 rounded-[2rem]"
          onClick={() => {
            window.open(claim.soundUrl, "_blank");
          }}
        >
          <Image
            width={30}
            height={30}
            alt="sound.xyz"
            className="w-6 h-6"
            src="/logos/soundlogo.png"
          />
        </button>
        <button
          className="hover:scale-110"
          onClick={() => {
            window.open(claim.openseaUrl, "_blank");
          }}
        >
          <Image
            width={40}
            height={40}
            alt="openSea"
            className="rounded-full"
            src="/logos/openSeaLogo.png"
          />
        </button>
        <ShareTwitter size={23} />
        <div className="md:-mt-10">
          {isMobile ? (
            <WebShare size={20} showBackground />
          ) : (
            <CopyLink size={23} showBackground />
          )}
        </div>
      </div>
    </>
  );
};

const FailedClaimPopUp = () => {
  const { claim, setOpenClaimPopUp } = useClaimNFT();

  return (
    <>
      <h3 className="text-xl text-start font-bold text-white">
        No NFTs have been claimed
      </h3>
      <p className="text-sm text-start mt-2">
        {claim?.eligible
          ? "Claim an NFT on the race page "
          : "Participate in the next race for a chance to win."}
      </p>
      <div className="mt-5 flex justify-end space-x-2">
        <Button
          className="w-20 inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-black border-primary border-2 hover:bg-white hover:border-white hover:text-dark1 rounded-100vw border border-transparent"
          onClick={() => {
            setOpenClaimPopUp(false);
            console.log(claim);
          }}
        >
          OK
        </Button>
      </div>
    </>
  );
};

const NotEligiblePopUp = () => {
  const {
    setOpenNotEligiblePopUp,
    openNotEligiblePopUp,
    handleNotEligibleToClaim,
  } = useClaimNFT();

  return (
    <Dialog
      onOpenChange={(open) => setOpenNotEligiblePopUp(open)}
      open={openNotEligiblePopUp}
    >
      <Button onClick={handleNotEligibleToClaim}>Check Eligibility</Button>

      <DialogContent isopen={`${openNotEligiblePopUp}`}>
        <h3 className="text-2xl text-center font-bold text-white">
          Not eligible for NFT!
        </h3>
        <p className="text-sm text-center mt-2">
          You needed to vote on SJU during the voting period or have submitted a
          sound to be eligible to claim an NFT for this race.
        </p>

        <div className="mt-4 flex flex-col items-center justify-center ">
          <p className="my-2 ">Purchase an NFT on the secondary market here:</p>
          <div className="flex w-full justify-center gap-4 items-center mt-3">
            <button
              className="hover:scale-110 bg-white flex items-center justify-center gap-2 text-vibrant p-2 rounded-[2rem]"
              onClick={() => {
                window.open(
                  `https://market.sound.xyz/collections/0x95dfed7bb6310dc68defa4118324557d116616cf/`,
                  "_blank"
                );
              }}
            >
              <Image
                width={30}
                height={30}
                alt="sound.xyz"
                className="w-4 h-4"
                src="/logos/soundlogo.png"
              />
            </button>
            <button
              className=""
              onClick={() => {
                window.open(
                  "https://opensea.io/collection/xcelencia-sju-w-los-hitmen-stems",
                  "_blank"
                );
              }}
            >
              <Image
                width={30}
                height={30}
                alt="openSea"
                className="rounded-full ml-2 hover:scale-110 cursor-pointer rounded-full"
                src="/logos/openSeaLogo.png"
              />
            </button>
          </div>
        </div>
        <div className="mt-5 flex justify-end space-x-2">
          <Button
            className="w-20 inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-black border-primary border-2 hover:bg-white hover:border-white hover:text-dark1 rounded-100vw border border-transparent"
            onClick={() => {
              setOpenNotEligiblePopUp(false);
            }}
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ClaimNFTFlow = ({}: {}) => {
  const { login, user } = usePrivy();
  const firebaseAuth = useFirebaseAuth();
  const router = useRouter();

  const { isLoading, handleCheckEligibility, handleClaimNFT, claim } =
    useClaimNFT();

  useEffect(() => {
    if (firebaseAuth.user && user) handleCheckEligibility();
  }, [firebaseAuth, user]);

  const getSituation = (
    firebaseAuth: any,
    user: any,
    login: any,
    eligibilityCheck: any
  ) => {
    if (!firebaseAuth.user) {
      return (
        <>
          <p>Winners can claim an NFT</p>
          <HoverCardDemo message="Proceed to login to check eligibility">
            <Button onClick={() => router.push("/auth/login")}>Login</Button>
          </HoverCardDemo>
        </>
      );
    }
    if (isLoading || !eligibilityCheck) {
      return (
        <>
          <div className="flex flex-col items-center gap-1">
            <Loader isLoading={isLoading || !eligibilityCheck} />
            <small>Processing...</small>
          </div>
        </>
      );
    }

    if (!eligibilityCheck.eligible) {
      return (
        <>
          <p>Winners can claim an NFT</p>
          <NotEligiblePopUp />
        </>
      );
    }

    if (eligibilityCheck.claimed) {
      return (
        <>
          <>NFT has been claimed!</>
          <div className="flex items-center justify-center gap-2">
            <ClaimedNFTPopup />

            <HoverCardDemo message="view NFT on OpenSea">
              <Image
                width={30}
                height={30}
                alt="openSea"
                className="rounded-full ml-2 hover:scale-110 cursor-pointer rounded-full"
                src="/logos/openSeaLogo.png"
                onClick={async () => {
                  window.open(eligibilityCheck?.openseaUrl, "_blank");
                }}
              />
            </HoverCardDemo>
          </div>
        </>
      );
    }
    if (eligibilityCheck.eligible) {
      return !user?.wallet ? (
        <>
          <p>
            You won!
            <br />
            <>Connect to claim NFT</>
          </p>
          <Button onClick={login}>Connect</Button>
        </>
      ) : (
        <>
          <p>You won!</p>
          <Button
            onClick={() => {
              handleClaimNFT(user?.wallet?.address);
            }}
          >
            Claim NFT
          </Button>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[191px] mx-2 max-[475px]:mt-3">
      <div className="mb-3 text-md font-bold text-center flex flex-col gap-2">
        {getSituation(firebaseAuth, user, login, claim)}
      </div>
    </div>
  );
};
