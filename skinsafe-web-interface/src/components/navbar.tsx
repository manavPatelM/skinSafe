'use client';
import { useEffect, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Renderer, Program, Mesh, Plane, Vec3, Color } from 'ogl';
import Link from 'next/link';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  
  const { data: session, status } = useSession();

  const router = useRouter();
  
  const [isLoggedin, setIsLoggedin] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfile = () => {
    router.push('/profile');
    setIsMenuOpen(false);
  };

  
  useEffect(() => {
    if (!session && status !== 'loading') {
      setIsLoggedin(false);
    }
    if (session) {
      setIsLoggedin(true);
    }

  }, [session, status]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setIsMenuOpen(false);
      }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    };
  }, []);

  // Sign out function


  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  return (
    <nav className={`w-full bg-white bg-opacity-70 backdrop-blur-md shadow-md ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0"> 
            <Link href="/" className="text-2xl font-bold text-blue-600">SkinSafe</Link>
          </div>
          <div>
            {isLoggedin ? (
              // profile link and sign out button use Link from next/link for client-side navigation
              <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {session?.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt="User" 
                        className="w-8 h-8 rounded-full border-2 border-white/20"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {session?.user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white font-medium">{session?.user?.name}</p>
                        <p className="text-white/60 text-sm">{session?.user?.email}</p>
                      </div>
                      
                      <div className="py-2">
                        {/* <button
                          onClick={handleProfile}
                          className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Settings</span>
                        </button> */}
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>  
                

            ) : (
              <button
                onClick={() => router.push('/login')} 
                className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Sign In 
              </button>
            )}
          </div>
            
        </div>
      </div>
    </nav>
  );
}