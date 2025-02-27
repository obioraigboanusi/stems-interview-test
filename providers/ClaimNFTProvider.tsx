//MOCK INFO SO WE DONT BREAK THE APP
import React from "react";

type ClaimContext = {
  raceId?: string;
  isLoading: boolean;
  claim: any;
  openClaimPopUp: boolean;
  openNotEligiblePopUp: boolean;
  setOpenClaimPopUp: (open: boolean) => void;
  setOpenNotEligiblePopUp: (open: boolean) => void;
  raceResults: any;
  isRacePage: boolean;
  handleCheckEligibility: () => void;
  handleClaimNFT: (accountAddress: string) => void;
  handleNotEligibleToClaim: () => void;
};

const ClaimNFTContext = React.createContext<ClaimContext>({} as ClaimContext);

export const useClaimNFT = () => React.useContext(ClaimNFTContext);

export const ClaimNFTProvider: React.FC<{
  raceId?: string;
  children: React.ReactNode;
}> = ({ raceId, children }) => {
  const dummyValue: ClaimContext = {
    raceId,
    isLoading: false,
    claim: {},
    openClaimPopUp: false,
    openNotEligiblePopUp: false,
    setOpenClaimPopUp: () => {},
    setOpenNotEligiblePopUp: () => {},
    raceResults: {},
    isRacePage: false,
    handleCheckEligibility: () => {},
    handleClaimNFT: () => {},
    handleNotEligibleToClaim: () => {},
  };

  return (
    <ClaimNFTContext.Provider value={dummyValue}>
      {children}
    </ClaimNFTContext.Provider>
  );
};


// import { trpc } from "../utils/trpc";
// import { useFirebaseAuth } from "@utils/firebase";
// import React, { useEffect } from "react";
// import { createContext, useState, useContext } from "react";

// type ClaimContext = {
//   raceId?: string;
//   txHash?: string;
//   handleCheckEligibility: () => void;
//   handleClaimNFT: (accountAddress: string) => void;
//   handleNotEligibleToClaim: () => void;
//   isLoading: boolean;
//   claim: any;
//   openClaimPopUp: boolean;
//   openNotEligiblePopUp: boolean;
//   setOpenClaimPopUp: (open: boolean) => void;
//   setOpenNotEligiblePopUp: (open: boolean) => void;
//   raceResults: any;
//   isRacePage: boolean;
// };

// const ClaimNFTContext = createContext<ClaimContext>({} as ClaimContext);
// export const useClaimNFT = () => useContext(ClaimNFTContext);

// export const ClaimNFTProvider = ({
//   raceId,
//   children,
// }: {
//   raceId?: string;
//   children: React.ReactElement;
//   claim?: any;
// }) => {
//   const { user } = useFirebaseAuth();
//   const queryContext = trpc.useContext();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRacePage, setIsRacePage] = useState(false);
//   const [claim, setClaim] = useState({});
//   const [raceResults, setRaceResults] = useState({});
//   const [openClaimPopUp, setOpenClaimPopUp] = useState(false);
//   const [openNotEligiblePopUp, setOpenNotEligiblePopUp] = useState(false);

//   const claimEligibilityQuery = trpc.claims.getClaimEligibility.useQuery({
//     userId: user?.uid,
//     raceId,
//   });

//   const { data: claimData } = claimEligibilityQuery ?? {};
//   const handleCheckEligibility = () => {
//     setClaim(claimData);
//     setRaceResults(claimData?.Race?.RaceResults);
//     setIsRacePage(raceId == claimData?.Race?.uid);
//   };
//   const handleNotEligibleToClaim = () => {
//     setTimeout(() => {
//       setIsLoading(false);
//       setClaim(claimData);
//       if (!claimData?.eligible) {
//         setOpenNotEligiblePopUp(true);
//       }
//     }, 1000);
//   };
//   useEffect(() => {
//     handleCheckEligibility();
//   }, [claimData]);

//   const handleClaimNFT = async (accountAddress: string) => {
//     setIsLoading(true);
//     if (!user || !raceId) {
//       setIsLoading(false);
//       return;
//     }
//     await claimNFTMutation.mutate({
//       userId: user.uid,
//       raceId,
//       walletAddress: accountAddress,
//     });
//   };

//   const claimNFTMutation = trpc.claims.updateClaim.useMutation({
//     onMutate: async () => {
//       setIsLoading(true);
//     },
//     onSuccess: (result) => {
//       queryContext.claims.getClaimEligibility.invalidate();
//       setIsLoading(false);
//       setClaim(result);
//       setOpenClaimPopUp(true);
//     },
//   });

//   const value = {
//     raceId,
//     isLoading,
//     claim,
//     handleCheckEligibility,
//     handleNotEligibleToClaim,
//     handleClaimNFT,
//     openNotEligiblePopUp,
//     setOpenNotEligiblePopUp,
//     openClaimPopUp,
//     setOpenClaimPopUp,
//     raceResults,
//     isRacePage,
//   };

//   return (
//     <ClaimNFTContext.Provider value={value}>
//       {children}
//     </ClaimNFTContext.Provider>
//   );
// };
