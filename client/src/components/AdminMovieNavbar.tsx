import { GoMultiSelect } from "react-icons/go"
import { GrChapterAdd } from "react-icons/gr"
import { MdDelete } from "react-icons/md"
import { CiPower } from "react-icons/ci";
import { CiNoWaitingSign } from "react-icons/ci";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { activateMovies, deleteMultipleMovies, disableMovies } from "../redux/thunk/adminThunk";
import { toast } from "react-toastify";
import { logout } from "../redux/slice/authSlice";

interface propTypes {
  select: boolean,
  setSelect: React.Dispatch<React.SetStateAction<boolean>>
  setOpenAddMovie: React.Dispatch<React.SetStateAction<boolean>>
  ids: string[]
  setIds: React.Dispatch<React.SetStateAction<string[]>>
}


const AdminMovieNavbar = ({select,setSelect,setOpenAddMovie,ids, setIds}: propTypes) => {

  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = async () => {
  try {
    const res = await dispatch(deleteMultipleMovies(ids))
   setSelect(true)
   setIds([])
    if(deleteMultipleMovies.fulfilled.match(res)){
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
   } catch (error) {
     console.log(error)
   }
  }
 
  const {movies} = useSelector((state: RootState) => state.admin)

  const handleDisable = async () => {
    try {

     const inactiveMovies = movies.filter(movie => ids.includes(movie._id) && !movie.active);
     if (inactiveMovies.length > 0) {
       toast.error("Please select movies that are not disabled", {
         position: "bottom-left",
         autoClose: 5000,
       });
       return;
     }

      const res = await dispatch(disableMovies(ids))
  setSelect(true)
       setIds([])
      if(disableMovies.fulfilled.match(res)){
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
     } catch (error) {
       console.log(error)
     }
    }

    const handleActive = async () => {

      const activeMovies = movies.filter(movie => ids.includes(movie._id) && movie.active);
      if (activeMovies.length > 0) {
        toast.error("Please select movies that are not active", {
          position: "bottom-left",
          autoClose: 5000,
        });
        return;
      }
      try {
        const res = await dispatch(activateMovies(ids))
    setSelect(true)
     setIds([])
        if(activateMovies.fulfilled.match(res)){
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
       } catch (error) {
         console.log(error)
       }
      }
   
  return (
    <div  className="w-full flex flex-row gap-2 text-[16.5px] justify-end items-center px-4 my-4 mt-8">
    <button onClick={()=>{setSelect(!select)}} className="md:flex hidden gap-4 bg-blue-500 text-white border rounded-md lg:px-6 px-2 lg:py-2 py-1 hover:bg-white hover:border-blue-500 hover:text-blue-500"><GoMultiSelect size={24}/>Select</button>
    <button disabled={select} onClick={handleActive} className={`md:flex hidden  text-white border rounded-md lg:px-6 px-2 lg:py-2 py-1 ${select ? 'bg-gray-500 cursor-not-allowed': 'hover:bg-white bg-green-500 hover:border-green-500 hover:text-green-500 '}`}>Active</button>
    <button disabled={select} onClick={handleDisable} className={`md:flex hidden text-white border rounded-md lg:px-6 px-2 lg:py-2 py-1 ${select ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-white bg-yellow-500 hover:border-yellow-500 hover:text-yellow-500'}`}>Disable</button>  
    <button disabled={select} onClick={handleDelete} className={`md:flex hidden gap-4 text-white border rounded-md lg:px-6 px-2 lg:py-2 py-1  ${select ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-white bg-red-500 hover:border-red-500 hover:text-red-500'}`}><MdDelete size={24}/>Delete</button>  
<button onClick={()=>setOpenAddMovie(true)} className="md:flex hidden gap-4 text-blue-600 hover:text-blue-300 px-2 py-2"><GrChapterAdd size={24}/>  Add Movie</button>


<>
<button id="select-tooltip" className="hover:bg-black hover:bg-opacity-50 md:hidden flex rounded-full p-2 hover:text-white text-blue-500">
  <GoMultiSelect size={24}/>
</button>

<ReactTooltip
         anchorId="select-tooltip"
         place="top"
         content="Select"
       />
       </>

       <>
<button id="active-tooltip" className="hover:bg-black hover:bg-opacity-50 md:hidden flex rounded-full p-2 hover:text-white text-green-600">
  <CiPower size={24}/>
</button>

<ReactTooltip
         anchorId="active-tooltip"
         place="top"
         content="Enable"
       />
       </>

       <>
       <button id="deactive-tooltip" className="hover:bg-black hover:bg-opacity-50 md:hidden flex rounded-full p-2 hover:text-white text-red-600">
  <CiNoWaitingSign size={24}/>
</button>

<ReactTooltip
         anchorId="deactive-tooltip"
         place="top"
         content="Disable"
       />
       </>

       <>
       <button id="add-tooltip" onClick={()=>setOpenAddMovie(true)} className="hover:bg-black hover:bg-opacity-50 md:hidden flex rounded-full p-2 hover:text-white text-blue-600">
  <GrChapterAdd size={24}/>
</button>

<ReactTooltip
         anchorId="add-tooltip"
         place="top"
         content="Add Movie"
       />
       </>
    </div>
  )
}

export default AdminMovieNavbar