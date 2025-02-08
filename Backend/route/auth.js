const jwt = require("jsonwebtoken");

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const ofheader = req.header("authorization");
     const token = ofheader&& ofheader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        
        req.user = user; 
        next(); 
    });
};

module.exports = authenticateToken;




























// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const SECRET_KEY = process.env.SECRET_KEY;

// // ✅ Middleware to verify token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.header("Authorization"); // Get token from headers
//   const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

//   if (token==null) {
//     return res.status(401).json({ message: "Access Denied. No token provided." });
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token." });
//     }

//     req.user = user; // Store user data in request object
//     next();
//   });
// };

// module.exports = authenticateToken;













// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authenticateToken = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: "Access Denied. No token provided." });
//         }

//         const token = authHeader.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
//         // Add user data to request
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: "Invalid or expired token." });
//     }
// };

// module.exports = authenticateToken;