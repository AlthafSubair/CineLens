import { useState } from "react";
import { TfiControlBackward } from "react-icons/tfi";
import { PiDotsThreeCircleFill } from "react-icons/pi";

interface prop{
   setPage: React.Dispatch<React.SetStateAction<string>>
}


const AdminMovieNav = ({setPage}: prop) => {
    const [menu,setMenu] = useState(false)

const goBack = () => {
  window.history.back()
}
  return (
    <div className="px-4 flex justify-between items-center font-semibold dark:text-slate-300 text-gray-700 text-[17px]">

      <div>
        <button onClick={goBack} className="flex justify-center items-center gap-2"><TfiControlBackward size={24}/>Back</button>
      </div>
      <div className="sm:flex hidden gap-2 justify-center items-center">
      <button className="hover:underline" onClick={()=> setPage('overview')}>Overview</button>
        <button className="hover:underline" onClick={()=> setPage('cast')}>Cast</button>
        <button className="hover:underline" onClick={()=> setPage('review')}>Review</button>
       
      </div>

      <button className="sm:hidden flex" onClick={()=> setMenu(!menu)}><PiDotsThreeCircleFill size={28} /></button>


{
  menu && <div className="absolute top-28 right-2 w-44 flex flex-col gap-2 z-50 bg-white pl-4 dark:bg-[#111111] shadow-lg p-2 rounded-lg items-start" 
  onClick={()=> setMenu(false)}
  >
    <button  className=" ">Overview</button>
    <button  className="">Cast</button>
        <button  className=" ">Review</button>
       
      
  </div>
}
      
        
         
        
        
    </div>
  )
}

export default AdminMovieNav