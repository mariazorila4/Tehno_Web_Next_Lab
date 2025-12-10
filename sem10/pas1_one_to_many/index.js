const express=require('express');
const app=express();
const port=3000;

const sequelize=require('./sequelize');

const University=require('./models/university');
const Student=require('./models/student');
const Course=require('./models/courses');

//middleware
app.use(express.urlencoded({extended:true,}));
app.use(express.json());

//define the one_to_many relationship
University.hasMany(Student);
University.hasMany(Course);
Student.belongsToMany(Course, {through:"enrollements"});
Course.belongsToMany(Student, {through:"enrollements"});

app.listen(port, ()=>{
    console.log("The server is running on http://localhost:"+port);
});

//middleware that handles 500 status errors
app.use((err, req, res, next)=>{
    console.error("[ERROR]: "+err);
    res.status(500).json({message: "500 - Server Error"});
})

app.get("/universities", async (req, res, next)=>{
    try{
        const universities=await University.findAll();
        res.status(200).json(universities);
    }catch(err){
        next(err);
    }
});

app.post("/university", async (req, res, next)=>{
    try{
        const newUniversity=await University.create(req.body);
        res.status(201).json({message: "University created", id:newUniversity.id});
    }catch(err){
        next(err);
    }
});

app.get("/students", async(req, res, next)=>{
    try{
        const students=await Student.findAll();
        res.status(200).json(students);
    }catch(err){
        next(err);
    }
});

app.post("/universities/:universityId/student", async(req, res, next)=>{
    try{
        const university=await University.findByPk(req.params.universityId);
        if(university){
            const student=new Student(req.body);
            student.universityId=university.id;
            await student.save();
            res.status(201).json({message:"Student created"});
        }else{
            res.status(404).json({message:"404 - university not found"});
        }
    }catch(err){
        next(err);
    }
});

app.get("/universities/:universityId/students", async(req, res, next)=>{
    try{
        const university=await University.findByPk(req.params.universityId, {
            include:[Student]
        });

        if(university){
            res.status(200).json(university.students);
        }else{
            res.status(404).json({message:"404 - university not found"});
        }
    }catch(err){
        next(err);
    }
});

app.put("/universities/:universityId/students/:studentId", async(req, res , next)=>{
    try{
        const university=await University.findByPk(req.params.universityId);
        if(university){
            const students=await university.getStudents({id:req.params.studentId});
            const student=students.shift();
            if(student){
                student.studentFullName=req.body.studentFullName;
                student.studentStatus=req.body.studentStatus;
                await student.save();
                res.status(202).json({message:"Student updated"});
            }else{
                res.status(404).json({message: "Student not found"});
            }
        }else{
            res.status(404).json({message:"University not found"});
        }
    }catch(err){
        next(err);
    }
});

app.get('/universities/:universityId/students/:studentId', async(req, res, next)=>{
    try{
        const university=await University.findByPk(req.params.universityId);

        if(university){
            const students=await university.getStudents({
                where:{id:req.params.studentId}
            });
            const student=students.shift();

            if(student){
                res.status(200).json(student);
            }else{
                res.status(404).json({message:"404 - Student not found"});
            }
        }else{
            res.status(404).json({message:"404 - university not found"})
        }
    }catch(err){next(err)}
    
});

app.delete('/universities/:universityId/students/:studentId', async(req, res,next)=>{
    try{
        const university=await University.findByPk(req.params.universityId);
        if(university){
            const students=await university.getStudents({
                where:{id:req.params.studentId}
            });
            const student=students.shift();

            if(student){
                await student.destroy();
                res.status(202).json({message:"Student deleted"});
            }else{
                res.status(404).json({message:"Student not found"});
            }
        }else{
            res.status(404).json({message:"University not found"});
        }

    }catch(err){
        next(err);
    }
});

