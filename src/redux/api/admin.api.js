"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getUserToken = () => {
  const userToken = localStorage.getItem("userToken");
  return userToken ? JSON.parse(userToken).token : "";
};
const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1/",
  baseUrl: "https://kiff-new-backend.vercel.app/api/v1/",
  headers: {
    Authorization:
      typeof window !== "undefined" ? `Bearer ${getUserToken()}` : "",
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.error("Token expired or invalid");
  }

  return result;
};

const api = createApi({
  reducerPath: "userApi",
  tagTypes: [],

  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "user/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `user/reset-password/${token}`,
        method: "PUT",
        body: { password: newPassword, confirmPassword: newPassword },
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "user/register",
        method: "POST",
        body: credentials,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `user/${userId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteAvatar: builder.mutation({
      query: (userId) => ({
        url: `user/delete-avatar/${userId}`,
        method: "PUT",
      }),
    }),
    getSingleUser: builder.query({
      query: (userId) => `user/getUser/${userId}`,
      transformResponse: (response) => response?.data,
    }),
    changePassword: builder.mutation({
      query: ({ userId, currentPassword, newPassword }) => ({
        url: `user/update-password/${userId}`,
        method: "PUT",
        body: { currentPassword, newPassword },
      }),
    }),
    toggleFollowUser: builder.mutation({
      query: ({ loggedInUserId, targetUserId }) => ({
        url: `user/follow/${loggedInUserId}/${targetUserId}`,
        method: "PUT",
      }),
    }),

    // adminDashboard
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "user/adminLogin",
        method: "POST",
        body: credentials,
      }),
    }),
    getAdminAllUsers: builder.query({
      query: () => "user/getAdminAllUsers",
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),

    // product
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "product/create",
        method: "POST",
        body: formData,
      }),
    }),
    getFilteredProducts: builder.query({
      query: (filters) => {
        const queryString = new URLSearchParams(filters).toString();
        return `product/filter?${queryString}`;
      },
      transformResponse: (response) => response?.data,
    }),
    getAllProducts: builder.query({
      query: () => "product/get-all-products",
      transformResponse: (response) => response?.data,
    }),
    getAllVerifiedProducts: builder.query({
      query: ({ limit, offset }) =>
        `product/get-all-verified-products?limit=${limit}`,
      transformResponse: (response) => response?.data,
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `product/update-product/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    getProductById: builder.query({
      query: (productId) => `product/${productId}`,
      transformResponse: (response) => response?.data,
    }),

    getProductsByUserId: builder.query({
      query: (userId) => `product/user-products/${userId}`,
      transformResponse: (response) => response?.data,
    }),
    getSimilarProducts: builder.query({
      query: (productId) => `product/similar-products/${productId}`,
      transformResponse: (response) => response?.data,
    }),
    getLikedProducts: builder.query({
      query: ({ userId, limit }) => `product/liked/${userId}?limit=${limit}`,
      transformResponse: (response) => response?.data,
    }),
    verifiedProduct: builder.mutation({
      query: ({ productId, visibleStatus, adminComment }) => ({
        url: `product/verified-product/${productId}`,
        method: "PUT",
        body: { visibleStatus, adminComment },
      }),
    }),
    getSearchProducts: builder.query({
      query: (query) => {
        const encodedQuery = encodeURIComponent(query);
        return `product/search?query=${encodedQuery}`;
      },
      transformResponse: (response) => response?.data,
    }),
    toggleFavorite: builder.mutation({
      query: ({ productId, userId }) => ({
        url: `product/save-product/${productId}/${userId}`,
        method: "PUT",
      }),
    }),
    incrementViewCount: builder.mutation({
      query: ({ productId, userId }) => ({
        url: `product/view/${productId}/${userId}`,
        method: "PUT",
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `product/delete/${productId}`,
        method: "DELETE",
      }),
    }),

    // reviews
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "review/add-review",
        method: "POST",
        body: reviewData,
      }),
    }),
    getAllUserReviews: builder.query({
      query: (userId) => `review/get-all-reviews/${userId}`,
      transformResponse: (response) => response?.reviews,
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, updatedReviewData }) => ({
        url: `review/update-review/${reviewId}`,
        method: "PUT",
        body: updatedReviewData,
      }),
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `review/delete-review/${reviewId}`,
        method: "DELETE",
      }),
    }),
    addReplyToReview: builder.mutation({
      query: ({ reviewId, replyData }) => ({
        url: `review/reply/${reviewId}/replies`,
        method: "POST",
        body: replyData,
      }),
    }),

    // order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "order/create",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrdersByStatus: builder.query({
      query: ({ status, userType, userId }) => {
        const queryParams = new URLSearchParams({
          status,
          userType,
          userId,
        }).toString();
        return `order/get-all-orders?${queryParams}`;
      },
    }),
    getAllOrders: builder.query({
      query: ({ status, userType, userId }) => {
        const queryParams = new URLSearchParams({
          status,
          userType,
          userId,
        }).toString();
        return `order/all-orders`;
      },
    }),
    getOrderById: builder.query({
      query: (orderId) => `order/getOrderById/${orderId}`,
      transformResponse: (response) => response?.data,
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, newStatus }) => ({
        url: `order/status/${orderId}`,
        method: "PUT",
        body: { newStatus },
      }),
    }),

    // advertise
    createAdvertise: builder.mutation({
      query: (formData) => ({
        url: "advertise/create",
        method: "POST",
        body: formData,
      }),
    }),
    getAllAdvertisements: builder.query({
      query: () => "advertise/get-all-advertise",
    }),
    getSingleAdvertisement: builder.query({
      query: (id) => `advertise/getAdvertiseById/${id}`,
    }),
    editAdvertisement: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `advertise/update/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteAdvertisement: builder.mutation({
      query: (id) => ({
        url: `advertise/delete/${id}`,
        method: "DELETE",
      }),
    }),

    // contact
    createContactUs: builder.mutation({
      query: (formData) => ({
        url: "contact/create",
        method: "POST",
        body: formData,
      }),
    }),
    getAllContacts: builder.query({
      query: () => "contact/get-all",
    }),
    getSingleContact: builder.query({
      query: (id) => `contact/${id}`,
    }),
    editContact: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `contact/update/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contact/delete/${id}`,
        method: "DELETE",
      }),
    }),

    //notification
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: "notification/create",
        method: "POST",
        body: notificationData,
      }),
    }),
    getAllNotifications: builder.query({
      query: () => "notification/get-all",
    }),
    getUserNotifications: builder.query({
      query: (userId) => `notification/user/${userId}`,
    }),
    getSingleNotification: builder.query({
      query: (id) => `notification/${id}`,
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `notification/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateNotification: builder.mutation({
      query: ({ id }) => ({
        url: `notification/update/${id}`,
        method: "PUT",
      }),
    }),

    //message
    createMessage: builder.mutation({
      query: (messageData) => ({
        url: "message/",
        method: "POST",
        body: messageData,
      }),
    }),
    getChatUser: builder.query({
      query: (userId) => `message/chat-user/${userId}`,
      transformResponse: (response) => response?.data,
    }),
    getChatUsersWithLastMessage: builder.query({
      query: (userId) => `message/get-all-chat-users/${userId}`,
      transformResponse: (response) => response?.data,
    }),
    getChatMessage: builder.query({
      query: ({ senderId, receiverId }) => {
        return `message/?senderId=${senderId}&receiverId=${receiverId}`;
      },
      transformResponse: (response) => response?.data,
    }),
    updateSeenMessage: builder.mutation({
      query: ({ senderId, receiverId }) => ({
        url: `message/update-seen-messages/${senderId}/${receiverId}`,
        method: "PUT",
      }),
    }),
    deleteChatMessages: builder.mutation({
      query: ({ userId, chatUserId }) => ({
        url: `message/delete-chat-messages/${userId}/${chatUserId}`,
        method: "DELETE",
      }),
    }),
    archiveConversation: builder.mutation({
      query: ({ userId, chatUserId }) => ({
        url: `message/archive/${userId}/${chatUserId}`,
        method: "PUT",
      }),
    }),
    markConversationAsImportant: builder.mutation({
      query: ({ userId, chatUserId }) => ({
        url: `message/mark-important/${userId}/${chatUserId}`,
        method: "PUT",
      }),
    }),
    getArchivedConversations: builder.query({
      query: (userId) => `message/get-archived/${userId}`,
      transformResponse: (response) => response?.data,
    }),
  }),
});

export default api;
