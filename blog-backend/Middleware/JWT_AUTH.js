const jwt = require("jsonwebtoken")

const JWT_AUTH = async (req, res, next) => {
    try {

        let token = req.headers.authorization
        // console.log(token);

        if (!token) return res.status(403).json("NOT AUTHORIZED")

        if (token) {
            token = token.split(" ")[1]
            // console.log(token);
        }

        const verifyUser = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(verifyUser.id);
        if (verifyUser) {
            res.user = verifyUser.id
            // console.log(res.user);
            next()
        }

    } catch (error) {
        // console.log(error);
        res.status(500).json("SERVER ERROR")
    }
}

module.exports = JWT_AUTH;