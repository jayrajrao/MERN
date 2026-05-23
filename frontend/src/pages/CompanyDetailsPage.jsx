import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AddReviewModal from "../components/AddReviewModal";
import { apiService } from "../services/api";

function CompanyDetailsPage() {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const compData = await apiService.getSingleCompany(id);
      const revData = await apiService.getCompanyReviews(id, sortBy);
      
      setCompanyData(compData);
      setReviews(revData.reviews || []);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, [id, sortBy]); // sortBy change hone par DB se wapas sorted data aayega

  const handleLike = async (reviewId) => {
    try {
      await apiService.likeReview(reviewId);
      fetchCompanyDetails(); // Like count badhne ke baad list refresh hogi
    } catch (error) {
      console.error("Error liking review", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading details...</div>;
  if (!companyData || !companyData.company) return <div className="min-h-screen flex items-center justify-center text-red-500">Company not found!</div>;

  const { company, averageRating, totalReviews } = companyData;

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans pb-16">
      <div className="max-w-5xl mx-auto pt-8 px-4 mb-4">
        <Link to="/" className="text-[#7e22ce] hover:underline text-sm font-medium flex items-center gap-1">← Back to Companies</Link>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white border border-gray-100 rounded-xl p-8 flex items-center gap-8 shadow-sm mb-10">
          <img src={company.companyLogo || "https://via.placeholder.com/120/0f172a/ffffff?text=C"} alt={company.companyName} className="w-[120px] h-[120px] object-cover rounded-xl shadow-sm" />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.companyName}</h1>
            <p className="text-gray-500 text-[15px] flex items-center gap-1.5 mb-4">📍 {company.location}, {company.city}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                 <span className="font-bold text-gray-900">{averageRating}</span>
                 <div className="flex text-[#ffc107] text-lg tracking-wider">★★★★<span className="text-gray-300">★</span></div>
              </div>
              <span className="text-gray-500 font-medium text-sm">{totalReviews} Reviews</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 text-sm">Founded: {company.foundedOn}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800">All Reviews</h2>
          <div className="flex items-center gap-4">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 w-40 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#7e22ce]">
              <option value="relevance">Relevance</option>
              <option value="rating_high">Highest Rating</option>
              <option value="rating_low">Lowest Rating</option>
            </select>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#7e22ce] hover:bg-purple-800 transition-colors text-white font-medium px-6 py-2 rounded-md text-sm shadow-sm">
              + Add Review
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8 border border-dashed border-gray-300 rounded-lg">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase">{review.fullName.charAt(0)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.fullName}</h3>
                      <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-[#ffc107] tracking-widest text-sm">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 text-[15px] mb-2">{review.subject}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.reviewText}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleLike(review._id)} className="flex items-center gap-1.5 text-gray-500 hover:text-[#7e22ce] text-sm transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful ({review.likes || 0})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} companyId={id} onSuccess={() => { fetchCompanyDetails(); setIsModalOpen(false); }} />
    </div>
  );
}

export default CompanyDetailsPage;