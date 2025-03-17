
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect, useState } from "react"
import {  activateMovieById, deactivateMovie, deleteMovie, getCasts, getMovieById } from "../redux/thunk/adminThunk"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { logout } from "../redux/slice/authSlice"
import { MdDelete, MdEdit } from "react-icons/md"

interface propType{
  setOpenEditMovie: React.Dispatch<React.SetStateAction<string | null>>
}
interface Cast {
  id: string;
  role: string;
  person: string;
  image: string;
  char_name: string;
}
const AdminMovieById = ({setOpenEditMovie}: propType) => {

  const {movie, cast} = useSelector((state: RootState) => state.admin)

  const dispatch = useDispatch<AppDispatch>()

  const {id} = useParams() 


  useEffect(()=>{
   if(id){
    dispatch(getMovieById(id))
    dispatch(getCasts(id))
   }
  },[dispatch, id])

  const navigate = useNavigate();


  const handleDelete = async() => {
    try {
     if(id){
      const res = await dispatch(deleteMovie(id))
     
     if(deleteMovie.fulfilled.match(res)){
      toast.success(res.payload.message, {
        autoClose: 5000,
        position: "bottom-left"
      })
navigate(-1)

     }else{
       toast.error(res.payload as string, {
              position: "bottom-left",
              autoClose: 5000,
            });
            if(res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again."){
              dispatch(logout())
          }
     }
    }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDisable = async () => {
    try {
      if(id){
      const res = await dispatch(deactivateMovie(id))
      // console.log(res); 
      // console.log(ids)
      if(deactivateMovie.fulfilled.match(res)){
       toast.success(res.payload.message, {
         autoClose: 5000,
         position: "bottom-left"
       })
      }else{
        toast.error(res.payload as string, {
               position: "bottom-left",
               autoClose: 5000,
             });
             if(res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again."){
               dispatch(logout())
           }
      }
    }
     } catch (error) {
       console.log(error)
     }
    }

    const handleActive = async () => {
      try {
        if(id){
        const res = await dispatch(activateMovieById(id))
        // console.log(res); 
        // console.log(ids)
        if(activateMovieById.fulfilled.match(res)){
         toast.success(res.payload.message, {
           autoClose: 5000,
           position: "bottom-left"
         })
        }else{
          toast.error(res.payload as string, {
                 position: "bottom-left",
                 autoClose: 5000,
               });
               if(res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again."){
                 dispatch(logout())
             }
        }
      }
       } catch (error) {
         console.log(error)
       }
      }



      const [directors, setDirectors] = useState<Cast[]>([])
      const [writers, setWriters] = useState<Cast[]>([])
      useEffect(() => {
        if (cast) {
          setDirectors(cast.filter((member) => member.role === "Director"));
          setWriters(cast.filter((member) => member.role === "Writer"));
        }
      }, [cast]);

      
     
   
  return (
    <div className="flex md:flex-row flex-col mt-2">
        <div className="sm:p-4 p-2 px-4 md:w-1/2 w-full block">
      {/* Title Section */}
      <h1 className="lg:text-4xl dark:text-white text-2xl font-semibold font-roboto w-full">{movie?.title}</h1>
      <div className="flex flex-row gap-4 pt-1 dark:text-slate-400 text-sm text-[15px] text-gray-700">
        <p>{typeof movie?.year === 'string' ? movie.year.slice(0, 4) : movie?.year}</p>
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
     <div className=" w-full">
     
    
  
     <hr className="my-3 mx-2 dark:border-[#4c4445] border-gray-300"/>
  
     <p className="px-2 font-semibold text-gray-900 dark:text-slate-200 text-base">
    {directors?.length && directors.length > 0 ? "Directors" : "Director"} 
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
    {writers?.length && writers.length > 0 ? "Writers" : "Writer"} 
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
    Rating  <span className="text-gray-700 font-normal pl-5 dark:text-slate-400">{movie?.rate}<span className="text-gray-900 dark:text-slate-200">/5 ⭐</span></span>
  </p>
  
     </div>
  
     
    </div>
  

      </div>


        <div className="md:w-1/2 w-full">
        <div className="flex flex-row justify-center items-center">
  <div className="relative w-full" style={{ paddingTop: "53%" }}>
    <img src={movie?.image} alt="Movie Poster" className="absolute lg:top-24 md:top-[5.3rem] top-4 left-0 w-full h-full rounded-lg" />

  </div>
  </div>

  <div className="flex flex-col relative lg:top-28 md:top-24 top-8">
  <p className="text-pretty text-base text-gray-900 dark:text-slate-200 p-2 ">{movie?.desc}fg</p>

  <div className="flex flex-row gap-4 justify-between px-4 py-2">
    <button onClick={()=>id && setOpenEditMovie(id)} className={`flex w-1/2  text-center justify-center items-center gap-4 text-white border rounded-md lg:px-6 px-2 lg:py-2 py-1  hover:bg-white bg-green-500 hover:border-green-500 hover:text-green-500`}><MdEdit size={24}/> Edit</button>  
    <button onClick={handleDelete} className={`flex w-1/2  text-center justify-center items-center gap-4 text-white border rounded-md lg:px-6 px-2 lg:py-2 py-1   hover:bg-white bg-red-500 hover:border-red-500 hover:text-red-500`}><MdDelete size={24}/>Delete</button>
  </div>
  {
    movie.active ? <button onClick={handleDisable} className={`md:flex mx-4 my-2 justify-center items-center gap-4 text-white border rounded-md lg:px-6 px-2 lg:py-2 py-1  hover:bg-white bg-blue-500 hover:border-blue-500 hover:text-blue-500`}>Disable</button> :
    <button onClick={handleActive} className={`md:flex mx-4 my-2 justify-center items-center gap-4 text-white border rounded-md lg:px-6 px-2 lg:py-2 py-1  hover:bg-white bg-blue-500 hover:border-blue-500 hover:text-blue-500`}>Activate</button>
  }  
  </div>
  
        </div>
    </div>
  )
}

export default AdminMovieById