import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import ItemList from './ItemList';
import AddItem from './AddItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';

export const StoreList = () => {
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [editItemVisible, setEditItemVisible] = useState(false);
  const [deleteItemVisible, setDeleteItemVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = () => {
    setAddItemVisible(false);
  };

  const handleEditItem = () => {
    setEditItemVisible(false);
  };

  const handleDeleteItem = () => {
    setDeleteItemVisible(false);
  };

  const showEditItem = (item) => {
    setSelectedItem(item);
    setEditItemVisible(true);
  };

  const showDeleteItem = (item) => {
    setSelectedItem(item);
    setDeleteItemVisible(true);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <ItemList
            onEditItem={showEditItem}
            onDeleteItem={showDeleteItem}
          />
        </Col>
        <Col md={6}>
          {addItemVisible && (
            <AddItem onAddItem={handleAddItem} />
          )}
          {editItemVisible && selectedItem && (
            <EditItem item={selectedItem} onEditItem={handleEditItem} />
          )}
          {deleteItemVisible && selectedItem && (
            <DeleteItem item={selectedItem} onDeleteItem={handleDeleteItem} />
          )}
        </Col>
      </Row>
      <button onClick={() => setAddItemVisible(!addItemVisible)}>
        {addItemVisible ? 'Cancel' : 'Add Item'}
      </button>
    </Container>
  );
};

