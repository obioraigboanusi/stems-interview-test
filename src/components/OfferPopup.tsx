import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import HoverCardDemo from "./shared/HoverCard";
import Input from "./shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFirebaseAuth } from "@utils/firebase";
import { trpc } from "@utils/trpc";
import { useMusicPlayer } from "providers/MusicPlayerProvider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineLocalOffer } from "react-icons/md";
import { z } from "zod";
import Button from "~/components/shared/button";

export const OfferPopup = ({
  trackId,
  shareTrack,
}: {
  trackId: string;
  shareTrack: (trackId: string) => void;
}) => {
  const { setShowNotLoggedInModal } = useMusicPlayer();
  const { user } = useFirebaseAuth();
  const schema = z.object({
    description: z.string().optional(),
  });

  type formType = z.infer<typeof schema>;
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<formType>({
    resolver: zodResolver(schema),
  });
  const createOfferMutation = trpc.tracks.createOffer.useMutation({
    onError: (error) => {
      errorNotify(error.message);
    },
    onSuccess: async () => {
      setShowDialog(false);
      notify();
    },
  });
  const runSubmit = async (values: formType) => {
    if (userData?.username && userData?.phone && user?.uid) {
      await createOfferMutation.mutateAsync({
        trackId,
        name: userData.username,
        phoneNumber: userData.phone,
        description: values.description,
        userId: user.uid,
      });
      shareTrack(trackId);
    }
    return;
  };

  const notify = () =>
    toast.success("Offer Made!", {
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
  const { data: userData } = trpc.users.getUser.useQuery();
  const [showDialog, setShowDialog] = useState(false);
  return !user ? (
    <button
      onClick={() => setShowNotLoggedInModal(true)}
      className="hover:opacity-50 "
    >
      <HoverCardDemo message="want to use?">
        <MdOutlineLocalOffer size={20} />
      </HoverCardDemo>
    </button>
  ) : (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogTrigger>
        <div className="hover:opacity-50 ">
          <HoverCardDemo message="want to use?">
            <MdOutlineLocalOffer size={20} />
          </HoverCardDemo>
        </div>
      </DialogTrigger>
      <DialogContent isopen={`${showDialog}`}>
        <h2 className="text-2xl">Wanna use the beat?</h2>
        <form onSubmit={handleSubmit(runSubmit)}>
          <Input
            label="Tell the producer! Add details if you wish."
            placeholder="Your thoughts...(optional)"
            className="flex-1 w-full bg-dark1/40 h-16 mt-2"
            error={errors.description}
            {...register("description")}
          />
          <Button className="mt-6" type="submit" isLoading={isSubmitting}>
            Create Offer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
