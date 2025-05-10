const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRouter = require("./controllers/UserRouter");
const ChatRouter = require("./controllers/ChatRouter");
const PostRouter = require("./controllers/PostMemoriesRouter");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = 2309; 

app.get("/zylo",async(req,res)=>{
    try {
        res.status(200).send({msg:"Welcome to ZYLO,let's start chatting and make friends.."});
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Something went wrong while fetching data.."});
    }
});


app.use('/api/users', UserRouter);
app.use('/api/chats', ChatRouter);
app.use('/api/posts', PostRouter);
app.use("/api", require("./controllers/LiveRouter"));


app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is connected");
        console.log(`ZYLO Backend server is running on port ${PORT}`);
    } catch (error) {
        console.error("Internal server error:", error);
    }
});