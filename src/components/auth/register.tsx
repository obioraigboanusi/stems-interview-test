import PreviewIcon from "../../../public/assets/preview.png";
import GeniusIcon from "../../../public/logos/genius.svg";
import InstagramIcon from "../../../public/logos/instagram.svg";
import SpotifyIcon from "../../../public/logos/spotify.svg";
import TwitterIcon from "../../../public/logos/x.svg";
import Button from "../shared/button";
import Modal from "../shared/modal";
import AvatarUploader from "../upload/avatarUploader";
import { trpc } from "@utils/trpc";
import axios from "axios";
import { debounce } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { MdClear } from "react-icons/md";


export default function Register({
  formState,
  onFormChange,
  togglePreview,
  step,
  onStepChange,
}: any) {
  const router = useRouter();
  const { url: initialUrl } = router.query;

  const initialValue = "0xStems.xyz/";
  const [inputValue, setInputValue] = useState(
    typeof initialUrl === "string"
      ? initialUrl.replace(initialValue, "")
      : formState.url.replace(initialValue, "")
  );
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState(formState?.name);
  const [instagram, setInstagram] = useState(formState?.instagram);
  const [spotify, setSpotify] = useState(formState?.spotify);
  const [twitter, setTwitter] = useState(formState?.twitter);
  const [genius, setGenius] = useState(formState?.genius);
  const [bio, setBio] = useState(formState?.bio);
  const [styles, setStyles] = useState(formState?.styles);
  const [imageUrl, setImageUrl] = useState(formState?.imageUrl || "");
  const [allFilled, setAllFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUsernameExists, setIsUsernameExists] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, showMessage] = useState(false);

  const urlCheckTimeout = useRef<NodeJS.Timeout>();

  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const urlCheckMutation = trpc.artistSubmissions.checkUrlAvailability.useQuery(
    inputValue,
    {
      enabled: false,
      onSuccess: (data) => {
        console.log("URL check result:", data);
        if ("error" in data) {
          console.error("URL check error:", data.error);
          // Handle the error in your UI
          setIsAvailable(null); // or false, depending on how you want to handle errors
        } else {
          // Handle the successful result
          setIsAvailable(data.isAvailable ?? false);
        }
      },
      onError: (error) => {
        console.error("URL check error:", error);
        // Handle the error in your UI
        setIsAvailable(null); // or false, depending on how you want to handle errors
      },
    }
  );

  useEffect(() => {
    checkIfAllFilled();
    onFormChange({
      url: initialValue + inputValue,
      inputVal_uid: inputValue,
      name,
      instagram,
      spotify,
      twitter,
      genius,
      bio,
      styles,
      imageUrl,
    });
  }, [
    inputValue,
    name,
    instagram,
    spotify,
    twitter,
    genius,
    bio,
    styles,
    imageUrl,
    step,
  ]);

  const checkUsernameExists = useCallback(
    debounce(async (username: string) => {
      if (!username) return;
      try {
        const response = await axios.get(`/api/artist-submissions/${username}`);
        setIsUsernameExists(true);
      } catch (error) {
        setIsUsernameExists(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(initialValue, "");
    setInputValue(value);
   
  };

  useEffect(() => {
    checkUsernameExists(inputValue);
    return () => {
      checkUsernameExists.cancel();
    };
  }, [checkUsernameExists, inputValue]);

  // const validateUrl = (value: string) => {
  //   const regex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  //   setIsValid(regex.test(value));
  // };

  const handleUpload = async (file: File, previewUrl: string) => {
    try {
      setImageUrl(previewUrl);
      onFormChange({ ...formState, imageUrl: previewUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Make sure this useEffect is updating the formState whenever imageUrl changes
  useEffect(() => {
    onFormChange({ ...formState, imageUrl });
  }, [imageUrl]);

  const handleContinueClick = () => {
    if (isUsernameExists) {
      // setShowModal(true); // Show modal if username doesn't exist
      showMessage(true);
      return;
    } else {
      showMessage(false);
    }

    if ((step === 1 && !inputValue) || !name) return;
    onStepChange(step + 1);
  };

  const handleCreatePageClick = async () => {
    try {
      const response = await fetch("/api/create-artist-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: inputValue,
          name,
          description: styles,
          bio,
          imageUrl,
          spotifyUrl: spotify
            ? `https://open.spotify.com/artist/${spotify}`
            : "",
          twitterUrl: twitter ? `https://x.com/${twitter}` : "",
          instagramUrl: instagram ? `https://instagram.com/${instagram}` : "",
          geniusUrl: genius ? `https://genius.com/artists/${genius}` : "",
        }),
      });

      if (response.ok) {
        console.log("Response", response);
        router.push(`/${inputValue}`);
      } else {
        console.error("Error creating page:", await response.text());
        console.log("Error Response", response);
      }
    } catch (error) {
      console.log(error);
      console.error("Error creating page:", error);
    }
  };

  const checkIfAllFilled = () => {
    if (step === 1) {
      setAllFilled(inputValue !== "" && name !== "");
    } else if (step === 2) {
      setAllFilled(
        instagram !== "" && spotify !== "" && twitter !== "" && genius !== ""
      );
    } else if (step === 3) {
      setAllFilled(bio !== "" && styles !== "");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
    }
  }, []);

  return (
    <div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Username Not Found"
        message="The username you entered does not exist. Please choose a different username."
      />

      <div className="h-full flex flex-col justify-start py-8 px-4 md:w-full md:max-w-md 2xl:max-w-xl xl:mx-auto">
        <h1 className="text-4xl md:text-4xl mb-4">Create your page</h1>
        <h5 className="ml-4 text-2xl md:text-xl mb-4">
          Personalize your Stems page by entering details below
          {/* <span className='ml-1 text-xs italic text-[#F8F7FD]'>
             (you can update this later)
          </span> */}
        </h5>
        <button className="flex justify-end md:hidden" onClick={togglePreview}>
          <Image src={PreviewIcon} alt="Preview" width={96} height={96} />
        </button>
        <AvatarUploader onUpload={handleUpload} imageUrl={imageUrl} />
        <div className="flex flex-col border-b-2 border-primary py-2 mt-6 mb-2">
          <label
            htmlFor="url"
            className="block text-sm font-medium ml-2 text-[12px] md:text-[16px]"
          >
            Choose your URL:
          </label>
          <div className="flex items-center">
            <span className="text-white text-[14px] md:text-[25px] pl-4 leading-tight">
              {initialValue}
            </span>
            <input
              id="url"
              className="appearance-none bg-transparent text-[14px] md:text-[25px] border-none w-full leading-tight focus:outline-none text-left"
              type="text"
              placeholder="yourname"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => {
                if (inputRef.current) {
                  inputRef.current.setSelectionRange(
                    inputValue.length,
                    inputValue.length
                  );
                }
              }}
              ref={inputRef}
            />
            {/* {urlCheckMutation.isLoading && <p>Checking availability...</p>}
            {urlCheckMutation.isSuccess && (
              <p className={urlCheckMutation.data.isAvailable ? "text-green-500" : "text-red-500"}>
                URL is {urlCheckMutation.data.isAvailable ? "available" : "already taken"}
              </p>
            )}
            {urlCheckMutation.isError && (
              <p className="text-red-500">
                Error checking URL availability: {urlCheckMutation.error.message}
                <br />
                {JSON.stringify(urlCheckMutation.error, null, 2)}
              </p>
            )} */}
            {inputValue && !isUsernameExists ? (
              <span
                // href="#"
                className={`p-.5 text-white rounded-full ${
                  isValid ? "bg-primary" : "bg-green-500"
                }`}
              >
                <IoIosCheckmark size={24} />
              </span>
            ) : (
              <span
                // href="#"
                className="hidden md:block p-1 text-white rounded-full"
                style={{
                  background:
                    "linear-gradient(129.85deg, #FD0000 14.55%, #FE5A5A 93.91%)",
                }}
              >
                <MdClear size={18} />
              </span>
            )}
          </div>
        </div>
        {message && (
          <p className="text-red-500 text-sm mb-2">
            This username is already taken. Please choose another.
          </p>
        )}
        <div className="flex items-center border-b-2 border-primary py-1">
          <input
            className="appearance-none bg-transparent text-[14px] md:text-[22px] border-none w-full px-4 leading-tight focus:outline-none"
            type="text"
            placeholder="Tell us your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          {step === 1 && (
            <div className="flex flex-col gap-10">
              <Button
                type="button"
                //using inline styling here because for some reason the classname wasnt working
                style={{
                  marginTop: "10px",
                  marginLeft: "0",
                  marginRight: "0",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: inputValue && name ? "#6B46C1" : "#B1B5BA",
                  color: inputValue && name ? "#FFFFFF" : "#464646",
                }}
                onClick={handleContinueClick}
              >
                Continue
              </Button>
            </div>
          )}
          {step >= 2 && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center border-b-2 border-primary pb-1 pl-1">
                <div className="fill-white relative">
                  <InstagramIcon
                    alt="icon"
                    width={22}
                    height={22}
                    objectFit="contain"
                  />
                </div>
                <input
                  className="appearance-none bg-transparent text-[14px] md:text-[18px] border-none w-full px-4 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Instagram username*"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div className="flex items-center border-b-2 border-primary pb-1 pl-1">
                <div className="fill-white relative">
                  <SpotifyIcon
                    alt="icon"
                    width={22}
                    height={22}
                    objectFit="contain"
                  />
                </div>
                <input
                  className="appearance-none bg-transparent text-[14px] md:text-[18px] border-none w-full px-4 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Spotify page (or playlist) URL*"
                  value={spotify}
                  onChange={(e) => setSpotify(e.target.value)}
                />
              </div>
              <div className="flex items-center border-b-2 border-primary pb-1 pl-1">
                <div className="fill-white relative">
                  <TwitterIcon
                    alt="icon"
                    width={22}
                    height={22}
                    objectFit="contain"
                  />
                </div>
                <input
                  className="appearance-none bg-transparent text-[14px] md:text-[18px] border-none w-full px-4 leading-tight focus:outline-none"
                  type="text"
                  placeholder="X (Twitter) username*"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className="flex items-center border-b-2 border-primary pb-1 pl-1">
                <div className="relative">
                  <GeniusIcon
                    alt="icon"
                    width={22}
                    height={22}
                    objectFit="contain"
                  />
                </div>
                <input
                  className="appearance-none bg-transparent text-[14px] md:text-[18px] border-none w-full px-4 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Genius URL*"
                  value={genius}
                  onChange={(e) => setGenius(e.target.value)}
                />
              </div>
              {step === 2 && (
                <p className="text-[10px] md:text-[14px] mt-2">*optional</p>
              )}
            </div>
          )}
          {step === 2 && (
            <Button
              type="button"
              className={`mt-8 mx-0 text-sm md:text-2xl flex items-center justify-center pb-3 md:pb-4 ${
                allFilled
                  ? "bg-primary text-white"
                  : "bg-[#B1B5BA] text-[#464646] hover:text-white"
              }`}
              onClick={handleContinueClick}
            >
              Continue
            </Button>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center border-b-2 border-primary py-2">
                <input
                  className="appearance-none bg-transparent text-[14px] md:text-[16px] border-none w-full px-4 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Bio*"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center border-b-2 border-primary py-1">
                  <input
                    className="appearance-none bg-transparent text-[14px] md:text-[16px] border-none w-full px-4 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Type of audio files you're looking for*"
                    value={styles}
                    onChange={(e) => setStyles(e.target.value)}
                  />
                </div>
                <p className="text-[10px] md:text-[14px] mt-2">*optional</p>
              </div>
              <Button
                type="submit"
                className={`mt-4 mx-0 text-sm md:text-2xl flex items-center justify-center ${
                  allFilled
                    ? "bg-primary text-white"
                    : "bg-[#B1B5BA] text-[#464646] hover:text-white"
                }`}
                onClick={handleCreatePageClick}
              >
                Create Page
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}