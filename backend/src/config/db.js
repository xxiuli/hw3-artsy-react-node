const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "hw-3-artsy-proxy",
          });
        console.log("Connected to DB:", mongoose.connection.name);
        console.log(" MongoDB Connected Successfully!");
    } catch (error) {
        console.error(" MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
