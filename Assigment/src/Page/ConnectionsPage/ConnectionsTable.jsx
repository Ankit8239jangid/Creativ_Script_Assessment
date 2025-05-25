import React, { useContext, useEffect, useState } from 'react';
import { FiFilter } from "react-icons/fi";
import ShimmerTable from '@/components/ShimmerUI/ShimmerTable';
import { AppContext } from '@/Context/AppContext/AppContext';
import UserProfileHeader from '@/components/UserProfileHeader';

const ConnectionsTable = () => {
    const [connections, setConnections] = useState([]);
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [statusFilter, setStatusFilter] = useState('accepted');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { fetchConnections } = useContext(AppContext);

    const fetchConnectionsData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchConnections(); // returns array directly
            if (Array.isArray(response)) {
                setConnections(response);
            } else {
                throw new Error('Unexpected data format');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch connections. Please try again.');
            setConnections([]); // reset state on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConnectionsData();
    }, []);

    useEffect(() => {
        const filtered = connections.filter(conn =>
            conn.connection_status?.toLowerCase() === statusFilter
        );
        setFilteredConnections(filtered);
        setCurrentPage(1);
    }, [statusFilter, connections]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };


    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredConnections.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredConnections.length / itemsPerPage);

    return (
        <>
            <div className="bg-[#F9FAFB] overflow-auto p-4 min-h-screen w-full">
                <UserProfileHeader />
                <h1 className="text-2xl font-semibold mb-2">Connections Management</h1>
                <p className="text-sm text-gray-400 mb-6">Manage student-preceptor connections</p>

                {loading ? (
                    <ShimmerTable />
                ) : error ? (
                    <div className="p-6 bg-white rounded-xl shadow border border-gray-100">
                        <p className="text-red-500">{error}</p>
                        <button
                            className="mt-2 text-blue-500 underline"
                            onClick={fetchConnectionsData} // Fix: Call fetchConnectionsData instead of fetchConnections
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="p-6 bg-white rounded-xl shadow border border-gray-100">
                        {/* Filter Dropdown */}
                        <div className="flex items-center gap-4 mb-6">
                            <div>
                                <h2 className="text-xl flex items-center gap-3 font-semibold text-gray-900 capitalize">
                                    <FiFilter /> Filters
                                </h2>
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border text-center border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none"
                            >
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-xs text-gray-500 uppercase">
                                        <th className="py-3">Student Name</th>
                                        <th className="py-3">Student Email</th>
                                        <th className="py-3">Preceptor Name</th>
                                        <th className="py-3">Preceptor Email</th>
                                        <th className="py-3">Request Date</th>
                                        <th className="py-3">Connection Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((conn, index) => (
                                            <tr key={index} className="border-t border-gray-100">
                                                <td className="py-4 flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-medium">
                                                        {conn.student_name
                                                            .split(' ')
                                                            .map((name) => name[0])
                                                            .join('')
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">{conn.student_name}</p>
                                                        <p className="text-xs text-gray-500">ID: {conn.student_id}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-sm text-gray-700">{conn.student_email}</td>
                                                <td className="py-4 text-sm text-gray-700">{conn.preceptor_name}</td>
                                                <td className="py-4 text-sm text-gray-700">{conn.preceptor_email}</td>
                                                <td className="py-4 text-sm text-gray-700">{formatDate(conn.connection_request_date)}</td>
                                                <td className="py-4 text-sm text-gray-700">{formatDate(conn.connection_date)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-4 text-center text-gray-500">
                                                No {statusFilter} connections found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {filteredConnections.length > 0 && totalPages > 1 && (
                            <div className="flex justify-between items-center mt-6 text-sm">
                                <p>
                                    Page {currentPage} of {totalPages}
                                </p>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 border rounded disabled:opacity-50"
                                    >
                                        Prev
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 border rounded disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ConnectionsTable; 