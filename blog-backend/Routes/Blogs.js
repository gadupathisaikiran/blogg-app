const router = require("express").Router()
const JWT_AUTH = require("../Middleware/JWT_AUTH")
const Blog = require("../Modals/BlogModal")

router.get("/getblogs", async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json("server error")
    }
})

router.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        const blog = await new Blog(req.body)
        console.log(blog);
        await blog.save()
        res.status(201).json("Blog Created")
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
})




module.exports = router