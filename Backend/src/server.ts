import express from "express";
import cors from "cors";
import { sample_rooms } from "./data";
import { sample_user } from "./data";
import jwt from "jsonwebtoken";
const app =express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/rooms",(req,res)=>{
    res.send(sample_rooms)
})

//get room by search
app.get("/api/rooms/search/:searchTearm",(req, res)=>{
    const searchTerm = req.params.searchTearm;
    const rooms = sample_rooms.filter(room => room.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(rooms)
})
//get room by id
app.get("/api/rooms/:roomId",(req, res)=>{
    const roomId = req.params.roomId;
    const room = sample_rooms.find(room => room.id==roomId);
    res.send(room)
})
//login api
app.get("/api/users/login",(req,res)=>{
    const {email, password} = req.body;
    const user = sample_user.find(user => user.email ===email && user.password ===password);

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("User name or Password is not valid!")
    }

})

const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },"RoomFinderAdmin",{
        expiresIn:"15d"
    });
    user.token = token;
    return user;
}



const port = 5000;
app.listen(port,()=>{
    console.log("Website is running at localhost port 5000")
})