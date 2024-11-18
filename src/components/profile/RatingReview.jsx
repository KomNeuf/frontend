import React, { useMemo } from "react";
import api from "@/redux/api";
import { Star } from "lucide-react";
import langs from "@/app/[lang]/dictionaries/langs";

const RatingReview = ({ userID, lang }) => {
  const t = langs[lang]?.review;
  const { data: reviews = [], isLoading } =
    api.adminApis.useGetAllUserReviewsQuery(userID, {
      skip: !userID,
    });

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }, [reviews]);

  if (isLoading) return <p>{t?.loading}</p>;

  if (reviews.length === 0) {
    return (
      <div className="text-gray-600 text-sm md:text-base">{t?.noRating}</div>
    );
  }

  return (
    <div className="flex items-center mt-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 md:w-5 md:h-5 ${
            i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"
          } fill-current`}
        />
      ))}

      <span className="ml-2 text-gray-600 text-sm md:text-base">
        {reviews.length} {t?.reviews}
      </span>
    </div>
  );
};

export default RatingReview;
