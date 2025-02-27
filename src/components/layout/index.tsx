import Alert from "../alert";
import Nav from "./nav";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClaimNFTProvider } from "providers/ClaimNFTProvider";
import React, { useState } from "react";

type Props = {
  children?: React.ReactNode;
  artist?: boolean;
};

const Layout = ({ children, artist }: Props) => {
  const router = useRouter();
  const id = (router.query?.id || "") as string;

  return (
    <ClaimNFTProvider raceId={id}>
      <div className="flex min-h-screen flex-col justify-center">
        <div className="container mx-auto">
          <Nav artist={artist} />
        </div>
        <main className="container mx-auto flex-1">{children}</main>
      </div>
    </ClaimNFTProvider>
  );
};

export const SimpleLayout = ({ children, artist }: Props) => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="relative h-16 w-32">
            <Link href="/" passHref>
              <Image src="/assets/Logo.svg" alt="Stems Logo" fill />
            </Link>
          </div>
          <Nav artist={artist} simple />
        </div>
      </div>
      <main className="container mx-auto flex-1 flex flex-col">{children}</main>
    </div>
  );
};

export default Layout;
