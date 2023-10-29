import React, { useState,useContext } from 'react';
import {NavDropdown,Form,Button, Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import Context from '../../context';
import { NoProfileImg } from '../../assets/images';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  BsHouseDoor,
  BsSpeedometer2,
  BsTable,
  BsGrid,
  BsFillPersonFill,
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

function Header() {
  const {cart, user, setUser, setBanners,setProducts,axiosApi,getAccessToken, refresh, removeUser, BASE_URL,Loading } = useContext(Context);
  const logoutHandler = () => {
    removeUser();
    setUser(null);
    navigate('/');
  };


  return (
    <>
      {/* Offcanvas for small screens */}
      {[ 'md'].map((expand) => (
        <Navbar key={expand} expand={expand} sticky="top" bg='dark' variant='dark'>
          <Container fluid>
            <Navbar.Brand href="/"><BsHouseDoor size={24} className="me-2" />Store Creater</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Item>
                <Nav.Link as={NavLink} to="/account/">
                  <BsHouseDoor size={24} className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/account/store-manage/">
                  <BsSpeedometer2 size={24}  className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Manage Store</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/orders">
                  <BsTable size={24}  className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Orders
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/products">
                  <BsGrid size={24}  className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Products
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>


                 
                  {user ? <><img  height={24}
  src={user.profile_pic ? BASE_URL + user.profile_pic : NoProfileImg} style={{marginTop:'7px'}}  className={`d-${expand}-block mx-auto  rounded-circle`}/> <NavDropdown  style={{marginTop:'-2px'}} title="Profile" id="collasible-nav-dropdown" align="end">



<NavDropdown.Item as={Link} to="/account/profile/">Manage Profile</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/account/change-password/">Change Password</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item onClick={logoutHandler}>
  Logout
</NavDropdown.Item>
</NavDropdown>



</> :<><Nav.Link as={NavLink} to='/account/login/'><BsFillPersonFill size={24}  className={`d-${expand}-block mx-auto mb-1`} />
Login</Nav.Link></>}
  
                
              </Nav.Item>
              
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

    </>
  );
}

export default Header;
