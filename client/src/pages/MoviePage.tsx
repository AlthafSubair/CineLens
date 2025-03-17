import { useParams } from "react-router-dom";
import MovieNav from "../components/MovieNav";
import { useEffect, useState } from "react";
import OverviewMovie from "../components/OverviewMovie";
import Review from "../components/Review";
import CastCrew from "../components/CastCrew";
import Share from "../components/Share";
import AddReview from "../components/AddReview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getMovieById } from "../redux/thunk/userThunk";



const MoviePage = () => {


  const id = useParams<{ id: string }>().id;


  const [page,setPage] = useState(localStorage.getItem('section') === "review" ? 'review' : 'home')
  const [share,setShare] = useState(false)
  const [revid,setRevid] = useState("")
  const [addReview, setAddReview] = useState(false)

  const resetShare = () => {
    if(share){
      setShare(false)
    }
    if(addReview){
      setAddReview(false)
    }
  }

  useEffect(() => {
    if (addReview) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [addReview]);


  const {movie} = useSelector((state: RootState) => state.user)
const dispatch = useDispatch<AppDispatch>()
  useEffect(() =>{
    if(id){
      dispatch(getMovieById(id))
    }
  },[dispatch,id])



  

  return (
    <div className="relative">
      {/* Overlay to block interactions */}
      {addReview && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
      )}

      {/* Main Content */}
      <div className="dark:text-white lg:mx-28 md:mx-16 mx-4" onClick={resetShare}>
        <MovieNav setPage={setPage} setShare={setShare} />
        {page === 'home' && movie ? (
          <OverviewMovie movie={movie} />
        ) : page === 'review' && movie ? (
          <Review movie={movie} setRevid={setRevid} setAddReview={setAddReview} />
        ) : (
         movie && <CastCrew movie={movie}/>
        )}

        {share && <Share />}
      </div>

      {/* AddReview Component */}
      {addReview && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
          <AddReview revid={revid} setRevid={setRevid} setAddReview={setAddReview}/>
        </div>
      )}
    </div>
  )
}

export default MoviePage