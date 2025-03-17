import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;