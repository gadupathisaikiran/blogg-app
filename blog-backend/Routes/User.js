const router = require("express").Router()
const JWT_AUTH = require("../Middleware/JWT_AUTH")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../Modals/UserModal")


router.post("/isLoggedIn", JWT_AUTH, async (req, res) => {
    try {
        const { id } = res.user
        const getUser = await User.findOne({ _id: id })
        console.log(getUser);
        res.status(200).json(getUser)
    } catch (error) {
        console.log(error);
        res.status(403).json("not loggedin")
    }
})

router.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json(`No User with ${req.body.email}`)
        }
        console.log(user.password);
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        console.log(comparePassword);
        if (!comparePassword) {
            return res.status(400).json(`Invalid Password`)
        }

        const token = jwt.sign({ id: user._id },"shhh")

        res.status(200).json({ token, user })

    } catch (error) {
        console.log(error.message);
    }
})

router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);

        const getUser = await User.findOne({ email: req.body.email })
        console.log(getUser);
        if (getUser) {
            return res.status(400).json(`User with ${req.body.email} already exists`)
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashPassword

        const newUser = await new User(req.body)

        await newUser.save()

        res.status(201).json("User Registered Successfully")

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }
})




module.exports = router
