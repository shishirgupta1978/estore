import React, { useEffect, useState,useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL,MyContext,axiosApi } from "../utility";

import { toast } from "react-toastify";
import {Spinner} from ".";
import { Input } from ".";
import { Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';

export const StoreProfile = () => {

	const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const { context,setContext } = useContext(MyContext);
  const [items, setItems] = useState([]);

	const navigate = useNavigate();
	useEffect(()=>{
		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`api/stores/`, config, setLoadData, setContext);
			},[data])


	useEffect(()=>{
		if(loadData.is_success)
		{
			setItems(loadData.result);
		}
	},[loadData])




  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = (x) => {
    const config = { method: "post", headers: { "Content-Type": "application/json", "Authorization": true },data:{...x,"user":context?.user?.user_id} }
		axiosApi(`api/stores/`, config, setData, setContext);

  };

  const handleEditItem = (id, x) => {

    const config = { method: "put", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
		axiosApi(`api/stores/${id}/`, config, setData, setContext);

  };

  const handleDeleteItem = (id) => {
    const config = { method: "delete", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`api/stores/${id}/`, config, setData, setContext);
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Store List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Url Name</th>
                <th>Store Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><NavLink to={`/create-website/${item.id}/`}>{item.website_url}</NavLink></td>
                  <td>{item.store_name}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    {' '}
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <Button onClick={() => setShowAddModal(true)}>Add Item</Button>
        </Col>
      </Row>

      {/* Add Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
        <Input label='Website Url' type='text' onChange={(e) => setSelectedItem({ ...selectedItem, website_url: e.target.value })}/>
<Input label='Store Name' type='text'  onChange={(e) => setSelectedItem({ ...selectedItem, store_name: e.target.value })}/>
<Input label='Shop Image Url' type='text' onChange={(e) => setSelectedItem({ ...selectedItem, store_img_url: e.target.value })}/>
<Input  label='Short Description' type='text' onChange={(e) => setSelectedItem({ ...selectedItem, short_description: e.target.value })}/>
  <Input  label='Logo Image Url' type='text' name='logo_img_url'  onChange={(e) => setSelectedItem({ ...selectedItem, logo_img_url: e.target.value })}/>

				<div className="material-input">
				<label>Contact Information</label>
		      <div className="input-container"><textarea name='contact' rows="3"  onChange={(e) => setSelectedItem({ ...selectedItem, contact: e.target.value })} /></div></div>
			  <div className="material-input">
				<label>Description</label>
		      <div className="input-container"><textarea rows="3"  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}/></div></div>
				
  




        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleAddItem(selectedItem);
              setShowAddModal(false);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>


<Input label='Website Url' type='text' value={selectedItem ? selectedItem.website_url : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, website_url: e.target.value })}/>
<Input label='Store Name' type='text' value={selectedItem ? selectedItem.store_name : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, store_name: e.target.value })}/>
<Input label='Shop Image Url' type='text' value={selectedItem ? selectedItem.shop_img_url : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, store_img_url: e.target.value })}/>
<Input  label='Short Description' type='text' value={selectedItem ? selectedItem.short_description : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, short_description: e.target.value })}/>
  <Input  label='Logo Image Url' type='text' name='logo_img_url' value={selectedItem ? selectedItem.logo_img_url : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, logo_img_url: e.target.value })}/>

				<div className="material-input">
				<label>Contact Information</label>
		      <div className="input-container"><textarea name='contact' rows="3"  value={selectedItem ? selectedItem.contact : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, contact: e.target.value })} /></div></div>
			  <div className="material-input">
				<label>Description</label>
		      <div className="input-container"><textarea rows="3"  value={selectedItem ? selectedItem.description : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}/></div></div>
				
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleEditItem(selectedItem.id, selectedItem);
              setShowEditModal(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Item Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete "{selectedItem ? selectedItem.name : ''}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteItem(selectedItem.id);
              setShowDeleteModal(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

