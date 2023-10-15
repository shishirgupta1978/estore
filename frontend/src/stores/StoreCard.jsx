import React,{useState,useContext} from 'react';
import { Card, Button,Modal,ButtonGroup } from 'react-bootstrap';
import Context from '../context';
import { NavLink } from 'react-router-dom';


const StoreCard = ({ store }) => {
  const [showPreview, setShowPreview] = useState(false);
  const {cart,setCart}=useContext(Context)

  const handleClosePreview = () => setShowPreview(false);
  const handleShowPreview = () => setShowPreview(true);


  return (
<>

     
      <Card>
        <Card.Img height="250px" variant="top" src={store.shop_img_url} />
        <Card.Body>
          <Card.Title>{store.short_description}</Card.Title>
          <Card.Text>{store.store_name}</Card.Text>
          <Card.Text><Button as={NavLink} to={`/website/store/${store.website_name}/`} variant="dark" className='w-100' >Go to Website</Button></Card.Text>
        </Card.Body>
      </Card>

    </>
  );
};


export default StoreCard;