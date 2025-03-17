import mongoose from "mongoose";

const RateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    caption: {
        type: String,
    },
    review: {
        type: String,
    },
    spoiler: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})

const Rate = mongoose.model("Rate", RateSchema);
export default Rate;