import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Context from "../context";
import { Container, Row, Col } from "react-bootstrap";
import  StoreCarousel  from "./StoreCarousel";


const Products = () => {
  const { setBanners,search,category, axiosApi,Loading } = useContext(Context);
  const [products,setProducts]=useState([])
  const navigate = useNavigate();

  const {store_slug} = useParams();
  const [loadData, setLoadData] = useState({ 'status': null, 'result': null, 'message': null })
  


    useEffect(()=>{
        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`store/get-website/${store_slug}/`, config, setLoadData);
            },[])

  useEffect(() => {
    if(loadData.status == 'success')
    {


      const allProducts = [];
      // Iterate through the product categories
      loadData.result.product_categories.forEach((category1) => {
        // Add all products from the current category to the allProducts array
        
        allProducts.push(...category1.products);
      });
      setProducts([...allProducts]);
      
      setBanners(loadData.result.banners);
      


    }

  }, [loadData]);





  return (
    <>
 <StoreCarousel/>
 <Loading loadData={loadData}>
       <Container className="mt-2">
          <Row>{products.length>0 && products.filter((product)=>{return product.category==category.name || category.id==0 }).filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => <Col sm={12} md={6} lg={4} key={product.id} className="mb-2"><ProductCard product={product} /></Col>)}</Row>
        </Container>
  </Loading>
     </>
    
  )
}

export default Products;
