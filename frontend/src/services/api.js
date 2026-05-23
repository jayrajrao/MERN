// Yahan hum apna base URL set kar rahe hain
const BASE_URL = "https://mern-lwqr.onrender.com/api";

export const apiService = {
  // ================= COMPANY APIs =================

  // 1. Add a new company
  addCompany: async (companyData) => {
    const response = await fetch(`${BASE_URL}/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });
    if (!response.ok) throw new Error("Failed to add company");
    return response.json();
  },

  // 2. Get all companies (with optional search and city filters)
  getCompanies: async (search = "", city = "") => {
    let url = `${BASE_URL}/companies?`;
    if (search) url += `search=${search}&`;
    if (city) url += `city=${city}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch companies");
    return response.json();
  },

  // 3. Get single company details (includes aggregation for average rating)
  getSingleCompany: async (id) => {
    const response = await fetch(`${BASE_URL}/companies/${id}`);
    if (!response.ok) throw new Error("Failed to fetch company details");
    return response.json();
  },


  // ================= REVIEW APIs =================

  // 4. Add a new review
  addReview: async (reviewData) => {
    const response = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error("Failed to add review");
    return response.json();
  },

  // 5. Get reviews for a specific company (with optional sorting)
  getCompanyReviews: async (companyId, sortBy = "") => {
    let url = `${BASE_URL}/reviews/${companyId}`;
    if (sortBy) url += `?sortBy=${sortBy}`; // Frontend se sort filter bhejne ke liye

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return response.json();
  },

  // 6. Like a review
// services/api.js mein is function ko isse replace kar do
  likeReview: async (reviewId) => {
    // TUMHARE BACKEND KE HISAAB SE URL UPDATE KIYA HAI (PATCH aur /like/:id)
    const response = await fetch(`${BASE_URL}/reviews/like/${reviewId}`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to like review");
    return response.json();
  },
};