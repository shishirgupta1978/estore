import React, { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Spinner, Title,ProductCard } from ".";
import { MyContext, axiosApi } from "../utility";
import { Container, Row, Col } from "react-bootstrap";
import { WebsiteCarousel } from ".";


export const Website = () => {
  const {setWebsite, context, setContext,search,setProducts,setBanners } = useContext(MyContext);
  const { store_slug } = useParams();
  const [category, setCategory] = useState({id:0, name:"All"});
  const navigate = useNavigate();
  const [store, setStore] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  
  
  const [ cart,setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :{});

	useEffect(() => {

    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`store/get-website/${store_slug}/`, config, setStore, setContext);

}, []);


  useEffect(() => {
    if(store.is_success)
    {


      const allProducts = [];
      // Iterate through the product categories
      store.result.product_categories.forEach((category1) => {
        // Add all products from the current category to the allProducts array
        
        allProducts.push(...category1.products);
      });
      setProducts([...allProducts]);

      setBanners(store.result.banners);
      setWebsite(store.result)


    }

  }, [store]);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ ...cart }));
  }, [cart]);


  return (
    <>
    {store.is_success && store.result && <><WebsiteHeader data={store.result} setCategory={setCategory} category={category}/>

   <Outlet/>
       
     </>}
    </>
  )
}
