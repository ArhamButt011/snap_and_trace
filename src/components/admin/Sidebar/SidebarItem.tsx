import { Dispatch, SetStateAction, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarChildItem {
  route: string
  label: string
  children?: SidebarChildItem[]
  icon?: React.ReactNode
  iconNotActive?: React.ReactNode
}

interface SidebarItemProps {
  item: SidebarChildItem
  pageName: string
  setPageName: Dispatch<SetStateAction<string>>
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  pageName,
  setPageName,
}) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label : ''
    setPageName(updatedPageName)
  }

  const pathname = usePathname()

  const isActive = (item: SidebarChildItem): boolean => {
    if (pathname.startsWith(item.route)) {
      return true
    }

    if (item.children) {
      return item.children.some(isActive)
    }

    return false
  }

  const isItemActive = isActive(item)
  useEffect(() => {
    if (isItemActive) {
      document.title = `${item.label} | Lumashape`
    }
  }, [isItemActive, item.label])

  return (
    <li>
      <Link
        href={item.route}
        onClick={handleClick}
        className={`group relative flex items-center gap-3 rounded-md pr-4 pl-8 py-2 font-medium transition-all duration-300 ease-in-out
          ${isItemActive
            ? 'text-[#A8E543] before:absolute before:left-0 before:top-1 before:h-9 before:w-4 before:rounded-r-xl before:bg-[#A8E543]'
            : 'text-[#9CA3AF] hover:bg-meta-4 hover:text-white'}
        `}
      >
        <span className="text-lg">{isItemActive ? item.iconNotActive : item.icon}</span>
        <span className="text-lg">{item.label}</span>
      </Link>
    </li>
  )
  
}

export default SidebarItem
