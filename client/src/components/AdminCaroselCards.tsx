import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { deleteCarousel, getCarousel } from "../redux/thunk/adminThunk"
import { MdOutlineDelete } from "react-icons/md"
import { toast } from "react-toastify"
import { logout } from "../redux/slice/authSlice"



const AdminCaroselCards = () => {

    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(getCarousel())
    },[dispatch])

    const {carousel} = useSelector((state:RootState)=>state.admin)

   const handleDelete = async (id:string) => {
    const res = await dispatch(deleteCarousel(id))
    if(deleteCarousel.fulfilled.match(res)){
      toast.success(res.payload.message, { autoClose: 5000, position: "bottom-left" })
    } else {
            toast.error(res.payload as string, { position: "bottom-left", autoClose: 5000 })
            if (res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again.") {
              dispatch(logout())
            }
   }
  }


  return (
    <div className="w-full">
<h1 className="text-2xl dark:text-slate-200 text-gray-900 p-4 font-bold">
  Carousel Items
</h1>

      {
       carousel?.map((item,index) => (
        <div key={index} className="">
                    <div className="flex">
                      <div className="w-28 h-36 sm:p-3 flex justify-center items-center">
                        <img src={item?.image} className="object-cover w-full h-full rounded-lg" />
                      </div>
          
                      <div className="flex flex-col p-3 dark:text-white">
                        <h1 className="sm:text-lg text-sm font-bold">{index + 1}. {item?.title}</h1>
                        <div className="flex flex-row dark:text-slate-400 text-gray-600 text-sm gap-3 pt-2">
                          {/* <h3>{String(item.year).split('-')[0]}</h3>
                          <h3>{item.runtime}</h3> */}
                        </div>
          
                      
          
                        <div className="flex flex-row dark:text-slate-400 text-sm sm:gap-4 gap-2 pt-2 items-center">
                          <h3 className="dark:text-slate-50 text-gray-600">⭐&nbsp;{isNaN(item?.rate%item?.rateCount) ? 0 : item?.rate%item?.rateCount === 0 ? Number(item?.rate/item?.rateCount).toFixed(0)   : Number(item?.rate/item?.rateCount).toFixed(1)}<span className="dark:text-slate-200 text-gray-900">/5</span></h3>
                          {/* <button
                            // onClick={() => { setOpenRate(true) }}
                            className="flex flex-row text-blue-700 text-base gap-1 items-center hover:text-blue-400"> <FaRegStar /> Rate</button> */}
                          <button
          onClick={()=>{handleDelete(item?.id)}}
                            className="flex flex-row text-red-700 text-base gap-1 items-center hover:text-red-400"> <MdOutlineDelete className="text-xl" /> Remove</button>
                        </div>
          
                      </div>
                    </div>
          
                    {index < carousel?.length - 1 && ( // Check to avoid rendering the last <hr>
                      <hr className="border-t-1 border-[#e3e3e3] dark:border-slate-600 mx-4" />
                    )}
                  </div>
       ))
      }
    </div>
  )
}

export default AdminCaroselCards
