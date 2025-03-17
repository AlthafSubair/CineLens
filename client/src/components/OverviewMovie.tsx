import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addWatchlist, getCasts } from "../redux/thunk/userThunk";
import { toast } from "react-toastify";

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
  rate: number,
  rateCount: number,
}

interface Cast {
  id: string;
  role: string;
  person: string;
  image: string;
  char_name: string;
}

interface OverviewMovieProps {
  movie: movie;
}



const OverviewMovie = ({ movie }: OverviewMovieProps) => {


  const {cast} = useSelector((state: RootState) => state.user)
  const {userId} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
const {id} = useParams()
  useEffect(()=>{
dispatch(getCasts(id))
  },[dispatch, id])

  const [directors, setDirectors] = useState<Cast[]>([])
  const [writers, setWriters] = useState<Cast[]>([])
  useEffect(() => {
    if (cast) {
      setDirectors(cast.filter((member) => member.role === "Director"));
      setWriters(cast.filter((member) => member.role === "Writer"));
    }
  }, [cast]);

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
  
    } catch (error) {
      console.log(error)
    }
  }
  

  if (!movie) {
    return <div>No movie data available</div>;
  }

  

  return (
    <div className="sm:p-4 p-2">
      {/* Title Section */}
      <h1 className="sm:text-4xl text-2xl font-semibold font-roboto pt-10">{movie?.title}</h1>
      <div className="flex flex-row gap-4 pt-1 dark:text-slate-400 text-sm text-[15px] text-gray-700">
        <p>{String(movie?.year).slice(0,4)}</p>
        <p>{movie?.runtime}</p>
      </div>

      <div className="flex flex-row gap-4 my-4 justify-center items-center">
  <div className="relative w-full" style={{ paddingTop: "56.25%" }}> {/* 16:9 Aspect Ratio */}
    <iframe
      className="absolute top-0 left-0 w-full h-full rounded-lg"
      src={`https://www.youtube.com/embed/${movie?.trailer}`}
      title="YouTube video player"
     
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>

  
</div>

<div className="flex flex-row sm:gap-4 gap-2 justify-start items-center overflow-x-scroll mb-2" style={{scrollbarWidth: "none"}}>
{
  movie?.genre?.map((genre, index) => (
    <div key={index} className="rounded-full px-4 py-1 border border-gray-400 text-gray-900 dark:text-slate-300 text-sm dark:border-slate-400">
      <p>{genre}</p>
    </div>
  ))
}
  </div>


  <div className="w-full flex lg:flex-row flex-col gap-8 items-center">
   <div className="lg:w-2/3 w-full">
   
   <p className="text-pretty text-base text-gray-900 dark:text-slate-200 p-2 ">{movie?.desc}</p>

   <hr className="my-3 mx-2 dark:border-[#4c4445] border-gray-300"/>

   <p className="px-2 font-semibold text-gray-900 dark:text-slate-200 text-base">
   {directors?.length && directors.length > 1 ? "Directors" : "Director"} 
    {
   directors?.length ? (
     directors.map((dir, index) => (
          <span key={index} className="text-gray-700 font-normal pl-5 dark:text-slate-400">{dir?.person}</span>
        ))
      ) : (
        <span className="text-gray-700 font-normal pl-5 dark:text-slate-400">No Directors available</span>
      )
    }
</p>


<hr className="my-3 mx-2 dark:border-[#4c4445] border-gray-300"/>

<p className="px-2 font-semibold text-gray-900 dark:text-slate-200 text-base">
{writers?.length && writers.length > 1 ? "Writers" : "Writer"} 
    {
      writers?.length ? (
        writers.map((wri, index) => (
          <span key={index} className="text-gray-700 font-normal pl-5 dark:text-slate-400">{wri.person}</span>
        ))
      ) : (
        <span className="text-gray-700 font-normal pl-5 dark:text-slate-400">No writer available</span>
      )
    }
</p>

<hr className="my-3 mx-2 dark:border-[#4c4445] border-gray-300"/>
<p className="px-2 font-semibold text-gray-900 dark:text-slate-200 text-base">
  Rating  <span className="text-gray-700 font-normal pl-5 dark:text-slate-400">{isNaN((movie?.rate ?? 0) / (movie?.rateCount ?? 1)) ? 0 : (movie?.rate ?? 0) / (movie?.rateCount ?? 1)}<span className="text-gray-900 dark:text-slate-200">/5 ⭐</span></span>
</p>

   </div>

   <div className="lg:w-1/3 w-full flex flex-col justify-center items-center xlg:px-12 px-6">
   

   <button onClick={handleaddWatchList} className="px-6 py-3 w-full bg-[#003465] rounded-xl flex justify-center items-center text-white gap-4" ><FaPlus /> Add to Watchlist</button>
  

 
</div>
  </div>

    </div>
  );
};

export default OverviewMovie;
