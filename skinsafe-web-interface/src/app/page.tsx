import SignIn from "@/components/sign-in";
import UserProfile from "@/components/userProfile";
import Logout from "@/components/logout";
import { SessionProvider } from "next-auth/react";

export default function Home() {

  return (
    <SessionProvider>
      <SignIn />
      <UserProfile />
      <Logout />
    </SessionProvider>
  );
}