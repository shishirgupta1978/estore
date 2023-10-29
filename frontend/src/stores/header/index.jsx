import React, { useState, useEffect, useContext } from 'react'
import {Offcanvas, InputGroup, Dropdown, DropdownButton, Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { BiSearch } from 'react-icons/bi';
import { Link, NavLink, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Context from '../../context';
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi"
import { MdArrowDropDown } from "react-icons/md"
import { NoProfileImg, LogoImg } from '../../assets/images';
import { Badge } from 'react-bootstrap';
import { BsHouseDoor, BsSpeedometer2, BsTable, BsGrid, BsPerson } from 'react-icons/bs';


const Header = () => {
  const location = useLocation();
  
  const [store, setStore] = useState({ 'status': null, 'result': null, 'message': null })
  const data = ""
  const {cart, user, setUser, setBanners,setProducts,axiosApi,getAccessToken, refresh, removeUser, BASE_URL,Loading } = useContext(Context);
  
  const [timeLeft, setTimeLeft] = useState(null);
  const [timer, setTimer] = useState(null);
  
  const [jwtToken, setJwtToken] = useState(null);
  const {store_slug}=useParams()



	useEffect(() => {
    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`store/get-website/${store_slug}/`, config, setStore);


}, [location.pathname]);


  useEffect(() => {
    if(store.status == 'success')
    {

      const allProducts = [];
{ store.result.product_categories &&     store.result.product_categories.forEach((category1) => {
        
        allProducts.push(...category1.products);
      })};
  



    }

  }, [store]);






  useEffect(() => {
    const storedJwtToken = getAccessToken()
    if (storedJwtToken) {
      setJwtToken(storedJwtToken);
      const decodedToken = jwt_decode(storedJwtToken);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const timeLeftInMillis = expirationTime - currentTime;
      setTimeLeft(timeLeftInMillis);
      const intervalTimer = setInterval(() => {
        const newTimeLeft = expirationTime - Date.now();
        setTimeLeft(newTimeLeft);

        if (newTimeLeft <= 0) {
          clearInterval(intervalTimer);
          setJwtToken(null);
          removeUser();
          setUser(null)
        }
      }, 1000);

      setTimer(intervalTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [jwtToken, user]);

  const formatTime = (timeInMillis) => {
    const minutes = String(Math.floor(timeInMillis / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((timeInMillis % 60000) / 1000)).padStart(2, '0');

    return `${minutes}:${seconds}`;


  };





  const session = <>{timeLeft !== null ? (
    <> {formatTime(timeLeft)}</>
  ) : (
    ""
  )}    </>

  const navigate = useNavigate();


  const logoutHandler = () => {
    removeUser();
    setUser(null);
    navigate(`/store/${store_slug}/`);
  };


  return (

  <>
      
     
    {[ 'md'].map((expand) => (
        <Navbar key={expand} expand={expand} sticky="top" bg='dark' variant='dark'>
          <Container fluid>
          <Navbar.Brand as={Link} to={`/store/${store_slug}/`}>{store?.result?.logo_img_url && <img height={38} className='me-3' src={store?.result?.logo_img_url}/>}{store?.result?.store_name.replace(" ",'\u00A0')}</Navbar.Brand>
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
              <SearchBar />
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Item>
                <Nav.Link as={NavLink} to="/account/">
                  <BsHouseDoor size={24} className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Store&nbsp;Creater
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/products">
                  <BsGrid size={24}  className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Products
                </Nav.Link>
              </Nav.Item>

     
              <Nav.Item>
                <Nav.Link as={NavLink} to={ `/store/${store_slug}/cart/` }>
                  <BsSpeedometer2 size={24}  className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Cart<sup style={{ color: 'yellow' }}>{Object.keys(cart).length}</sup></Nav.Link>
              </Nav.Item>
     
              <Nav.Item>
                <Nav.Link as={NavLink} to="/orders">
                  <BsTable size={24}  className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Orders
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to={`/store/${store_slug}/about-us/`}>
                  <BsSpeedometer2 size={24}  className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;About&nbsp;Us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to={`/store/${store_slug}/contact-us/`}>
                  <BsSpeedometer2 size={24}  className={`d-${expand}-block mx-auto mb-1`} />
                  &nbsp;Contact&nbsp;Us</Nav.Link>
              </Nav.Item>
              <Nav.Item>


                 
                  {user ? <><img  height={24}
  src={user.profile_pic ? BASE_URL + user.profile_pic : NoProfileImg} style={{marginTop:'7px'}}  className={`d-${expand}-block mx-auto  rounded-circle`}/> <NavDropdown  style={{marginTop:'-2px'}} title="Profile" id="collasible-nav-dropdown" align="end">



<NavDropdown.Item as={Link} to={`/store/${store_slug}/profile/`}>Manage Profile</NavDropdown.Item>
<NavDropdown.Item as={Link} to={`/store/${store_slug}/change-password/`}>Change Password</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item onClick={logoutHandler}>
  Logout
</NavDropdown.Item>
</NavDropdown>



</> :<><Nav.Link as={NavLink} to={`/store/${store_slug}/login/`}><BsFillPersonFill size={24}  className={`d-${expand}-block mx-auto mb-1`} />
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
};


export default Header;