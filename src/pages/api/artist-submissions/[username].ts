import prisma from '@utils/prisma';
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  try {
    const artistSubmission = await prisma.artistSubmissions.findUniqueOrThrow({
      where: { uid: username as string },
    });
    return res.status(200).json({ ...artistSubmission });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, error: "Failed to get artist submission" });
  }
}