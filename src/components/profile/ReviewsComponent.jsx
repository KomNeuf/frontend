import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import api from "@/redux/api";
import { Pencil, Star, X } from "lucide-react";
import Loading from "../Loading";
import { formatDate } from "@/utils/myFuc";
import { toast } from "react-toastify";
import NoData from "../NoData";
import langs from "@/app/[lang]/dictionaries/langs";

const ReviewsComponent = ({ userID, lang }) => {
  const t = langs[lang]?.reviewsComponent;
  const loginUser = useSelector((state) => state.auth?.loginUser);
  const [addReview, { isLoading: isAdding }] =
    api.adminApis.useAddReviewMutation();
  const [addReplyToReview, { isLoading: isReply }] =
    api.adminApis.useAddReplyToReviewMutation();
  const [editReview, { isLoading: isEditing }] =
    api.adminApis.useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] =
    api.adminApis.useDeleteReviewMutation();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = api.adminApis.useGetAllUserReviewsQuery(userID, {
    skip: !userID,
  });

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [showReplyForm, setShowReplyForm] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      reviewerId: loginUser?._id,
      reviewedUserId: userID,
      rating,
      reviewText,
    };

    try {
      if (editingReviewId) {
        await editReview({
          reviewId: editingReviewId,
          updatedReviewData: newReview,
        }).unwrap();
        toast.success(t?.updateSuccess);
      } else {
        await addReview(newReview).unwrap();
        toast.success(t?.addSuccess);
        setShowReviewForm(false);
      }
      resetForm();
      refetch();
    } catch (error) {
      console.error(t?.addError, error);
      toast.error(t?.addError);
    }
  };

  const resetForm = () => {
    setReviewText("");
    setRating(5);
    setEditingReviewId(null);
  };

  const handleEditClick = (review) => {
    setRating(review.rating);
    setReviewText(review.reviewText);
    setEditingReviewId(review._id);
  };

  const handleDeleteClick = async (reviewId) => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success(t?.deleteSuccess);
      refetch();
    } catch (error) {
      console.error(t?.deleteError, error);
      toast.error(t?.deleteError);
    }
  };

  const handleReplyClick = (reviewId) => {
    setShowReplyForm((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleReplySubmit = async (reviewId) => {
    const replyData = {
      replyText: replyText[reviewId],
      replierId: loginUser?._id,
    };
    try {
      await addReplyToReview({ reviewId, replyData }).unwrap();
      toast.success(t?.replySuccess);
      setReplyText((prev) => ({ ...prev, [reviewId]: "" }));
      setShowReplyForm((prev) => ({ ...prev, [reviewId]: false }));
      refetch();
    } catch (error) {
      console.error(t?.replyError, error);
      toast.error(t?.replyError);
    }
  };

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }, [reviews]);
  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primaryText mb-6">{t?.reviews}</h1>
      <div className="mb-6 flex gap-4 items-center">
        <h1 className="text-7xl font-semibold">{averageRating}</h1>
        <div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <span> ({reviews?.length || 0})</span>
        </div>
      </div>
      {loginUser && (
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-4 py-2 text-md font-medium text-white bg-primaryText rounded-md hover:bg-primaryText/80 mb-2 min-w-[135px]"
        >
          {showReviewForm ? t?.cancel : t?.addReview}
        </button>
      )}
      {showReviewForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                onClick={() => setRating(i + 1)}
                className={`w-6 h-6 cursor-pointer ${
                  i < rating ? "text-yellow-400" : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            rows="4"
            placeholder={t?.writeReviewPlaceholder}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 text-md font-medium text-white bg-primaryText rounded-md hover:bg-primaryText/80 mb-4 min-w-[135px]"
            disabled={isAdding || isEditing || !reviewText}
          >
            {isAdding || isEditing ? t?.submitting : t?.submitReview}
          </button>
        </form>
      )}

      <div>
        {reviews.length === 0 ? (
          <NoData lang={lang} />
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="flex items-start gap-4 py-5 border-t"
            >
              <img
                src={review?.reviewer?.avatar}
                alt={`${review.reviewer?.name}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div>
                  <h3 className="font-bold mb-1">{review?.reviewer?.name}</h3>
                  <div className="flex items-center mb-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.reviewText}</p>

                {loginUser?._id === review.reviewer?._id && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditClick(review)}
                      className="text-blue-500 hover:bg-blue-50 flex items-center border border-primaryText rounded-lg  px-3  py-1 "
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      {t?.edit}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(review._id)}
                      className="text-red-500 hover:bg-red-50 flex items-center border border-primaryText rounded-lg  px-3 py-1"
                      disabled={isDeleting}
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t?.delete}
                    </button>
                  </div>
                )}
                {loginUser?._id === review.reviewer?._id &&
                  editingReviewId === review._id && (
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            onClick={() => setRating(i + 1)}
                            className={`w-6 h-6 cursor-pointer ${
                              i < rating ? "text-yellow-400" : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <textarea
                        className="w-full border border-gray-300 rounded-md p-2"
                        rows="4"
                        placeholder={t?.updateReview}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="mt-2 px-4 py-2 text-md font-medium text-white bg-primaryText rounded-md hover:bg-primaryText/80"
                        disabled={isAdding || isEditing || !reviewText}
                      >
                        {isAdding || isEditing
                          ? t?.submitting
                          : t?.updateReview}
                      </button>
                    </form>
                  )}
                {(loginUser?._id === review.reviewer?._id ||
                  loginUser?._id === userID) && (
                  <button
                    onClick={() => handleReplyClick(review._id)}
                    className="text-blue-500 hover:underline mt-2"
                  >
                    {showReplyForm[review._id] ? t?.cancelReply : t?.reply}
                  </button>
                )}
                {showReplyForm[review._id] && (
                  <div className="mt-2">
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2"
                      rows="2"
                      placeholder={t?.writeReplyPlaceholder}
                      value={replyText[review._id] || ""}
                      onChange={(e) =>
                        setReplyText((prev) => ({
                          ...prev,
                          [review._id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => handleReplySubmit(review._id)}
                      className="mt-2 px-4 py-2 text-md font-medium text-white bg-primaryText rounded-md hover:bg-primaryText/80"
                    >
                      {t?.submitReply}
                    </button>
                  </div>
                )}
                {review.replies.map((reply) => (
                  <div key={reply._id} className="mt-1 ml- py-4 ">
                    <div className="flex items-start gap-3">
                      <img
                        src={reply?.replier?.avatar}
                        alt={`${reply?.replier?.name}'s avatar`}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold">{reply?.replier?.name}</h4>
                        <small className="text-gray-500">
                          {formatDate(reply.date)}
                        </small>
                        <p className="text-gray-700">{reply.replyText}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsComponent;
