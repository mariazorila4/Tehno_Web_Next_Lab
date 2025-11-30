const express=require("express");
const {departments}=require("../db");
const router=express.Router();

//pas6 - middleware
const checkId=(req, res, next)=>{
    if(req.params.id && isNaN(req.params.id)){
        res.status(400).json({error: "Wrong input for id"});
    }else{
        next();
    }
}

router.get("/departments", (req, res)=>{
    res.status(200).json(departments);
});

router.get("/departments/:id", checkId, (req, res)=>{
    const department=departments.find(x=>x.id===Number(req.params.id));

    if(department){
        res.status(200).json(department);
    }else{
        res.status(404).json({error: "Entity not found"});
    }
});

module.exports=router;