import React, { useEffect, useState, useContext } from "react";
import {FloatingLabel, Container, Row, Col, Form, Button,Table,Spinner } from 'react-bootstrap';

import { Outlet, useParams } from 'react-router-dom';
import Context from '../context';
import { NavLink, useNavigate  } from 'react-router-dom';
import { toast } from "react-toastify";




const Cart = () => {
const {axiosApi,cart,setCart } = useContext(Context);
const [name,setName] = useState('')
const [mobileNo,setMobileNo]=useState('')
const [email,setEmail]=useState('')
const [address,setAddress]=useState('')

const {store_slug} =useParams()

const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
const [invoiceData, setInvoiceData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })

useEffect(() => {
    const config = { method: "post", headers: { "Content-Type": "application/json" },data:cart }
    axiosApi(`store/websites/${store_slug}/get-cart-data/`, config, setLoadData);

}, []);

useEffect(() => {
  if(invoiceData.is_success)
  {
    toast.success("Thank you for shopping, Your order has been successfully placed.")
    setName('')
    setMobileNo('')
    setEmail('')
    setAddress('')
    setCart({})
    localStorage.removeItem('Cart');


  }

}, [invoiceData]);




const handleSubmit = (e)=>
{
  e.preventDefault();
  const config = { method: "post", headers: { "Content-Type": "application/json" }, data:{customer_name:name, mobile_no:mobileNo, address:address, email:email, cart:cart}  }
  axiosApi(`store/websites/${store_slug}/send-order/`, config, setInvoiceData);
 
}


  return (
    <div>
      {loadData.is_loading && <Spinner/>}
      {loadData.is_success && loadData.result.length>0 &&         <Container fluid>
      <Row>
        <Col md={6}>
          <Table striped bordered hover variant="light" style={{width:'100%',marginTop:'10px'}}>
	<thead><tr><th>Pic</th><th>Name</th><th>Price</th><th>Quantity</th><th>Amount</th></tr></thead>
        <tbody>
            { 
    loadData.result.map((item) =><tr key={item.id}><td><img width="50px" height="40px" src={item.img_url}/></td><td>{item.name}</td><td>{(item.price-(item.price*item.discount/100))}</td><td>{cart[item.id]}</td><td>{(item.price-(item.price*item.discount/100)) * cart[item.id]}</td></tr>)
}<tr><td colSpan="4" className="text-end">Total Amount</td><td>{ loadData.result.reduce((accumulator, item) => {
  return accumulator + ((item.price-(item.price*item.discount/100)) * cart[item.id]);
}, 0)}</td></tr>
    </tbody>
    </Table>
        
        </Col>
        <Col md={6} style={{paddingTop:'10px'}}>

        <Form onSubmit={handleSubmit} className="form mt-2">
      <h2>Shipping Address</h2>
      <FloatingLabel  label="Name"  className="mb-3"><Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/></FloatingLabel>
      <FloatingLabel  label="Mobile No" className="mb-3"><Form.Control type="text" placeholder="Mobile No" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required/></FloatingLabel>
      <FloatingLabel  label="Email" className="mb-3"><Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/></FloatingLabel>
      <FloatingLabel  label="Address" className="mb-3"><Form.Control as="textarea" style={{'height':'100px'}} placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required/></FloatingLabel>


      <Row><Col>
      <Button variant="dark" type="submit">Send Order</Button></Col></Row>


    </Form>

          </Col>
      </Row>
    </Container>}
    {loadData.is_success && loadData.result.length==0 &&         <p>No Product Added</p>}
    </div>
  )
}

export default Cart;