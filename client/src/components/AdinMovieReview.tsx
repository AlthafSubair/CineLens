import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { getReviews } from "../redux/thunk/adminThunk"
import { useParams } from "react-router-dom"
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { IoAlertCircle } from "react-icons/io5"

const AdinMovieReview = () => {

  const {review} = useSelector((state: RootState) => state.admin)
  const {id} = useParams()
  const dispatch = useDispatch<AppDispatch>()

   const [seemore, setSeeMore] = useState(590);

  useEffect(()=>{
    dispatch(getReviews(id))
  },[dispatch, id])
console.log(review)
  return (
    <div className="my-8">

      {
        review?.map((item)=>(
          <div key={item._id} className="py-4">
            <div className="flex flex-col gap-2 shadow-lg bg-white rounded-md dark:bg-black dark:bg-opacity-50 p-4 pb-0">
        <div className="flex flex-row justify-between">
          <h3 className="text-slate-500">
            ⭐&nbsp;{item?.rate}
            <span className="dark:text-slate-200 text-gray-600">/5</span>
          </h3>
          {item?.spoiler && (
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
          {item?.caption}
        </h1>

        <p className="text-gray-500 pb-4 dark:text-slate-200 text-justify text-base break-words overflow-hidden">
          {item.review?.length > 590 ? item.review.slice(0, seemore) : item.review} &nbsp;
          {item.review?.length > 590 && (
            <button
              className="text-blue-500 text-base"
              onClick={() =>
                setSeeMore((prev) => (prev > 590 ? 590 : item.review?.length))
              }
            >
              {item.review.length > 590 ? (seemore === 590 ? "See More" : "See Less") : ""}
            </button>
          )}
        </p>

      
      </div>
      <div className="flex flex-row gap-2 items-center justify-end mt-1">
        <p className="text-gray-500 dark:text-slate-200 text-sm">
      
        </p>
        <p className="text-gray-400 dark:text-slate-400 text-sm">
          {/* {String(review.date).split("T")[0].split("-").reverse().join("-")} */}
        </p>
      </div>
            </div>
        ))
      }

    </div>
  )
}

export default AdinMovieReview