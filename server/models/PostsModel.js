import mongoose from "mongoose";


const schema =  mongoose.Schema;
const PostSchema = new schema({
postId: String,
clientId: String,
   term: String,
   title: String,
   description: String,
   skills: Array,
   scope: String,
   experience: String,
   pudget: Number,


})

export const PostsModel = mongoose.model('post', PostSchema)