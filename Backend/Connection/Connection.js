const mongoose = require("mongoose")
require("dotenv").config()

 const conn = async()=>{
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URL}`)
        if(response){
            console.log("Connected Db")
        }
    } catch (error) {
        console.log(error)
    }
 }

 conn()