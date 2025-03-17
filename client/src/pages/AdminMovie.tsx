import AdminMovieById from "../components/AdminMovieById";
import AdminMovieNav from "../components/AdminMovieNav";
import { useState } from "react";
import AdminCast from "../components/AdminCast";
import AdinMovieReview from "../components/AdinMovieReview";
import AddCastAndCrew from "../components/AddCastAndCrew";
import AuthHOC from "../components/AuthHOC";
import AdminEditMovieForm from "../components/AdminEditMovieForm";

const AdminMovie = () => {
 


const [addCast, setAddCast] = useState(false)

const [openEditMovie, setOpenEditMovie] = useState<string | null>(null); 

const [page,setPage] = useState("overview")  

  return (
    <div className="my-4 overflow-y-scroll">
      <AdminMovieNav setPage={setPage}/>
      {/* Pass the item (single object) to the component */}
      {
      page === "overview" ? <AdminMovieById setOpenEditMovie={setOpenEditMovie}/> : page === "cast" ? <AdminCast setAddCast={setAddCast}/> : <AdinMovieReview  />
      }

      {
        addCast && <AddCastAndCrew setAddCast={setAddCast}/>
      }

      {
        openEditMovie  && <AdminEditMovieForm  setOpenEditMovie={setOpenEditMovie} openEditMovie={openEditMovie}/>
      }
    </div>
  );
};
const ProtectedAdminMovie = AuthHOC(AdminMovie)
export default ProtectedAdminMovie;
