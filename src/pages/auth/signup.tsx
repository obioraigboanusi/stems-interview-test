import supabase from "../../../utils/supabase";
import Image from "next/image";
import Link from "next/link";
import { NextLayoutPage } from "next/types";
import React, { useState } from "react";
import Preview from "~/components/auth/preview";
import Register from "~/components/auth/register";

const SignUp: NextLayoutPage = (props) => {
  const [formState, setFormState] = useState({
    url: "",
    inputVal_uid: "",
    name: "",
    instagram: "",
    spotify: "",
    twitter: "",
    bio: "",
    styles: "",
    imageUrl: "",
    genius: "",
  });

  const [showPreview, setShowPreview] = useState(false);
  const [step, setStep] = useState(1);

  const handleFormChange = async (newFormState: typeof formState) => {
    setFormState(newFormState);
  };

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="flex-1 py-2 h-full w-full flex flex-col">
        <div className="h-full px-4 w-full">
          <Link href="/" passHref>
            <div className="w-32 h-16 relative ml-4">
              <Image src="/assets/Logo.svg" alt="logo" fill />
            </div>
          </Link>
          {showPreview ? (
            <Preview formState={formState} togglePreview={togglePreview} />
          ) : (
            <Register
              formState={formState}
              onFormChange={handleFormChange}
              togglePreview={togglePreview}
              step={step}
              onStepChange={handleStepChange}
            />
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-1 h-full w-full items-center justify-center overflow-hidden bg-dark2 relative border-l-1 border-l-gray-100 shadow-highlight rounded-l-xl">
        <div className="relative p-8 h-full w-full">
          <Preview formState={formState} togglePreview={togglePreview} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
