import React, { useContext, useEffect, useState } from 'react';
import { FiFilter } from "react-icons/fi";
import ShimmerTable from '@/components/ShimmerUI/ShimmerTable';
import { AppContext } from '@/Context/AppContext/AppContext';
import UserProfileHeader from '@/components/UserProfileHeader';

const Institutions = () => {
    const [schoolLocation, setSchoolLocation] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [institutions, setInstitutions] = useState([]);

    const { fetchallstates, loadingUsers, usersError } = useContext(AppContext);
    const fetchInstitutions = async () => {
        try {
            const res = await fetchallstates();
            setInstitutions(res.options); // Correctly sets institutions
        } catch (err) {
            console.error("Error fetching institutions", err);
        }
    };
    
    useEffect(() => {
        fetchInstitutions();
    }, []);
    

    return (
        <div className="bg-[#F9FAFB] overflow-auto min-h-screen w-full p-5">
            <UserProfileHeader />
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">Institutions</h1>
                    <p className="text-sm text-gray-400">Manage partner institutions and facilities</p>
                </div>
                <button className="bg-[#FF4D4F] text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-lg">+</span> Add Institution
                </button>
            </div>

            {loadingUsers ? (
                <ShimmerTable />
            ) : usersError ? (
                <div className="p-6 bg-white rounded-xl shadow border border-gray-100">
                    <p className="text-red-500">{usersError}</p>
                    <button
                        className="mt-2 text-blue-500 underline"
                        onClick={fetchInstitutions}
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="p-6 bg-white rounded-xl shadow border border-gray-100">
                    {/* Filter Section */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <FiFilter className="text-gray-600" />
                            <span className="text-sm text-gray-600">Filters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900">School Location</span>
                            <select
                                value={schoolLocation}
                                onChange={(e) => setSchoolLocation(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none"
                            >
                                <option value="ALL">ALL States</option>
                                {institutions.map((state) => (
                                    <option key={state.id} value={state.value}>
                                        {state.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search schools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <p className="text-gray-500 text-center">
                        Please select a state to view locations
                    </p>
                </div>
            )}
        </div>
    );
};

export default Institutions;
