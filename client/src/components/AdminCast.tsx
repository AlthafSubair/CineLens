import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { deleteCast, getCasts } from "../redux/thunk/adminThunk"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { logout } from "../redux/slice/authSlice"

interface prop{
  setAddCast: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminCast = ({setAddCast}: prop) => {
    const {cast} = useSelector((state: RootState)=>state.admin)
    const dispatch = useDispatch<AppDispatch>()
    const {id} = useParams()
    
 useEffect(()=>{
   dispatch(getCasts(id)) 
 },[dispatch, id])

 const handleDelte = async(id: string ) =>{
  try {
    const res = await dispatch(deleteCast(id))
    if (deleteCast.fulfilled.match(res)) {
      toast.success(res.payload.message, { autoClose: 5000, position: "bottom-left" })
  
    } else {
      toast.error(res.payload as string, { position: "bottom-left", autoClose: 5000 })
      if (res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again.") {
        dispatch(logout())
      }
    }
  } catch (error) {
    console.log(error)
  }
 }

  return (
    <div className="h-screen mt-8 rounded-md border-2 border-gray-500 relative">
    <button onClick={()=>setAddCast(true)} className="absolute top-[-12px] right-[20px] dark:bg-[#1e1e1e] bg-[#f5f7f8] px-2 dark:text-slate-300 dark:hover:text-slate-500 text-gray-700 hover:text-gray-500">
     Add Cast & Crew
    </button>
    <div  className="overflow-y-scroll border border-[#e3e3e3] shadow-lg dark:border-slate-600 rounded-md sm:mx-6 mx-1 my-2"
    style={{
        scrollbarWidth: 'none',
       }}>
        {
            cast.map((item,index) =>(
                <div key={index}>
                <div  className="flex flex-row relative">
                   <div className=" h-20 w-20 rounded-full overflow-hidden m-2">
                   <img src={item?.image} alt="" />
                   </div>
                   <div className="flex flex-col mt-4">
                   <h3 className=" lg:text-xl text-lg dark:text-white text-gray-900">{item?.person}</h3>
                   <h6 className="text-md dark:text-slate-300 text-gray-700">{item.char_name}</h6>
                   <h6 className="text-md dark:text-slate-300 text-gray-700">{item.role !== "Actor" && item.role}</h6>
                   </div>

                  <div className="flex lg:flex-row sm:flex-row flex-col gap-4 text-white items-center justify-end absolute right-4 top-2">
                  <button onClick={()=>{handleDelte(item.id)}} className="px-4 rounded-md border-2 border-red-600 bg-red-600 lg:h-10 h-8 w-20 text-center hover:text-red-600 hover:bg-white">
              delete
                    
                  </button>
                  
                  </div>
                    </div>
                    {index < cast.length - 1 && ( // Check to avoid rendering the last <hr>
              <hr className="border-t-1 border-[#e3e3e3] dark:border-slate-600 mx-4" />
            )}
                </div>
            ))
        }
    </div>
    
  </div>
  
  )
}

export default AdminCast