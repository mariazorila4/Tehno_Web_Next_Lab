const express=require("express");

const app=express();

app.get("/", (req, res)=>{
    res.send("Hello World!");
});

app.get("/ping", (req, res)=>{
    res.send("Hello, pong!");
});

app.listen(3000);