import React, { useState, useEffect, useContext } from 'react'
import { InputGroup, Dropdown, DropdownButton, Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Link, NavLink, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { axiosApi,getAccessToken, refresh, MyContext, removeUser, BASE_URL } from '../../utility';



  





export const SearchBar = () => {
    const location = useLocation();
    const [store_slug,setStore_slug]=useState(null)
    const { context, setContext, search, setSearch,setBanners,setProducts } = useContext(MyContext);




	useEffect(() => {

    const regex = /\/store\/([^/]+)/i; 
    const match =location.pathname.match(regex);
    
    if (match) {
      setStore_slug(match[1].toLowerCase());
      
      const config = { method: "get", headers: { "Content-Type": "application/json" } }
      axiosApi(`store/get-website/${match[1].toLowerCase()}/`, config, setStore, setContext);
    } else{
      setStore_slug(null);
    }
  



}, [location.pathname]);

  return (
    <InputGroup style={{ maxWidth: '260px' }}>{store_slug &&
        <DropdownButton
          variant="outline-secondary"
          title="All"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={(e) => { setCategory({ id: 0, name: "All" }) }}>All</Dropdown.Item>
          {data.product_categories && data.product_categories.length > 0 && data.product_categories.map((key) => <Dropdown.Item key={key.id} onClick={(e) => { setCategory(key) }} >{key.name}</Dropdown.Item>)}

        </DropdownButton>}
        <Form.Control onChange={(e) => setSearch(e.target.value)}
          type="search"
          value={search}
          placeholder="Search" />
      </InputGroup>
  )
}

