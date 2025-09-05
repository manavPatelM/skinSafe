"use client"

import { SessionProvider, useSession } from "next-auth/react"
import SignIn from "@/components/sign-in"
import Orb from "../components/orb"
import Navbar from "@/components/navbar"
import ImageUpload from "@/components/ImageUpload"

function MainContent() {
  const { data: session } = useSession()

  if (!session) {
    // Not logged in → show SignIn
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <SignIn />
      </div>
    )
  }

  // Logged in → show ImageUpload
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg">
        <ImageUpload
          onImageUploaded={(url) => console.log("✅ Uploaded image URL:", url)}
          folder="user-uploads"
          label="Upload your skin photo"
        />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <SessionProvider>
      {/* Navbar */}
      <Navbar />

      {/* Background Orb */}
      <div
        className="fixed inset-0 -z-10"
      >
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>

      {/* Main Content */}
      <MainContent />
    </SessionProvider>
  )
}
