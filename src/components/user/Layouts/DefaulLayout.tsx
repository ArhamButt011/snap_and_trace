'use client'
import React, { useState } from 'react'

import Header from '../Header'
import Footer from '../Footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="bg-black">
        {/* <!-- ===== Header Start ===== --> */}
        <Header />
        {/* <!-- ===== Header End ===== --> */}
        {/* <!-- ===== Main Content Start ===== --> */}
        <div className="">{children}</div>
        {/* <!-- ===== Main Content End ===== --> */}
        {/* <!-- ===== Footer Start ===== --> */}
        <Footer />
        {/* <!-- ===== Footer End ===== --> */}
      </div>
      {/* <!-- ===== Content Area End ===== --> */}

      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  )
}
