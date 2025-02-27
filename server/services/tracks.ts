import { RaceTrack } from "@server/routers/tracks";

export const TrackService = {
  refineExpiredRaceTracks: (
    Track: any[],
    votersCount: number,
    userId?: string
  ): RaceTrack[] => {
    return Track.map((track: any) => {
      return {
        name: track.name,
        songUrl: track.songUrl,
        id: track.uid,
        artist: track.artist ?? "",
        isInspiration: track.isInspiration,
        isWinning: track.isWinning,
        points: track.points,
        liked:
          track?.UserLikes?.find((like: any) => like.userId == userId)
            ?.active ?? false,
        percentage: Math.round(
          ((track.UserLikes?.length || 0) / (votersCount || 1)) * 100
        ),
      };
    })?.sort((a: any, b: any) => {
      if (a.isInspiration && !b.isInspiration) {
        return -1; // a should come before b
      } else if (!a.isInspiration && b.isInspiration) {
        return 1; // a should come after b
      } else if (a.isInspiration && b.isInspiration) {
        return a.isWinning ? -1 : 1; // a should come before b
      } else {
        return b.percentage - a.percentage;
      }
    });
  },

  refineTracks: (Track?: any[]): RaceTrack[] => {
    const tracks = Track?.map((track) => {
      return {
        name: track.name,
        songUrl: track.songUrl,
        id: track.uid,
        artist: track.artist ?? "",
        isInspiration: track.isInspiration,
        isDemo: track.isDemo,
        isWinning: track.isWinning,
        uploaded_at: track.uploaded_at,
        points: track.points,
        liked: track.UserLikes?.length > 0 ? track.UserLikes[0].active : false,
      };
    });

    const inspirationTracks =
      tracks?.filter((track) => track.isInspiration) ?? [];
    const likedTracks =
      tracks?.filter((track) => !track.isInspiration && track.liked) ?? [];
    const unlikedTracks =
      tracks?.filter((track) => !track.isInspiration && !track.liked) ?? [];

    return [...inspirationTracks, ...likedTracks, ...unlikedTracks];
  },
};
