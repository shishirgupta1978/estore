import React, { useEffect, useState,useContext } from "react";
import { NavLink} from "react-router-dom";
import Context from "../context";
import { Form, FloatingLabel, Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';

const StoreProfile = () => {

	const [loadData, setLoadData] = useState({ 'status': null, 'result': null, 'message': null })
  const [data, setData] = useState({ 'status': null, 'result': null, 'message': null })
	const { axiosApi,Loading } = useContext(Context);

	useEffect(()=>{
		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi("store/stores/", config, setLoadData);
			},[data])






  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = (x) => {
    const config = { method: "post", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
		axiosApi("store/stores/", config, setData);
  
  };

  const handleEditItem = (id, x) => {
    console.log("Edit");
    const config = { method: "put", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
		axiosApi(`store/stores/${id}/`, config, setData);
    

  };

  const handleDeleteItem = (id) => {
    const config = { method: "delete", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`store/stores/${id}/`, config, setData);
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Store List</h2>
          
            <Loading loadData={loadData}>

            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Url Name</th>
                <th>Store Name</th>
                <th>Categories</th><th>Banners</th>
                <th>Actions</th>
               
              </tr>
            </thead>
            <tbody>
              {loadData.result?.map((item) => (
                <tr key={item.id}>
                  <td>{item?.website_name}</td>
                  <td>{item.store_name}</td>
                  <td>
                  <NavLink to={`/account-view/categories/manage/${item.id}/`}>Manage Categories</NavLink></td><td> <NavLink to={`/account-view/banners/manage/${item.id}/`}>Manage Banners</NavLink></td><td>
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
          <Button onClick={() => {setShowAddModal(true);}}>Add Store</Button>
        </Col>
      </Row>

      {/* Add Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} scrollable={true}>
      <Modal.Header closeButton>
          <Modal.Title>Add Store</Modal.Title>
        </Modal.Header>
        
        
        <Modal.Body>
        <Form>
        <FloatingLabel label="Store Name*" className="mb-3" ><Form.Control type='text'  onChange={(e) => setSelectedItem({ ...selectedItem, store_name: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Store Image Url*" className="mb-3" ><Form.Control type='text' onChange={(e) => setSelectedItem({ ...selectedItem, shop_img_url: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Short Description*" className="mb-3" ><Form.Control type='text' onChange={(e) => setSelectedItem({ ...selectedItem, short_description: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Logo Image Url" className="mb-3" ><Form.Control type='url' name='logo_img_url'  onChange={(e) => setSelectedItem({ ...selectedItem, logo_img_url: e.target.value })}/></FloatingLabel>
        <FloatingLabel label="Google Map Url" className="mb-3" ><Form.Control type='url' name='google_map_url'  onChange={(e) => setSelectedItem({ ...selectedItem, google_map_url: e.target.value })}/></FloatingLabel>
        <FloatingLabel label="Contact Information" className="mb-3" ><Form.Control as="textarea" style={{ height: '100px' }} name='contact' rows="3"  onChange={(e) => setSelectedItem({ ...selectedItem, contact: e.target.value })}/></FloatingLabel>
        <FloatingLabel label="Description" className="mb-3" ><Form.Control as="textarea" style={{ height: '100px' }} onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}/></FloatingLabel>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button type="submit" variant="primary" onClick={() => {handleAddItem(selectedItem); setShowAddModal(false);}} >  Add </Button>
        </Modal.Footer>
        
      </Modal>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >

        <FloatingLabel label="Store Name*" className="mb-3" ><Form.Control type='text' value={selectedItem ? selectedItem.store_name : ''} onChange={(e) => setSelectedItem({ ...selectedItem, store_name: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Store Image Url*" className="mb-3" ><Form.Control type='text' value={selectedItem ? selectedItem.shop_img_url : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, shop_img_url: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Short Description*" className="mb-3" ><Form.Control type='text' value={selectedItem ? selectedItem.short_description : ''} onChange={(e) => setSelectedItem({ ...selectedItem, short_description: e.target.value })} required/></FloatingLabel>
        <FloatingLabel label="Logo Image Url" className="mb-3" ><Form.Control type='url' value={selectedItem ? selectedItem.logo_img_url : ''} name='logo_img_url'  onChange={(e) => setSelectedItem({ ...selectedItem, logo_img_url: e.target.value })} /></FloatingLabel>
        <FloatingLabel label="Google Map Url" className="mb-3" ><Form.Control type='url' name='google_map_url'  value={selectedItem ? selectedItem.google_map_url : ''} onChange={(e) => setSelectedItem({ ...selectedItem, google_map_url: e.target.value })}/></FloatingLabel>       
        <FloatingLabel label="Contact Information" className="mb-3" ><Form.Control as="textarea" style={{ height: '100px' }} value={selectedItem ? selectedItem.contact : ''} name='contact' rows="3"  onChange={(e) => setSelectedItem({ ...selectedItem, contact: e.target.value })}/></FloatingLabel>
x        <FloatingLabel label="Description" className="mb-3" ><Form.Control as="textarea" style={{ height: '100px' }}  value={selectedItem ? selectedItem.description : ''} onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}/></FloatingLabel>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={() => setShowEditModal(false)}> Cancel</Button>
          <Button type="submit"   variant="primary" onClick={() => {handleEditItem(selectedItem.id, selectedItem);         setShowEditModal(false);}} >Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Item Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {selectedItem ? selectedItem.website_name : ''}?</p>
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

export default StoreProfile;
