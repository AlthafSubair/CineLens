import { MdClose, MdStar} from "react-icons/md";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addRate, getMovieById, getRateById } from "../redux/thunk/userThunk";
import { toast } from "react-toastify";
import { logout } from "../redux/slice/authSlice";



const myStyles = {
  itemShapes: Star,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9'
}

interface Prop {
  idofRate: string,
  SetIdRate: React.Dispatch<React.SetStateAction<string>>
}

const RateMovie = ({idofRate, SetIdRate}: Prop) => {
const [rate,setRate] = useState(0)

const {movie, rating} = useSelector((state : RootState) => state.user)
const {userId} = useSelector((state : RootState) => state.auth)

useEffect(() => {
  if(rating){
    setRate(rating)
  }  
}, [rating])




const dispatch = useDispatch<AppDispatch>();

useEffect(()=>{
  dispatch(getMovieById(idofRate))
},[dispatch, idofRate])

useEffect(()=>{
  dispatch(getRateById({id: idofRate, userId: userId}))
},[dispatch, idofRate, userId])

const onSubmit = async () => {

  try {
  
const res = await dispatch(addRate({id: idofRate, rate: rate, userId: userId}))
if(addRate.fulfilled.match(res)){
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
  SetIdRate("")
  } catch (error) {
    console.log(error);
  }
}
    
    return (
      <div>
      <div className="fixed inset-0 md:flex hidden items-center justify-center z-20">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => SetIdRate("")} // Close the modal when clicking the overlay
        ></div>
  
        {/* Modal */}
        <div className="relative bg-white dark:bg-[#111111] p-6 rounded-lg dark:text-white w-11/12 md:w-1/2 shadow-lg z-30">
          
          <div className="flex flex-col justify-center items-center text-8xl text-[#ffb700] ">
            <MdStar />
          </div>

          {/* Close Button */}
          <button
            className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:text-red-800"
            onClick={() => SetIdRate("")} // Close the modal when clicking the button
          >
            <MdClose />
          </button>
          <h2 className="text-sm font-semibold text-center pt-4 uppercase">Rate this</h2>
        <h1 className="font-semibold text-center pt-2 text-xl">{movie?.title}</h1>

      <div className="flex flex-col justify-center items-center pt-4 gap-8 px-20">
      <Rating style={{ maxWidth: 200 }} value={rate} onChange={(value: number) => setRate(value)} itemStyles={myStyles} />

      <button onClick={onSubmit} className="w-full py-2 bg-blue-500 rounded-full">Rate</button>
      </div>
        </div>

        
       
      </div>

      <div
          className="fixed inset-x-0 bottom-0 md:hidden flex items-center justify-center z-20"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <div className="relative bg-white dark:bg-[#111111] p-6 rounded-t-lg dark:text-white w-full shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:text-red-800"
              onClick={() => SetIdRate("")} // Close the modal when clicking the button
            >
              <MdClose />
            </button>

            <h2 className="text-sm font-semibold text-center pt-4 uppercase">Rate this</h2>
        <h1 className="font-semibold text-center pt-2 text-xl">{movie?.title}</h1>

      <div className="flex flex-col justify-center items-center pt-4 gap-8 px-20">
      <Rating style={{ maxWidth: 200 }} value={rate} onChange={(value: number) => setRate(value)} itemStyles={myStyles} />


      <button onClick={onSubmit} className="w-full py-2 bg-blue-500 rounded-full">Rate</button>
      </div>
            </div>
            </div>
      
      </div>
    );
  };

export default RateMovie