import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addWatchlist, getMovieById } from "../redux/thunk/userThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


interface infoProp  {
    setInfo: React.Dispatch<React.SetStateAction<boolean>>;
    id: string
}

const Info = ({setInfo, id}: infoProp) => {

   const {movie} = useSelector((state: RootState) => state.user);
   const {userId} = useSelector((state: RootState) => state.auth);

const dispatch = useDispatch<AppDispatch>()

   useEffect(()=>{
    dispatch(getMovieById(id))
   },[dispatch, id])

   console.log(id)   

   const navigate = useNavigate()

const handleReview = () =>{
  localStorage.setItem('section', "review")
  setInfo(false)
  navigate(`/movie/${id}`)
}

const handleaddWatchList = async () => {
  try {
    const res = await dispatch(addWatchlist({movieId: id, userId: userId}))
    if (addWatchlist.fulfilled.match(res)) {
      toast.success(res.payload.message,{
        position: "bottom-left",
        autoClose: 5000,
      })
    }else{
      toast.error(res.payload as string,{
        position: "bottom-left",
        autoClose: 5000,
      })
    }
    setInfo(false)
  } catch (error) {
    console.log(error)
  }
}

const handleClose = () => {
  setInfo(false)
}

  return (
    
        <>
          {/* Overlay to dim the background */}


{/* Centered Content */}
<div className="fixed inset-0 md:flex hidden items-center justify-center z-20">
  <div className="relative bg-white dark:bg-[#111111] p-6 rounded-lg dark:text-white xlg:w-1/2 w-3/4 shadow-lg">
    {/* Close Button */}
    <button
      className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:text-red-800"
      onClick={handleClose}
    >
      <MdClose />
    </button>
    
    <div className="flex flex-row justify-start">
        <div className="w-24 h-36 ">
        <img src={movie?.image} className="object-cover h-full w-full rounded-lg" alt="" />
        </div>

        <div className="ml-4 my-3 ">
            <h1 className="text-2xl font-bold">{movie?.title}</h1>
          <div className="flex space-x-2">
          <p className="dark:text-gray-300 text-gray-700 text-md py-1">{String(movie?.year).slice(0, 4)}</p> <span className="dark:text-gray-300 text-gray-700 text-md py-1">.</span>
          <p className="dark:text-gray-300 text-gray-700 text-md py-1">{movie?.runtime}</p>
          </div>

          <p className="dark:text-gray-300 text-gray-700 text-md">Genre</p>

          <p className="py-1 dark:text-gray-300 text-gray-400 text-md align-middle">⭐&nbsp;{movie?.rate && movie?.rateCount ? (isNaN(movie.rate % movie.rateCount) ? 0 : movie.rate % movie.rateCount === 0 ? Number(movie.rate / movie.rateCount).toFixed(0) : Number(movie.rate / movie.rateCount).toFixed(1)) : 0}<span className="dark:text-gray-100 text-gray-900">/5</span></p>
        </div>
      
    </div>
    <p className="px-4 py-4 dark:text-white text-justify">{movie?.desc}</p>

    <div className="flex justify-center items-center py-3 space-x-2">
       <button onClick={handleaddWatchList} className='flex justify-center items-center gap-1 text-[#5594e7] dark:bg-[#2c2c2c] bg-slate-200 rounded-full px-6 py-2 lg:w-4/6 w-2/4'>
                      <FaPlus />
                      <span className='text-lg'>Watchlist</span>
                      </button>

                      <button onClick={handleReview} className='flex justify-center items-center gap-1 text-[#ffb700] dark:bg-[#2c2c2c] bg-slate-200 rounded-full px-6 py-2 lg:w-1/6 w-2/4'>
                      <span className='text-lg'>Review</span>
                      </button>
    </div>
  </div>
</div>

<div
    className="fixed inset-x-0 bottom-0 md:hidden flex items-center justify-center z-20"
    style={{ maxHeight: "70vh", overflowY: "auto" }}
  >
    <div className="relative bg-white dark:bg-[#111111] p-6 rounded-t-lg dark:text-white w-full shadow-lg">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:text-red-800"
        onClick={handleClose}
      >
        <MdClose />
      </button>

      {/* Modal Content */}
      <div>
        <div className="flex flex-row justify-start">
          <div className="w-24 h-36 ">
            <img
              src={movie?.image}
              className="object-cover h-full w-full rounded-lg"
              alt=""
            />
          </div>

          <div className="ml-4 my-3">
            <h1 className="xs:text-2xl text-xl font-bold">{movie?.title}</h1>
            <div className="flex space-x-2">
              <p className="dark:text-gray-300 text-gray-700 text-md py-1">
                {String(movie?.year).split("-")[0]}
              </p>
              <span className="dark:text-gray-300 text-gray-700 text-md py-1">
                .
              </span>
              <p className="dark:text-gray-300 text-gray-700 text-md py-1">
                {movie?.runtime}
              </p>
            </div>

            <p className="dark:text-gray-300 text-gray-700 text-md">Genre</p>

            <p className="py-1 dark:text-gray-300 text-gray-700 text-md align-middle">
              ⭐&nbsp;{movie?.rate}
              <span className="dark:text-gray-500 text-gray-300">/5</span>
            </p>
          </div>
        </div>
        <p className="px-4 py-4 dark:text-white text-justify">{movie?.desc}</p>

        <div className="flex justify-center items-center py-3 space-x-2">
          <button 
          onClick={handleaddWatchList}
          className="flex justify-center items-center gap-1 text-[#5594e7] dark:bg-[#2c2c2c] bg-slate-200 rounded-full px-6 py-2 lg:w-4/6 w-2/4">
            <FaPlus />
            <span className="text-lg">Watchlist</span>
          </button>

          <button onClick={handleReview} className="flex justify-center items-center gap-1 text-[#ffb700] dark:bg-[#2c2c2c] bg-slate-200 rounded-full px-6 py-2 lg:w-1/6 w-2/4">
            <span className="text-lg">Review</span>
          </button>

        </div>
      </div>
    </div>
  </div>


        </>
      
  )
}

export default Info