import { XCircleIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@server/trpc";
import { generateRandomString } from "@utils/helperFunctions";
import supabase from "@utils/supabase";
import { trpc } from "@utils/trpc";
import truncate from "lodash/truncate";
import { useRouter } from "next/router";
import { NextLayoutPage } from "next/types";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Checkbox } from "~/components/checkbox";
import { SimpleLayout } from "~/components/layout";
import Button from "~/components/shared/button";
import Input from "~/components/shared/input";

const schema = z.object({
  name: z.string().min(1, { message: "Name of beat is required" }),
  artist: z
    .string()
    .min(1, { message: "Name of artist is required" })
    .optional(),
  track: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
  collaborators: z
    .array(
      z.object({
        name: z.string().min(1, "A name is required"),
        phoneNumber: z
          .string()
          .min(10, "Must be at least 10 characters")
          .max(14, "Must be at most 14 characters"),
      })
    )
    .optional(),
  checkbox: z.boolean(),
});

type formType = z.infer<typeof schema>;

const Chip = ({ value, onClick }: { value: string; onClick?: () => void }) => {
  return (
    <span className="px-3 py-1 rounded-lg bg-dark1/40 text-gray-300 text-sm flex align-center w-max cursor-pointer active:bg-dark1/70 transition duration-300 ease">
      {truncate(value, { length: 20 })}
      <button
        className="bg-transparent hover focus:outline-none"
        type="button"
        onClick={onClick}
      >
        <XCircleIcon className="h-4 w-4 text-gray-100 ml-2" />
      </button>
    </span>
  );
};

const notify = () =>
  toast.success("Successfully submitted track. Redirecting you", {
    duration: 1500,
    style: {
      fontSize: "14px",
    },
    icon: "🎉",
  });

const errorNotify = (message: string) =>
  toast.error(message, {
    style: {
      fontSize: "14px",
    },
  });

