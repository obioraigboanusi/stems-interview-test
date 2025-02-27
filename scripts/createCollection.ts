// import { SoundClient, MintConfig } from "@soundxyz/sdk";
// import dotenv from "dotenv";
// import { ethers } from "ethers";

// dotenv.config();

// const rpc_url =
//   process.env.NODE_ENV === "production"
//     ? "https://eth-mainnet.alchemyapi.io/v2/5FtBcuoylPfw_nUCPtO75kvoVoTkdmKb" // Mainnet if production
//     : "https://eth-goerli.g.alchemy.com/v2/5FtBcuoylPfw_nUCPtO75kvoVoTkdmKb"; // Testnet if development

// const provider = new ethers.providers.JsonRpcProvider(rpc_url);
// console.log("🚀 | provider", provider);

// const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY || "", provider);
// console.log("🚀 | wallet", wallet);
// const client = SoundClient({
//   signer: wallet,
//   soundCreatorAddress: "0xaef3e8c8723d9c31863be8de54df2668ef7c4b89",
// });

// // The Salt is used to generate a unique edition ID
// // It is recommended to use a unique salt for each edition
// // It is recommended that the salt = raceID
// const salt = "d5cf2093-d449-444a-aea9-d60073505500";

// const editionConfig = {
//   name: "Testv3",
//   symbol: "Testv3",
//   metadataModule: ethers.constants.AddressZero,
//   baseURI: "",
//   contractURI: "",
//   fundingRecipient: wallet.address,
//   royaltyBPS: 1,
//   editionMaxMintableLower: 10,
//   editionMaxMintableUpper: 10,
//   editionCutoffTime: 999999998,
//   shouldFreezeMetadata: true,
//   shouldEnableMintRandomness: false,
//   enableOperatorFiltering: true,
// };
// const mintConfigs: MintConfig[] = [
//   {
//     mintType: "RangeEdition",
//     minterAddress: "0x4552f8b70a72a8ea1084bf7b7ba50f10f2f9daa7",
//     price: 0,
//     startTime: 0,
//     endTime: 999999999,
//     affiliateFeeBPS: 0,
//     cutoffTime: 999999998,
//     maxMintableLower: 10,
//     maxMintableUpper: 10,
//     maxMintablePerAccount: 10,
//   },
// ];
// async function main(): Promise<void> {
//   // Transaction
//   try {
//     const transaction = await client.createEdition({
//       editionConfig,
//       mintConfigs,
//       salt,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
