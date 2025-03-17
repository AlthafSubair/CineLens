import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    public_id:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    runtime: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    rate: {
        type: Number,
        default: 0
    },
    rateCount: {
        type: Number,
    },
    reviewCount: {
        type: Number,
    }
   
},{ timestamps: true })

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;