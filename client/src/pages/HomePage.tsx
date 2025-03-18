import { useState } from "react"
import Carousel from "../components/Carousel"
import Info from "../components/Info"
import MovieScroll from "../components/MovieScroll";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getMovies } from "../redux/thunk/userThunk";



const HomePage = () => {

  const {movies} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>()

  const topTen = movies
  .filter(movie => movie.rateCount > 0)
  .sort((a, b) => {
    const ratingDiff = (b.rate / b.rateCount) - (a.rate / a.rateCount);
    return ratingDiff !== 0 ? ratingDiff : b.rateCount - a.rateCount; // Tie-breaker
  })
  .slice(0, 10);


  const latestTen = movies.filter(movie => movie.year !== undefined) // Filter out movies without a yearCreate a copy of the array
  .sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime())
  .slice(0, 10);

const mostViewed = movies.filter(movie => movie.rateCount > 0).sort((a, b) => {
  const diff = b.rateCount - a.rateCount
  return diff !== 0 ? diff : b.rateCount - a.rateCount; 
}).slice(0, 10);


  useEffect(()=>{
dispatch(getMovies())
  },[dispatch])

  
  const [info, setInfo] = useState<boolean>(false);
  const [id,setId] = useState<string>("")
  
  return (
    <div className="dark:text-white min-h-screen relative sm:mx-12 mx-4">
    
    <Carousel />

      {  latestTen && <MovieScroll sectionName="Latest" movies={latestTen} setInfo={setInfo} setId={setId}/>}

      {topTen &&  <MovieScroll sectionName="Top Rated" movies={topTen} setInfo={setInfo} setId={setId}/>}

      {mostViewed && <MovieScroll sectionName="Most Viewed" movies={mostViewed} setInfo={setInfo} setId={setId}/>}

  
  
    {info && <Info setInfo={setInfo} id={id}/>}

  {/* <Trailer /> */}

   
  </div>
  
  )
}

export default HomePage
