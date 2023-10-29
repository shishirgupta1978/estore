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


const Header = () => {
  const location = useLocation();
  
  const [store, setStore] = useState({ 'status': null, 'result': null, 'message': null })
  const data = ""
  const {cart, user, setUser, setBanners,setProducts,axiosApi,getAccessToken, refresh, removeUser, BASE_URL,Loading } = useContext(Context);
  
  const [timeLeft, setTimeLeft] = useState(null);
  const [timer, setTimer] = useState(null);
  
  const [jwtToken, setJwtToken] = useState(null);
  const [store_slug,setStore_slug]=useState(null)



	useEffect(() => {

    const regex = /\/store\/([^/]+)/i; 
    const match =location.pathname.match(regex);
    
    if (match) {
      setStore_slug(match[1].toLowerCase());
      
      const config = { method: "get", headers: { "Content-Type": "application/json" } }
      axiosApi(`store/get-website/${match[1].toLowerCase()}/`, config, setStore);
    } else{
      setStore_slug(null);
    }
  



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
    navigate(store_slug ? `/website/store/${store_slug}/`: '/');
  };


  return (

  <>
      <>
      
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} sticky="top" bg='dark' variant='dark'>
          <Container fluid>
          <Navbar.Brand as={Link} to={store_slug ? `/website/store/${store_slug}/` :"/"}>{store_slug ? store?.result?.store_name.replace(" ",'\u00A0')  :"SG"}</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  SG
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <SearchBar/>
                <Nav className="justify-content-end flex-grow-1 pe-3"   bg='dark' variant='dark'>
                
          {store_slug ? <Nav.Link as={Link} to="/">Store&nbsp;Creater</Nav.Link>:<Nav.Link as={Link} to="/website/create/">Create&nbsp;Store</Nav.Link>}
           {store_slug && <><Nav.Link as={Link} to={store_slug ? `./website/store/${store_slug}/about-us/`: "/about-us/"}>About&nbsp;Us</Nav.Link>
            <Nav.Link as={Link} to={store_slug ? `/website/store/${store_slug}/contact-us/`: "/contact-us/" }>Contact&nbsp;Us</Nav.Link></>}
            {store_slug && <Nav.Link as={Link} to={ `/website/store/${store_slug}/cart/` }>Cart<sup style={{ color: 'yellow' }}>{Object.keys(cart).length}</sup></Nav.Link>}

            {user ? <> <NavDropdown title="Profile" id="collasible-nav-dropdown" align="end">

              {false && <img
                src={user.profile_pic ? BASE_URL + user.profile_pic : NoProfileImg}
                alt='profile image' style={{ height: '24px' }}
                className='rounded-circle'
              />}
              <NavDropdown.Item as={Link} to={store_slug ? `/website/store/${store_slug}/profile/` :"/profile/"}>Manage Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={store_slug ? `/website/store/${store_slug}/change-password/` :"/change-password/"}>Change Password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>



            </> :
              <Nav.Link as={Link} to={store_slug ? `/website/store/${store_slug}/login/` :'/login/'}>Login</Nav.Link>}
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
    
  </>
  );
};


export default Header;