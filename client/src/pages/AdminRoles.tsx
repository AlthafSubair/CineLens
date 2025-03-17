import { useState } from "react"
import Roles from "../components/Roles"
import RolesAddForm from "../components/RolesAddForm"
import AdminRoleNav from "../components/AdminRoleNav"
import AdminEditRole from "../components/AdminEditRole"
import AuthHOC from "../components/AuthHOC"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"
import { getRoles } from "../redux/thunk/adminThunk"



const AdminRoles = () => {

  const [addRole, setAddRole] = useState(false)
  const [editRole, setEditRole] = useState<string | null>(null)

  const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
 dispatch(getRoles())

    },[dispatch])
    
  return (
    <div className="h-full flex flex-col">
      <AdminRoleNav setAddRole={setAddRole} />
        <div className=" w-full md:p-2 overflow-y-scroll mt-4 mb-14">
        <Roles setEditRole={setEditRole}/>
        </div>
        { addRole && <div className="flex justify-center items-center max-w-sm">
        <RolesAddForm setAddRole={setAddRole}/>
        </div> }

        {
          editRole !== null && <div className="flex justify-center items-center max-w-sm">
          <AdminEditRole setEditRole={setEditRole} editRole={editRole}/>
          </div> }
        
    </div>
  )
}
const ProtectedAdminRoles = AuthHOC(AdminRoles)
export default ProtectedAdminRoles