import mongoose from "mongoose";



export const connectDB = async () => {
    // console.log(process.env.MONGO_URI);
    const db = process.env.MONGO_URI;

    const {connection} = await mongoose.connect(db, {useNewUrlParser: true});
    console.log(`MongoDB Connected to ${connection.host}`);

}