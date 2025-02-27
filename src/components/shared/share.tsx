import { TwitterShareButton } from "next-share";
import { useMusicPlayer } from "providers/MusicPlayerProvider";
import { useState } from "react";
import { FaTwitter, FaCheckCircle, FaCopy } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { RWebShare } from "react-web-share";

const CLAIMED_SHARE_TEXT =
  "🤯 @Xcelencia made a song with the beat I voted for in the race on @0xStems. this NFT I won is incredible 🔥 ";
const DEFAULT_SHARE_TEXT = "listen to the songs produced on @0xStems 🔥🔥🔥";

export function generateTrackLink(id: string) {
  let location = window.location.href;
  if (!id) return location;

  if (location[location.length - 1] === "#") {
    location = location.slice(0, location.length - 1);
  }

  if (location.includes("?trackid=")) {
    const idIndex = location.indexOf("?trackid=");
    location = location.slice(0, idIndex);
  }

  return location + "?trackid=" + id;
}
export function shareTrack(id: string) {
  navigator.clipboard.writeText(generateTrackLink(id));
}

export const WebShare = (props: any) => {
  return (
    <RWebShare
      data={{
        text: DEFAULT_SHARE_TEXT,
        url: generateTrackLink(props.trackId),
        title: "Stems | Creating Music Reimagined",
      }}
    >
      {props.showBackground ? (
        <div className="bg-white rounded-full w-10 h-10 items-center flex justify-center">
          <RiShareForwardLine size={props?.size || 25} color={"black"} />
        </div>
      ) : (
        <div className=" items-center flex justify-center hover:opacity-50">
          <RiShareForwardLine size={props?.size || 25} />
        </div>
      )}
    </RWebShare>
  );
};
export const CopyLink = (props: any) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          shareTrack(props.trackId);
          setIsClicked(true);
          setTimeout(() => setIsClicked(false), 700);
        }}
        className={
          props.showBackground
            ? "bg-white h-10 w-10 rounded-full flex items-center justify-center absolute z-20"
            : "hover:opacity-50"
        }
      >
        {isClicked ? (
          <FaCheckCircle
            size={props.size || 18}
            color={props.showBackground ? "black" : "white"}
          />
        ) : (
          <FaCopy
            size={props.size || 18}
            color={props.showBackground ? "black" : "white"}
          />
        )}
      </div>
    </>
  );
};

export const ShareTwitter = (props: any) => {
  return (
    <>
      <TwitterShareButton
        title={CLAIMED_SHARE_TEXT}
        url={generateTrackLink(props.trackId)}
      >
        <div className={"hover:scale-110 bg-white text-black rounded-full p-2"}>
          <FaTwitter size={props?.size || 24} />
        </div>
        {props.showText && <span>Share On Twitter</span>}
      </TwitterShareButton>
    </>
  );
};
