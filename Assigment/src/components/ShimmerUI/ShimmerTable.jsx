import React from "react";
import { FaSearch } from "react-icons/fa";

const ShimmerRow = () => {
  return (
    <tr className="animate-pulse border-t border-gray-100">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="py-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </td>
      ))}
    </tr>
  );
};

const ShimmerTable = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-5 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded w-64 animate-pulse"></div>
        </div>
        
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              <th className="py-3">Student Name</th>
              <th className="py-3">Student Email</th>
              <th className="py-3">Preceptor Name</th>
              <th className="py-3">Preceptor Email</th>
              <th className="py-3">Request Date</th>
              <th className="py-3">Connection Date</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, i) => (
              <ShimmerRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShimmerTable;
