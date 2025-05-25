import DashboardCards from '@/components/Card_Ui';
import PreceptorVsStudentChart from '@/components/ChartPage_ui';
import UserProfileHeader from '@/components/UserProfileHeader';
import { AppContext } from '@/Context/AppContext/AppContext';
import { useContext, useEffect, useState } from 'react';

function Dashboard() {
    const { getDashboardStats, getChartStats } = useContext(AppContext);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                console.log('Dashboard Stats:', data); // Log the dashboard stats
                setDashboardStats(data);
            } catch (err) {
                setError('Failed to fetch dashboard stats.');
                console.error('Error fetching dashboard stats:', err);
            }
        };

        const fetchChartData = async () => {
            try {
                const response = await getChartStats();
                console.log('Chart Data Response:', response); // Log the chart data response
                // Access collectiveData from the nested data property
                const collectiveData = response?.data?.collectiveData || [];
                setChartData(collectiveData);
                console.log('Set Chart Data:', collectiveData); // Log the data being set
            } catch (err) {
                setError('Failed to fetch chart data.');
                console.error('Error fetching chart data:', err);
            }
        };

        fetchStats();
        fetchChartData();
    }, []);

    return (
        <div className="bg-[#F9FAFB] h-screen w-full overflow-auto">
            <UserProfileHeader/>
            <h1 className="ml-5 text-2xl font-semibold">Dashboard Overview</h1>
            <p className="ml-5 text-sm text-gray-400">Welcome back! Here's what's happening.</p>

            {error ? (
                <p className="ml-5 text-red-500">{error}</p>
            ) : (
                <>
                    {/* Pass stats to card component */}
                    <DashboardCards dashboardStats={dashboardStats} />

                    {/* Pass chart data to chart component */}
                    {chartData ? (
                        <PreceptorVsStudentChart collectiveData={chartData} />
                    ) : (
                        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-80 flex items-center justify-center">
                            <p className="text-gray-500">Loading chart...</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Dashboard;