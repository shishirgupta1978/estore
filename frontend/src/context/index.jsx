import React, { useState, createContext, useContext } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { toast } from "react-toastify";





const Context = createContext();
export const Provider = (props) => {
  const [search, setSearch] = useState("")
  const [banners, setBanners] = useState([])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState({ id: 0, name: 'All' })
  const [website, setWebsite] = useState(null)
  const [page, setPage] = useState("Login");
  const [cart, setCart] = useState(localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : {});

  const BASE_URL = import.meta.env.VITE_BASE_URL && import.meta.env.VITE_BASE_URL != undefined ? import.meta.env.VITE_BASE_URL : "";

  const setuser = (token) => {
    localStorage.setItem("Tokens", token)
  }
  
  
  
  const msghandle = (error) => {
    const details = (error.response && error.response.data && error.response.data.detail)
    if (details) { return details }
  
    const message1 =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    const message2 =
      (error.response &&
        error.response.data)
    let x = ""
    if (typeof message2 === "object") {
      for (var k in message2) {
        if (typeof message2[k] === "string") {
          x = x + k + ": " + message2[k] + ". "
        }
        else if (typeof message2[k] === "object") {
          x = x + message2[k].join(". ");
        }
  
  
      }
    }
  
    let n = "";
    if (x) {
  
      return x + " (" + message1 + ")";
    }
    else {
      return message1;
    }
  
  
  
  }
  
  
  const removeUser = () => {
    localStorage.removeItem("Tokens")
  }
  
  const getAccessToken = () => {
    return localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens")).access : null
  
  }
  
  const getRefreshToken = () => {
    return localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens")).refresh : null
  
  }
  
  const getUser = () => {
    return localStorage.getItem("Tokens") ? jwt_decode(JSON.parse(localStorage.getItem("Tokens")).access) : null
  }

  const [context, setContext] = useState({ 'user': getUser() });

  const refresh = (setContext) => {

    const rtoken = getRefreshToken()
  
    if (rtoken) {
  
      axios.post(`${BASE_URL}/account/token-refresh/`, { refresh: `${rtoken}` }).then((response) => {
        localStorage.setItem("Tokens", JSON.stringify({ refresh: `${rtoken}`, access: response.data.access }));
        setContext({ user: getUser() })
  
      })
        .catch((error) => {
          const message = msghandle(error)
          console.log("error")
  
        })
  
  
  
    }
  
  
  
  
  
  
  }
  
  
  



  const axiosApi = (url, config, setData, setContext) => {



    setData({ 'is_loading': true, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    //deactivate auto refresh;
    refresh(setContext);
    const accessToken = getAccessToken()
    if (config.headers["Authorization"]) {
      config.headers["Authorization"] = "Bearer " + accessToken
    }
    let n_url = BASE_URL + "/"
    if (url && url.toLowerCase().startsWith("http")) {
      n_url = ""
    }
  
    axios(`${n_url}${url}`, config).then((response) => {
      setData({ 'is_loading': false, 'is_error': false, 'is_success': true, 'result': response.data, 'message': null }); console.log(response);
  
  
    })
      .catch((error) => {
        console.log(error)
        setData({ 'is_loading': false, 'is_error': true, 'is_success': false, 'result': null, 'message': error });
  
        const message = msghandle(error)
  
        if (error?.response?.status == 401) {
          removeUser();
          setContext({ 'user': null })
          toast.error(message);
        }
        else {
          toast.error(message);
  
        }
  
  
  
      })
  
  
  }
  


  return (
    <Context.Provider value={{ context, setContext, search, setSearch, category, setCategory, products, setProducts, banners, setBanners, website, setWebsite, page, setPage, cart, setCart,axiosApi,BASE_URL,setuser,getUser,getRefreshToken,getAccessToken,removeUser,refresh }}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;














