import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Badge, Dropdown, FormControl } from "react-bootstrap";
import api from '../../../services/api';  // Ensure this path is correct for your setup

export default function PendingDepositHistory() {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDeposits(currentPage);
  }, [currentPage]);

  useEffect(() => {
    filterDeposits();
  }, [searchTerm, deposits]);

  const fetchDeposits = async (page) => {
    try {
      const response = await api.get('pending-deposits', {
        params: { page, limit: 10 }
      });
      const data = response.data;
      if (data) {
        setDeposits(data.deposits || []);
        setFilteredDeposits(data.deposits || []); // Initially, all deposits are displayed
        setCurrentPage(Number(data.currentPage));
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching pending deposits:', error);
      setDeposits([]);
    }
  };

  const filterDeposits = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = deposits.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredDeposits(filteredData);
  };

  const updateDepositStatus = async (id, status) => {
    try {
      const response = await api.post('update-deposit-status', { id, status });
      if (response.status === 200) {
        fetchDeposits(currentPage);  // Refresh the list after update
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
      console.error('Error updating deposit status:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Pending Deposits</Card.Title>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '200px' }}
            />
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Account Number</th>
                  <th>Payment Mode</th>
                  <th>Amount</th>
                  <th>UTR/Transaction ID</th>
                  <th>Slip</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeposits.length > 0 ? filteredDeposits.map((deposit, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 10}</td>
                    <td>{deposit.account_number}</td>
                    <td>{deposit.payment_mode}</td>
                    <td>${deposit.amount.toFixed(2)}</td>
                    <td>{deposit.utr_transaction_id}</td>
                    <td>
                      <a href={`http://localhost:3000/uploads/${encodeURIComponent(deposit.slip.split('\\').pop())}`} target="_blank" rel="noopener noreferrer">
                        <img src={`http://localhost:3000/uploads/${encodeURIComponent(deposit.slip.split('\\').pop())}`} alt="Deposit Slip" style={{ width: '100px' }} />
                      </a>
                    </td>
                    <td>
                      <Badge bg="warning">Pending</Badge>
                    </td>
                    <td>{new Date(deposit.created_at).toLocaleString()}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => updateDepositStatus(deposit.id, 'approved')}>Approve</Dropdown.Item>
                          <Dropdown.Item onClick={() => updateDepositStatus(deposit.id, 'declined')}>Decline</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="9" className="text-center">No pending deposits</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="pagination-controls">
              <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </Button>
              <span> Page {currentPage} of {totalPages} </span>
              <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
