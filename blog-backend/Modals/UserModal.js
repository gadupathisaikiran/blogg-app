const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({

    email: { type: String, unique: true },
    password: String

})


const User = new mongoose.model("ussers", UserSchema)

module.exports = User;
