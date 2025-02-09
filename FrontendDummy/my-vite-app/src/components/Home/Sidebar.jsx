import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa6";
import { MdLabelImportant } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { TbNotebook } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const data = [
    { title: "All task", icon: <CgNotes />, link: "/" },
    { title: "Incomplete task", icon: <TbNotebook />, link: "/inCompleteTask" },
    { title: "Complete task", icon: <FaCheckDouble />, link: "/completeTask" },
    { title: "Important task", icon: <MdLabelImportant />, link: "/importantTask" },
  ];

  const [Data, setData] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/signup");
  };

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

        // console.log("🔍 Sending request with headers:", headers);

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
  }, []);

  return (
    <div className="">
      <div className="flex flex-col gap-4">
      {
           Data&&(
            <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{Data.username}</h2>
            <div>
              <h4>{Data.email}</h4>
              <hr />
            </div>
          </div>
           )
      }
        <div>
          {data.map((el, i) => (
            <Link
              key={i}
              to={el.link}
              className="flex gap-2 items-center mt-4 hover:bg-gray-500 p-2 rounded transition-all duration-300"
            >
              {el.icon}
              {el.title}
            </Link>
          ))}
        </div>
        <div>
          <button onClick={logout} className="bg-gray-600 w-full p-2 rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
