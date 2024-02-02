const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const port = 8080;

const fs = require("fs");


app.use(bodyParser.json())
//get api to display the data in frontend.

// STEP 1: Reading JSON file 

    

app.get('/getClasses/:class',(req,res)=>{
    const classId = req.params.class;
    const path = String("./class/class"+classId+".json");
    const data = require(path);

    res.send(data);
});



// {
//     "id": "1",
//     "school-id": "1",
//     "students": [
//       {
//         "student_id": "B102",
//         "assignment": ""
//       }
//     ],
//     "status": "ACTIVE"
//   }
//post  api to store the data in db.
app.post('/createClasses',(req,res)=>{ //http://localhost:8080/createClasses
    const data = req.body;

    const path = String("./class/class"+data.id+".json");

    // json = JSON.stringify(data);

    fs.writeFile(
        path ,
        JSON.stringify(data),
        err => {
            // Checking for errors 
            if (err) throw err;
    
            // Success 
            console.log("Done writing");
        });

    // const path = "/classes/"+classId;
    // const classData = require(path);

    res.send(data.id);
});

// add students to class
app.post('/addStudents',(req,res)=>{ //http://localhost:8080/createClasses
    // const classId = req.params.class;
    const StudentData = req.body;
    const classId = StudentData.class;
    const path = String("./class/class"+classId+".json");
    const data = require(path);
    // json = JSON.stringify(data);
    // const StudentData = req.body;

data.students.push(StudentData);

    fs.writeFile(
        path ,
        JSON.stringify(data),
        err => {
            // Checking for errors 
            if (err) throw err;
    
            // Success 
            console.log("Done writing");
        });

    // const path = "/classes/"+classId;
    // const classData = require(path);

    res.send(data);
});


// delete student using its id
app.get('/deleteStudent/:classId/:studentId',(req,res)=>{
    const classId = req.params.classId;
    const studentId = req.params.studentId;
    const path = String("./class/class"+classId+".json");
    const data = require(path);

    var students=[]
    students = data.students;
    let newArray = []; 
  
    for (let i = 0; i < students.length; i++) { 
        if (students[i].student_id !=studentId ) { 
            newArray.push(students[i]); 
        } 
    } 
    data.students = newArray;


    fs.writeFile(
        path ,
        JSON.stringify(data),
        err => {
            // Checking for errors 
            if (err) throw err;
    
            // Success 
            console.log("Done writing");
        });



    res.send(data);
});

// Defining new user 
// let user =
// {
// 	name: "New User",
// 	age: 30,
// 	language: ["PHP", "Go", "JavaScript"]
// };

// // STEP 2: Adding new data to users object 
// users.push(user);

// STEP 3: Writing to a file 




app.listen(port,(err)=>{
    if(err){console.log(err)}
    else{console.log("server is listining on port "+port);}

});