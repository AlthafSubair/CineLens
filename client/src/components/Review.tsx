import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { AppDispatch, RootState } from "../redux/store";
import { deleteReview, getReviews } from "../redux/thunk/userThunk";
import { toast } from "react-toastify";
import { logout } from "../redux/slice/authSlice";

interface movie{
  image: string;
  _id: string;
  title: string;
  desc: string;
  trailer: string;
  year: string | number;
  runtime: string;
  genre: string[];
  active: boolean;
  rate: number
}

interface OverviewProp {
  movie: movie;
  setAddReview: React.Dispatch<React.SetStateAction<boolean>>;
  setRevid: React.Dispatch<React.SetStateAction<string>>;
}


const Review = ({ movie, setRevid, setAddReview }: OverviewProp) => {

  const { reviews } = useSelector((state: RootState) => state.user);
  const { userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getReviews(movie?._id));
  }, [dispatch, movie._id]);

  const [seemore, setSeeMore] = useState(590);

  if (!movie) {
    return <div>No movie data available</div>;
  }

  const handleAddRev = () => {
    setAddReview(true);
    if (movie?._id) {
      setRevid(movie?._id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await dispatch(deleteReview(id));
      if (deleteReview.fulfilled.match(res)) {
        toast.success(res.payload.message, {
          autoClose: 5000,
          position: "bottom-left",
        });
      } else {
        toast.error(res.payload as string, {
          position: "bottom-left",
          autoClose: 5000,
        });
        if (
          res.payload === "Token has expired. Please log in again." ||
          res.payload === "Invalid token. Please log in again."
        ) {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Separate the current user's review from others
  const userReview = reviews?.find((rev) => rev?.userId === userId);
  const otherReviews = reviews?.filter((rev) => rev?.userId !== userId);

  return (
    <div>
      <div className="flex flex-row justify-between items-center px-4 my-4">
        <p>{reviews?.length} Reviews</p>

        {!userReview && (
          <button
            onClick={handleAddRev}
            className="flex justify-center items-center px-6 py-2 gap-2 text-blue-700 hover:bg-slate-200 hover:bg-opacity-50 dark:hover:bg-black dark:hover:bg-opacity-25 rounded-lg"
          >
            <FaPlus /> Review
          </button>
        )}
      </div>

      {reviews?.length === 0 ? (
        <div
          className="flex rounded-md items-center mb-4 bg-blue-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <IoAlertCircle className="w-4 h-4 mr-2" />
          <p>No Reviews Found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {/* Display current user's review first */}
          {userReview && userId && (
            <ReviewCard
              review={userReview}
              userId={userId}
              handleDelete={handleDelete}
              seemore={seemore}
              setSeeMore={setSeeMore}
            />
          )}

          {/* Display remaining reviews */}
          {otherReviews?.map((rev) => (
            <ReviewCard
              key={rev?._id}
              review={rev}
              userId={userId}
              handleDelete={handleDelete}
              seemore={seemore}
              setSeeMore={setSeeMore}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;

// Reusable ReviewCard component

interface Review {
  _id: string;
  userId: string;
  username: string;
  rate: number;
  caption: string;
  review: string;
  spoiler: boolean;
  date: string | number;
}

interface ReviewCardProp {
  review: Review, 
  userId: string | null;
  handleDelete: (id: string) => void;
  seemore: number;
  setSeeMore: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewCard = ({ review, userId, handleDelete, seemore, setSeeMore }: ReviewCardProp) => {
  return (
    <div key={review?._id}>
      <div className="flex flex-col gap-2 shadow-lg bg-white rounded-md dark:bg-[#1e1e1e] p-4 pb-0">
        <div className="flex flex-row justify-between">
          <h3 className="text-slate-500">
            ⭐&nbsp;{review?.rate}
            <span className="dark:text-slate-200 text-gray-600">/5</span>
          </h3>
          {review?.spoiler && (
            <>
              <button id="spoiler-tooltip" className="text-2xl text-red-600">
                <IoAlertCircle />
              </button>
              <ReactTooltip
                anchorId="spoiler-tooltip"
                place="top"
                content="It may contain spoilers"
              />
            </>
          )}
        </div>

        <h1 className="text-xl font-semibold dark:text-white py-4">
          {review?.caption}
        </h1>

        <p className="text-gray-500 dark:text-slate-200 text-justify text-base break-words overflow-hidden">
          {review?.review?.length > 590 ? review.review.slice(0, seemore) : review?.review} &nbsp;
          {review?.review?.length > 590 && (
            <button
              className="text-blue-500 text-base"
              onClick={() =>
                setSeeMore((prev) => (prev > 590 ? 590 : review?.review?.length))
              }
            >
              {review.review.length > 590 ? (seemore === 590 ? "See More" : "See Less") : ""}
            </button>
          )}
        </p>

        {review?.userId === userId ? (
          <button className="text-red-500 text-base text-right pb-1" onClick={() => handleDelete(review?._id)}>
            Delete
          </button>
        ) : (
          <div className="pb-1"></div>
        )}
      </div>
      <div className="flex flex-row gap-2 items-center justify-end mt-1">
        <p className="text-gray-500 dark:text-slate-200 text-sm">
          {review?.userId === userId ? "You" : review?.username}
        </p>
        <p className="text-gray-400 dark:text-slate-400 text-sm">
          {String(review?.date).split("T")[0].split("-").reverse().join("-")}
        </p>
      </div>
    </div>
  );
};
