import React, { useEffect,useState,useContext } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context";
import { Form,FloatingLabel,Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';


const ProductProfile = () => {

    const {store_id,category_id} = useParams();
    const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
     const { context,setContext,axiosApi } = useContext(Context);
    const [items, setItems] = useState(null);
    const [checked1,setChecked1]=useState(true);
  
      const navigate = useNavigate();
      useEffect(()=>{
          const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
          axiosApi(`store/stores/${store_id}/categories/${category_id}/products/`, config, setLoadData, setContext);
              },[data])
  
      useEffect(()=>{
          if(loadData.is_success)
          {
            console.log(loadData.result);
              setItems(loadData.result);
          }
      },[loadData])
  

      const [showAddModal, setShowAddModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState(false);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [selectedItem, setSelectedItem] = useState(null);
    
      const handleAddItem = (x) => {
        const config = { method: "post", headers: { "Content-Type": "application/json", "Authorization": true },data:{...x,"user":context?.user?.user_id} }
            axiosApi(`store/stores/${store_id}/categories/${category_id}/products/`, config, setData, setContext);
    
      };
    
      const handleEditItem = (id, x) => {
    
        const config = { method: "put", headers: { "Content-Type": "application/json", "Authorization": true },data:x }
            axiosApi(`store/stores/${store_id}/categories/${category_id}/products/${id}/`, config, setData, setContext);
    
      };
    
      const handleDeleteItem = (id) => {
        const config = { method: "delete", headers: { "Content-Type": "application/json", "Authorization": true } }
            axiosApi(`store/stores/${store_id}/categories/${category_id}/products/${id}/`, config, setData, setContext);
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
              <Button onClick={() => setShowAddModal(true)}>Add Product</Button>
            </Col>
          </Row>
    
          {/* Add Item Modal */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)} scrollable={true}>
            <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <FloatingLabel label="Product Name" className="mb-3" ><Form.Control type='text' name='name' onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} required/></FloatingLabel>
            <FloatingLabel label="Description" className="mb-3" ><Form.Control as="textarea" style={{'height':'100px'}} name='description' onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}/></FloatingLabel>
            <FloatingLabel label="Img Url" className="mb-3" ><Form.Control type='text' name='img_url'   onChange={(e) => setSelectedItem({ ...selectedItem, img_url: e.target.value })} required/></FloatingLabel>
            <FloatingLabel label="Img Url2" className="mb-3" ><Form.Control type='text' name='img_url2'   onChange={(e) => setSelectedItem({ ...selectedItem, img_url2: e.target.value })} /></FloatingLabel>
            <FloatingLabel label="Img Url3" className="mb-3" ><Form.Control type='text' name='img_url3'   onChange={(e) => setSelectedItem({ ...selectedItem, img_url3: e.target.value })} /></FloatingLabel>
            <FloatingLabel label="Img Url4" className="mb-3" ><Form.Control type='text' name='img_url4'   onChange={(e) => setSelectedItem({ ...selectedItem, img_url4: e.target.value })} /></FloatingLabel>             
            <FloatingLabel label="Price(Rs.)" className="mb-3" ><Form.Control type='number' name='price' onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })} /></FloatingLabel> 
            <FloatingLabel label="Discount(%)" className="mb-3" ><Form.Control  type='number' name='discount' onChange={(e) => setSelectedItem({ ...selectedItem, discount: e.target.value })} /></FloatingLabel> 
            <Form.Group className="mb-3" > <Form.Check type="checkbox" label="Is Available" onChange={(e) =>{setChecked1(!checked1); setSelectedItem({ ...selectedItem, is_available: e.target.checked })}} checked={checked1} /> </Form.Group>

    
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
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <FloatingLabel label="Product Name" className="mb-3" ><Form.Control type='text' name='name' value={selectedItem ? selectedItem.name : ''} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} required/></FloatingLabel>
            <FloatingLabel label="Description" className="mb-3" ><Form.Control as="textarea" style={{'height':'100px'}} value={selectedItem ? selectedItem.description : ''} name='description'  rows="3"  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}/></FloatingLabel>
            <FloatingLabel label="Img Url" className="mb-3" ><Form.Control type='text' name='img_url'  value={selectedItem ? selectedItem.img_url : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, img_url: e.target.value })} required/></FloatingLabel>
            <FloatingLabel label="Img Url2" className="mb-3" ><Form.Control type='text' name='img_url2'  value={selectedItem ? selectedItem.img_url2 : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, img_url2: e.target.value })} /></FloatingLabel>
            <FloatingLabel label="Img Url3" className="mb-3" ><Form.Control type='text' name='img_url3'  value={selectedItem ? selectedItem.img_url3 : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, img_url3: e.target.value })} /></FloatingLabel>
            <FloatingLabel label="Img Url4" className="mb-3" ><Form.Control type='text' name='img_url4'  value={selectedItem ? selectedItem.img_url4 : ''}  onChange={(e) => setSelectedItem({ ...selectedItem, img_url4: e.target.value })} /></FloatingLabel>             
            <FloatingLabel label="Price(Rs.)" className="mb-3" ><Form.Control type='number' name='price'  value={selectedItem ? selectedItem.price : ''} onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })} /></FloatingLabel> 
            <FloatingLabel label="Discount(%)" className="mb-3" ><Form.Control  type='number' name='discount'  value={selectedItem ? selectedItem.discount : ''} onChange={(e) => setSelectedItem({ ...selectedItem, discount: e.target.value })} /></FloatingLabel> 
            <Form.Group className="mb-3" > <Form.Check type="checkbox" label="Is Available" onChange={(e) => setSelectedItem({ ...selectedItem, is_available: e.target.checked })} checked={selectedItem ? selectedItem.is_available : checked1} /> </Form.Group>

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

}


export default ProductProfile;