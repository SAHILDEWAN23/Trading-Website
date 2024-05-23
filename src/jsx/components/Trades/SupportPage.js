import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import SupportCard from './SupportCard.js';

export default function SupportPage() {
  return (
    <div className="support-page">
      <h2 className="my-4">Support</h2>
      <Row>
        <SupportCard 
          title="Exness Help Center" 
          description="Find the answers you need at the Exness Help Center." 
          link="https://www.exness.com/help-center" 
          linkText="Visit Help Centre" 
        />
        <SupportCard 
          title="Live Chat" 
          description="Can't find the answers you're looking for? Ask our support team in live chat. Provide your account number and support PIN if you're an existing client." 
          link="https://www.exness.com/live-chat" 
          linkText="Start Live Chat" 
        />
        <SupportCard 
          title="Open a Ticket" 
          description="Fill in the request form and we'll get back to you in 24 hours." 
          link="https://www.exness.com/open-ticket" 
          linkText="Open a Ticket" 
        />
        <SupportCard 
          title="Phone" 
          description="Want to speak to our friendly international support team? Call us on 000-800-100-4378, +917901656917" 
        />
      </Row>
      <div className="mt-4">
        <Button variant="warning" className="btn-lg">Back to Personal Area</Button>
      </div>
    </div>
  );
}
