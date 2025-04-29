'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
  activeClassName = 'text-[#a8e543]',
  exact = false,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const checkActive = () => {
      const fullPath = window.location.pathname + window.location.hash;
      const target = href.startsWith('/') ? href : `/${href}`;
      
      const isActiveLink = exact
        ? fullPath === target
        : fullPath.startsWith(target);
  
      setIsActive(isActiveLink);
    };
  
    checkActive()
    window.addEventListener('hashchange', checkActive)
    window.addEventListener('popstate', checkActive)
    window.addEventListener('scroll', checkActive)
  
    return () => {
      window.removeEventListener('hashchange', checkActive)
      window.removeEventListener('popstate', checkActive)
      window.removeEventListener('scroll', checkActive)
    }
  }, [href, exact])
  

  return (
    <Link
      href={href}
      {...rest}
      className={`font-normal text-[19.91px] font-raleway transition-colors duration-200 ${
        isActive ? activeClassName : 'text-white' 
      } ${className}`}
    >
      {children}
    </Link>
  )
}

export default NavLink
