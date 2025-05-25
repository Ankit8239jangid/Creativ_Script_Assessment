import React, { useState, useEffect } from 'react';
import { MdDelete, MdAdd, MdPerson } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import API from '@/utils/api';
import UserProfileHeader from '@/components/UserProfileHeader';

const Profile = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch profiles from API using Axios
    const fetchProfiles = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await API.get('/profiles');
            const result = response.data;
            console.log(result)
            if (result.status === 'success') {
                setProfiles(result.data || []);
            } else {
                throw new Error('Failed to fetch profiles');
            }
        } catch (err) {
            console.error('Error fetching profiles:', err);
            setError('Failed to load profiles');
            setProfiles([]); // Clear profiles on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    // Function to get user initials for avatar
    const getInitials = (profile) => {
        if (profile.firstName && profile.lastName) {
            return (profile.firstName.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
        }
        if (profile.fullName) {
            const names = profile.fullName.split(' ');
            return names.length > 1
                ? (names[0].charAt(0) + names[1].charAt(0)).toUpperCase()
                : names[0].charAt(0).toUpperCase();
        }
        return profile.email.charAt(0).toUpperCase();
    };

    // Function to handle create admin action
    const handleCreateAdmin = () => {
        alert('Create Admin functionality would be implemented soon');
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gray-50 p-3 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <FaSpinner className="animate-spin text-red-500 h-12 w-12" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 p-3 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <UserProfileHeader/>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 mb-2">Profiles</h1>
                        <p className="text-gray-600">Manage user profiles and credentials</p>
                    </div>
                    <button
                        onClick={handleCreateAdmin}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
                    >
                        <MdAdd size={20} />
                        Create Admin
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Profiles Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Desktop Table Header - Hidden on mobile */}
                    <div className="hidden md:block bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 uppercase tracking-wide">
                            <div className="col-span-1 flex items-center ">
                                <MdPerson size={16} /> 
                            </div>
                            <div className="col-span-4">EMAIL</div>
                            <div className="col-span-6">ROLE</div>
                            <div className="col-span-1">ACTIONS</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200">
                        {profiles.length === 0 ? (
                            <div className="px-6 py-12 text-center text-gray-500">
                                No profiles found
                            </div>
                        ) : (
                            profiles.map((profile) => (
                                <div key={profile.id} className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
                                    {/* Desktop Layout */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                                        {/* Icon/Avatar */}
                                        <div className="col-span-1">
                                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-medium text-sm">
                                                {getInitials(profile)}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="col-span-4">
                                            <span className="text-gray-900 font-medium">{profile.email}</span>
                                        </div>

                                        {/* Role */}
                                        <div className="col-span-6">
                                            <span className="text-gray-600">{profile.role}</span>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-1">
                                            <button
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                title="Delete profile"
                                            >
                                                <MdDelete size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                {/* Avatar */}
                                                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                                                    {getInitials(profile)}
                                                </div>
                                                
                                                {/* Profile Info */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-gray-900 font-medium truncate text-sm sm:text-base">
                                                        {profile.email}
                                                    </div>
                                                    <div className="text-gray-600 text-sm">
                                                        {profile.role}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <button
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-2 flex-shrink-0"
                                                title="Delete profile"
                                            >
                                                <MdDelete size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Footer info */}
                {profiles.length > 0 && (
                    <div className="mt-4 text-sm text-gray-500">
                        Showing {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;