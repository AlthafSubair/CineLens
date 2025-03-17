import { MdClose, MdLogout } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { logout } from "../redux/slice/authSlice"


interface prop{
  setProfile: React.Dispatch<React.SetStateAction<boolean>>
}

const Profile = ({setProfile}: prop) => {


  const {username, email, avatar} = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  console.log(avatar)
  const handleLogout = () => {
    dispatch(logout())
    setProfile(false)
  }

  return (
    <div className="z-50 top-0 relative dark:bg-[#111111] right-0 w-96 max-w-sm min-h-screen flex flex-col justify-between shadow-lg bg-white">
<div className="absolute top-16 dark:text-white text-gray-800 text-xl right-0 p-4">
<button onClick={() => setProfile(false)}><MdClose /></button>
</div>

<div className="pt-28 dark:text-white text-lg text-gray-900 font-semibold flex flex-col justify-center items-center">
<h1 className="text-center">Profile</h1>

<img src={avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" className="w-32 h-32 rounded-full mt-8"
 onError={(e) => (e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png")}
/>
<h1 className="mt-4">{username}</h1>
<h1 className="mt-2 text-base font-light">{email}</h1>

</div>
<div className="flex justify-center items-center my-4">
  <button onClick={handleLogout} className="text-red-600 dark:bg-black bg-slate-300 bg-opacity-50  dark:bg-opacity-50 p-2 rounded-md mt-4 w-32 mx-auto flex items-center gap-4"><MdLogout /> Logout</button>
</div>
    </div>
  )
}

export default Profile
