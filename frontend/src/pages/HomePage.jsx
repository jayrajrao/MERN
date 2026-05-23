import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCompanyModal from "../components/AddCompanyModal";
import { apiService } from "../services/api";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Naya state City filter ke liye
  const [cityFilter, setCityFilter] = useState("");

  // Backend se data fetch karne ka function (async yahan laga hai)
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      // Ab hum apni nayi apiService use kar rahe hain, aur cityFilter bhej rahe hain
      const data = await apiService.getCompanies("", cityFilter);
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Component mount hote hi API call hogi
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans pb-16">
      {/* Container width reduced to 1150px for exact Figma left-right spacing */}
      <div className="max-w-[1150px] mx-auto pt-10 px-6">
        
        {/* Filter Section */}
        <div className="flex items-end justify-between w-full pb-8 mb-8 border-b border-gray-200">
          
          {/* Left: City & Find Company */}
          <div className="flex items-end gap-6">
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-600 mb-1.5 ml-1">
                Select City
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Indore"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 pl-4 pr-10 w-[340px] text-sm text-gray-800 focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
                />
                <span className="absolute right-3 top-2 text-[#7e22ce]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button 
              onClick={fetchCompanies} 
              className="bg-[#7e22ce] hover:bg-purple-800 transition-colors text-white font-medium px-8 py-2 rounded-md text-sm"
            >
              Find Company
            </button>
          </div>

          {/* Middle: Add Company */}
          <div className="flex items-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#7e22ce] hover:bg-purple-800 transition-colors text-white font-medium px-8 py-2 rounded-md text-sm"
            >
              + Add Company
            </button>
          </div>

          {/* Right: Sort */}
          <div className="flex flex-col">
            <label className="text-[13px] text-gray-600 mb-1.5 ml-1">
              Sort:
            </label>
            <select className="border border-gray-300 rounded-md py-2 px-4 w-44 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#7e22ce]">
              <option>Name</option>
              <option>Rating</option>
              <option>Date</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <p className="text-[13px] text-gray-400 mb-4 ml-1">
          Result Found: {companies.length}
        </p>

        {/* Company List */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading companies...</p>
        ) : (
          <div className="flex flex-col gap-6">
            {companies.map((company) => (
              <div
                key={company._id} // MongoDB ka _id
                className="bg-white border border-gray-100 rounded-lg p-5 flex justify-between items-center shadow-sm"
              >
                {/* Left Side: Image & Info */}
                <div className="flex gap-6 items-center">
                  <img
                    src={
                      company.companyLogo ||
                      "https://via.placeholder.com/100/0f172a/ffffff?text=C"
                    }
                    alt={company.companyName}
                    className="w-[90px] h-[90px] object-cover rounded-md"
                  />

                  <div className="flex flex-col justify-center">
                    <h2 className="text-[19px] font-semibold text-gray-900 mb-1">
                      {company.companyName} {/* Backend field */}
                    </h2>
                    <p className="text-gray-500 text-[13px] flex items-center gap-1 mb-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      {company.location}, {company.city} {/* Backend field */}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">
                        {company.averageRating || "0"}
                      </span>
                      <div className="flex text-[#ffc107] text-lg tracking-wider">
                        ★★★★<span className="text-gray-300">★</span>
                      </div>
                      <span className="font-bold text-gray-900 text-[13px] ml-2">
                        {company.totalReviews || "0"} Reviews
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Date & Button */}
                <div className="flex flex-col items-end justify-between self-stretch py-1">
                  <p className="text-[12px] text-gray-400">
                    Founded on {company.foundedOn} {/* Backend field */}
                  </p>
                  <Link
                    to={`/company/${company._id}`} // URL mein _id pass kar rahe hain
                    className="bg-[#333333] hover:bg-[#222222] transition-colors text-white text-sm font-medium px-6 py-2 rounded-md mt-auto"
                  >
                    Detail Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Component */}
      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchCompanies(); // Modal submit hote hi naya data DB se mangwao
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default HomePage;