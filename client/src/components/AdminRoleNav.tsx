
interface Props {
  setAddRole: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminRoleNav = ({setAddRole}: Props) => {
  return (
    <div className="mt-8 text-lg font-semibold flex justify-end px-8">
        <button onClick={() => setAddRole(true)} className="border-2 border-blue-500 px-4 py-2 rounded-md bg-blue-600 text-white hover:text-blue-600 hover:bg-white">Add Role</button>
    </div>
  )
}

export default AdminRoleNav