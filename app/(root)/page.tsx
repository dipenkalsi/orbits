import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return(
    <div className="text-3xl text-gray-200 flex items-center justify-center flex-col space-y-3">
      <p>Login to Access Orbit.</p>
      <div className="items-center justify-center flex space-x-4">
      <Button className="bg-purple-800 hover:bg-purple-900 transition">
        <Link href='/sign-in'>
          Login
        </Link>
        </Button>
      <p>Or</p>
      <Button className="bg-purple-800 hover:bg-purple-900 transition">
      <Link href='/sign-up'>
          Sign Up
        </Link>
      </Button>
      </div>
    </div>
  );

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className=' text-gray-500 mx-auto text-2xl'>No Orbits detected.</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;