// AppContext.jsx
import { createContext, useState } from 'react';
import API from '@/utils/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [loadingStats, setLoadingStats] = useState(false);
    const [statsError, setStatsError] = useState(null);
    

    // Fetch dashboard stats
    const getDashboardStats = async () => {
        try {
            setLoadingStats(true);
            const response = await API.get('/admin/stats');
            return response.data?.data || null;
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            setStatsError(error);
            return null;
        } finally {
            setLoadingStats(false);
        }
    };

    // Fetch chart stats
    const getChartStats = async () => {
        try {
            setLoadingStats(true);
            const response = await API.get('/admin/preceptors-vs-students');
            return response.data || null;
        } catch (error) {
            console.error('Failed to fetch chart stats:', error);
            setStatsError(error);
            return null;
        } finally {
            setLoadingStats(false);
        }
    };

    // Fetch users list
    const getUsersData = async () => {
        try {
            setLoadingStats(true);
            const response = await API.get('/admin/users-list');
            return response.data || null;
        } catch (error) {
            console.error('Failed to fetch users list:', error);
            setStatsError(error);
            return null;
        } finally {
            setLoadingStats(false);
        }
    };

    // Fetch all connections
    const fetchConnections = async () => {
        try {
            const response = await API.get('/admin/all-connections');
            return response.data?.data || [];
        } catch (error) {
            console.error('Failed to fetch connections:', error);
            setStatsError(error);
            return [];
        }
    };


    // Fetch all institutions
    const fetchinstitutions = async () => {
        try {
            const response = await API.get('/admin/institutions');
            return response.data?.data || [];
        } catch (error) {
            console.error('Failed to fetch institutions:', error);
            setStatsError(error);
            return [];
        }
    };
    // Fetch all states
    const fetchallstates = async () => {
        try {
            const response = await API.get(`/option?type=state`);
            return response.data?.data || [];
        } catch (error) {
            console.error('Failed to fetch allstates:', error);
            setStatsError(error);
            return [];
        }
    };

    return (
        <AppContext.Provider
            value={{
                getDashboardStats,
                getChartStats,
                getUsersData,
                fetchConnections,
                loadingStats,
                statsError,
                fetchinstitutions,
                fetchallstates,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
