import useApiCollection from "../../hooks/useApiCollection";
import { getMediaUrl } from "../../utils/getMediaUrl";
import SectionStatus from "../../components/main/sections/SectionStatus";

function ReviewSection({ productId }) {
  const {
    items: reviews,
    loading,
    errorMessage,
    retry,
  } = useApiCollection(
    `/reviews/product/${productId}`,
    "Unable to load product reviews.",
  );

  return (
    <div className="a-tab-pane" id="mn-spt-nav-review">
      <div className="row">
        <div className="mn-t-review-wrapper">
          {loading && <SectionStatus message="Loading reviews..." />}
          {!loading && errorMessage && (
            <SectionStatus message={errorMessage} onRetry={retry} />
          )}
          {!loading && !errorMessage && reviews.length === 0 && (
            <p>No customer reviews have been submitted yet.</p>
          )}
          {!loading &&
            !errorMessage &&
            reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ review }) {
  const avatar =
    getMediaUrl(review.user?.avatar) || "/assets/img/user/1.jpg";

  return (
    <div className="mn-t-review-item">
      <div className="mn-t-review-avtar">
        <img src={avatar} alt="" />
      </div>

      <div className="mn-t-review-content">
        <div className="mn-t-review-top">
          <div className="mn-t-review-name">{review.name}</div>
          <div className="mn-t-review-rating mn-pro-rating">
            <Rating rating={review.rating} />
          </div>
        </div>

        <div className="mn-t-review-bottom">
          <p>{review.comment}</p>
        </div>
      </div>
    </div>
  );
}

function Rating({ rating }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          className={`ri-star-fill ${star > rating ? "grey" : ""}`}
          key={star}
        ></i>
      ))}
    </>
  );
}

export default ReviewSection;
