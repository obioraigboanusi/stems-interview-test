import { ClaimedNFTPopup } from "../claimNftFlow";
import { Dialog, DialogTrigger, DialogContent } from "../dialog";
import {
  NavigationContent,
  NavigationItem,
  NavigationLink,
  NavigationRoot,
  NavigationTrigger,
} from "../navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Button from "../shared/button";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import useWindowSize from "@hooks/use-window-size";
import { usePrivy } from "@privy-io/react-auth";
import { useFirebaseAuth } from "@utils/firebase";
import { trpc } from "@utils/trpc";
import clsx from "clsx";
import truncate from "lodash/truncate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsSoundwave } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import {
  BsArrowUpCircle }from "react-icons/bs";

// export const AccountButton = () => {
//   const { login, logout, user } = usePrivy();

//   return !user?.wallet ? (
//     <div
//       className="w-20 h-7 text-xs mt-1 flex items-center justify-center"
//       onClick={login}
//     >
//       Connect
//     </div>
//   ) : (
//     <div
//       className="w-20 h-7 text-xs mt-1 flex items-center justify-center"
//       onClick={logout}
//     >
//       Disconnect
//     </div>
//   );
// };

const ProfileCard = () => {
  const { data: userData } = trpc.users.getUser.useQuery();
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex cursor-pointer items-center justify-between rounded-lg bg-dark2 py-2.5 px-2">
          <div className="flex w-auto flex-row items-center justify-around gap-1">
            <div className="relative h-4 w-4">
              <Image src="/assets/logo-mark.svg" alt="Stems logo" fill />
            </div>
            <div className="flex w-full items-center justify-center text-xs text-gray-100 md:text-sm">
              {userData
                ? truncate(userData?.username, { length: 10 })
                : "user.eth"}
            </div>
            <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-100" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 rounded-lg">
        <div className="flex flex-col items-center justify-center p-2  w-full">
          <h2 className="flex items-center justify-start w-full mt-2 font-bold">
            <RiAccountCircleLine size={28} /> <a className="ml-1">Account</a>
          </h2>
          {/* <div className="flex items-center justify-start ml-4 md:ml-12 my-3 w-full">
            <a className="flex items-center mr-3 md:mr-4">
              <IoWalletOutline size={24} /> &nbsp; Wallet
            </a>
            // <AccountButton />
          </div> */}

          {/* <div className="flex items-center justify-start ml-4 md:ml-12 mb-3 w-full">
            <ClaimedNFTPopup text />
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// const Tutorial = () => {
//   const { isMobile } = useWindowSize();
//   const [showDialog, setShowDialog] = useState(false);
//   const router = useRouter();
//   const { user } = useFirebaseAuth();

//   return (
//     <Dialog onOpenChange={(open) => setShowDialog(open)} open={showDialog}>
//       <DialogTrigger>
//         {isMobile ? (
//           <InformationCircleIcon className="mr-2 h-5 w-5 text-gray-100" />
//         ) : (
//           <div className="flex h-full cursor-pointer flex-col justify-center">
//             <p className="mr-2 text-sm underline transition-colors hover:text-primary">
//               How it works
//             </p>
//           </div>
//         )}
//       </DialogTrigger>
//       <DialogContent isopen={`${showDialog}`}>
//         <div className="flex w-full flex-col justify-between text-sm">
//           <div>
//             <div className="relative mx-auto mt-4 flex h-12 w-36 justify-center">
//               <Image
//                 className="scale-125"
//                 src="/assets/Logo.svg"
//                 alt="tutorial"
//                 fill
//               />
//             </div>
//             <h1 className="mt-6 text-lg font-semibold">
//               Submit and vote on beats
//             </h1>
//             <h2 className="mt-2 text-base text-primary">
//               Used by artists in their next song!
//             </h2>
//             <p className="mt-4">How it works:</p>
//             <p className="mt-4 ml-4">1. Artist opens a Sound Race</p>
//             <p className="mt-2 ml-4">2. Producers submit beats</p>
//             <p className="mt-2 ml-4">
//               3. Fans vote on their favorite submissions
//             </p>
//             <p className="mt-2 ml-4">4. Artist selects beat and records song</p>
//             <p className="mt-2 ml-4">
//               5. Voters of the artist-selected beat receive a NFT
//             </p>
//             <p className="mt-4">{"You have 5 💜's (votes)."}</p>
//             <p className="mt-4">Good luck!</p>
//           </div>

//           <div className="flex w-full justify-center">
//             <div
//               className="mt-4 flex w-[300px] cursor-pointer justify-center rounded-[2rem] bg-primary px-8 py-4 md:hover:opacity-80"
//               onClick={() => {
//                 if (!user) {
//                   router.push("/auth/login");
//                 }
//                 setShowDialog(false);
//               }}
//             >
//               {!user && "Login to get started"}
//               {user && "Get started"}
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const ArtistPageTutorial = () => {
//   const { isMobile } = useWindowSize();
//   const [showDialog, setShowDialog] = useState(false);
//   const router = useRouter();
//   const { user } = useFirebaseAuth();

//   return (
//     <Dialog onOpenChange={(open) => setShowDialog(open)} open={showDialog}>
//       <DialogTrigger>
//         {isMobile ? (
//           <InformationCircleIcon className="mr-2 h-5 w-5 text-gray-100" />
//         ) : (
//           <div className="flex h-full cursor-pointer flex-col justify-center">
//             <p className="mr-2 text-sm underline transition-colors hover:text-primary">
//               How it works
//             </p>
//           </div>
//         )}
//       </DialogTrigger>
//       <DialogContent isopen={`${showDialog}`}>
//         <div className="flex w-full flex-col justify-between text-sm">
//           <div>
//             <div className="relative mx-auto mt-4 flex h-12 w-36 justify-center">
//               <Image
//                 className="scale-125"
//                 src="/assets/Logo.svg"
//                 alt="tutorial"
//                 fill
//               />
//             </div>
//             <h1 className="mt-6 text-lg font-semibold">
//               Submit and vote on beats
//             </h1>
//             <h2 className="mt-2 text-base text-primary">
//               Used by artists in their next song!
//             </h2>
//             <p className="mt-4">How it works:</p>
//             <p className="mt-4 ml-4">1. Producers submit beats</p>
//             <p className="mt-2 ml-4">
//               2. Fans vote on their favorite submissions
//             </p>
//             <p className="mt-2 ml-4">
//               3. Rewards for voters of artist-selected beats
//             </p>

//             <p className="mt-4 flex">
//               {" "}
//               You have 5 &nbsp; <BsArrowUpCircle/> &nbsp;’s per artist page
//             </p>
//             <p className="mt-4">Good luck!</p>
//           </div>

//           <div className="flex w-full justify-center">
//             <div
//               className="mt-4 flex w-[300px] cursor-pointer justify-center rounded-[2rem] bg-primary px-8 py-4 md:hover:opacity-80"
//               onClick={() => {
//                 if (!user) {
//                   router.push("/auth/login");
//                 }
//                 setShowDialog(false);
//               }}
//             >
//               {!user && "Login to get started"}
//               {user && "Get started"}
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

type NavProps = {
  simple?: boolean;
  artist?: boolean;
};

function Nav(props: NavProps) {
  const { user } = useFirebaseAuth();
  const { isMobile } = useWindowSize();
  const { data: userData } = trpc.users.getUser.useQuery();
  const [isOpen, setIsOpen] = useState(false);
  if (isMobile) {
    return (
      <div className="relative flex w-full items-center justify-between py-3 h-16">
        <div className="relative w-48 ">
          {/* <Link href="/" passHref className="w-48">
            <Image
              src="/assets/Logo.svg"
              alt="Stems Logo"
              width={256}
              height={128}
            />
          </Link> */}
        </div>
        
        {/* <div className="flex w-full justify-end mr-4">
          {props.artist ? <ArtistPageTutorial /> : <Tutorial />}
        </div> */}
        <div>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
              className={clsx(
                "rounded-md px-3 py-2 text-sm hover:bg-dark2/40",
                "group text-sm font-medium text-gray-100"
              )}
            >
              <div className="flex flex-col items-center w-5">
                <span
                  className={`block h-px bg-white w-5 transition-transform duration-300 ease-in-out ${
                    isOpen ? " w-7 transform rotate-45 delay-75" : "my-1"
                  }`}
                ></span>
                <span
                  className={`block h-px bg-white w-5 my-1 ${
                    isOpen ? "h-0 my-auto" : ""
                  }`}
                ></span>
                <span
                  className={`block h-px bg-white w-5 transition-transform duration-300 ease-in-out ${
                    isOpen ? "transform -rotate-45 w-7 delay-75" : "my-1 "
                  }`}
                ></span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-72 rounded-lg bg-dark1 py-5">
              {user ? (
                <div>
                  <div className="flex flex-col items-start justify-center w-full">
                    <h2 className="flex items-center justify-start w-full mt-2 ml-1 text-white uppercase text-xl font-medium">
                      <a className="ml-1">{userData?.username}</a>
                    </h2>
                    {/* <div className="flex items-center justify-start ml-4 md:ml-12 my-3 w-full">
                      <a className="flex items-center mr-3 md:mr-4 text-gray-400 hover:bg-gray-100 text-lg">
                        <IoWalletOutline size={24} /> &nbsp; Wallet
                      </a>
                      <div className="m-auto">
                        <AccountButton /> 
                      </div>
                    </div> */}

                    {/* <div className="flex items-center justify-start ml-4 md:ml-12 mb-3 w-full text-gray-400 hover:bg-gray-100 text-lg">
                      <ClaimedNFTPopup text /> 
                    </div> */}
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-center justify-start">
                  <Link href="/auth/login">
                    {/* Login */}
                    <div className="rounded-[1.5rem] bg-primary px-8 py-2 text-sm font-medium text-white md:hover:opacity-80 mb-3">
                      Login
                    </div>
                  </Link>
                </div>
              )}
              {/* <div className="mt-3">
                <h3 className="text-white uppercase text-xl font-medium font-medium mb-2 ml-1 flex items-center gap-2">
                  Races
                </h3>
                <Link
                  href="/race/d5cf2093-d449-444a-aea9-d60073505500"
                  className="text-gray-400 hover:bg-gray-100 block px-4 py-2 text-lg"
                >
                  Xcelencia
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:bg-gray-100 block px-4 py-2 text-lg"
                >
                  Coming soon
                </Link>
              </div> */}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  } else
    return (
      <div className="relative flex w-full items-center justify-between">
        {/* <div className="relative h-16 w-32"> */}
          {/* <Link href="/" passHref>
            <Image src="/assets/Logo.svg" alt="Stems Logo" fill />
          </Link> */}
        {/* </div> */}
        <div>
          {/* <NavigationRoot>
            <NavigationItem className="relative">
              <NavigationTrigger
                className={clsx(
                  "rounded-md px-3 py-2 text-sm hover:bg-dark2/40",
                  "group text-sm font-medium text-gray-100"
                )}
              >
                <div className="flex flex-row items-center">
                  {"Races"}
                  <ChevronDownIcon className="ml-1 h-3 w-3 transform font-bold transition-transform duration-150 ease-in-out group-radix-state-open:-rotate-180" />
                </div>
              </NavigationTrigger>
              <NavigationContent>
                <NavigationLink href="#">
                  <span className="text-sm font-normal leading-8 text-gray-100">
                    Coming soon
                  </span>
                  <div className="mt-0.5 text-xs text-gray-400">
                    Explore the sound races coming soon.
                  </div>
                </NavigationLink>
                <NavigationLink href="/race/d5cf2093-d449-444a-aea9-d60073505500">
                  <span className="text-sm font-normal leading-8 text-gray-100">
                    Xcelencia
                  </span>
                  <div className="mt-0.5 text-xs text-gray-400">
                    Explore Xcelencia&apos;s sound race.
                  </div>
                </NavigationLink>
              </NavigationContent>
            </NavigationItem>
          </NavigationRoot> */}
        </div>
        <div>
          {/* {props.artist ? <ArtistPageTutorial /> : <Tutorial />} */}
          {user ? (
            <ProfileCard />
          ) : (
            <Link href="/auth/login">
              {/* Login */}
              <div className="rounded-[1.5rem] bg-primary px-4 py-2 text-sm font-medium text-white md:hover:opacity-80">
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
    );
}

export default Nav;
