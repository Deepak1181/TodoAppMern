const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const authenticateToken = require("./auth");



//createTask




router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers; // User ID

    // Validate request body
    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Validate user ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check for duplicate task title
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return res.status(400).json({ message: "Task with this title already exists" });
    }

    // Create new task
    const newTask = new Task({ title, desc });
    const saveTask = await newTask.save();

    // Add task to user
    await User.findByIdAndUpdate(id, { $push: { tasks: saveTask._id } });

    res.status(201).json({ message: "Task Created", task: saveTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/get-all-tasks",authenticateToken,async(req,res)=>{
    try {
  const {id} = req.headers
 const userData= await User.findById(id).populate({path:"tasks", options:{sort:{createdAt:-1}}})
 res.status(200).json({data:userData})
}  catch(error){
    console.log(error)
      res.status(400).json({ message: "interval server error" }); 
}

}
)

//  DELETE TASK 
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params ; 
     
  
        const userId= req.headers.id
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull :{tasks:id}})
      res.status(200).json({ message: "Task deleted successfully" });

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  //update


  router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id} =  req.params; 
     
  const {title,desc} = req.body;
      
       await Task.findByIdAndUpdate(id,{title:title,desc:desc});
       
      res.status(200).json({ message: "Task update successfully" });

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });



  //important task 


  router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params; 
     
  const TaskData = await Task.findById(id)
      const impTask= TaskData.important
       await Task.findByIdAndUpdate(id,{important:!impTask});
       
      res.status(200).json({ message: "Task update successfully" });

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  //complete 
  
  router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params; 
     
  const TaskData = await Task.findById(id)
      const CompleteTask= TaskData.complete
       await Task.findByIdAndUpdate(id,{complete:!CompleteTask});
       
      res.status(200).json({ message: "Task update successfully" });

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });




  router.get("/get-imp-tasks",authenticateToken,async(req,res)=>{
    try {
    const {id} = req.headers
    const Data= await User.findById(id).populate({path:"tasks",
    match :{important:true},
    options:{sort:{createdAt:-1}}})
 
 const ImpTaskData = Data.tasks
    res.status(200).json({data:ImpTaskData})
  }  catch(error){
    console.log(error)
      res.status(400).json({ message: "interval server error" }); 
  }

  }
 )



router.get("/get-complete-tasks",authenticateToken,async(req,res)=>{
    try {
  const {id} = req.headers
 const Data= await User.findById(id).populate({path:"tasks",
    match :{complete:true},
    options:{sort:{createdAt:-1}}})
 
 const CompTaskData = Data.tasks
    res.status(200).json({data:CompTaskData})
}  catch(error){
    console.log(error)
      res.status(400).json({ message: "interval server error" }); 
}

}
)



router.get("/get-incomplete-tasks",authenticateToken,async(req,res)=>{
    try {
  const {id} = req.headers
 const Data= await User.findById(id).populate({path:"tasks",
    match :{complete:false},
    options:{sort:{createdAt:-1}}})
 
 const CompTaskData = Data.tasks
    res.status(200).json({data:CompTaskData})
}  catch(error){
    console.log(error)
      res.status(400).json({ message: "interval server error" }); 
}

}
)
module.exports = router;












// const express = require("express");
// const router = express.Router();
// const Task = require("../models/task");
// const User = require("../models/user");
// const authenticateToken = require("./auth");  // Updated path

// // Create Task
// router.post("/create-task", authenticateToken, async (req, res) => {
//     try {
//         const { title, desc } = req.body;
        
//         // Get user ID from the authenticated token
//         const userId = req.user.id;  // Assuming your token payload includes user id

//         // Create new task with user reference
//         const newTask = new Task({
//             title,
//             desc,
//             user: userId
//         });

//         const savedTask = await newTask.save();

//         // Update user's tasks array
//         await User.findByIdAndUpdate(
//             userId,
//             { $push: { tasks: savedTask._id } },
//             { new: true }
//         );

//         res.status(201).json({
//             message: "Task created successfully",
//             task: savedTask
//         });

//     } catch (error) {
//         console.error("Task creation error:", error);
//         res.status(500).json({ 
//             message: "Error creating task",
//             error: error.message 
//         });
//     }
// });

// module.exports = router;