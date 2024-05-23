import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import api from '../../../services/api';

export default function SecuritySettings() {
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  console.log("hi");
  const token = userDetails.refreshToken;
  console.log({Token:token});


  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSaveChanges = () => {
    // Check if newPassword and confirmPassword are not empty
    if (!newPassword || !confirmPassword) {
      setError('Both new password and confirm password are required.');
      return;
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match.');
      return;
    }

    // Call the changePassword function in the controller with the newPassword
    // and handle the response accordingly
     api.post('changePassword', { token, newPassword })
      .then((response) => {
        console.log(response.data);
        // Handle success
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });

    // For demonstration purposes, log the success message
    console.log('Password updated successfully.');
    
    // Close the modal
    setShowModal(false);
  };

  return (
    <div className="mt-4">
      <h2>Authorization</h2>
      <p>Information for logging in to Exness.</p>
      <p>Change your password whenever you think it might have been compromised.</p>

      <div className="border border-primary">
        <Row className="p-4">
          <Col>
            <span>Login</span>
          </Col>
          <Col>
            <span className="text-primary fs-18">Sahil</span>
          </Col>
          <Col></Col>
        </Row>
      </div>

      <div className="border border-primary bm-0">
        <Row className="p-3">
          <Col>
            <span>Password</span>
          </Col>
          <Col>
            <span className="text-primary fs-18">******</span>
          </Col>
          <Col>
            <Button className="me-2" variant="outline-danger" onClick={handleShow}>
              Change
            </Button>
          </Col>
        </Row>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={handleChangeNewPassword} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={handleChangeConfirmPassword} />
            </Form.Group>
          </Form>
          {error && <div className="text-danger">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
