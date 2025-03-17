import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    
    }
},{ timestamps: true })

const Carousel = mongoose.model("Carousel", carouselSchema);

export default Carousel;