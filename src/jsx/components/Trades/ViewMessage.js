import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../../services/api'; // Ensure this path is correct

export default function ViewMessage() {
  const { ticket_number } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, [ticket_number]);

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/ticket-messages/${ticket_number}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div className="view-message-page">
      <h2 className="my-4">Messages for Ticket Number - {ticket_number}</h2>
      <Col lg={12}>
        {messages.map((message, index) => (
          <Row key={index} className="mb-3">
            {message.reply_by === 'user' ? (
              <Col xs={8}>
                <Card className="bg-primary">
                  <Card.Body>
                    <Card.Title>{message.category}</Card.Title>
                    <Card.Text>{message.msg}</Card.Text>
                    <small className="text-muted">
                      {message.reply_by} - {new Date(message.created_at).toLocaleString()}
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              <Col xs={8} className="offset-4">
                <Card className="bg-info text-white">
                  <Card.Body>
                    <Card.Title>{message.category}</Card.Title>
                    <Card.Text>{message.msg}</Card.Text>
                    <small>
                      {message.reply_by} - {new Date(message.created_at).toLocaleString()}
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        ))}
      </Col>
    </div>
  );
}
