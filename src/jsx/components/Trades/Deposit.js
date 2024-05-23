import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import PaymentCard from '../utilities/PaymentCard';
import api from '../../../services/api'; // Make sure this points to your configured API client

export default function Deposit() {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get('/payment-methods'); // Adjust the endpoint as needed
        setPaymentMethods(response.data); // Assuming the response contains an array of payment methods
        console.log(paymentMethods);
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };
    
    fetchPaymentMethods();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Deposit</h2>
      <div className="row">
        {paymentMethods.length > 0 ? paymentMethods.map((method, index) => (
          <Col key={index} lg={6} className="mb-2">
            <PaymentCard {...method} link={`/deposit-form?value=${method.name}`} />
          </Col>
        )) : (
          <div>No payment methods available.</div>
        )}
      </div>
    </div>
  );
}
