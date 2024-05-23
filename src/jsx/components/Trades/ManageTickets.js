import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Badge, Dropdown, Button, Modal, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../../services/api'; // Ensure this path is correct

export default function ManageTickets() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const navigate = useNavigate(); // Instantiate useNavigate

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get('/admin-tickets');
      const ticketsData = response.data.tickets || [];
      setTickets(ticketsData);
      filterUniqueTickets(ticketsData);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to fetch tickets');
    }
  };

  const filterUniqueTickets = (ticketsData) => {
    const uniqueTickets = [];
    const ticketNumbers = new Set();

    ticketsData.forEach((ticket) => {
      if (!ticketNumbers.has(ticket.ticket_number)) {
        ticketNumbers.add(ticket.ticket_number);
        uniqueTickets.push(ticket);
      }
    });

    setFilteredTickets(uniqueTickets);
  };

  const handleAction = (ticket, action) => {
    if (action === 'close') {
      closeTicket(ticket.ticket_number);
    } else if (action === 'reply') {
      if (ticket.status === 'closed') {
        toast.error('This Ticket is already closed so you cannot reply to it.');
      } else {
        setCurrentTicket(ticket);
        setShowReplyModal(true);
      }
    } else if (action === 'view') {
      navigate(`/view-message/${ticket.ticket_number}`);
    }
  };

  const closeTicket = async (ticketNumber) => {
    try {
      const response = await api.post('/update-ticket-status', {
        ticket_number: ticketNumber,
        status: 'closed'
      });
      toast.success(response.data.message);
      fetchTickets(); // Refresh tickets after update
    } catch (error) {
      console.error('Error updating ticket status:', error);
      toast.error('Failed to update ticket status');
    }
  };

  const handleReplySubmit = async () => {
    if (!replyMessage) {
      toast.error('Reply message cannot be empty');
      return;
    }

    try {
      const response = await api.post('/reply-ticket', {
        ticket_number: currentTicket.ticket_number,
        reply_message: replyMessage
      });
      setShowReplyModal(false);
      toast.success(response.data.message);
      fetchTickets(); // Refresh tickets after reply
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Failed to submit reply');
    }
  };

  return (
    <div className="manage-tickets-page">
      <h2 className="my-4">Manage Tickets</h2>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>All Tickets</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ticket Number</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Screenshot</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket, index) => (
                    <tr key={ticket.id}>
                      <td>{index + 1}</td>
                      <td>{ticket.ticket_number}</td>
                      <td>{ticket.category}</td>
                      <td>
                        <Badge bg={ticket.status === 'open' ? 'danger' : 'success'}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td>
                        {ticket.screen_shot && (
                          <a
                            href={`http://localhost:3000/uploads/${encodeURIComponent(ticket.screen_shot.split('\\').pop())}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`http://localhost:3000/uploads/${encodeURIComponent(ticket.screen_shot.split('\\').pop())}`}
                              alt="Screenshot"
                              style={{ width: '100px' }}
                            />
                          </a>
                        )}
                      </td>
                      <td>{new Date(ticket.created_at).toLocaleString()}</td>
                      <td>{new Date(ticket.updated_at).toLocaleString()}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Actions
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleAction(ticket, 'close')}>Close Ticket</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(ticket, 'reply')}>Reply</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction(ticket, 'view')}>View Message</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No tickets found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <ToastContainer />
          </Card.Body>
        </Card>
      </Col>

      {currentTicket && (
        <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Reply to Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="ticketNumber">
                <Form.Label>Ticket Number</Form.Label>
                <Form.Control type="text" value={currentTicket.ticket_number} readOnly />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" value={currentTicket.category} readOnly />
              </Form.Group>
              <Form.Group controlId="replyMessage">
                <Form.Label>Reply</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleReplySubmit} className='mt-2'>
                Submit Reply
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
