import React from 'react'
import { FaCheckDouble } from "react-icons/fa6";
import { MdLabelImportant } from "react-icons/md"; 
import { CgNotes } from "react-icons/cg";
import { TbNotebook } from "react-icons/tb";
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const data=[
        {
            title:"All task",
          icon:  <CgNotes/>,
          link:"/alltask"

        },
        {
            title:"InComplete task",
            icon:  <TbNotebook/>,
             link:"/inCompleteTask"
            
        },
        {
            title:"Complete task",
            icon:  <FaCheckDouble/>,
             link:"/completeTask"
            
        },
        {
            title:"Important task",
            icon:  <MdLabelImportant/>,
             link:"/importantTask"
            
        }
    ]
  return (
  <div className=''>
    <div className='flex flex-col gap-4 '>
       <div className='flex flex-col gap-4 '>
       <h2 className='text-xl font-semibold'>The Code </h2>
        <div>
        <h4 >D@gmail.com</h4>
        <hr/>
        </div>
       </div>
<div>
    {data.map((el,i)=>(
         <Link to={el.link} className='flex gap-2  items-center mt-4 hover:bg-gray-500 p-2 rounded transition-all duration-300'>{el.icon}{el.title}</Link>
    ))}
</div>
<div>
    <button className='bg-gray-600 w-full p-2 rounded'>Logout</button>
</div>
    </div>
  </div>
  )
}

export default Sidebar