// Base URL
const BASE_URL = "https://mern-lwqr.onrender.com/api";

export const apiService = {

  // ================= COMPANY APIs =================

  // Add Company
  addCompany: async (companyData) => {
    const response = await fetch(`${BASE_URL}/companies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add company");
    }

    return data;
  },



  // Get All Companies
  getCompanies: async (search = "", city = "") => {

    const params = new URLSearchParams();

    if (search) params.append("search", search);

    if (city) params.append("city", city);

    const response = await fetch(
      `${BASE_URL}/companies?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch companies");
    }

    return data;
  },



  // Get Single Company
  getSingleCompany: async (id) => {

    const response = await fetch(
      `${BASE_URL}/companies/${id}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch company details"
      );
    }

    return data;
  },



  // ================= REVIEW APIs =================



  // Add Review
  addReview: async (reviewData) => {

    const response = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add review");
    }

    return data;
  },



  // Get Company Reviews
  getCompanyReviews: async (
    companyId,
    sortBy = ""
  ) => {

    let url = `${BASE_URL}/reviews/${companyId}`;

    if (sortBy) {
      url += `?sortBy=${sortBy}`;
    }

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch reviews");
    }

    return data;
  },



  // Like Review
  likeReview: async (reviewId) => {

    const response = await fetch(
      `${BASE_URL}/reviews/like/${reviewId}`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to like review");
    }

    return data;
  },
};