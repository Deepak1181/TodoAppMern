import {React, useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const Alltask = () => {
    const [InputDiv, setInputDiv] = useState("hidden")
    const [Data, setData] = useState()
    // const token = localStorage.getItem("token");

    // const headers = {
    //   id: userId,
    //   authorization: `Bearer ${token}`,
    // };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const userId = localStorage.getItem("id");
          const token = localStorage.getItem("token");
  
          if (!userId || !token) {
            console.error("❌ User ID or Token is missing!");
            return;
          }
  
          const headers = {
            id: userId,
            authorization: `Bearer ${token}`,
          };
  
          console.log("🔍 Sending request with headers:", headers);
  
          const response = await axios.get(
            "http://localhost:1000/api/v2/get-all-tasks",
            { headers }
          );
      setData(response.data.data)
          // console.log("✅ Response:", response.data);
        } catch (error) {
          console.error("❌ Fetch error:", error.response?.data || error.message);
        }
      };
  
      fetchData();
    },[]);
    // Data && console.log(Data.tasks)
  
  return (
   <>
    <div>
       <div className=" w-full flex justify-end  rounded px-4 py-2 ">
             <button className='cursor-pointer' onClick={()=>setInputDiv("fixed")}>
             <IoIosAddCircleOutline className="text-3xl hover:text-gray-100 transition-all duration-300 " />
             </button>
               {/* <p className="text-2xl">Add task</p> */}
             </div>
      { Data&& <Cards home={"true"}  setInputDiv={setInputDiv}  data={Data.tasks}/>}
    </div>
    <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} />
   </>
  )
}

export default Alltask