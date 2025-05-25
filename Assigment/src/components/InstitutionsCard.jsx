import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const CollegeCard = ({ college }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-80">
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-2">
                    <FaBuilding className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 truncate">{college.collegeName}</h2>
                {college.locationType !== "Institution" && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {college.locationType}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                    <FaBuilding className="w-5 h-5 mr-2 text-red-600" />
                    <p className="text-sm">{college.locationType === "Institution" ? college.collegeName : "Tanana Valley campus"}</p>
                </div>
                <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2 text-red-600" />
                    <p className="text-sm">{college.value}</p>
                </div>
                <div className="flex items-center text-gray-600">
                    <FaPhone className="w-5 h-5 mr-2 text-red-600" />
                    <p className="text-sm">{college.phone || "N/A"}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">ADMINISTRATOR:</span> {college.adminName || "NOT SPECIFIED"}
                </p>
            </div>
        </div>
    );
};

const App = () => {
    const [colleges, setColleges] = React.useState([]);

    React.useEffect(() => {
        // Simulating API response as per the provided structure
        const apiResponse = {
            status: "success",
            data: {
                options: [
                    {
                        id: 129,
                        value: "3211 Providence Drive, Anchorage, AK 99508-8046",
                        locationType: "Institution",
                        DapipId: 100779,
                        IpedsUnitIds: 102553,
                        OpeId: 1146200,
                        ParentDapipId: "-",
                        ParentName: "-",
                        adminEmail: null,
                        adminName: "Elaine P. Maimon",
                        adminPhone: "9077861480",
                        collegeName: "University of Alaska Anchorage",
                        fax: null,
                        phone: "9077861480"
                    },
                    {
                        id: 130,
                        value: "Signers' Hall, Fairbanks, AK 99775-7480",
                        locationType: "Institution",
                        DapipId: 100780,
                        IpedsUnitIds: 102614,
                        OpeId: 1146201,
                        ParentDapipId: "-",
                        ParentName: "-",
                        adminEmail: null,
                        adminName: "Stephen B. Jones",
                        adminPhone: "9074747211",
                        collegeName: "University of Alaska Fairbanks",
                        fax: null,
                        phone: "9074747211"
                    },
                    {
                        id: 131,
                        value: "604 Barnette Street, Fairbanks, AK 99701",
                        locationType: "Additional Location",
                        DapipId: 100781,
                        IpedsUnitIds: 102615,
                        OpeId: 1146202,
                        ParentDapipId: "-",
                        ParentName: "-",
                        adminEmail: null,
                        adminName: null,
                        adminPhone: null,
                        collegeName: "University of Alaska Fairbanks",
                        fax: null,
                        phone: null
                    }
                ]
            }
        };

        if (apiResponse.status === "success") {
            setColleges(apiResponse.data.options);
        }
    }, []);

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
            ))}
        </div>
    );
};

export default App;