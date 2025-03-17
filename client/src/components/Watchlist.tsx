
import { FaRegStar } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoIosBookmark } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteWatchlist, getWatchlist } from "../redux/thunk/userThunk";
import { toast } from "react-toastify";
import { setRating } from "../redux/slice/userSlice";
import { Link } from "react-router-dom";


interface Props {
  SetIdRate: React.Dispatch<React.SetStateAction<string>>
  layout: boolean
}

const Watchlist = ({ layout, SetIdRate }: Props) => {

const dispatch = useDispatch<AppDispatch>()
const {userId} = useSelector((state: RootState) => state.auth)
const {watchlist} = useSelector((state: RootState) => state.user)



const handleRate = (id: string) => {
  SetIdRate(id);
  dispatch(setRating())
}

useEffect(() => {
  dispatch(getWatchlist(userId));
},[dispatch, userId])
console.log(watchlist)

const deletemovie = async(id: string) =>{
  try {
    const res = await dispatch(deleteWatchlist(id))
    if (deleteWatchlist.fulfilled.match(res)) {
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

  } catch (error) {
    console.log(error)
  }
}


  return (

    <div>
      {
        layout ? <div className="border border-[#e3e3e3] shadow-lg dark:border-slate-600 rounded-md sm:mx-6 mx-1 my-2">
        {watchlist?.map((item, index) => (
          <div key={index} className="">
            <div className="flex">
              <Link to={`/movie/${item.movieId}`} className="w-28 h-36 sm:p-3 flex justify-center items-center">
                <img src={item.image} className="object-cover w-full h-full rounded-lg" />
              </Link>
  
              <div className="flex flex-col p-3 dark:text-white">
                <h1 className="sm:text-lg text-sm font-bold">{index + 1}. {item.title}</h1>
                <Link to={`/movie/${item.movieId}`} className="flex flex-row dark:text-slate-400 text-gray-600 text-sm gap-3 pt-2">
                  <h3>{String(item.year).split('-')[0]}</h3>
                  <h3>{item.runtime}</h3>
                </Link>
  
                <div className="flex flex-row dark:text-slate-400 text-gray-600 text-sm gap-3 pt-2">
                  {
                    item.genre.map((genre, index)=>(
                     
                        <h3 key={index}>{genre}</h3>
              
                    ))
                  }
                </div>
  
                <div className="flex flex-row dark:text-slate-400 text-sm sm:gap-4 gap-2 pt-2 items-center">
                   <h3>⭐&nbsp;{isNaN(item.rate/item.rateCount) ? 0 : item.rate%item.rateCount === 0? (item.rate/item.rateCount).toFixed(0) : (item.rate/item.rateCount).toFixed(1)}<span className="dark:text-slate-200 text-gray-600">/5</span></h3>
                  <button
                    onClick={() => {handleRate(item.movieId)}}
                    className="flex flex-row text-blue-700 text-base gap-1 items-center hover:text-blue-400"> <FaRegStar /> Rate</button>
                  <button
  onClick={()=>{deletemovie(item._id)}}
                    className="flex flex-row text-red-700 text-base gap-1 items-center hover:text-red-400"> <MdOutlineDelete className="text-xl" /> Remove</button>
                </div>
  
              </div>
            </div>
  
            {index < watchlist.length - 1 && ( // Check to avoid rendering the last <hr>
              <hr className="border-t-1 border-[#e3e3e3] dark:border-slate-600 mx-4" />
            )}
          </div>
        ))}
      </div> : 

<div className="flex flex-wrap gap-4 lg:mx-8 md:mx-12 mx-2">
{watchlist?.map((item,index) => (
  <div
    className="dark:bg-[#1e1e1e] md:basis-[23%] sm:basis-[30%] xxs:basis-[45%] shadow-lg bg-white rounded-lg md:mx-0 mx-auto"
    key={item._id} // Assuming 'id' is a unique identifier for the items
  >
   <div className="h-72 relative">
    <img src={item.image} className="object-cover w-full h-full rounded-t-lg" />
    <button onClick={()=>{deletemovie(item._id)}} className="absolute top-[-6px] -left-[15px] text-6xl text-[#f5c518]  hover:text-black">
                    <IoIosBookmark />
                  </button>
                  <button className="absolute top-[7px] left-[5px] text-xl text-[black]  hover:text-[#f5c518]">
                    <HiMinusSm />
                  </button>
   </div>

   <div className="flex flex-row dark:text-slate-400 text-sm sm:gap-4 gap-2 pt-1 items-center mx-2">
                   <h3>⭐&nbsp;{isNaN(item.rate/item.rateCount) ? 0 : item.rate%item.rateCount === 0? (item.rate/item.rateCount).toFixed(0) : (item.rate/item.rateCount).toFixed(1)}<span className="dark:text-slate-200 text-gray-600">/5</span></h3>
                  <button
                    onClick={() => {handleRate(item.movieId) }}
                    className="flex flex-row text-blue-700 text-base gap-1 items-center hover:text-blue-400"> <FaRegStar /> Rate</button>
                </div>
                <div className="mx-2 flex flex-col my-2">
                  <h1 className="text-base font-semibold text-gray-900 dark:text-white">{index+1}. {item.title}</h1>

                  <div className="flex flex-row dark:text-slate-400 text-gray-600 text-sm gap-3 pt-2">
                  <h3>{String(item.year).split('-')[0]}</h3>
                  <h3>{item.runtime}</h3>
                </div>
                </div>

                <div className="flex justify-center items-center my-4">
                <Link to={`/movie/${item.movieId}`} className="bg-blue-600 px-4 py-2 rounded-full text-white hover:text-blue-600 hover:bg-white transition-colors duration-300">
  Read More
</Link>

                </div>
  </div>
))}
</div>


      }
    </div>

  )
}

export default Watchlist