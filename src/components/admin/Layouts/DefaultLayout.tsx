// 'use client'
// import React, { useState } from 'react'
// import Sidebar from '../Sidebar'
// import Header from '../Header'

// export default function DefaultLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true)

//   return (
//     <div className="flex h-screen bg-[#14141A] text-white">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Main content */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         {/* Header */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         {/* Page content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 2xl:p-11 bg-[#14141A]">
//           <div className="mx-auto max-w-screen-2xl">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }


'use client'
import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="relative h-screen bg-[#14141A] text-white">
      {/* Sidebar - fixed to the left */}
      <div className="fixed top-0 left-0 z-40 h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main section */}
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Header stays full width at the top */}
        {/* Page content */}
        <main className="flex-1 overflow-y-auto pt-1 px-4 md:px-10 2xl:px-10 bg-[#14141A] min-h-screen">
          <div className="mx-auto max-w-screen-2xl bg-[#1D1D23] pt-10 pb-5 px-2 rounded-xl 2xl:min-h-[85vh] min-h-[90vh] ">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

