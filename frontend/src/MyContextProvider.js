import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; 

const MyContext = createContext(null);

export const useMyContext = () => useContext(MyContext);

export default function MyContextProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromBackend()
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/data'); 
      const data = await response.data; 
      return data;
    } catch (error) {
      throw error;
    }
  };

  // console.log(data);

  return (
    <MyContext.Provider value={{ data }}>
      {children}
    </MyContext.Provider>
  );
}
