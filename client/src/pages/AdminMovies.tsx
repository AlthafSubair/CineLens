import { useState, Suspense, lazy } from "react";
import AdminMovieNavbar from "../components/AdminMovieNavbar";
import AdminMovieList from "../components/AdminMovieList";
import AuthHOC from "../components/AuthHOC";


// Lazy loading the AddMovieForm component
const AddMovieForm = lazy(() => import("../components/AddMovieForm"));
const AdminEditMovieForm = lazy(() => import("../components/AdminEditMovieForm"));
const AdminMovies = () => {
  const [select, setSelect] = useState<boolean>(true);
  const [openAddMovie, setOpenAddMovie] = useState<boolean>(false);
  const [openEditMovie, setOpenEditMovie] = useState<string | null>(null); 
  const [ids, setIds] = useState<string[]>([])


  return (
    <div className="h-full flex flex-col">
  {/* Navbar */}
  <div className="flex-shrink-0">
    <AdminMovieNavbar
      select={select}
      setSelect={setSelect}
      setOpenAddMovie={setOpenAddMovie}
      ids={ids}
      setIds={setIds}
    />
  </div>

  {/* Content Section */}
  <div className="flex-1 overflow-y-auto">
    {/* Add Movie Form */}
    {openAddMovie && (
      <Suspense fallback={<div>Loading...</div>}>
        <AddMovieForm setOpenAddMovie={setOpenAddMovie} />
      </Suspense>
    )}

    {/* Movie List */}
    <div>
      <AdminMovieList
        select={select}
        setOpenEditMovie={setOpenEditMovie}
        ids={ids}
        setIds={setIds}
      />
    </div>

    {/* Edit Movie Form */}
    {openEditMovie !== null && (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminEditMovieForm setOpenEditMovie={setOpenEditMovie}  openEditMovie={openEditMovie}/>
      </Suspense>
    )}
  </div>
</div>

  );
}
const ProtectedAdminMovies = AuthHOC(AdminMovies);
export default ProtectedAdminMovies;
