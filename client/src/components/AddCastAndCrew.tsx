import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addCast, getRoles } from "../redux/thunk/adminThunk";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/slice/authSlice";

interface prop {
    setAddCast: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCastAndCrew = ({setAddCast}: prop) => {
    const [selectedValue, setSelectedValue] = useState("");
const [char, setChar] = useState("")
    const [selectedValue1, setSelectedValue1] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(event.target.value);
    };

    const {roles} = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
      dispatch(getRoles)
    },[dispatch])


    const formData = {
      role: selectedValue,
      char: char,
      name: selectedValue1
    }

    const {id} = useParams()

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
      try {
        e.preventDefault()
        if (!id) {
          toast.error("Movie ID is missing");
          return;
        }
      
      const res = await  dispatch(addCast({formData, id}))
      if(addCast.fulfilled.match(res)){
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
        setAddCast(false)
        } catch (error) {
          console.log(error);
        }
      }

  return (
   <div className="dark:bg-[#2f2f2f] max-w-sm absolute top-0 right-0 h-full w-96 shadow-lg bg-white rounded-lg p-6 ">
   
       <h1 className="dark:text-slate-50 font-semibold text-gray-900 text-xl text-center my-4">
           Add Cast & Crew
       </h1>
       
       <div className="absolute top-4 dark:text-white text-gray-700 right-4 text-lg ">
           <button  onClick={() => setAddCast(false)}><MdClose /></button>
       </div>
       
       <form onSubmit={onSubmit}>
       <div className="flex flex-col mt-12 mb-8 gap-4">

<div className="relative w-full">
<select   value={selectedValue}
 onChange={handleChange} className="w-full h-10 text-slate-600 dark:text-slate-300 px-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600 dark:bg-[#37373e] appearance-none">
<option value="" disabled defaultValue={""}>
Select an Role
</option>
<option value="Actor">Actor</option>
<option value="Director">Director</option>
<option value="Writer">Writer</option>
</select>
<div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
<svg
className="w-5 h-5 text-slate-600 dark:text-slate-300"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
>
<path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 d="M19 9l-7 7-7-7"
/>
</svg>
</div>
</div>

<div className="relative w-full">
<select  
value={selectedValue1}
onChange={(e) => setSelectedValue1(e.target.value)}
  className="w-full h-10 text-slate-600 dark:text-slate-300 px-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600 dark:bg-[#37373e] appearance-none">
<option value="" disabled defaultValue={""}>
Select Person
</option>
{
  roles?.map((role) =>(
    <option value={role?._id} key={role?._id}>{role.name}</option>
  ))
}
</select>
<div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
<svg
className="w-5 h-5 text-slate-600 dark:text-slate-300"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
>
<path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 d="M19 9l-7 7-7-7"
/>
</svg>
</div>
</div>


{selectedValue === "Actor" &&  <input value={char} onChange={(e)=>{setChar(e.target.value)}} type="text" placeholder="Enter character name" className="w-full h-10 text-slate-600 dark:text-slate-300 p-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]" />}
</div>


      <Button text="Add" color="#fff" bg="#229df2"/>

       </form>

       </div>
  )
}

export default AddCastAndCrew