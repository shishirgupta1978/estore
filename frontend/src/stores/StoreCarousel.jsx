import React,{useContext} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Context from "../context";


const StoreCarousel=()=> {
  const {banners}=useContext(Context);
  return (
    <Carousel>
      {banners.map((banner) =>
           <Carousel.Item key={banner.id}>
           <img height='300px' 
             className="d-block w-100"
             src={banner.img_url}
             alt="First slide"
           />
           <Carousel.Caption>
             <h5>{banner.label}</h5>
             <p>{banner.text}</p>
           </Carousel.Caption>
   
   
   
         </Carousel.Item>     
      
      )}
      
 
    </Carousel>
  );
}

export default StoreCarousel;