import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
const Cards = ({home, setInputDiv,data}) => {
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const headers = {
    id: userId,
    authorization: `Bearer ${token}`,
  };
 
const handleCompleteTask= async(id)=>{
try {
 const response= await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`,{},{headers})
 console.log(response,"update taskkkk")

 
} catch (error) {
  console.log(error)
  
}
}
  // const [ImportantButton, setImportantButton] = useState("Incomplete");
  return (
    <div className="p-4 grid grid-cols-4 gap-4 ">
      {data && data.map((item, index) => (
        <div
          key={index}
          className="bg-gray-800 flex flex-col gap-4 justify-between text-white p-4 mb-4 rounded-lg">
          <div className=" ">
            <h2 className="text-xl font-bold ">{item.title}</h2>
            <p className="mt-2">{item.desc}</p>
          </div>
          <div className="flex gap-2 justify-between">
            <button
            onClick={()=>handleCompleteTask(item._id)}
              className={`px-2 py-1 rounded ${
                item.complete === false ? "bg-red-600" : "bg-green-600"
              }`}>
              {item.complete === true ? "Completed" : 'InCompleted'}
            </button>
            <div>
              <button className="bg-blue-600 px-2 py-1 text-xl rounded mx-2">
                <FaRegHeart />
              </button>
              <button className="bg-blue-600 px-2 py-1 text-xl rounded mx-2">
                <FaRegEdit />
              </button>
              <button className="bg-blue-600 px-2 py-1 text-xl rounded mx-2">
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}

      {home==="true"?  <div onClick={()=>setInputDiv("fixed")} className="flex flex-col justify-center items-center bg-gray-500 rounded p-4  gap-5 hover:scale-105 hover:cursor-pointer transition-all duration-300">
        <IoIosAddCircleOutline className="text-5xl" />
        <p className="text-2xl">Add task</p>
      </div>: null }
     
    </div>
  );
};

export default Cards;
