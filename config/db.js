import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log(`Connected to Database ${mongoose.connection.host}`.bgWhite.green);
        })
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;