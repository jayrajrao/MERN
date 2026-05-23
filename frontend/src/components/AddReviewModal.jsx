import { useState } from "react";
import { apiService } from "../services/api"; // API Service import kar li

function AddReviewModal({ isOpen, onClose, companyId, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: "5", // Default 5 star
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Direct apiService call karke object bhej diya
      await apiService.addReview({
        companyId: companyId,
        fullName: formData.fullName,
        subject: formData.subject,
        reviewText: formData.reviewText,
        rating: Number(formData.rating), // Backend expects a number
      });

      // Success hone par form reset aur close
      setFormData({ fullName: "", subject: "", reviewText: "", rating: "5" });
      onSuccess(); // Detail page ko refresh karega
      onClose();
    } catch (err) {
      // API se aayi hui error ya server error show hogi
      setError(err.message || "Server error. Is your backend running?");
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Review</h2>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
              placeholder="Short summary of your review"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review Description *</label>
            <textarea
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
              placeholder="Write your detailed review here..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce]"
            >
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="3">3 Stars - Average</option>
              <option value="2">2 Stars - Poor</option>
              <option value="1">1 Star - Terrible</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7e22ce] hover:bg-purple-800 transition-colors text-white font-medium py-2.5 rounded-md flex justify-center items-center"
            >
              {loading ? "Saving..." : "Save Review"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddReviewModal;