'use client'
import { useState } from 'react'
import { HeaderItem } from '../../../../types/menu'
import NavLink from './NavLink'

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen)
  }

  return (
    <div className="relative w-full">
      <NavLink
        href={item.href}
        onClick={item.submenu ? handleToggle : undefined}
        className="flex items-center justify-between w-full text-white py-2 focus:outline-none"
        activeClassName="text-accent"
      >
        <>
          {item.label}
          {item.submenu && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7 10l5 5l5-5"
              />
            </svg>
          )}
        </>
      </NavLink>

      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <NavLink
              key={index}
              href={subItem.href}
              className="block py-2 text-black dark:text-white"
              activeClassName="text-accent font-semibold"
            >
              {subItem.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileHeaderLink
