import React from 'react'

import { Outlet } from 'react-router-dom'
import SideBar from '../Sidbar_Page/Sidbar'

function Layout() {
    return (
        <>
            <div className="h-screen w-full flex overflow-hidden">
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout