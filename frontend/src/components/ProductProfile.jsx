import React, { useEffect,useState,useContext } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {axiosApi,MyContext} from "../utility";
import {Spinner,Input} from ".";
import { Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';


export const ProductProfile = () => {

    const {store_id,category_id} = useParams();
    const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
     const { context,setContext } = useContext(MyContext);
    const [items, setItems] = useState(null);
  
      const navigate = useNavigate();
      useEffect(()=>{
          const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
          axiosApi(`api/stores/${store_id}/categories/${category_id}/products/`, config, setLoadData, setContext);
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
            axiosApi(`api/stores/${store_id}/categories/${category_id}/products/`, config, setData, setContext);
    
      };
    
      const handleEditItem = (id, x) => {
    
        const config = { method: "patch", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
            axiosApi(`api/stores/${store_id}/categories/${category_id}/products/${id}/`, config, setData, setContext);
    
      };
    
      const handleDeleteItem = (id) => {
        const config = { method: "delete", headers: { "Content-Type": "application/json", "Authorization": true } }
            axiosApi(`api/stores/${store_id}/categories/${category_id}/products/${id}/`, config, setData, setContext);
      };
    
      return (
        <Container>
          <Row>
            <Col md={12}>
              <h2>Product List</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Is Available</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items && items.length > 0 && items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td><td>{item.price}</td><td>{item.discount}</td><td>{item.is_available ?"Yes":"No"}</td>
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


            <Input  label='Product Name' type='text' name='name' onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} required/>
				<div className="material-input">
				<label>Description</label>
				
		      <div className="input-container"><textarea name='description'  rows="3"  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}/></div></div>


				<Input  label='Img Url' type='text' name='img_url'   onChange={(e) => setSelectedItem({ ...selectedItem, img_url: e.target.value })} required/>
				<Input  label='Img Url2' type='text' name='img_url2' onChange={(e) => setSelectedItem({ ...selectedItem, img_url2: e.target.value })}/>
				<Input  label='Img Url3' type='text' name='img_url3' onChange={(e) => setSelectedItem({ ...selectedItem, img_url3: e.target.value })}/>
				<Input  label='Img Url4' type='text' name='img_url4' onChange={(e) => setSelectedItem({ ...selectedItem, img_url4: e.target.value })}/>
				<Input  label='Price(Rs.)' type='number' name='price' onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}/>
				<Input  label='Discount(%)' type='number' name='discount' onChange={(e) => setSelectedItem({ ...selectedItem, discount: e.target.value })}/>
				<p style={{textAlign:"left", marginLeft:'10px'}}><input  type='checkbox' onChange={(e) => setSelectedItem({ ...selectedItem, is_available: e.target.checked })} checked /> Is Available</p>





                    
      
    
    
    
    
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
    
    

    <Input  label='Product Name' type='text' name='name' value={selectedItem ? selectedItem.name : ''} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} required/>
				<div className="material-input">
				<label>Description</label>
				
		      <div className="input-container"><textarea name='description'  rows="3" value={selectedItem ? selectedItem.description : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}/></div></div>


				<Input  label='Img Url' type='text' name='img_url' value={selectedItem ? selectedItem.img_url : ''}   onChange={(e) => setSelectedItem({ ...selectedItem, img_url: e.target.value })} required/>
				<Input  label='Img Url2' type='text' name='img_url2' value={selectedItem ? selectedItem.img_url2 : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, img_url2: e.target.value })}/>
				<Input  label='Img Url3' type='text' name='img_url3' value={selectedItem ? selectedItem.img_url3 : ''} onChange={(e) => setSelectedItem({ ...selectedItem, img_url3: e.target.value })}/>
				<Input  label='Img Url4' type='text' name='img_url4' value={selectedItem ? selectedItem.img_url4 : ''} onChange={(e) => setSelectedItem({ ...selectedItem, img_url4: e.target.value })}/>
				<Input  label='Price(Rs.)' type='number' name='price' value={selectedItem ? selectedItem.price : ''} onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}/>
				<Input  label='Discount(%)' type='number' name='discount' value={selectedItem ? selectedItem.discount: ''} onChange={(e) => setSelectedItem({ ...selectedItem, discount: e.target.value })}/>
				<p style={{textAlign:"left", marginLeft:'10px'}}><input  type='checkbox' onChange={(e) => setSelectedItem({ ...selectedItem, is_available: e.target.checked })} checked={selectedItem ? selectedItem.is_available  : true} /> Is Available</p>






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

}


