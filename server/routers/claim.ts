//MOCK INFO SO WE DONT BREAK THE APP
import { z } from "zod";

// Mock implementation of router
const router = () => ({
  getClaimEligibility: () => ({
    input: () => ({
      query: async () => ({
        raceId: "dummy-race-id",
        userId: "dummy-user-id",
        eligible: true,
        claimed: false,
        tx: null,
        tokenNumber: 1,
        openseaUrl: "https://example.com/opensea",
        etherscanUrl: "https://example.com/etherscan",
        soundUrl: "https://example.com/sound",
      }),
    }),
  }),
  updateClaim: () => ({
    input: () => ({
      mutation: async () => ({
        uid: "dummy-uid",
        raceId: "dummy-race-id",
        userId: "dummy-user-id",
        eligible: true,
        claimed: true,
        tx: "dummy-tx-hash",
        tokenNumber: 1,
        openseaUrl: "https://example.com/opensea",
        etherscanUrl: "https://example.com/etherscan",
        soundUrl: "https://example.com/sound",
      }),
    }),
  }),
});

// Mock implementation of publicProcedure
const publicProcedure = {
  input: (schema: z.ZodType<any>) => ({
    query: async () => ({}),
    mutation: async () => ({}),
  }),
};

export const claimRouter = router();

// import { PrismaClient } from "@prisma/client";
// import { publicProcedure, router } from "@server/trpc";
// import { SoundClient } from "@soundxyz/sdk";
// import { TRPCError } from "@trpc/server";
// import { Transaction, ethers } from "ethers";
// import { z } from "zod";

// const sendNFT = async (
//   raceId: string,
//   address: string,
//   tokenNumber: string
// ): Promise<string> => {
//   const rpc_url =
//     process.env.NEXT_PUBLIC_NODE_ENV === "production" ||
//     process.env.NEXT_PUBLIC_NODE_ENV === "staging"
//       ? "https://eth-mainnet.alchemyapi.io/v2/5FtBcuoylPfw_nUCPtO75kvoVoTkdmKb" // Mainnet if production // TODO: Set to env var
//       : "https://eth-goerli.g.alchemy.com/v2/5FtBcuoylPfw_nUCPtO75kvoVoTkdmKb"; // Testnet if development // TODO: Set to env var

//   const provider = new ethers.providers.JsonRpcProvider(rpc_url);

//   const signer = new ethers.Wallet(
//     process.env.NEXT_PUBLIC_ETH_PRIVATE_KEY || "",
//     provider
//   );

//   const client = SoundClient({
//     signer: signer,
//     soundCreatorAddress: "0xaef3e8c8723d9c31863be8de54df2668ef7c4b89",
//   });

//   const salt =
//     process.env.NEXT_PUBLIC_NODE_ENV === "production"
//       ? "O45YryiAz5oWSDeohG37"
//       : "stems-prod-2";
//   let editionAddress;

//   if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
//     editionAddress = "0x95dfed7BB6310dc68defA4118324557d116616CF";
//   } else {
//     const response = await client.expectedEditionAddress({
//       deployer:
//         process.env.NEXT_PUBLIC_ETH_ADDRESS ||
//         "0xEb0e6600420C35118aB52e483E9300767F6a9ae3",
//       salt: salt,
//     });
//     editionAddress = response.editionAddress;
//   }
//   const contract = new ethers.Contract(
//     editionAddress,
//     [
//       {
//         inputs: [
//           { internalType: "address", name: "from", type: "address" },
//           { internalType: "address", name: "to", type: "address" },
//           { internalType: "uint256", name: "tokenNumber", type: "uint256" },
//         ],
//         name: "transferFrom",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//     ],
//     signer
//   );

//   let tx: Transaction;
//   try {
//     tx = await contract.transferFrom(signer.address, address, tokenNumber);
//   } catch (error) {
//     throw Error("Error sending NFT: " + error);
//   }
//   if (tx !== undefined) {
//     return tx?.hash || "ERROR";
//   } else {
//     throw Error("tx undefined");
//   }
// };

// interface IClaim {
//   uid?: string;
//   raceId: string;
//   userId: string;
//   eligible: boolean;
//   claimed: boolean;
//   tx?: string | null;
//   tokenNumber: number | null;
//   openseaUrl?: string | null;
//   etherscanUrl?: string | null;
//   soundUrl?: string | null;
// }

// const generateUrls = (claim: IClaim, tx: string) => {
//   const isProduction =
//     process.env.NEXT_PUBLIC_NODE_ENV === "production" ||
//     process.env.NEXT_PUBLIC_NODE_ENV === "staging";
//   const opensea_url = isProduction
//     ? "https://opensea.io/assets/ethereum/0x95dfed7BB6310dc68defA4118324557d116616CF/"
//     : "https://testnets.opensea.io/assets/goerli/0x730df79b10955a54ea26fb56bc65419e7a4164c0/";

//   const etherscan_url = isProduction
//     ? "https://etherscan.io/tx/"
//     : "https://goerli.etherscan.io/tx/";

