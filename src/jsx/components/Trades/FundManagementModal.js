import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

function FundManagementModal({ show, onHide, account, onUpdate, isAdding }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);

    // Ensure the amount is positive
    if (numAmount <= 0) {
      toast.error("Please enter a positive amount");
      return;
    }
    // Check if the operation is subtraction and if the amount exceeds the balance
    if (!isAdding && numAmount > account.balance) {
      toast.error("Amount exceeds current balance");
      return;
    }
    // If adding, the amount is positive; if subtracting, it is negative
    const adjustedAmount = isAdding ? numAmount : -numAmount;
    onUpdate(account.account_number, adjustedAmount);
    onHide(); // Close modal after updating
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isAdding ? "Add Funds" : "Subtract Funds"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Account Number</Form.Label>
            <Form.Control type="text" value={account.account_number} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Current Balance</Form.Label>
            <Form.Control type="text" value={`$${account.balance.toFixed(2)}`} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Update Balance
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FundManagementModal;
