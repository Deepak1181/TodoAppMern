import axios from "axios";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const InputData = ({ InputDiv, setInputDiv }) => {

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const headers = {
    id: userId,
    authorization: `Bearer ${token}`,
  };
  const [Data,setData] = useState({title:"",desc:""})
   const change=(e)=>{
const {name,value} = e.target
setData({...Data,[name]:value})
   }

   const submitData= async()=>{
     if(Data.title=== "" || Data.desc===""){
      alert("All Fileds are rwquire")
     } 
     else{
      await axios.post('http://localhost:1000/api/v2/create-task',Data,{headers})
     }
   }
  return (
    <>
      {/* Background Overlay */}
      <div className={`${InputDiv} fixed top-0 left-0 bg-gray-500 opacity-80 h-screen w-full`}></div>

      {/* Modal Container */}
      <div className={`${InputDiv} fixed top-0 left-0 flex justify-center items-center h-screen w-full`}>
        <div className="w-3/6 bg-gray-700 flex flex-col gap-5 p-4 rounded shadow-lg">
          
          {/* Close Button */}
          <div className="flex justify-end cursor-pointer" onClick={() => setInputDiv("hidden")}>
            <button>
              <ImCross className="text-white hover:text-red-500 transition" />
            </button>
          </div>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 border border-amber-50 rounded w-full bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     value={Data.title}
                     onChange={change}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Description"
            name="desc"
            className="px-3 py-2 border border-amber-50 rounded w-full bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
         value={Data.desc}
         onChange={change}
          ></textarea>

          {/* Submit Button */}
          <button onClick={submitData} className="px-3 py-2 bg-blue-400 hover:bg-blue-500 rounded text-black text-xl transition">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
