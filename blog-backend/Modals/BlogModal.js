const mongoose = require("mongoose")

const BlogSchema = mongoose.Schema({

    image: { type: String },
    title: String,
    description: String,
    date_time: { type: String, default: Date.now() },
    user: { type: mongoose.Types.ObjectId, ref: "users" }

})


const Blog = new mongoose.model("Blogs", BlogSchema)

module.exports = Blog;