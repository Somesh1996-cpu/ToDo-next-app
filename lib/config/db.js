import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Somashekar:22446688@cluster0.dvmy81s.mongodb.net/todoDB?retryWrites=true&w=majority');
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
    }
};