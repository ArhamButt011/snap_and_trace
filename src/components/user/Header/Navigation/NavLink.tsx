'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  exact?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = '',
  activeClassName = 'text-white',
  exact = true,
  ...rest
}) => {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      {...rest}
      className={`${className} font-normal text-[19.91px] font-raleway ${
        isActive ? activeClassName : 'text-[#FFFFFF]'
      }`}
    >
      {children}
    </Link>
  )
}

export default NavLink
