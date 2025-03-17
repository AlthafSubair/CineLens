import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { TfiControlBackward } from "react-icons/tfi";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface Prop {
  setPage: React.Dispatch<React.SetStateAction<string>>
  setShare: React.Dispatch<React.SetStateAction<boolean>>
}


const MovieNav = ({setPage, setShare}: Prop ) => {
 

const [menu,setMenu] = useState(false)

const navigate = useNavigate()

const goBack = () => {
  navigate('/')
}

  return (
    <div className="flex justify-between items-center font-semibold dark:text-slate-300 text-gray-700 text-[17px]">

      <div>
        <button onClick={goBack} className="flex justify-center items-center gap-2"><TfiControlBackward size={24}/>Back</button>
      </div>
      <div className="sm:flex hidden gap-2 justify-center items-center">
      <button onClick={()=> {setPage("home")}} className="hover:underline">Overview</button>
        <button onClick={()=> {setPage("cast")}} className="hover:underline">Cast</button>
        <button onClick={()=> {setPage("review")}} className="hover:underline">Review</button>
        <button type="button"
        onClick={()=> setShare(true)}
         className="flex justify-center items-center text-2xl p-2 dark:hover:bg-black dark:hover:bg-opacity-50 rounded-full hover:bg-white hover:bg-opacity-85 "><FaShareAlt /> </button>
      </div>

      <button className="sm:hidden flex" onClick={()=> setMenu(!menu)}><PiDotsThreeCircleFill size={28} /></button>


{
  menu && <div className="absolute top-28 right-2 w-44 flex flex-col gap-2 z-50 bg-white pl-4 dark:bg-[#111111] shadow-lg p-2 rounded-lg items-start" 
  onClick={()=> setMenu(false)}
  >
    <button onClick={()=> {setPage("home")}} className=" ">Overview</button>
    <button onClick={()=> {setPage("cast")}} className="">Cast</button>
        <button onClick={()=> {setPage("review")}} className=" ">Review</button>
        <button type="button"
        onClick={()=> setShare(true)}
         className="flex justify-center items-center gap-1 "> Share</button>
      
  </div>
}
      
        
         
        
        
    </div>
  )
}

export default MovieNav