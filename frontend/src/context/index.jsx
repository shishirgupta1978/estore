import React, { useState, createContext, useContext } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { toast } from "react-toastify";
import { Spinner,Container,Col,Row,Alert } from 'react-bootstrap';
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
  const setuser = (token) => {localStorage.setItem("Tokens", token)}
  const msgHandle = (error) => {
    const details = error?.response?.data?.detail;
    const message1 = error?.response?.data?.message || error.message || error.toString();
    const message2 = error?.response?.data;
  
    let x = "";
    if (typeof message2 === "object") {
      for (const key in message2) {
        if (typeof message2[key] === "string") {
          x += `${key}: ${message2[key]}. `;
        } else if (typeof message2[key] === "object") {
          x += message2[key].join(". ");
        }
      }
    }
  
    return x ? `${x} (${message1})` : message1;
  }
  

  const removeUser = () => {localStorage.removeItem("Tokens") }

  const getAccessToken = () => { return localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens")).access : null }

  const getRefreshToken = () => { return localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens")).refresh : null }

  const getUser = () => { return localStorage.getItem("Tokens") ? jwt_decode(JSON.parse(localStorage.getItem("Tokens")).access) : null }

  const [user, setUser] = useState(getUser());

  const refresh = () => {

    const rtoken = getRefreshToken()

    if (rtoken) {
      axios.post(`${BASE_URL}/account/token-refresh/`, { refresh: `${rtoken}` }).then((response) => {
        localStorage.setItem("Tokens", JSON.stringify({ refresh: `${rtoken}`, access: response.data.access }));
        setUser(getUser());}).catch((error) => {const message = msgHandle(error);  console.log("error")})
    }
  }






  const axiosApi = (url, config, setData) => {
    setData({ 'status': 'loading', 'result': null, 'message': null })
    //deactivate auto refresh;
    refresh();
    const accessToken = getAccessToken()
    if (config.headers["Authorization"]) {config.headers["Authorization"] = "Bearer " + accessToken }
    let n_url = BASE_URL + "/"
    if (url && url.toLowerCase().startsWith("http")) { n_url = "" }

    axios(`${n_url}${url}`, config).then((response) => {
      setData({ 'status': 'success',  'result': response.data, 'message': null }); console.log(response);
    }).catch((error) => {console.log(error);  setData({ 'status': 'error',  'result': null, 'message': msgHandle(error) });

        const message = msgHandle(error)

        if (error?.response?.status == 401) {
          removeUser();
          setUser(null)
          toast.error(message);
        }
        else {
          toast.error(message);

        }



      })


  }




  const Loading = (loadingProps) => {

    if (loadingProps.loadData?.status == 'loading') {
      return <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <Spinner animation="border" role="status"/>
        
      </div>

  
    }
    if(loadingProps.loadData?.status == 'error')
    {
      return <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Alert variant="danger" className="mt-5 text-center">
            <h6>{loadingProps.loadData.message }</h6>
          </Alert>
        </Col>
      </Row>
    </Container>
    }
    
    if(loadingProps.loadData?.status == 'success')
    {
      return loadingProps.children
    }
  
   
  }
  



  return (
    <Context.Provider value={{Loading, user, setUser, search, setSearch, category, setCategory, products, setProducts, banners, setBanners, website, setWebsite, page, setPage, cart, setCart, axiosApi, BASE_URL, setuser, getUser, getRefreshToken, getAccessToken, removeUser, refresh }}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;














