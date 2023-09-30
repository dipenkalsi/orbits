import React from 'react'
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
const page = async() => {
    const user = await currentUser();
    if (!user) return null; 

    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarded) redirect("/");
  
    const userData = {
      id: user.id,
      objectId: userInfo?._id,
      username: userInfo ? userInfo?.username : user.username,
      name: userInfo ? userInfo?.name : user.firstName ?? "",
      bio: userInfo ? userInfo?.bio : "",
      image: userInfo ? userInfo?.image : user.imageUrl,
    };
  console.log(userData)
  return (
    <div>
      <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Complete your Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Help other people get to know you.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
    </div>
  )
}

export default page
