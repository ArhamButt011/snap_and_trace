'use client'
import { useState } from 'react'
import { HeaderItem } from '../../../../types/menu'
import NavLink from './NavLink'
import useSmoothScroll from '@/hooks/useSmoothScroll'

const HeaderLink: React.FC<{ item: HeaderItem;  }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const scrollToId = useSmoothScroll()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      e.preventDefault()
      const id = href.split('#')[1]
      scrollToId(id)
    }
  }

  const idFromHref = item.href.includes('#') ? item.href.split('#')[1] : ''

  return (
    <div
      className="relative"
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      <NavLink
        href={item.href}
        className={`header-link flex items-center gap-1 `}
        onClick={(e) => handleClick(e, item.href)}
      >
        {item.label}
      </NavLink>

      {submenuOpen && item.submenu && (
        <div className="absolute py-2 left-0 mt-0.5 w-60 bg-dark shadow-lg rounded-lg">
          {item.submenu.map((subItem, index) => (
            <NavLink
              key={index}
              href={subItem.href}
              className="block px-4 py-2 text-white hover:bg-accent hover:text-dark transition-colors duration-200"
              onClick={(e) => handleClick(e, subItem.href)}
            >
              {subItem.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default HeaderLink
