import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
role:{
    type:String,
    required:true
},
char:{
    type:String,
},
name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
},
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
},{ timestamps: true });


const Cast = mongoose.model("Cast", castSchema);

export default Cast;