import React, { useState, useEffect } from 'react';

const UserProfileHeader = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('User');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }
    }, []);

    // Function to get user initials
    const getInitials = (userData) => {
        if (!userData) return 'U';

        if (userData.firstName && userData.lastName) {
            return (userData.firstName.charAt(0) + userData.lastName.charAt(0)).toUpperCase();
        }

        if (userData.fullName) {
            const names = userData.fullName.split(' ');
            return names.length > 1
                ? (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
                : names[0].charAt(0).toUpperCase();
        }

        if (userData.email) {
            return userData.email.charAt(0).toUpperCase();
        }

        return 'U';
    };

    // Show loading state if user data is not loaded yet
    if (!user) {
        return (
            <div className="flex items-center justify-end gap-3 px-4 py-2 bg-white">
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex flex-col gap-1">
                    <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full mb-5 rounded-xl items-center md:justify-end  gap-3 p-2 bg-white">
            {/* Profile Avatar */}
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium text-sm">
                {getInitials(user)}
            </div>

            {/* Profile Info */}
            <div className="flex flex-col">
                <span className="text-gray-900 font-medium text-sm">
                    {user.email || 'No email'}
                </span>
                <span className="text-gray-500 text-xs">
                    {user.role || 'No role'}
                </span>
            </div>
        </div>
    );
};

export default UserProfileHeader;