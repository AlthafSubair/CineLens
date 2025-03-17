import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaPlay, FaRegStar } from "react-icons/fa";
import { TbAlertCircle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import Trailer from "./Trailer";
import RateMovie from "./RateMovie";
import { setRating } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import '../App.css'

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
    rateCount: number 
}

interface MovieScrollProps {
    sectionName: string;
    movies: movie[]
    setInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}


const MovieScroll = ({sectionName, movies, setInfo, setId}: MovieScrollProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const [yt,setYt] = useState<string>("")
  const [isOpen, setIsOpen] = useState(true);

  const handleScroll = (direction: "left" | "right") => {
    if(ref.current) {
      const scrollAmount = 270
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })

    }
  }

  const updateScrollButtons = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    updateScrollButtons(); // Check initially

    const ref1 = ref.current;
    if (ref1) {
      ref1.addEventListener("scroll", updateScrollButtons);
      return () => ref1.removeEventListener("scroll", updateScrollButtons);
    }
  }, [movies]); // Re-run when movies change

  
  const handleInfo = (id: string) => {
    setInfo(true)
      setId(id)
  }

  const handleYt = (yt: string) => {
    setYt(yt)
    setIsOpen(true)
  }


  const [idofRate, SetIdRate] = useState("")
  const dispatch = useDispatch<AppDispatch>()

const handleRate = (id: string) => {
  SetIdRate(id);
  dispatch(setRating())
}

const navigate = useNavigate()

 const navMovie = (id: string) => {
  localStorage.setItem('section', "home")
navigate(`/movie/${id}`)
 }

  return (
  <div className="w-full relative">
 <div className="flex flex-row justify-start items-center my-8">
        <div className="w-2 rounded-3xl h-10 bg-[#fc5f2b]"></div>
      <h1 className="text-2xl font-bold ml-6">{sectionName}</h1>
      </div>

     {
      canScrollLeft &&  <button
      onClick={() => handleScroll("left")}
      className="absolute -left-5 top-1/2 transform -translate-y-1/2 dark:bg-gray-800 bg-slate-200 dark:text-white p-3 rounded-full z-10 dark:hover:bg-gray-700"
    >
    <FaChevronLeft />
    </button>
     }
      {
      canScrollRight  &&  <button
      onClick={() => handleScroll("right")}
      className="absolute -right-5 top-1/2 transform -translate-y-1/2 dark:bg-gray-800 bg-slate-200 dark:text-white p-3 rounded-full z-10 dark:hover:bg-gray-700"
    >
    <FaChevronRight />
    </button>
     }
      
     
      <div ref={ref} className="w-full flex flex-row overflow-x-scroll gap-4 flex-nowrap whitespace-nowrap scroll-smooth snap-x no-scrollbar">
      
     
      {movies?.map((movie: movie) => (
       <div key={movie._id} className="flex flex-col dark:bg-[#1e1e1e] shadow-lg bg-white rounded-lg min-w-[260px]">
 <button onClick={()=> {navMovie(movie._id)}} className="relative">
              <img src={movie.image} className="w-full h-80 object-cover rounded-t-lg" alt="" />
               
            </button>

        

      <div className="relative">
           <div className="flex flex-row dark:text-slate-400 text-sm sm:gap-4 gap-2 pt-1 items-center mx-4">
                            <h3>⭐&nbsp;{isNaN(movie.rate/movie.rateCount) ? 0 : movie.rate%movie.rateCount === 0? (movie.rate/movie.rateCount).toFixed(0) : (movie.rate/movie.rateCount).toFixed(1)}<span className="dark:text-slate-200 text-gray-600">/5</span></h3>
                            <button
                         onClick={()=>{handleRate(movie._id)}}
                              className="flex flex-row text-blue-700 text-base gap-1 items-center hover:text-blue-400"> <FaRegStar /> Rate</button>
                          </div>
      
                          <button onClick={()=> {navMovie(movie._id)}} className="mx-4 flex flex-col mt-4 h-16">
                            <h1 className="text-base font-semibold text-gray-900 dark:text-white text-left">{movie.title}</h1>
          
                            <div className="flex flex-row dark:text-slate-400 text-gray-600 text-sm gap-3 pt-2">
                            <h3>{String(movie.year).split("-")[0]}</h3>
                            <h3>{movie.runtime}</h3>
                          </div>
      
                          </button>
          
                          <div className="flex justify-between my-6 sm:mx-4 mx-2">
                          <button
                          onClick={() => handleYt(movie.trailer)}
                          className="flex justify-center items-center gap-2 px-4 py-2 hover:bg-black rounded-full hover:bg-opacity-50">
            <FaPlay /> <span className="text-[17px]">Trailer</span>
          </button>
          <button className="px-3 py-2 hover:bg-black rounded-full hover:bg-opacity-50" 
          onClick={()=>handleInfo(movie._id)}
          >
              <TbAlertCircle size={24}/>
          </button>
          
                          </div>
                          </div>
            
       </div>
      ))}
    </div>
    {
  yt !== "" && isOpen && <Trailer yt={yt} setIsOpen={setIsOpen} setYt={setYt}/>
}

{idofRate !== "" && <RateMovie idofRate={idofRate} SetIdRate={SetIdRate}/>}
  </div>
  );
};

export default MovieScroll;
