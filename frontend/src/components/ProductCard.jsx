import React,{useState} from 'react';
import { Card, Button,Modal,ButtonGroup } from 'react-bootstrap';

export const ProductCard = ({ product }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [cart,setCart]=useState({})

  const handleClosePreview = () => setShowPreview(false);
  const handleShowPreview = () => setShowPreview(true);

  const decreaseQuantity = (id) => {
    let key={...cart};
    if (cart.hasOwnProperty(id)){
      if (cart[id] >1)
      {
        setCart({...cart, [id]:cart[id]-1});
        
      }else if (cart[id]<=1)
      {
        delete key[id]; 
        setCart({...key});

      }


    }


  };

  const increaseQuantity = (id) => {

    let key={...cart};
    if (cart.hasOwnProperty(id)){
      if (cart[id] >9)
      {
        
      }else
      {
        setCart({...cart, [id]:cart[id]+1});
      }


    }else{
      setCart({...cart, [id]:1});
    }

  }



  return (
<>

<div>
      
      <Card>
        <Card.Img height="250px" variant="top" src={product.img_url} onClick={handleShowPreview} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.category_name}</Card.Text>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price(Rs.):{product.discount > 0 &&  product.discount <= 100 ? <><s style={{color:'red'}}>{product.price}(-{product.discount}%)</s> {product.price - (product.price * product.discount / 100 ) }</> :<>{product.price}</> }</Card.Text>
          {product.is_available ? <>{cart.hasOwnProperty(product.id) ?<><ButtonGroup className='w-100'><Button onClick={()=>{decreaseQuantity(product.id);}} variant="dark"  style={{width:'40%'}}>-</Button><Button  style={{width:'20%'}}>{cart[product.id]}</Button><Button variant="dark"  onClick={()=>{increaseQuantity(product.id);}} style={{width:'40%'}} >+</Button></ButtonGroup></>: <Button  onClick={()=>{increaseQuantity(product.id);}} variant="dark" className='w-100' >Add to Cart</Button>}</>:<Button variant="dark" className='w-100' disabled >Out of Stock</Button>}
        </Card.Body>
      </Card>

      <Modal show={showPreview} onHide={handleClosePreview}>
        <Modal.Header closeButton>
          <Modal.Title>Product Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img width='50px' src={product.img_url} alt="Product Image 1" />
          <img width='50px' src={product.img_url2} alt="Product Image 2" />
          <img width='50px' src={product.img_url3} alt="Product Image 3" />
          <img width='50px' src={product.img_url4} alt="Product Image 4" />
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
};


