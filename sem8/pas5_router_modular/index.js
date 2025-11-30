'use strict';

const express=require("express");
const departmentRouter=require("./routes/departments");
const statusRouter=require("./routes/status");
require("dotenv").config();

const app=express();

//implementare middleware
const logger=(req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);//

app.use("/api", departmentRouter);
app.use("/status", statusRouter);

//err.stack
app.use((err, req, res, next)=>{
    console.error("Error stack:", err.stack);
    next(err);
})

//error middleware
app.use((err, req, res, next)=>{
    res.status(500).json({Error: "Something broke! Maybe my brain :)"})
})

app.set("port", process.env.PORT || 7000);

app.listen(app.get("port"), ()=>{
    console.log(`Server started on http://localhost:${app.get("port")}`);
});