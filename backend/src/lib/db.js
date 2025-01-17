import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        const cnct = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${cnct.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error.message}`);
    }
}