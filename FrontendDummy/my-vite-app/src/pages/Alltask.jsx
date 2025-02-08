import {React, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from '../components/Home/InputData';

const Alltask = () => {
    const [InputDiv, setInputDiv] = useState("hidden")
  return (
   <>
    <div>
       <div className=" w-full flex justify-end  rounded px-4 py-2 ">
             <button className='cursor-pointer' onClick={()=>setInputDiv("fixed")}>
             <IoIosAddCircleOutline className="text-3xl hover:text-gray-100 transition-all duration-300 " />
             </button>
               {/* <p className="text-2xl">Add task</p> */}
             </div>
        <Cards home={"true"}  setInputDiv={setInputDiv} />
    </div>
    <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} />
   </>
  )
}

export default Alltask