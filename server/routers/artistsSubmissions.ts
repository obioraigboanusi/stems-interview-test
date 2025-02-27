import { publicProcedure, router } from "@server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const artistSubmissionsRouter = router({
  getArtistSubmissions: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      
      const { prisma } = ctx;
      try {
        console.log("Getting artist submissions for:", input);
        const artistSubmissions = await prisma.artistSubmissions.findFirst({
          where: {
            uid: input,
          },
          // select: {
          //   description: true,
          //   uid: true,
          //   published: true,
          //   name: true,
          //   bio: true,
          //   ArtistSubmissionsSocials: {
          //     select: {
          //       imageUrl: true,
          //       instagramUrl: true,
          //       twitterUrl: true,
          //       spotifyUrl: true,
          //     },
          //   },
          // },
        });
        console.log("Artist submissions:", artistSubmissions);

        if (!artistSubmissions) {
          return {};

          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Artist submissions not found",
          });
        }

        return artistSubmissions;


      } catch (err) {
        console.log("There's an error")
        console.log(err);
        return {};
        // throw new TRPCError({
        //   code: "INTERNAL_SERVER_ERROR",
        //   message: "Could not complete transaction. Please try again later",
        // });
      }
    }),

    checkUrlAvailability: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      console.log("Checking availability for:", input); // Log the input
      try {
        const prisma = ctx.prisma;
        // await prisma.$connect(); // Ensure the connection is established
        const existingSubmission = await prisma.artistSubmissions.findUnique({
          where: { uid: input },
          select: { uid: true },
        });

        if (!existingSubmission) {
          return {};  
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Existing submission not found",
          });
        }
        

        console.log("Existing submission:", existingSubmission); // Log the result
        return { isAvailable: !existingSubmission };
      } catch (err) {
        console.error('Error checking URL availability:', err);
        // Instead of throwing an error, return an error object
        return {
          isAvailable: false,
          error: "Failed to check URL availability: " + (err instanceof Error ? err.message : String(err)),
        };
      } finally {
        await prisma.$disconnect(); // Disconnect the database connection
      }
    }),
  });

//         // Log the full error object
//         console.error('Full error object:', JSON.stringify(err, null, 2));
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Failed to check URL availability: " + (err instanceof Error ? err.message : String(err)),
//         });
//       }
//     }),
// });
