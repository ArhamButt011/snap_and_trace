'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { headerData } from './Navigation/menuData'
import Logo from './Logo'
import { RxCross2 } from 'react-icons/rx'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import Button from '@/components/ui/Button'
import Text from '@/components/ui/Text'
import DropDown from './DropDown'

const Header: React.FC = () => {
  const pathUrl = usePathname()

  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  const navbarRef = useRef<HTMLDivElement>(null)
  const signInRef = useRef<HTMLDivElement>(null)
  const signUpRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSticky(window.scrollY >= 10)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false)
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false)
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen, isSignInOpen, isSignUpOpen])

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen])

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 mob:px-5 ${
        sticky ? 'shadow-lg bg-black bg-banner-image py-4' : 'shadow-none py-8'
      }`}
    >
      <div className="max-lg:py-0 py-2">
        <div
          className="
            w-full 
            max-w-[1160px] 
            mx-auto 
            flex items-center justify-between 
            border border-[#FFFFFF17] 
            rounded-[38px] 
            bg-[#111113] 
            py-4 px-4 sm:px-6 md:px-7"
        >
          <Logo />
          <nav className="tab:hidden flex flex-grow items-center gap-8 justify-center ml-14">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center gap-1">

            <div className="mob:hidden">
            <DropDown/>
            </div>
            <Button className="tab:hidden  px-3">
              Start Now
            </Button>

            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="tab:block hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
            </button>
          </div>
        </div>

        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" />
        )}

        <div
          ref={mobileMenuRef}
          className={` fixed top-0 right-0 h-full w-full bg-[#0C1B44] shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}
        >
          <div className="flex items-center justify-between p-4">
            <Text as="h2">
              <Logo />
            </Text>
            <RxCross2
              className="text-primary w-10 h-6 mt-1"
              onClick={() => setNavbarOpen(false)}
            />
          </div>

          <nav className="flex flex-col items-start p-4">
            {headerData.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className="mt-4 flex flex-col space-y-4 w-full">
            <div className="">
            <DropDown/>
            </div>
              <Button>Start Now</Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
