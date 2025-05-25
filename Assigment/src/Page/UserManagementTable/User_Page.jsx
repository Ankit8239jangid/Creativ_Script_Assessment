import UserProfileHeader from '@/components/UserProfileHeader';
import { AppContext } from '@/Context/AppContext/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { FaGraduationCap, FaHeartbeat, FaSearch } from 'react-icons/fa'; // Import FaSearch

const UserManagementTable = ({ users, onSearch }) => {
  const [activeTab, setActiveTab] = useState('Students');
  const [searchQuery, setSearchQuery] = useState('');
const {getUsersData,setError} = useContext(AppContext)
//   const UsersData  =
  useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const data = await getUsersData();
                // console.log('getUsersData response:', data); // Log the dashboard stats
                // setDashboardStats(data);
            } catch (err) {
                // setError('Failed to fetch dashboard stats.');
                console.error('Error fetching dashboard stats:', err);
            }
        };
        fetchUsersData();
     
    }, []);

  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Optionally, you can fetch new data based on the tab (e.g., students or preceptors)
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  // Filter users based on the active tab (for demonstration, assuming users have a 'type' field)
  const filteredUsers = users?.filter(user => user.type === activeTab.toLowerCase()) || [];

  return (
    <div className=" h-screen w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <UserProfileHeader/>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Users</h2>
          <p className="text-sm text-gray-500">Manage students in the system</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {/* Replace SVG with FaSearch icon */}
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full gap-6   mb-4">
        <button
          onClick={() => handleTabChange('Students')}
          className={`flex justify-center w-full items-center px-4 py-3 rounded-lg text-sm font-medium ${
            activeTab === 'Students'
              ? 'bg-red-50 text-red-500 border border-red-200'
              : 'bg-gray-50 text-gray-500 border border-gray-200'
          }`}
        >
          <FaGraduationCap className="w-4 h-4 mr-2" />
          Students
        </button>
        <button
          onClick={() => handleTabChange('Preceptors')}
          className={`flex justify-center w-full items-center px-4 py-3 rounded-lg text-sm font-medium ${
            activeTab === 'Preceptors'
              ? 'bg-red-50 text-red-500 border border-red-200'
              : 'bg-gray-50 text-gray-500 border border-gray-200'
          }`}
        >
          <FaHeartbeat className="w-4 h-4 mr-2" />
          Preceptors
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">School</th>
              <th className="py-3">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-4 flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-medium">
                      {user.initials}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.type}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="py-4 text-sm text-gray-700">{user.school}</td>
                  <td className="py-4 text-sm text-gray-700">{user.joinDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No {activeTab.toLowerCase()} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Default props in case no data is provided
UserManagementTable.defaultProps = {
  users: [],
  onSearch: () => {},
};

export default UserManagementTable;