import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

const ImportantTask = () => {
  const [Data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          console.error(" User ID or Token is missing!");
          return;
        }

        const headers = {
          id: userId,
          authorization: `Bearer ${token}`,
        };

        console.log("🔍 Sending request with headers:", headers);

        const response = await axios.get(
          "http://localhost:1000/api/v2/get-imp-tasks",
          { headers }
        );
    setData(response.data.data)
        console.log("✅ Response:", response.data);
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
      }
    };

    fetchData();
  },[]);
  return (
    <div>
        <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default ImportantTask