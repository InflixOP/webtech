import express from "express";
const app=express();

app.get("/",(req,res) => {
    res.send("<h1>Home Page</h1>");
});

app.post("/register",(req,res)=>{
    res.sendStatus(201);
});

app.put("/users/anubhav",(req,res)=>{
    res.sendStatus(200);
});

app.patch("/users/anubhav",(req,res)=>{
    res.sendStatus(200);
});

app.delete("/users/anubhav",(req,res)=>{
    res.sendStatus(200);
});

app.listen(8000,() => {
    console.log("Server listening on port 8000");
});