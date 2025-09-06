'use client';
import { useEffect, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Renderer, Program, Mesh, Plane, Vec3, Color } from 'ogl';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // WebGL background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new Renderer({ 
      canvas,
      alpha: true, 
      premultipliedAlpha: false 
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const vertex = `
      precision highp float;
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uMouseX;
      varying vec2 vUv;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vec2 uv = vUv;
        vec2 p = (uv - 0.5) * 2.0;
        
        // Create flowing energy effect
        float time = uTime * 0.5;
        float wave1 = sin(p.x * 3.0 + time) * 0.1;
        float wave2 = sin(p.y * 4.0 + time * 1.3) * 0.1;
        float wave3 = sin((p.x + p.y) * 2.0 + time * 0.8) * 0.1;
        
        float energy = wave1 + wave2 + wave3;
        energy += smoothNoise(p * 5.0 + time) * 0.3;
        
        // Mouse interaction
        float mouseEffect = smoothstep(0.8, 0.0, abs(uv.x - uMouseX));
        energy += mouseEffect * 0.4;
        
        // Create gradient from purple to blue
        float hue = 0.7 + energy * 0.2;
        float saturation = 0.8 + energy * 0.2;
        float brightness = 0.3 + energy * 0.5;
        
        vec3 color = hsv2rgb(vec3(hue, saturation, brightness));
        
        // Add glow effect
        float glow = smoothstep(1.0, 0.0, abs(p.y)) * 0.6;
        color += glow * vec3(0.3, 0.6, 1.0);
        
        // Fade edges
        float alpha = smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
        alpha *= 0.8;
        
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const geometry = new Plane(gl, { width: 2, height: 2 });
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec3(1, 1, 1) },
        uMouseX: { value: 0.5 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    let mouseX = 0.5;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      program.uniforms.uMouseX.value = mouseX;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      program.uniforms.uResolution.value.set(rect.width, rect.height, 1);
    };

    window.addEventListener('resize', resize);
    resize();

    let rafId: number;
    const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleDashboard = () => {
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  if (status === 'loading') {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
        <div className="relative h-20">
          {/* <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full"
          /> */}
          <div className="relative z-10 h-full flex items-center justify-between px-6">
            <div className="animate-pulse bg-white/20 h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-white/20 h-10 w-24 rounded-full"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="relative h-20">
        {/* WebGL Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Backdrop blur overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm border-b border-white/10"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-between px-6">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent 
               bg-gradient-to-r 
               from-blue-800 to-purple-500 
               dark:from-white dark:to-blue-200">
            SkinSafe
            </h1>



         
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {!session ? (
              // Not logged in
              <>
               <a
                  href="#features"
                  className="
                    text-black/80 hover:text-black transition-colors duration-200
                    dark:text-white/80 dark:hover:text-white
                  "
                >
                  Features
                </a>

                <a
                  href="#about"
                  className="
                    text-black/80 hover:text-black transition-colors duration-200
                    dark:text-white/80 dark:hover:text-white
                  "
                >
                  About
                </a>
                <button
                  onClick={handleGetStarted}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Get Started
                </button>
              </>
            ) : (
              // Logged in
              <>
                <button
                  onClick={handleDashboard}
                  className="text-white/80 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Dashboard</span>
                </button>
                
                {/* <button
                  onClick={handleProfile}
                  className="text-white/80 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </button> */}

                {/* User Avatar and Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {session.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt="User" 
                        className="w-8 h-8 rounded-full border-2 border-white/20"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {session.user?.name?.charAt(0) || 'U'}
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
                        <p className="text-white font-medium">{session.user?.name}</p>
                        <p className="text-white/60 text-sm">{session.user?.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <button
                          onClick={handleProfile}
                          className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Settings</span>
                        </button>
                        
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white/80 hover:text-white" title="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}