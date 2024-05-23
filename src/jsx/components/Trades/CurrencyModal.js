import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function CurrencyModal({ show, handleClose, handleSave, currency }) {
  const [currencyName, setCurrencyName] = useState('');
  const [status, setStatus] = useState(1);
  const [pipValue, setPipValue] = useState(0);
  const [market, setMarket] = useState(0);  // Add state for market

  useEffect(() => {
    if (currency) {
      setCurrencyName(currency.currency_name);
      setStatus(currency.status);
      setPipValue(currency.pip_value);
      setMarket(currency.market);  // Set market state
    } else {
      setCurrencyName('');
      setStatus(1);
      setPipValue(0);
      setMarket(0);  // Reset market state
    }
  }, [currency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currencyData = {
      id: currency ? currency.id : null,
      currency_name: currencyName,
      status,
      pip_value: pipValue,
      market,  // Include market in the data
    };
    handleSave(currencyData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currency ? 'Edit Currency' : 'Add New Currency'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCurrencyName">
            <Form.Label>Currency Name</Form.Label>
            <Form.Control
              type="text"
              value={currencyName}
              onChange={(e) => setCurrencyName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              required
            >
              <option value={1}>Active</option>
              <option value={0}>Disabled</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPipValue">
            <Form.Label>Pip Value</Form.Label>
            <Form.Control
              type="number"
              step="0.0001"
              value={pipValue}
              onChange={(e) => setPipValue(Number(e.target.value))}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMarket">
            <Form.Label>Market</Form.Label>
            <Form.Control
              as="select"
              value={market}
              onChange={(e) => setMarket(Number(e.target.value))}
              required
            >
              <option value={0}>Forex</option>
              <option value={1}>Crypto</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
