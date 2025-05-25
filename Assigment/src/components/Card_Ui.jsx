import { FaGraduationCap, FaHeartbeat, FaUserCheck, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardCards = ({ dashboardStats }) => {
    if (!dashboardStats) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-xl shadow-lg flex items-center space-x-4 animate-pulse"
                    >
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }


    const statsMap = {
        'Active Connections': 'activeConnections',
        'Active Clinical Rotation': 'activeClinicalRotations',
        'Total Preceptor': 'totalPreceptors',
        'Total Students': 'totalStudents',
    };

    const cardData = [
        {
            title: 'Active Connections',
            icon: <FaUsers className="w-5 h-5 text-red-500" />,
        },
        {
            title: 'Active Clinical Rotation',
            icon: <FaHeartbeat className="w-5 h-5 text-red-500" />,
        },
        {
            title: 'Total Preceptor',
            icon: <FaUserCheck className="w-5 h-5 text-red-500" />,
        },
        {
            title: 'Total Students',
            icon: <FaGraduationCap className="w-5 h-5 text-red-500" />,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {cardData.map((card, index) => {
                const statKey = statsMap[card.title];
                const stat = dashboardStats?.[statKey];

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        className="bg-white p-5 rounded-xl shadow-lg flex items-center space-x-4 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                    >
                        <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            {card.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                {card.title}
                            </h3>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {stat?.count ?? '—'}
                            </p>
                            <p className="text-sm font-medium text-green-600 mt-1">
                                {stat?.change ? `+${stat.change}%` : '—'} <span className="text-gray-400">vs last month</span>
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

// Optional: Add defaultProps to handle undefined props
DashboardCards.defaultProps = {
    dashboardStats: null,
};

export default DashboardCards;