//   const sound_url = `https://market.sound.xyz/0x95dfed7bb6310dc68defa4118324557d116616cf/`;
//   claim.openseaUrl = `${opensea_url}${claim.tokenNumber}`;
//   claim.soundUrl = `${sound_url}${claim.tokenNumber}`;
//   claim.etherscanUrl = `${etherscan_url}${tx}`;
//   return claim;
// };

// export const claimRouter = router({
//   getClaimEligibility: publicProcedure
//     .input(
//       z.object({ userId: z.string().optional(), raceId: z.string().optional() })
//     )
//     .query(async ({ ctx, input }) => {
//       const { prisma }: any = ctx;
//       try {
//         if (!input.userId) return null;

//         input.raceId = "d5cf2093-d449-444a-aea9-d60073505500";
//         return await prisma.$transaction(async (transaction: PrismaClient) => {
//           let claim: IClaim | null = await transaction.claim.findFirst({
//             where: {
//               userId: input.userId,
//             },
//             select: {
//               raceId: true,
//               userId: true,
//               eligible: true,
//               claimed: true,
//               tx: true,
//               tokenNumber: true,
//               openseaUrl: true,
//               Race: {
//                 select: {
//                   uid: true,
//                   RaceResults: {
//                     select: {
//                       NftImageUrl: true,
//                       streamUrl: true,
//                       soundUrl: true,
//                       openSeaUrl: true,
//                       releasedSong: {
//                         select: {
//                           name: true,
//                           songUrl: true,
//                           uid: true,
//                           artist: true,
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           });
//           if (claim !== null) {
//             return claim.tx ? generateUrls(claim, claim.tx) : claim;
//           }
//           const hasUserVotedOnWinningTrack: any = await prisma.Track.findFirst({
//             where: {
//               isWinning: true,
//               UserLikes: {
//                 some: {
//                   userId: input.userId,
//                   active: true,
//                 },
//               },
//             },
//           });

//           const hasUserSubmittedBeat: any = await prisma.track.findFirst({
//             where: { userId: input.userId, raceId: input.raceId },
//           });

//           const isEligible: boolean =
//             hasUserVotedOnWinningTrack !== null ||
//             hasUserSubmittedBeat !== null;
//           if (isEligible) {
//             let token;
//             token = await transaction.tokenTracker.findUnique({
//               where: { raceId: input.raceId },
//             });
//             if (!token) {
//               token = await transaction.tokenTracker.create({
//                 data: {
//                   number: 0,
//                   raceId: input.raceId as string,
//                 },
//               });
//             }
//             await transaction.tokenTracker.update({
//               where: { raceId: input.raceId },
//               data: {
//                 number: token.number + 1,
//               },
//             });
//             claim = {
//               raceId: input.raceId as string,
//               userId: input.userId as string,
//               eligible: isEligible,
//               claimed: false,
//               tx: null,
//               tokenNumber: token?.number || 0,
//               openseaUrl: null,
//             };
//             claim = await transaction.claim.create({
//               data: claim,
//               select: {
//                 raceId: true,
//                 userId: true,
//                 eligible: true,
//                 claimed: true,
//                 tx: true,
//                 tokenNumber: true,
//                 openseaUrl: true,
//               },
//             });
//             return claim;
//           } else
//             return {
//               raceId: input.raceId,
//               userId: input.userId,
//               eligible: isEligible,
//               claimed: false,
//               tx: null,
//               tokenNumber: null,
//               openseaUrl: null,
//             };
//         });
//       } catch (err) {
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Could not complete transaction. Please try again later",
//         });
//       }
//     }),
//   updateClaim: publicProcedure
//     .input(
//       z.object({
//         userId: z.string(),
//         raceId: z.string(),
//         walletAddress: z.string(),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
//       const { prisma }: any = ctx;
//       try {
//         let claim: IClaim | null = await prisma.claim.findFirst({
//           where: {
//             userId: input.userId,
//             raceId: input.raceId,
//           },
//           select: {
//             uid: true,
//             raceId: true,
//             userId: true,
//             eligible: true,
//             claimed: true,
//             tx: true,
//             tokenNumber: true,
//             openseaUrl: true,
//           },
//         });

//         if (
//           claim &&
//           claim.eligible &&
//           claim.tokenNumber !== null &&
//           !claim.claimed
//         ) {
//           let tx;
//           tx = await sendNFT(
//             input.raceId,
//             input.walletAddress,
//             claim.tokenNumber.toString()
//           );

//           claim = generateUrls(claim, tx);

//           let updatedClaim = await prisma.claim.update({
//             where: { uid: claim.uid },
//             data: {
//               raceId: input.raceId,
//               userId: input.userId,
//               eligible: claim.eligible,
//               claimed: true,
//               tx: tx,
//               tokenNumber: claim.tokenNumber,
//               openseaUrl: claim.openseaUrl,
//               etherscanUrl: claim.etherscanUrl,
//               soundUrl: claim.soundUrl,
//             },
//           });
//           return updatedClaim;
//         }
//         return claim;
//       } catch (err) {
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Could not complete transaction. Please try again later",
//         });
//       }
//     }),
// });
