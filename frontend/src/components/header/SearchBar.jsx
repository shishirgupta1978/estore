import React, { useState, useEffect, useContext } from 'react'
import { InputGroup, Dropdown, DropdownButton, Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../../context';





export const SearchBar = () => {
  const location = useLocation();
  const [store_slug, setStore_slug] = useState(null)
  const { category, setCategory, search, setSearch, axiosApi } = useContext(Context);
  const [categories, setCategories] = useState({ 'status': null, 'result': null, 'message': null })

  useEffect(() => {
    const regex = /\/store\/([^/]+)/i;
    const match = location.pathname.match(regex);

    if (match) {
      setStore_slug(match[1].toLowerCase());

      const config = { method: "get", headers: { "Content-Type": "application/json" } }
      axiosApi(`store/websites/${match[1].toLowerCase()}/categories/`, config, setCategories);

    } else {
      setStore_slug(null);
    }




  }, [location.pathname]);










  return (
    <InputGroup style={{ maxWidth: '260px' }}>
      {store_slug &&
        <DropdownButton variant="primary" title={category.name} id="input-group-dropdown-1" >
          <Dropdown.Item onClick={(e) => { setCategory({ id: 0, name: "All" }) }}>All</Dropdown.Item>
          {categories.is_success && categories.result.length > 0 && categories.result.map((key) => <Dropdown.Item key={key.id} onClick={(e) => { setCategory(key) }} >{key.name}</Dropdown.Item>)}
        </DropdownButton>
      }
      <Form.Control onChange={(e) => setSearch(e.target.value)} type="search" value={search} placeholder="Search" />
    </InputGroup>
  )
}

