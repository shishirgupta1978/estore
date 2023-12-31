import React, { useEffect, useState,useContext } from "react";
import { Link, NavLink, useNavigate,useParams } from "react-router-dom";
import Context from "../context";
import { toast } from "react-toastify";
import {FloatingLabel,Form, Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';

const BannerProfile = () => {
  const {store_id} =useParams()
	const [loadData, setLoadData] = useState({ 'status': null, 'result': null, 'message': null })
  const [data, setData] = useState({ 'status': null, 'result': null, 'message': null })
	const { axiosApi } = useContext(Context);
  const [items, setItems] = useState([]);

	const navigate = useNavigate();
	useEffect(()=>{
		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`store/stores/${store_id}/banners/`, config, setLoadData);
			},[data])


	useEffect(()=>{
		if(loadData.status == 'success')
		{
			setItems(loadData.result);
		}
	},[loadData])




  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = (x) => {
    const config = { method: "post", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
		axiosApi(`store/stores/${store_id}/banners/`, config, setData);

  };

  const handleEditItem = (id, x) => {

    const config = { method: "put", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
		axiosApi(`store/stores/${store_id}/banners/${id}/`, config, setData);

  };

  const handleDeleteItem = (id) => {
    const config = { method: "delete", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`store/stores/${store_id}/banners/${id}/`, config, setData);
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Banner List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Banner Label</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 && items.map((item) => (
                <tr key={item.id}>
                  <td>{item.label}</td>
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
          <Button onClick={() => setShowAddModal(true)}>Add Banner</Button>
        </Col>
      </Row>

      {/* Add Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel label="Image Url" className="mb-3" ><Form.Control type='url' onChange={(e) => setSelectedItem({ ...selectedItem, img_url: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Label" className="mb-3" ><Form.Control type='text' onChange={(e) => setSelectedItem({ ...selectedItem, label: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Text" className="mb-3" ><Form.Control type='text' onChange={(e) => setSelectedItem({ ...selectedItem, text: e.target.value })} required/></FloatingLabel>
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
          <Modal.Title>Edit Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <FloatingLabel label="Image Url" className="mb-3" ><Form.Control type='url' value={selectedItem ? selectedItem.img_url : ''} onChange={(e) => setSelectedItem({ ...selectedItem, img_url: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Label" className="mb-3" ><Form.Control type='text' value={selectedItem ? selectedItem.label : ''} onChange={(e) => setSelectedItem({ ...selectedItem, label: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Text" className="mb-3" ><Form.Control type='text' value={selectedItem ? selectedItem.text : ''} onChange={(e) => setSelectedItem({ ...selectedItem, text: e.target.value })} required/></FloatingLabel>   
				
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
          <p>Are you sure you want to delete?</p>
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

export default BannerProfile;