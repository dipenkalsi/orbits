import React from 'react'
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from '@/lib/actions/user.actions';
import PostThread from '@/components/forms/PostThread';

const page = async() => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div className='custom-scrollbar'>
      <h1 className='head-text'>What&apos;s on your mind?</h1>
      <PostThread userId={userInfo._id} />
    </div>
  )
}

export default page
