import { useState } from "react";
import { apiService } from "../services/api"; // API Service import kar li

function AddCompanyModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    city: "",
    foundedOn: "",
    companyLogo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Agar modal open nahi hai, toh kuch return mat karo
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Direct apiService call karke formData bhej diya
      await apiService.addCompany(formData);

      // Form reset karo aur modal close karo
      setFormData({ companyName: "", location: "", city: "", foundedOn: "", companyLogo: "" });
      onSuccess(); // HomePage ko batao ki data add ho gaya hai taaki wo refresh kar sake
      onClose();
    } catch (err) {
      // apiService se aayi hui error message yahan show hogi
      setError(err.message || "Server error. Please make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Company</h2>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
              placeholder="e.g. Graffersid Web and App Development"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location / Address *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
              placeholder="e.g. 816, Shekhar Central, AB road..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
                placeholder="e.g. Indore"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Founded On *</label>
              <input
                type="text"
                name="foundedOn"
                value={formData.foundedOn}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
                placeholder="e.g. 01-01-2016"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo URL</label>
            <input
              type="text"
              name="companyLogo"
              value={formData.companyLogo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
              placeholder="https://example.com/logo.png (Optional)"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7e22ce] hover:bg-purple-800 transition-colors text-white font-medium py-2.5 rounded-md flex justify-center items-center"
            >
              {loading ? "Adding..." : "Save Company"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddCompanyModal;