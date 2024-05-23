import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentMethodModal = ({ show, handleClose, handleSave, method }) => {
  const [methodData, setMethodData] = useState({
    id: method?.id || '',
    name: method?.name || '',
    processing_time: method?.processing_time || '',
    fee: method?.fee || '',
    limits: method?.limits || '',
  });

  useEffect(() => {
    if (method) {
      setMethodData({
        id: method.id,
        name: method.name,
        processing_time: method.processing_time,
        fee: method.fee,
        limits: method.limits,
      });
    }
  }, [method]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMethodData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(methodData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{method ? 'Edit Payment Method' : 'Add Payment Method'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={methodData.name}
              onChange={handleChange}
              placeholder="Enter method name"
            />
          </Form.Group>
          <Form.Group controlId="formProcessingTime">
            <Form.Label>Processing Time</Form.Label>
            <Form.Control
              type="text"
              name="processing_time"
              value={methodData.processing_time}
              onChange={handleChange}
              placeholder="Enter processing time"
            />
          </Form.Group>
          <Form.Group controlId="formFee">
            <Form.Label>Fee</Form.Label>
            <Form.Control
              type="text"
              name="fee"
              value={methodData.fee}
              onChange={handleChange}
              placeholder="Enter fee details"
            />
          </Form.Group>
          <Form.Group controlId="formLimits">
            <Form.Label>Limits</Form.Label>
            <Form.Control
              type="text"
              name="limits"
              value={methodData.limits}
              onChange={handleChange}
              placeholder="Enter transaction limits"
            />
          </Form.Group>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentMethodModal;
