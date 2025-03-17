import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Link } from "react-router-dom"
import { FaPlay, FaRegStar } from "react-icons/fa"
import { useState } from "react"
import Trailer from "../components/Trailer"


const AdminSearch = () => {
    const {search} = useSelector((state: RootState) => state.admin);
   

    const [yt,setYt] = useState<string>("")
        const [isOpen, setIsOpen] = useState(true);


    const handleYt = (yt: string) => {
        setYt(yt)
        setIsOpen(true)
      }
  return (
    <div className="min-h-screen px-4">

    {
      search?.length !== 0 ? <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xxs:grid-cols-2 sm:gap-4 gap-2">
      {search?.map((item, index) => (
        <div key={index} className="dark:bg-[#1e1e1e] shadow-lg bg-white rounded-lg">
          <Link to={`/admin/movie/${item._id}`} className="relative">
            <img src={item.image} className="w-full h-80 object-cover rounded-t-lg" alt="" />
             
          </Link>
    <div className="relative">
         <div className="flex flex-row dark:text-slate-400 text-sm sm:gap-4 gap-2 pt-1 items-center mx-4">
                          <h3>⭐&nbsp;{isNaN(item?.rate%item?.rateCount) ? 0 : item?.rate%item?.rateCount === 0 ? Number(item?.rate/item?.rateCount).toFixed(0)   : Number(item?.rate/item?.rateCount).toFixed(1)}<span className="dark:text-slate-200 text-gray-600">/5</span></h3>
                          <button
                            className="flex flex-row text-blue-700 text-base gap-1 items-center hover:text-blue-400"> <FaRegStar /> Rate</button>
                        </div>
    
                        <Link to={`/admin/movie/${item?._id}`} className="mx-4 flex flex-col mt-4 h-16">
                          <h1 className="text-base font-semibold text-gray-900 dark:text-white"> {item?.title}</h1>
        
                          <div className="flex flex-row dark:text-slate-400 text-gray-600 text-sm gap-3 pt-2">
                          <h3>2024</h3>
                          <h3>{item?.runtime}</h3>
                        </div>
    
                        </Link>
        
                        <div className="flex justify-center my-6 sm:mx-4 mx-2">
                        <button
                        onClick={() => handleYt(item?.trailer)}
                        className="flex justify-center items-center dark:text-white text-gray-800 gap-2 px-4 py-2 hover:bg-black rounded-full hover:bg-opacity-50">
          <FaPlay /> <span className="text-[17px]">Trailer</span>
        </button>
        
        
                        </div>
                        </div>
          
        </div>
      ))}
    </div> : <div className="flex rounded-md items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
<svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
<p>No Movies Found</p>
</div>
    }
    {
yt !== "" && isOpen && <Trailer yt={yt} setIsOpen={setIsOpen} setYt={setYt}/>
}
  </div>
  )
}

export default AdminSearch
