import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { getUsers, suspendUser } from "../redux/thunk/adminThunk"
import { toast } from "react-toastify"


const UsersTable = () => {
    const dispatch = useDispatch<AppDispatch>()
const {users} = useSelector((state: RootState) => state.admin)

    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])


    const handleSuspend = async(id: string) => {
        try {
            console.log(id)
            const res = await dispatch(suspendUser(id))
            if(suspendUser.fulfilled.match(res)) {
                toast.success("User suspended successfully", {
                    position: "bottom-left",
                    autoClose: 3000
                })
            }else{
                toast.error(res.payload as string, {
                    position: "bottom-left",
                    autoClose: 3000
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="p-4 mt-4">
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Username
                </th>
                <th scope="col" className="px-6 py-3">
                   Email
                </th>
                <th scope="col" className="px-6 py-3">
                   isVerified
                </th>
                <th scope="col" className="px-6 py-3">
                   isSuspended
                </th>
                <th scope="col" className="px-6 py-3">
                   authType
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {Array.isArray(users) &&
                users?.map((user)=>(
                    <tr key={user?._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.username}
                    </th>
                    <td className="px-6 py-4">
                       {user.email}
                    </td>
                    <td className="px-6 py-4">
                        {user.isVerified === true ? "true" : "false"}
                    </td>
                    <td className="px-6 py-4">
                        {user.isSuspended === true ? "true" : "false"}
                    </td>
                    <td className="px-6 py-4">
                        {user.authType}
                    </td>
                    
                        <td className="px-6 py-4 text-right">
                        <button onClick={()=>handleSuspend(user?._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            { user.isSuspended === true ? "UnSuspend" : "Suspend"}</button>
                    
                  </td>
                    
                </tr>
                ))
            }
           
        </tbody>
    </table>
</div>

    </div>
  )
}

export default UsersTable
