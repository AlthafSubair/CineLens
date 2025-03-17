import Movie from "../models/movieSchema.js";
import Cast from "../models/castSchema.js";
import User from "../models/userSchema.js";
import Rate from "../models/RateSchema.js";
import Watchlist from "../models/wacthlistSchema.js";
import Carousel from "../models/carouselSchema.js";

const getMovies = async (req, res) => {
    try {
      const movies = await Movie.find(); // Use a different variable name
      res.status(200).json({ success: true, movies }); // Use the original `res` for response
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


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

const addRate = async (req,res) => {


 try {
  const {userId, rate} = req.body;
  const {movieId} = req.params;


  if(!userId || !rate || !movieId) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }


  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(404).json({ success: false, message: 'Movie not found' });
  }
 
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const existingRate = await Rate.findOne({userId, movieId});


  if (existingRate) {
   movie.rate = movie.rate - existingRate.rate + rate;
    existingRate.rate = rate;
    await existingRate.save();
    await movie.save();
    return res.status(201).json({ success: true, message: 'Rating updated successfully', movie });
    
  } else {
    
  

  const rating = new Rate({
    userId,
 movieId,
    rate
  });
  
  movie.rate += rate;
  movie.rateCount = (movie.rateCount || 0) + 1;



  await rating.save();

  await movie.save();

  return res.status(201).json({ success: true, message: 'Rating added successfully', movie });
  }
 } catch (error) {
   
  res.status(500).json({message: error.message, success: false})
  
 }
}

const getRateById = async (req,res) => {
  try {
    const {userId, movieId} = req.params;

    if(!userId || !movieId) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const rate = await Rate.findOne({userId, movieId});

    if (!rate) {
      return res.status(404).json({ success: false, message: 'Rate not found', rate: 0 });
    }

    res.status(200).json({ success: true, rate });
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}

const addReview = async (req,res) => {
  try {

    const {userId, desc, caption, rate, spoiler} = req.body;

    const {movieId} = req.params;

    if (!userId || !desc || !caption || !rate || !movieId || typeof spoiler === 'undefined') {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    if(!userId) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const review = await Rate.findOne({userId, movieId});

    if (review) {

      movie.rate = movie.rate - review.rate + rate;

      review.review = desc;
      review.caption = caption;
      review.rate = rate;
      review.spoiler = spoiler;
      review.date = Date.now();
      await review.save();

await movie.save();

      return res.status(201).json({ success: true, message: 'Review updated successfully', review });
    }else{
      const review = new Rate({
        userId,
        movieId,
        review: desc,
        caption: caption,
        rate: rate,
        spoiler: spoiler,
        date: Date.now()
      })

      movie.rate += rate;
      movie.rateCount = (movie.rateCount || 0) + 1;

      await review.save();

      await movie.save();

      return res.status(201).json({ success: true, message: 'Review added successfully', review });
    }
    
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

    res.status(200).json({ success: true, reviews: formattedReviews });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteReview = async (req,res) => {
  try {
    const {revid} = req.params;

  

    const review = await Rate.findById(revid);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    const movie = await Movie.findById(review.movieId);

    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    movie.rate = movie.rate - review.rate;
    movie.rateCount = (movie.rateCount || 0) - 1;
    await movie.save();
  const del = await Rate.findByIdAndDelete(revid);
  if (!del) {
    return res.status(404).json({ success: false, message: 'Review not found' });
  }
    
    return res.status(200).json({ success: true, message: 'Review deleted successfully', revid });
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}


const addWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    const user = await User.findById(userId);

    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const watchlist1 = await Watchlist.findOne({ moviId: movieId, userId });
    if(watchlist1) {
      return res.status(400).json({ success: false, message: 'Movie already in watchlist' });
    }


    const watchlist = new Watchlist({
      userId,
      movieId,
      date: Date.now()
    })

    await watchlist.save();

    return res.status(201).json({ success: true, message: 'Movie added to watchlist successfully', watchlist });

  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}

const getWatchlist = async (req, res) => {
  try {
 
    const { userId } = req.params;

    if(!userId) {

      return res.status(400).json({ success: false, message: 'User ID is required' });
  
    }

    const watchlist = await Watchlist.find({ userId:userId }).populate('movieId');


if(!watchlist) {
  return res.status(404).json({ success: false, message: 'No movies found in watchlist' });
}

const formattedWatchlist = watchlist.map((item) => ({
  _id: item._id,
  userId: item.userId,
  movieId: item.movieId._id,
  title: item.movieId.title,
  date: item.date,
  image: item.movieId.image,
  desc: item.movieId.desc,
  genre: item.movieId.genre,
  rate: item.movieId.rate,
  rateCount: item.movieId.rateCount,
  trailer: item.movieId.trailer,
  year: item.movieId.year,
  runtime: item.movieId.runtime,
}))

    if (watchlist.length === 0) {
      return res.status(404).json({ success: false, message: 'No movies found in watchlist' });
    }

    res.status(200).json({ success: true, formattedWatchlist });

  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}


const deleteWatchlist = async (req, res) => {
  try {
    const { watchlistId } = req.params;

    const watchlist = await Watchlist.findById(watchlistId);

    if (!watchlist) {
      return res.status(404).json({ success: false, message: 'Watchlist not found' });
    }
const del = await Watchlist.findByIdAndDelete(watchlistId);
    if (!del) {
      return res.status(404).json({ success: false, message: 'Watchlist not found' });
    }

    return res.status(200).json({ success: true, message: 'Watchlist deleted successfully', watchlistId });
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}

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
      trailer: item.movieId.trailer,
    }))
  
    res.status(200).json({ message: "Carousel fetched successfully", success: true, formattedCarousel });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
}
}




  export {getMovies, getMovieById, getCast, addRate, getRateById, addReview, getReviews, deleteReview, addWatchlist, getWatchlist, deleteWatchlist, searchMovies, getCorusel};