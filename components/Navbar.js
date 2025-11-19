'use client'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  console.log("Console Navbar:", pathname)

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-xl font-bold">MyApp</h1>
          </div>

          <div className="flex gap-10">
            <button 
              type="button" 
              className="text-white cursor-pointer"
              onClick={() => router.push('/')}>Home</button>
            <button 
              type="button" 
              className="text-white cursor-pointer"
              onClick={() => router.push('/about')}>About</button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white/80 text-sm">Current page:</span>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <p className="text-white font-medium text-sm">
                {pathname === '/' ? 'Home' : pathname}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}