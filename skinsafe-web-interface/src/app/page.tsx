"use client"

import { SessionProvider, useSession } from "next-auth/react"
import Orb from "@/components/orb"
import Navbar from "@/components/navbar"
import ImageUpload from "@/components/ImageUpload"

function MainContent() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return null // or a loading spinner if you want
  }

  if (!session) {
    // Don't show SignIn, just a landing message
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-3xl bg-background text-foreground font-semibold mb-4">
          Welcome to SkinSafe
        </h2>
        <p className="max-w-xl">
          An AI-powered tool to help you monitor your skin health. Click <strong>Get Started</strong> above to log in.
        </p>
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
      <div className="fixed inset-0 -z-10">
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
