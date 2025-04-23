import Logo from '@/components/user/Header/Logo'
import DropdownNotification from './DropdownNotification'
import DropdownUser from './DropdownUser'

const Header = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#14141A] border-b-1">
      <div className="flex flex-wrap items-center sm:gap-0 gap-5 sm:justify-between justify-center px-4 py-4">
        <div className="flex items-center">
          <Logo redirect={false} />
        </div>
        <div className="flex items-center gap-8 2xsm:gap-7">
          <DropdownUser />
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
