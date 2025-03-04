import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSideProps } from "next/types";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { username } = context.query;

  const { data: user } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/artist-submissions/${username}`
  );
  console.log({ username, user });
  if (!user) {
    return { notFound: true };
  }

  return { props: { user } };
};

export default function UserPage({ user }: any) {
  const router = useRouter();

  return (
    <>
      {/* Dynamic Meta Tags for Social Media Previews */}
      <Head>
        <title>{user.name} - Profile</title>
        <meta name="description" content={user.bio} />

        {/* Open Graph for Facebook, WhatsApp, LinkedIn */}
        <meta property="og:title" content={user.name} />
        <meta property="og:description" content={user.description} />
        <meta property="og:image" content={user.image} />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
        />
        <meta property="og:type" content="profile" />

        {/* Twitter Card for Twitter Previews */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={user.name} />
        <meta name="twitter:description" content={user.description} />
        <meta name="twitter:image" content={user.image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-6 flex gap-4">
        <div>
          <img
            src={user.image}
            alt={user.name}
            className="mt-4 w-40 rounded-full"
          />
        </div>
        <div className="grow">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.description}</p>
        </div>
      </div>
    </>
  );
}
