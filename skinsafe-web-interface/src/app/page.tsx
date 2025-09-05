import SignIn from "@/components/sign-in";
import UserProfile from "@/components/userProfile";
import Logout from "@/components/logout";
import { SessionProvider } from "next-auth/react";
import Orb from '../components/orb';
import Navbar from "@/components/navbar";
export default function Home() {

  return (
    <SessionProvider>
      <Navbar />
      {/* Background Orb */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh', 
        zIndex: -1 
      }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      
      {/* Main Content */}
      {/* <UserProfile /> */}
      {/* <Logout /> */}
    </SessionProvider>
  );
}