import { NavLink } from 'react-router-dom';
import { FaTh, FaBars, FaTimes, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa';
import { MdDashboard, MdWorkspaces } from 'react-icons/md';
import { useState, useContext } from 'react';
import { AuthContext } from '@/Context/Auth/AuthContext';


function SideBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { handleLogOut, isLoggingOut } = useContext(AuthContext);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogoutClick = () => {
        handleLogOut();
        setIsSidebarOpen(false);
    };

    const sidebarItems = [
        { icon: <MdDashboard />, label: 'Dashboard', to: '/app/Dashboard' },
        { icon: <FaUsers />, label: 'Users', to: '/app/Users' },
        { icon: <FaTh />, label: 'Connections', to: '/app/Connections' },
        { icon: <MdWorkspaces />, label: 'Institutions', to: '/app/Institutions' },
        { icon: <FaUser />, label: 'Profile', to: '/app/profile' },
    ];

    return (
        <div className="h-screen">
            {/* Toggle button - visible only on mobile */}
            <button
                onClick={toggleSidebar}
                type="button"
                className={`fixed top-2 right-2 z-50 p-2 ${isSidebarOpen ? 'text-white' : 'text-black'} rounded-lg md:hidden`}
            >
                <span className="sr-only">Toggle sidebar</span>
                {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:static bg-red-400 flex flex-col`} // Added flex flex-col
                aria-label="Sidebar"
            >
                {/* Header Section */}
                <div className="px-4 pt-5">
                    <div className="flex items-center justify-between">
                        <NavLink to="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">
                                CAUHEC Connect
                            </span>
                        </NavLink>
                    </div>
                    <p className="text-sm text-gray-200">Admin Dashboard</p>
                </div>

                {/* Navigation Section - Takes up remaining space */}
                <div className="flex-1 px-3 pb-4 pt-5 overflow-y-auto">
                    <ul className="space-y-2 font">
                        {sidebarItems.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out text-white
                                        hover:bg-red-500 group ${isActive ? 'bg-red-500' : ''}`
                                    }
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <span className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                                        {item.icon}
                                    </span>
                                    <span className="flex-1 ms-3 transition-opacity duration-300 group-hover:opacity-90">
                                        {item.label}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logout Button at the Bottom */}
                <div className="px-3 pb-4 mt-auto">
                    <button
                        onClick={handleLogoutClick}
                        disabled={isLoggingOut}
                        className={`md:w-[10vw] w-40 flex items-center  p-2 rounded-lg text-white transition-all duration-300 
                            ${isLoggingOut
                                ? 'bg-red-300 cursor-not-allowed opacity-75'
                                : 'hover:bg-red-600 cursor-pointer'
                            }`}
                    >
                        {isLoggingOut ? (
                            <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        ) : (
                            <FaSignOutAlt className="w-5 h-5" />
                        )}
                        <span className="flex-1 ms-3">
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
}

export default SideBar;