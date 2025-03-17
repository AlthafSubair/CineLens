import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { addcarousel, deleteMovie, getMovies } from "../redux/thunk/adminThunk";
import { toast } from "react-toastify";
import { logout } from "../redux/slice/authSlice";

interface Prop {
  select: boolean,
  setOpenEditMovie: React.Dispatch<React.SetStateAction<string | null>>
  ids: string[],
  setIds: React.Dispatch<React.SetStateAction<string[]>>
}


const AdminMovieList = ({select, setOpenEditMovie, ids, setIds}: Prop) => {

  

      const [activeMenu, setActiveMenu] = useState<string | number | null>(null);

      const toggleMenu = (id:  string | number | null) => {
        setActiveMenu(activeMenu === id ? null : id);
      }

     const dispatch = useDispatch<AppDispatch>()
     const {movies} = useSelector((state: RootState) => state.admin)

      useEffect(()=>{
    dispatch(getMovies()) 

      },[dispatch])

      const handleDelete = async(id: string) => {
        try {
         const res = await dispatch(deleteMovie(id))
         if(deleteMovie.fulfilled.match(res)){
          toast.success(res.payload.message, {
            autoClose: 5000,
            position: "bottom-left"
          })
         }else{
           toast.error(res.payload as string, {
                  position: "bottom-left",
                  autoClose: 5000,
                });
                if(res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again."){
                  dispatch(logout())
              }
         }
        } catch (error) {
          console.log(error)
        }
      }



      const handleSelect = (id: string) => {
        if(!ids.includes(id)){
          setIds([...ids, id])
        }else{
          setIds(ids.filter(item => item !== id))
        }
      }


      const addCarosel = async(id: string) => {
        try {
          const res = await dispatch(addcarousel(id))
          if(addcarousel.fulfilled.match(res)){
            toast.success(res.payload.message, {
              autoClose: 5000,
              position: "bottom-left"
            })
          }else{
            toast.error(res.payload as string, {
              position: "bottom-left",
              autoClose: 5000,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <div className="my-8 sm:mx-0 mx-2">
      

      {movies.length !== 0 ? (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xxs:grid-cols-2 sm:gap-4 gap-2">
          {movies.map((item, index) => (
            <div key={index} className={` ${item.active ? 'dark:bg-[#1e1e1e] shadow-lg bg-white rounded-lg relative' : 'bg-opacity-50 bg-black dark:bg-white cursor-not-allowed dark:bg-opacity-50 rounded-lg relative'}`}>
              <Link to={`/admin/movie/${item?._id}`} className="relative">
                <img
                  src={item?.image}
                  className={`${!item?.active && 'blur-sm'}  w-full h-80 object-cover rounded-t-lg`}
                  alt=""
                />
              </Link>

{
!select && 
<input id="default-checkbox" onChange={()=>{handleSelect(item?._id)}} type="checkbox" value="" className="absolute top-0 left-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
}

              <div className="relative">
                <Link
                  to={`/admin/movie/${item?._id}`}
                  className="mx-4 flex flex-col mt-4 h-16"
                >
                  <h1 className="text-base font-semibold text-gray-900 dark:text-white">
                    {item?.title}
                  </h1>

                  <div className="flex flex-row dark:text-slate-400 text-gray-600 text-sm gap-3 pt-2">
                    <h3>{new Date(item?.year).getFullYear()}</h3>
                    <h3>{item?.runtime}</h3>
                  </div>
                </Link>

                <div className="flex justify-between my-6 sm:mx-4 mx-2">
                  <button onClick={()=>{addCarosel(item?._id)}} className="flex justify-center dark:text-white text-gray-700 items-center gap-2 px-4 py-2 hover:bg-black rounded-full hover:bg-opacity-50">
                    <IoIosAddCircle size={24} /> <span className="text-[17px]">Add</span>
                  </button>
                  <button
                    className="px-2 py-2 hover:bg-black dark:text-white text-gray-700 rounded-full hover:bg-opacity-50"
                    onClick={() => toggleMenu(item?._id)} // Pass the item ID to toggleMenu
                  >
                    <PiDotsThreeCircleFill size={24} />
                  </button>
                </div>
              </div>

              {/* Conditionally render the popup for this item */}
              {activeMenu === item?._id && (
                <div onClick={()=>toggleMenu(null)} className="dark:bg-[#2f2f2f] bg-slate-50 shadow-lg text-gray-800 z-50 rounded-lg  py-2 right-2 absolute bottom-[4.3rem] flex flex-col gap-2 w-28 ">
                  <button onClick={()=>{handleDelete(item?._id)}} className="flex gap-4 items-center pl-4 pr-8 dark:text-white  hover:text-red-600 rounded-md text-base"> Delete</button>
                  <button onClick={()=> {setOpenEditMovie(item?._id)}} className="flex gap-4 items-center pl-4 pr-8 dark:text-white  hover:text-green-600 rounded-md text-base"> Edit</button>
                  <Link to={`/admin/movie/${item?._id}`} className="flex gap-4 items-center pl-4 pr-8 dark:text-white  hover:text-blue-600 rounded-md text-base"> View</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex rounded-md items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>No Movies Found</p>
        </div>
      )}



    </div>
  )
}

export default AdminMovieList