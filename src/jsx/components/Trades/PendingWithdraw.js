import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Badge, Dropdown, FormControl } from "react-bootstrap";
import api from '../../../services/api';  // Ensure this path is correct for your setup

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWithdrawals(currentPage);
  }, [currentPage]);

  useEffect(() => {
    filterWithdrawals();
  }, [searchTerm, withdrawals]);

  const fetchWithdrawals = async (page) => {
    try {
      const response = await api.get('pending-withdraws', {
        params: { page, limit: 10 }
      });
      const data = response.data;
      if (data) {
        setWithdrawals(data.withdrawals || []);
        setFilteredWithdrawals(data.withdrawals || []); // Initially, all withdrawals are displayed
        setCurrentPage(Number(data.currentPage));
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching withdrawal history:', error);
      setWithdrawals([]);
    }
  };

  const filterWithdrawals = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = withdrawals.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredWithdrawals(filteredData);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await api.post('update-withdraw-status', { id, status });
      if (response.status === 200) {
        fetchWithdrawals(currentPage);  // Refresh the list after update
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
      console.error('Error updating withdrawal status:', error);
    }
  };

  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Pending Withdrawals</Card.Title>
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
                  <th>Status</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredWithdrawals.length > 0 ? filteredWithdrawals.map((withdrawal, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 10}</td>
                    <td>{withdrawal.account_number}</td>
                    <td>{withdrawal.payment_mode}</td>
                    <td>${withdrawal.amount.toFixed(2)}</td>
                    <td><Badge bg='warning'>Pending</Badge></td>
                    <td>{new Date(withdrawal.updated_at).toLocaleString()}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => updateStatus(withdrawal.id, 'approved')}>Approve</Dropdown.Item>
                          <Dropdown.Item onClick={() => updateStatus(withdrawal.id, 'declined')}>Decline</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="text-center">No withdrawals</td>
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
