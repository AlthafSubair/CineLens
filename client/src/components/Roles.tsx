import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { deleteRole } from "../redux/thunk/adminThunk"
import { toast } from "react-toastify"

import { logout } from "../redux/slice/authSlice"
import { useState } from "react"

interface prop{
    setEditRole: React.Dispatch<React.SetStateAction<string | null>>
}
const Roles = ({setEditRole}: prop) => {

  
    const {roles, loading} = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch<AppDispatch>()

    const [isIddel, setIddel] = useState<null | string>(null)
    


  const handleDelete = async(id: string) => {

    setIddel(id)

const res = await dispatch(deleteRole(id))

if(deleteRole.fulfilled.match(res)){
    toast.success(res.payload.message,{
        position: 'bottom-left',
        autoClose: 5000,
    })
    dispatch(deleteRole(id))
}else{
    toast.error(res.payload as string,{
        position: 'bottom-left',
        autoClose: 5000,
    })
     if(res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again."){
            dispatch(logout())
        }
}
  }

  if(roles.length <= 0){
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">No Records Found! </strong>
    <span className="block sm:inline">Didn`t have any roles to list.</span>
    
  </div>
  }

  return (
    <div  className="overflow-y-scroll border border-[#e3e3e3] shadow-lg dark:border-slate-600 rounded-md sm:mx-6 mx-1 my-2"
    style={{
        scrollbarWidth: 'none',
       }}>
        {
            roles.map((role,index) =>(
                <div key={index}>
                <div  className="flex flex-row relative">
                   <div className=" h-20 w-20 rounded-full overflow-hidden m-2">
                   <img src={role?.url} alt="" />
                   </div>
                   <div className="flex flex-col mt-4">
                   <h3 className=" lg:text-xl text-lg dark:text-white text-gray-900">{role?.name}</h3>
                   
                   </div>

                  <div className="flex lg:flex-row sm:flex-row flex-col gap-4 text-white items-center justify-end absolute right-4 top-2">
                  <button onClick={() => setEditRole(role?._id)} className="px-4 rounded-md border-2 border-green-600 bg-green-600 lg:h-10 h-8 w-20 text-center hover:text-green-600 hover:bg-white">
               Edit
                    
                  </button>
                  <button onClick={()=>handleDelete(role?._id)} className="px-4 flex justify-center items-center rounded-md border-2 border-red-600 bg-red-600 lg:h-10 h-8 w-20 text-center hover:text-red-600 hover:bg-white" disabled={loading}>
                  {loading && role._id === isIddel ? (
        <div className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      ) : (
     "Delete"
      )}
                    </button>
                  </div>
                    </div>
                    {index < roles.length - 1 && ( // Check to avoid rendering the last <hr>
              <hr className="border-t-1 border-[#e3e3e3] dark:border-slate-600 mx-4" />
            )}
                </div>
            ))
        }
    </div>
  )
}

export default Roles