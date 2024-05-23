import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SupportCard = ({ title, description, link, linkText }) => {
  return (
    <Col xl={3} lg={6} md={6} sm={12} className="mb-4">
      <Card className="support-card h-100">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          {link && <Link to={link} className="btn btn-primary">{linkText}</Link>}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SupportCard;
