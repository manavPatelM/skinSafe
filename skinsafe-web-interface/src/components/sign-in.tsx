"use client"

import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

// Utility function (typically in @/lib/utils)
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

// Button Component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transform hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 border-blue-200 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-blue-50 hover:border-blue-300 hover:shadow-md text-blue-700",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-sm hover:from-gray-200 hover:to-gray-300",
        ghost:
          "hover:bg-blue-50 hover:text-blue-700 transition-colors",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-800",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-4",
        sm: "h-9 rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-14 rounded-lg px-8 text-base font-semibold has-[>svg]:px-6",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// Enhanced Card Components with Medical Theme
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white/95 backdrop-blur-md text-gray-900 flex flex-col rounded-2xl border border-blue-100 shadow-2xl relative overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min items-center gap-6 px-8 pt-8 pb-2",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-tight font-bold text-gray-800", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-gray-600 text-base leading-relaxed", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-8 pb-8", className)}
      {...props}
    />
  )
}

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Medical cross pattern */}
      <div className="absolute -top-20 -right-20 w-40 h-40 opacity-5">
        <div className="w-full h-full relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-blue-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-32 bg-blue-600 rounded-full"></div>
        </div>
      </div>
      
      {/* Floating medical elements */}
      <div className="absolute top-10 left-10 w-6 h-6 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-32 right-16 w-4 h-4 bg-teal-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-blue-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
      
      {/* Gradient orbs */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-100 to-transparent rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-l from-teal-100 to-transparent rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
  )
}

// Loading Animation Component
const LoadingSpinner = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-5 h-5 border-3 border-white/30 rounded-full"></div>
      <div className="absolute top-0 left-0 w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
    <span className="font-medium">Securing your access...</span>
  </div>
)

// Enhanced Google Icon
const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

// Main Login Component
export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Animation trigger
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Mouse tracking for subtle interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Check if user is already logged in
    getSession().then((session) => {
      if (session) {
        router.push("/")
      }
    })
  }, [router])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      })

      if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced background with medical gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>
      
      {/* Animated background elements */}
      <AnimatedBackground />
      
      {/* Interactive mouse follower */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-200/20 to-teal-200/20 rounded-full blur-3xl pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      ></div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Enhanced back to home link */}
        <div className="absolute top-8 left-8 z-10">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold transition-all duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-blue-100"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Main card container */}
        <div className={`w-full max-w-lg transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Card className="relative">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600"></div>
            
            <CardHeader className="text-center">
              {/* Enhanced logo section */}
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-2xl">S</span>
                  </div>
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 w-16 h-16 bg-blue-400 rounded-2xl animate-ping opacity-20"></div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent mb-3">
                  SkinSafeAI
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
              </div>
              
              <CardTitle className="text-3xl text-gray-800 mb-3">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Sign in to access your <span className="font-semibold text-blue-700">AI-powered dermatology</span> dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Enhanced Google Sign-in Button */}
              <div className="relative">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full relative overflow-hidden group"
                  size="lg"
                >
                  {/* Button background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="flex items-center gap-4">
                        <GoogleIcon />
                        <span className="font-semibold text-lg">Continue with Google</span>
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Button>
              </div>

              {/* Enhanced privacy notice */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Secure & Private</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We only use your Google account for secure authentication. Your medical data remains confidential and is never shared without explicit consent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical compliance notice */}
              <div className="pt-6 border-t border-blue-100">
                <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-medium">HIPAA Compliant</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">SOC 2 Certified</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom decorative text */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm max-w-md">
            Trusted by <span className="font-semibold text-blue-700">500+ healthcare providers</span> worldwide for AI-powered dermatological analysis
          </p>
        </div>
      </div>
    </div>
  )
}