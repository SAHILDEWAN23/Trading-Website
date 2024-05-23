import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const PaymentCard = ({ logo, name, processing_time, fee, limits, link }) => {
  return (
    <Col xl='12'>
      <Link to={link} style={{ textDecoration: 'none' }}> {/* Use Link component to make the card clickable */}
        <Card>
          <Card.Header>
            <div className="d-flex align-items-center">
              <img src={logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
              <h5 className="ms-2 mb-0">{name}</h5>
            </div>
          </Card.Header>
          <Card.Body>
            <p className="line-height-1">Processing time: <strong>{processing_time}</strong></p>
            <p className="line-height-1">Fee: <strong>{fee}</strong></p>
            <p className="line-height-1">Limits: <strong>{limits}</strong></p>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default PaymentCard;