const SubmitBeat: NextLayoutPage = () => {
  const router = useRouter();
  const { raceId, artistSubmissionId } = router.query;

  const uploadTrackMutation = trpc.tracks.submitTrack.useMutation({
    onError: (error) => {
      errorNotify(error.message);
    },
    onSuccess: async () => {
      notify();
      await setTimeout(() => {
        router.back();
      }, 1500);
    },
  });
  //   const [collaboratorCount, addCollaboratorCount] = useState(0);
  const checkBoxRef = useRef();

  function sanitizeFileName(fileName: string): string {
    // Define the regular expression pattern to match special characters
    const specialCharsRegex = /[^\w.-]+/g;

    // Replace special characters with an underscore
    const sanitizedFileName = fileName.replace(specialCharsRegex, "_");

    return `${generateRandomString(5)}-${sanitizedFileName}`;
  }

  const submitBeat = async (file: File) => {
    const { data, error } = await supabase.storage
      .from("submitted-tracks")
      .upload(sanitizeFileName(file.name), file);

    if (error) {
      errorNotify(error.message);
      return;
    }

    if (data?.path) {
      const { data: url } = supabase.storage
        .from("submitted-tracks")
        .getPublicUrl(data?.path);

      return url.publicUrl;
    }

    return undefined;
  };

  //   Hook form
  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    getFieldState,
    formState: { errors, isSubmitting },
  } = useForm<formType>({
    resolver: zodResolver(schema),
  });

  const [collaborators, setCollaborators] = React.useState<number[]>([]);
  const [counter, setCounter] = React.useState<number>(0);

  const [files, setFiles] = useState<FileList>();

  const runSubmit = async (values: formType) => {
    // Upload file

    const files = values.track as FileList;
    if (files.length === 0) {
      setError("track", {
        message: "",
      });
      return;
    }

    const url = await submitBeat(files[0]);

    if (url) {
      await uploadTrackMutation.mutateAsync({
        artist: values.artist,
        name: values.name,
        raceId: raceId as string,
        artistSubmissionId: artistSubmissionId as string,
        url,
        collaborators: values.collaborators,
      });
    }

    return;
  };

  const addCollaborator = () => {
    setCollaborators((prevCollaborators) => [...prevCollaborators, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeCollaborator = (index: number) => () => {
    setCollaborators((prevCollaborators) => [
      ...prevCollaborators.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearCollaborators = () => {
    setCollaborators([]);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="bg-dark2 w-11/12 md:w-9/12 lg:w-1/2 rounded-lg px-6 py-4">
        <h2 className="capitalize font-bold text-xl">Submit a beat</h2>
        <p className="text-xs text-gray-400 my-2">
          {raceId ? (
            <>
              {" "}
              Be a part of the thriving 0xStems ecosystem by contributing to
              this race. Upload a track that people will vote on - the winning
              beat will inspire the artist&apos;s next song
            </>
          ) : (
            <>
              You can contribute to this artist’s next song by sending them a
              track directly. People can vote on your submission to increase the
              chances of being discovered.
            </>
          )}
        </p>
        <p className="mt-4 text-lg"> Song details</p>
        <form onSubmit={handleSubmit(runSubmit)}>
          <div className="flex items-center justify-center w-full mt-4 mb-2 relative">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-bray-700 border-gray-600 hover:bg-dark1/30"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-3">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="absolute w-full h-full z-10 top-0 left-0 opacity-0"
                {...register("track", {
                  required: true,
                  onChange(event: React.ChangeEvent<HTMLInputElement>) {
                    const { files: f } = event.target;
                    if (f) {
                      setFiles(f);
                    }
                  },
                })}
              />
            </label>
          </div>
          {errors.track && (
            <p className="ml-1 text-error text-xs">
              A track is required for submission
            </p>
          )}
          <div>
            {files &&
              Array(files?.length)
                .fill(0)
                .map((_, index) => {
                  return files?.length > index ? (
                    <Chip
                      key={`index-${index}`}
                      value={files[index].name}
                      onClick={() => {
                        setFiles(undefined);
                        setValue("track", undefined);
                      }}
                    />
                  ) : null;
                })
                .filter(Boolean)}
          </div>
          <div className="flex flex-col md:flex-row py-2 gap-x-6 w-full">
            <Input
              label="Name of track"
              className="flex-1 w-full bg-dark1/40"
              error={errors.artist}
              {...register("name")}
            />
            <Input
              label="Name of artist"
              className="flex-1 w-full bg-dark1/40"
              error={errors.name}
              {...register("artist")}
            />
          </div>

          <p className="mt-4 text-lg"> Collaborators </p>
          <p className="mt-2 text-sm text-gray-400">
            {" "}
            Please list all the collaborators you worked on this beat with{" "}
          </p>
          {collaborators.map((index) => {
            const fieldName = `collaborators.${index}`;
            return (
              <fieldset name={fieldName} key={fieldName + index}>
                <div className="flex flex-col md:flex-row  py-2 gap-x-6 w-full">
                  <Input
                    label="name"
                    className="flex-1 w-full bg-dark1/40"
                    error={
                      errors.collaborators && errors.collaborators[index]?.name
                    }
                    {...register(`collaborators.${index}.name`)}
                  />
                  <Input
                    label="phone number"
                    className="flex-1 w-full bg-dark1/40"
                    error={
                      errors.collaborators &&
                      errors.collaborators[index]?.phoneNumber
                    }
                    {...register(`collaborators.${index}.phoneNumber`)}
                  />
                  <button
                    type="button"
                    className="text-xs p-1 mt-5"
                    onClick={removeCollaborator(index)}
                  >
                    Remove
                  </button>
                </div>
              </fieldset>
            );
          })}
          <Button
            type="button"
            onClick={addCollaborator}
            className=" md:w-1/3 mt-5"
          >
            Add Collaborator
          </Button>
          <div className="items-top flex space-x-2 mt-4">
            <Checkbox
              error={errors.checkbox}
              name="checkbox"
              onCheckedChange={(value: boolean) => {
                clearErrors("checkbox");
                setValue("checkbox", value);
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="checkbox"
                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acknowledgement
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                I certify that I, along with the co-producers (if any), are the
                sole owners of this sound
              </p>
            </div>
          </div>
          <Button className="mt-6" type="submit" isLoading={isSubmitting}>
            Upload track
          </Button>
        </form>
      </div>
    </div>
  );
};

SubmitBeat.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

export default SubmitBeat;
