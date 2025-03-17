import Carousel from "../models/carouselSchema.js";
import Cast from "../models/castSchema.js";
import Movie from "../models/movieSchema.js";
import Role from "../models/roleSchema.js";
import User from "../models/userSchema.js"
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";
import Rate from "../models/RateSchema.js"




const addRoles = async (req, res) => {
    try {
        const { name } = req.body; // Extract additional data sent from frontend
      
        // Create new image document
        const newRole = new Role({
           name: name,
          url: req.file.path, // Cloudinary URL
          public_id: req.file.filename, // Cloudinary public ID
        });
   
    
        const savedRole = await newRole.save();
    
    
      return  res.status(200).json({
          success: true,
          message: 'Image uploaded successfully!',
          image: savedRole,
        });
      } catch (err) {
        return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
      }
}

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, roles }); // Return `success` and `roles`
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};



const deleteRole = async (req, res) => {
  const { roleId } = req.params; // Ensure route uses `:roleId`

  try {
    // Find the role in the database to get the image public_id
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    // Get the public_id of the image stored in Cloudinary
    if (!role.public_id) {
      return res.status(400).json({ success: false, message: "No image associated with this role" });
    }

    // Delete the image from Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.destroy(role.public_id);

    // Allow "not found" as a valid response
    if (!["ok", "not found"].includes(cloudinaryResponse.result)) {
      return res.status(500).json({ success: false, message: "Image deletion failed" });
    }

    // Delete the role from the database
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    return res.status(200).json({ success: true, message: "Role deleted successfully", roleId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getRole = async (req, res) => {
  const { roleId } = req.params;
  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const editRole = async (req, res) => {
  const { roleId } = req.params;
  const { name } = req.body;

  try {
    const role = await Role.findByIdAndUpdate(roleId, { name }, { new: true });
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    const isrole = await Role.findById(roleId);
    if (!isrole) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    const cloudinaryPublicId = isrole.public_id;

    // Only proceed with Cloudinary deletion if a new file is uploaded
    if (req.file) {
      // Delete the image from Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.destroy(cloudinaryPublicId);

      if (cloudinaryResponse.result !== 'ok') {
        return res.status(500).json({ success: false, message: 'Image deletion failed'});
      }

      // Update with new image
      isrole.url = req.file.path;
      isrole.public_id = req.file.filename;
    }

    // Update role name
    isrole.name = name;

    const savedRole = await isrole.save();
    res.status(200).json({ success: true, message: 'Role updated successfully', role: savedRole });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


const addmovie = async (req, res) => {
  const { title, year, runtime, trailer, genre, desc} = req.body;

  let genresArray = Array.isArray(genre) ? genre : JSON.parse(genre);



// Check if all required fields are present
if (!title || !year || !runtime || !trailer || !genresArray || !desc) {
  return res.status(400).json({ success: false, message: 'Please fill all fields' });
}

try {
  // Create a new movie object
  const movie = new Movie({
    image: req.file.path,  // Path of the uploaded file
    public_id: req.file.filename,  // Filename for Cloudinary or similar service
    title,
    year,
    runtime,
    trailer,
    genre: genresArray,  // Save genre as an array
    desc,
  });

  // Save the movie to the database
  const savedMovie = await movie.save();

  

    if(!savedMovie) {
      return res.status(500).json({ success: false, message: 'Movie not saved' });
    }
    res.status(200).json({ success: true, message: 'Movie added successfully', movie: savedMovie });
}catch(error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // Use a different variable name
    res.status(200).json({ success: true, movies }); // Use the original `res` for response
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteMovie = async (req, res) => {
  
  try {
    const { movieId } = req.params;
   
    const movie = await Movie.findById(movieId);
 
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    const cloudinaryPublicId = movie.public_id;

    // Delete the image from Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.destroy(cloudinaryPublicId);

    if (cloudinaryResponse.result !== 'ok') {
      return res.status(500).json({ success: false, message: 'Image deletion failed' });
    }

    // Delete the movie from the database
   await Movie.findByIdAndDelete(movieId);

    res.status(200).json({ success: true, message: 'Movie deleted successfully', movieId });
    
    }

catch(error){
  res.status(500).json({ success: false, message: error.message });
}
}

const editMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, year, runtime, trailer, genre, desc } = req.body;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    if (req.file) {
      // Delete the old image from Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.destroy(movie.public_id);

      if (cloudinaryResponse.result !== 'ok') {
        return res.status(500).json({ success: false, message: 'Image deletion failed' });
      }
     

      // Update with new image
      movie.image = req.file.path;
      movie.public_id = req.file.filename;
    } 
    let genresArray = Array.isArray(genre) ? genre : JSON.parse(genre);
    movie.title = title;
    movie.year = year;
    movie.runtime = runtime;
    movie.trailer = trailer;
    movie.genre = genresArray;
    movie.desc = desc;


    const updatedMovie = await movie.save();

    res.status(200).json({ success: true, message: 'Movie updated successfully', movie: updatedMovie });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;
    if(!movieId) {
      return res.status(400).json({ success: false, message: 'Movie ID is required' });
    }
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.status(200).json({ success: true, movie });
}
catch(error) {
    res.status(500).json({ success: false, message: error.message });
  }
}



const deleteMultiMovie = async (req, res) => {

  try {
    const { ids } = req.body;


    // Convert ids to ObjectId instances

    
    // Find movies to delete
    const moviesToDelete = await Movie.find({ _id: { $in: ids } });

    // Check if no movies were found
    if (moviesToDelete.length === 0) {
      return res.status(404).json({ success: false, message: 'Movies not found' });
    }

    // Delete images from Cloudinary
    const deleteFromCloudinary = moviesToDelete.map(movie => {
      if (movie.public_id) {
        return cloudinary.uploader.destroy(movie.public_id);
      }
      return Promise.resolve();
    });

    // Wait for all Cloudinary deletions to complete
    await Promise.all(deleteFromCloudinary);

    // Delete movies from database
    const deletedMovies = await Movie.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ success: true, message: 'Movies deleted successfully', ids });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

  const activateMovies = async (req, res) => {
    try {
      const { ids } = req.body;
  
      // Convert ids to ObjectId instances
      const movieIds = ids.map(id => new mongoose.Types.ObjectId(id));
  
      // Find movies to activate
      const moviesToActivate = await Movie.find({ _id: { $in: movieIds } });
  
      // Check if no movies were found
      if (moviesToActivate.length === 0) {
        return res.status(404).json({ success: false, message: 'Movies not found' });
      }

      // Activate movies
   const movies = await Movie.updateMany({ _id: { $in: movieIds } }, { $set: { active: true } });

      res.status(200).json({ success: true, message: 'Movies activated successfully', ids });
      }catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
  }



const disableMovies = async (req, res) => {
  try {
    const { ids } = req.body;

    // Convert ids to ObjectId instances
    const movieIds = ids.map(id => new mongoose.Types.ObjectId(id));

    // Find movies to activate
    const moviesToActivate = await Movie.find({ _id: { $in: movieIds } });

    // Check if no movies were found
    if (moviesToActivate.length === 0) {
      return res.status(404).json({ success: false, message: 'Movies not found' });
    }

    // deactivate movies
const movies = await Movie.updateMany({ _id: { $in: movieIds } }, { $set: { active: false } });

    res.status(200).json({ success: true, message: 'Movies disabled successfully',  ids });
    }catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}

const activateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { active: true }, { new: true });
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.status(200).json({ success: true,message:"movie activated successfully" ,movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const deactivateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.status(200).json({ success: true, message: "Movie disabled successfully", movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
const addCast = async(req, res) => {
  try {
      const {name, char, role} = req.body;

      const {id} = req.params;

    const cast = new Cast({ role:role,char:char,name:name, movie: id});

    const newCast = await cast.save();

    const payload = await newCast.populate("name")

   const data ={
    id: payload._id,
      role: payload.role,
      char_name: payload.char,
      person: payload.name?.name, 
      image: payload.name?.url
   }


    return res.status(200).json({ message: "Cast added successfully", success: true, data });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", success: false });
  }
}

const getCast = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim(); // Remove whitespace and newlines
   

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid movie ID format", success: false });
    }

    // Fetch all cast members for the given movie ID
    const castList = await Cast.find({ movie: id }).populate("name"); // Assuming `name` references the Role/Person model

    if (!castList.length) {
      return res.status(404).json({ message: "No cast found for this movie", success: false });
    }
  

    // Format the response
    const data = castList.map(cast => ({
      id: cast._id,
      role: cast.role,
      char_name: cast.char,
      person: cast.name?.name, // Assuming `name` model has `name` field
      image: cast.name?.url, // Assuming `name` model has `image` field
    }));

    res.status(200).json({ message: "Cast fetched successfully", success: true, data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteCast = async (req, res) => {
  try {
    const { id } = req.params;
    const cast = await Cast.findByIdAndDelete(id);
    if (!cast) {
      return res.status(404).json({ success: false, message: 'Cast not found' });
    }
    res.status(200).json({ success: true, message: 'Cast deleted successfully', id });
}
catch (error) {
   return res.status(500).json({ success: false, message: error.message });
}
}

const addCorusel = async (req, res) => {
  try {
    const {movieId} = req.params;

    if(!movieId){
     return res.status(404).json({ message: "Movie ID not found", success: false });
    }

    const movie = await Movie.findById(movieId);

    if(!movie){
       return res.status(404).json({ message: "Movie not found", success: false });
    }
    
    const exist = await Carousel.findOne({ movieId: movieId });
   
    if (exist) {
     return res.status(404).json({ message: "Movie already exists in carousel", success: false });
    }
    

    const carousel = new Carousel({ movieId: movieId });
 const data =  await carousel.save();

 const data1 = await data.populate("movieId");
  

    const formattedCarousel ={
      id: data1._id,
      movieId: data1.movieId._id,
      title: data1.movieId.title,
      image: data1.movieId.image,
      rate: data1.movieId.rate,
      rateCount: data1.movieId.rateCount,
      genre: data1.movieId.genre,
    }

    console.log(formattedCarousel)

    res.status(200).json({ message: "Movie added to carousel successfully", success: true, formattedCarousel });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

const deleteCorusel = async (req, res) => {
  try {

    const { id } = req.params;
    if(!id){
      return res.status(404).json({ message: "Movie ID not found", success: false });
     }
    
     const carousel = await Carousel.findByIdAndDelete(id);
     if (!carousel) {
      return res.status(404).json({ message: "Movie not found in carousel", success: false });
     }

     res.status(200).json({ message: "Movie deleted from carousel successfully", success: true, id });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

const getCorusel = async (req, res) => {
  try {
    const carousel = await Carousel.find().populate("movieId");

    const formattedCarousel = carousel.map((item) => ({
      id: item._id,
      movieId: item.movieId._id,
      title: item.movieId.title,
      image: item.movieId.image,
      rate: item.movieId.rate,
      rateCount: item.movieId.rateCount,
    }))
    
    res.status(200).json({ message: "Carousel fetched successfully", success: true, formattedCarousel });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
}
}


const getCountOfUsers = async (req, res) => {
  try {
    const users = await User.countDocuments({role: { $ne: "admin" }});
  
    res.status(200).json({ success: true, count: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getMoviesCount = async (req, res) =>{
  try {
    const movies = await Movie.countDocuments();
    res.status(200).json({ message: "Movies fetched successfully", success: true, count:movies });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

const getRatingsCount = async (req, res) => {
  try {
    const ratings = await Rate.countDocuments();
    res.status(200).json({ message: "Ratings fetched successfully", success: true, count: ratings });
  }catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

const getCastCount = async (req, res) => {
  try {
    const cast = await Cast.countDocuments();
    res.status(200).json({ message: "Ratings fetched successfully", success: true, count: cast });
  }catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

const getUsers = async (req, res) => {
  try {
     const users = await User.find().select('-password')

    return res.status(200).json({ message: "Users fetched successfully", success: true, users });
    
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}

const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;

const Id =  new mongoose.Types.ObjectId(userId);

    const user = await User.findById(Id);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.isSuspended = user.isSuspended ? false : true;
   
    await user.save();

    return res.status(200).json({ message: "User suspended successfully", success: true, user});

}catch(error){
  return res.status(500).json({message: error.message, success: false})
}
}

const userGraph = async(req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Get the first day of the month that is 3 months before the current month
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 3);
    startDate.setDate(1); // Set to the first day of the month
    startDate.setHours(0, 0, 0, 0);

    // Aggregate users created in the last 3 months including the current month
    const usersByMonth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }, // Filter users created in the last 4 months
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Extract month as a number (1 = Jan, 2 = Feb)
          count: { $sum: 1 }, // Count users per month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);

    // Convert month number to month name in JavaScript
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    // Get last 4 months (including current month) for consistent data display
    const lastFourMonths = [];
    for (let i = 3; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      lastFourMonths.push({
        month: monthNames[date.getMonth()], // Get month name
        count: 0, // Default count to 0
      });
    }

    // Merge with aggregated data to ensure all 4 months are present
    const formattedData = lastFourMonths.map(({ month }) => {
      const found = usersByMonth.find(({ _id }) => monthNames[_id - 1] === month);
      return {
        month,
        count: found ? found.count : 0, // Set count if found, otherwise 0
      };
    });

    res.status(200).json({message:"successfull", success: true, formattedData});
  } catch (error) {
    console.error("Error fetching users by month:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const movieGraph = async(req, res) => {
  try {

    const currentDate = new Date();

    // Get the first day of the month that is 3 months before the current month
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 3);
    startDate.setDate(1); // Set to the first day of the month
    startDate.setHours(0, 0, 0, 0);

    // Aggregate users created in the last 3 months including the current month
    const usersByMonth = await Movie.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }, // Filter users created in the last 4 months
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Extract month as a number (1 = Jan, 2 = Feb)
          count: { $sum: 1 }, // Count users per month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);

    // Convert month number to month name in JavaScript
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    // Get last 4 months (including current month) for consistent data display
    const lastFourMonths = [];
    for (let i = 3; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      lastFourMonths.push({
        month: monthNames[date.getMonth()], // Get month name
        count: 0, // Default count to 0
      });
    }

    // Merge with aggregated data to ensure all 4 months are present
    const formattedData = lastFourMonths.map(({ month }) => {
      const found = usersByMonth.find(({ _id }) => monthNames[_id - 1] === month);
      return {
        month,
        count: found ? found.count : 0, // Set count if found, otherwise 0
      };
    });

    res.status(200).json({message:"successfull", success: true, formattedData});
    
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}

const getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
 
    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Movie ID is required' });
    }
    

    const reviews = await Rate.find({ movieId })
      .populate("userId", "_id username");

    if (reviews.length === 0) {
      return res.status(404).json({ success: false, message: 'No reviews found' });
    }

    const formattedReviews = reviews.map(review => ({
      _id: review._id,
      userId: review.userId?._id || null,
      username: review.userId?.username || "Anonymous",
      review: review.review || "",
      caption: review.caption || "",
      rate: review.rate || 0,
      spoiler: review.spoiler ?? false, // Ensuring proper boolean value
      date: review.date || new Date(),
    }));

   return res.status(200).json({ success: true, reviews: formattedReviews });

  } catch (error) {
   return res.status(500).json({ success: false, message: error.message });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { query } = req.params;

    const movies = await Movie.find({ title: { $regex: query, $options: 'i' } });

    if (movies.length === 0) {
      return res.status(404).json({ success: false, message: 'No movies found' });
    }
    return res.status(200).json({ success: true, movies });
  }catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}


export { addRoles, getRoles, deleteRole, getRole, editRole, addmovie, getMovies, deleteMovie, editMovie, getMovieById, deleteMultiMovie, disableMovies, activateMovies, activateMovie,deactivateMovie, addCast, getCast, deleteCast, addCorusel, getCorusel, deleteCorusel, getCountOfUsers, getMoviesCount, getRatingsCount, getCastCount, getUsers, suspendUser, userGraph, movieGraph, getReviews, searchMovies}