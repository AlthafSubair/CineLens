import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getCasts } from "../redux/thunk/userThunk";
import { useParams } from "react-router-dom";

interface movie{
  image: string;
  _id: string;
  title: string;
  desc: string;
  trailer: string;
  year: string | number;
  runtime: string;
  genre: string[];
  active: boolean;
  rate: number
}

interface Prop{
movie: movie
}

const CastCrew = ({movie}: Prop) => {

  // const cast = [
  //   {
  //     name: "John Doe",
  //     role: "Actor",
  //     image: "/mammotty.jpg"
  //   },
  //   {
  //     name: "John Doe",
  //     role: "Actor",
  //     image: "/mammotty.jpg"
  //   },
  //   {
  //     name: "Jane Doe",
  //     role: "Director",
  //     image: "/mammotty.jpg"
  //   },
  //   {
  //     name: "Bob Smith",
  //     role: "Producer",
  //    image: "/mammotty.jpg"
  //   },
  //   {
  //     name: "Bob Smith",
  //     role: "Producer",
  //    image: "/mammotty.jpg"
  //   },
  //   {
  //     name: "Bob Smith",
  //     role: "Producer",
  //    image: "/mammotty.jpg"
  //   },
  //   {
  //     name: "Bob Smith",
  //     role: "Producer",
  //   image: "/mammotty.jpg"
  //   }
  // ]

  const {cast} = useSelector((state: RootState) => state.user)

  const  dispatch = useDispatch<AppDispatch>()

  const {id} = useParams()
 

  useEffect(()=>{
    dispatch(getCasts(id))
  }, [dispatch, id])

  console.log(cast)

  return (
    <div className="sm:p-4 p-2 flex justify-center items-center">
  <div className="xl:w-3/4 w-full shadow-lg dark:bg-[#1e1e1e] bg-white rounded-md flex flex-col">
<div className="flex flex-row mb-4">
<div className="h-44 w-32 p-2">
    <img src={movie.image} className="h-full w-full object-cover rounded-md" />
  </div>
  <div className="flex flex-col p-2 py-4 gap-2">
  <h1 className="text-2xl font-semibold flex items-center gap-2">{movie.title}<span className="text-sm text-gray-500 font-light">({String(movie.year).slice(0,4)})</span></h1>
 
 <h1 className="text-3xl">Full Cast & Crew</h1>
  </div>
  
</div>

<div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-2 py-2">
  {
    cast?.map((item, index) => (
      <div key={index} className="flex flex-col items-center">
        <img 
          src={item.image} 
           
          className="h-32 w-32 rounded-full object-cover" 
        />
        <h1 className="text-lg font-semibold text-center">{item.person}</h1>
        <h1 className="text-gray-500 text-sm">{item.role !== "Actor" ? item.role : item.char_name}</h1>
      </div>
    ))
  }
</div>

  </div>
    </div>
  )
}

export default CastCrew