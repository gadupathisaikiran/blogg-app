const mongoose = require("mongoose")



const connectDB = () => {
    return mongoose.connect("mongodb+srv://test-2:test-2@cluster0.bgdbs80.mongodb.net/?retryWrites=true&w=majority").then(() => {
        console.log("DATABASE CONNECTED");
    }).catch((e) => {
        console.log(e);
    })
}

module.exports = connectDB;