app.get('/universities/:universityId/courses', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses();
      if (courses.length > 0) {
        response.json(courses);
      } else {
        response.sendStatus(204);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.get('/university/:universityId/courses/:courseId', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses({id: request.params.courseId});
      const course = courses.shift();
      if (course) {
        response.json(course);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.post('/universities/:universityId/courses', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const course = await Course.create(request.body);
      university.addCourse(course);
      await university.save();
      response.status(201).location(course.id).send();
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.put('/universities/:universityId/courses/:courseId', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses({id: request.params.courseId});
      const course = courses.shift();
      if (course) {
        await course.update(request.body);
        response.sendStatus(204);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.delete('/universities/:universityId/courses/:courseId', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses({id: request.params.courseId});
      const course = courses.shift();
      if (course) {
        await course.destroy();
        response.sendStatus(204);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.get('/universities/:universityId/courses/:courseId/enrollements', async(req, res, next)=>{
    try{
        const university=await University.findByPk(req.params.universityId);
        if(university){
            const courses=await university.getCourses({
                where:{id:req.params.courseId}
            });
            const course=courses.shift();

            if(courses){
                const students=await course.getStudents({attributes:['id']});
                if(students.length>0){
                    res.status(200).json(students);
                }else{
                    res.status(404).json({message:"students not found"});
                }
            }else{
                res.status(404).json({message:"course not found"});
            }
        }else{
            res.status(404).json({message:"university not found"});
        }
    }catch(err){
        next(err);}
});

app.post('/universities/:universityId/courses/:courseId/enrollements/:studentId', async(req, res, next)=>{
    try{
        const university=await University.findByPk(req.params.universityId);
        if(university){
            const courses=await university.getCourses({
                where:{id:req.params.courseId}
            });
            const course=courses.shift();

            const students=await university.getStudents({
                where:{id:req.params.studentId}
            });
            const student=students.shift();

            if(course && student){
                course.addStudent(student);
                await course.save();
                res.status(204).json({message:"Student added in course"});
            }else{
                res.status(404).json({message:"course or student not found"});
            }
        }else{
            res.status(404).json({message:"university not found"});
        }
    }catch(err){
        next(err);}
});

app.get('/universities/:universityId/students/:studentId/enrollments/:courseId', async(req, res, next)=>{
    try{
        const university=await University.findByPk(req.params.universityId);

        if(university){
            const students=await university.getStudents({
                where:{id:req.params.studentId}
            });
            const student=students.shift();

            const courses=await university.getCourses({
                where:{id:req.params.courseId}
            });
            const course=courses.shift();

            if(student && course){
                student.addCourse(course);
                await student.save();
                res.status(200).json({message:"Course added to student courses"});
            }else{
                res.status(404).json({message:"404 - Student or course not found"});
            }
        }else{
            res.status(404).json({message:"404 - university not found"})
        }
    }catch(err){next(err)}
    
});

app.delete('/universities/:universityId/students/:studentId/enrollements/:courseId', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const students = await university.getStudents({id: request.params.studentId});
      const student = students.shift();
      const courses = await university.getCourses({id: request.params.courseId});
      const course = courses.shift();
      if (student && course) {
        student.removeFromCourse(course);
        student.save();
        response.sendStatus(204);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.delete('/universities/:universityId/courses/:courseId/enrollements/:studentId', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses({id: request.params.courseId});
      const course = courses.shift();
      const students = await university.getStudents({id: request.params.studentId});
      const student = students.shift();
      if (student && course) {
        course.removeStudent(student);
        course.save();
        response.sendStatus(204);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

app.post('/', async (request, response, next) => {
  try {
    const registry = {};
    for (let u of request.body) {
      const university = await University.create(u);
      for (let s of u.students) {
        const student = await Student.create(s);
        registry[s.key] = student;
        university.addStudent(student);
      }
      for (let c of u.courses) {
        const course = await Course.create(c);
        registry[c.key] = course;
        university.addCourse(course);
      }
      for (let e of u.enrollements) {
        registry[e.courseKey].addStudent(registry[e.studentKey]);
        await registry[e.courseKey].save();
      }
      await university.save();
    }
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get('/', async (request, response, next) => {
  try {
    const result = [];
    for (let u of await University.findAll()) {
      const university = {
        name: u.name,
        students: [],
        courses: [],
        enrollements: []
      };
      for (let c of await u.getCourses()) {
        university.courses.push({
          key: c.id,
          name: c.name
        });
        for (let s of await c.getStudents()) {
          university.enrollements.push({
            courseKey: c.id,
            studentKey: s.id
          });
        }
      }
      for (let s of await u.getStudents()) {
        university.students.push({
          key: s.id,
          firstName: s.firstName,
          lastName: s.lastName
        });
      }
      result.push(university);
    }
    if (result.length > 0) {
      response.json(result);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

app.get('/', async (request, response, next) => {
  try {
    const result = [];
    
    for (let u of await University.findAll()) {
      const university = {
        name: u.name, 
        students: [],
        courses: [],
        enrollements: []
      };

      for (let c of await u.getCourses()) {
        university.courses.push({
          key: c.id,
          name: c.name
        });

        for (let s of await c.getStudents()) {
          university.enrollements.push({
            courseKey: c.id,
            studentKey: s.id
          });
        }
      }

      for (let s of await u.getStudents()) {
        university.students.push({
          key: s.id,
          firstName: s.firstName,
          lastName: s.lastName   
        });
      }

      result.push(university);
    }

    if (result.length > 0) {
      response.status(200).json(result);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});