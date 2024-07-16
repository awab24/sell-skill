import mongoose from "mongoose";


const schema =  mongoose.Schema;
const PostSchema = new schema({
_id: String,
clientId: String,
   term: String,
   title: String,
   skills: Array,
   scope: String,
   experience: String,
   pudget: Number,

   category: [String]
})

export const PostsModel = mongoose.model('post', PostSchema)