const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY; 
router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should have at least 4 characters" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass= await bcrypt.hash(req.body.password,10)
    const newUser = new User({ username, email, password:hashPass });
    await newUser.save();

    return res.status(200).json({ message: "Signed in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Internal server error" });
  }
});


//login

// router.post("/log-in", async (req, res) => {
  
//       const { username, email, password } = req.body;
  
   
//       if (!existingUser) {
//         return res.status(400).json({ message: "Username or password incorrect" });
//       } 
//       bcrypt.compare(password,existingUser.password,(err,data) => {
//         if(data){
//             const authClaims =({name:username},{jti:jwt.sign({},)})
//             const token = jwt.sign({authClaims},) ;
//             res.status(200).json({id:existingUser._id,token:token})
//       } else{
//         return res.status(400).json({ message: "Invalid credentialt" });
//       }
//       })
    
      
  
      
//   });




router.post("/log-in", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
  
      if (!existingUser) {
        return res.status(400).json({ message: "Username or password incorrect" });
      }
  
      bcrypt.compare(password, existingUser.password, (err, data) => {
        if (data) {

          const token = jwt.sign(
            { id: existingUser._id, username: existingUser.username }, SECRET_KEY,   { expiresIn: "24h" }
          );
  
          res.status(200).json({ id: existingUser._id, token });
        } else {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
module.exports = router;


























// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const SECRET_KEY = process.env.SECRET_KEY;

// // ✅ SIGN-UP ROUTE
// router.post("/sign-in", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const existingUser = await User.findOne({ username });
//     const existingEmail = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     } else if (username.length < 4) {
//       return res.status(400).json({ message: "Username should have at least 4 characters" });
//     }

//     if (existingEmail) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const hashPass = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashPass });
//     await newUser.save();

//     return res.status(200).json({ message: "Signed up successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // ✅ LOGIN ROUTE
// router.post("/log-in", async (req, res) => {  // ❌ Fixed from GET to POST
//   try {
//     const { username, password } = req.body;
//     const existingUser = await User.findOne({ username });

//     if (!existingUser) {
//       return res.status(400).json({ message: "Invalid username or password" });
//     }

//     bcrypt.compare(password, existingUser.password, (err, isMatch) => {
//       if (isMatch) {
//         const token = jwt.sign(
//           { id: existingUser._id, username: existingUser.username },
//           SECRET_KEY,
//           { expiresIn: "1h" }
//         );

//         res.status(200).json({ id: existingUser._id, token });
//       } else {
//         return res.status(400).json({ message: "Invalid credentials" });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// module.exports = router;
