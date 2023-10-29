import React, { useEffect, useState,useContext } from "react";
import { Link, NavLink, useNavigate,useParams } from "react-router-dom";
import Context from "../context";
import { toast } from "react-toastify";
import {FloatingLabel,Form, Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';

const CategoryProfile = () => {
  const {store_id} =useParams()
	const [loadData, setLoadData] = useState({ 'status': null, 'result': null, 'message': null })
  const [data, setData] = useState({ 'status': null, 'result': null, 'message': null })
	const { axiosApi,Loading } = useContext(Context);

	const navigate = useNavigate();
	useEffect(()=>{
		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`store/stores/${store_id}/categories/`, config, setLoadData);
			},[data])





  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = (x) => {
    const config = { method: "post", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
		axiosApi(`store/stores/${store_id}/categories/`, config, setData);

  };

  const handleEditItem = (id, x) => {

    const config = { method: "put", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
		axiosApi(`store/stores/${store_id}/categories/${id}/`, config, setData);

  };

  const handleDeleteItem = (id) => {
    const config = { method: "delete", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`store/stores/${store_id}/categories/${id}/`, config, setData);
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Category List</h2>
          <Loading loadData={loadData}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Products</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loadData.result && loadData.result.length > 0 && loadData.result.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td><NavLink to={`/account-view/products/manage/${store_id}/${item.id}/`}>Manage Products</NavLink></td>
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
          </Table></Loading>
        </Col>
        <Col md={6}>
          <Button onClick={() => setShowAddModal(true)}>Add Category</Button>
        </Col>
      </Row>

      {/* Add Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel label="Category Name*" className="mb-3" ><Form.Control type='text' onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} required/></FloatingLabel>
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

        <FloatingLabel label="Category Name*" className="mb-3" ><Form.Control type='text' value={selectedItem ? selectedItem.name : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} required/></FloatingLabel>

				
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

export default CategoryProfile;