import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const axiosContext = createContext();

const myaxios = axios.create({
  baseURL: "http://back_enjoypark.test",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const AxiosProvider = ({ children }) => {
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    myaxios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    myaxios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        return Promise.reject(error);
      }
    );

    setFirstLoad(true);
  }, []);

  return (
    <axiosContext.Provider value={myaxios}>
      {firstLoad ? children : null}
    </axiosContext.Provider>
  );
};

export default AxiosProvider;

export const useAxios = () => useContext(axiosContext);