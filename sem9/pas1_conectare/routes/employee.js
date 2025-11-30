const {Op}=require("sequelize");
const Employee=require("../models/employee");

const router=require("express").Router();

router
.route("/employees")
.get(async(req, res)=>{
    //get all + filtarea dupa salariu
    const {minSalary, simplified, name, sortBy}=req.query;
    try{
        const employees=await Employee.findAll({
            where:{ 
                ...(minSalary && {salary: { [Op.gt]: minSalary }}),
                ...(name && { firstName: { [Op.like]: `%${name}%` }}),
            },
            attributes: simplified?{exclude: 'id'}:undefined,
            order: sortBy?[[sortBy, 'ASC']]:undefined
        });
        return res.status(200).json(employees);
    }catch(err){
        console.error('Eroarea este: ', err);
        return res.status(500).json(err);
    }
})
.post(async (req, res)=>{
    //create
    try{
        const newEmployee=await Employee.create(req.body);
        return res.status(200).json(newEmployee);
    }catch(err){
        return res.status(500).json(err);
    }
});

//get by id
router
.route("/employees/:id")
.get( async (req, res)=>{
    const employee= await Employee.findOne({
        //filtrarea dupa un camp
        where: {id: req.params.id},
    });
    if(employee){
        return res.status(200).json(employee);
    }else{
        return res.status(404).json({error: `Employee with id ${req.params.id} doesn't exist`});
    }
})
.put(async (req, res)=>{
     const employee= await Employee.findByPk(req.params.id);
    if(employee){
        return res.status(200).json(await employee.update(req.body));
    }else{
        return res.status(404).json({error: `Employee with id ${req.params.id} doesn't exist`});
    }
})
.delete(async (req, res)=>{
    const employee=await Employee.findByPk(req.params.id);
    if(employee){
        return res.status(200).json(await employee.destroy(req.body));
    }else{
        return res.status(404).json({error: `Employee with id ${req.params.id} doesn't exist`});
    }
})

module.exports=router;