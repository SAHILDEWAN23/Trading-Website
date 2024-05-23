import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Badge, FormControl } from "react-bootstrap";
import api from '../../../services/api';  // Ensure this path is correct for your setup

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const token = userDetails ? userDetails.refreshToken : null;

  useEffect(() => {
    fetchWithdrawals(currentPage);
  }, [currentPage, token]);

  useEffect(() => {
    filterWithdrawals();
  }, [searchTerm, withdrawals]);

  const fetchWithdrawals = async (page) => {
    try {
      const response = await api.post('failed-withdraws', { token }, {
        params: {
          page,
          limit: 10  // Assuming 10 items per page
        }
      });
      const data = response.data;
      if (data) {
        setWithdrawals(data.withdrawals || []);  // Ensure withdrawals is always an array
        setFilteredWithdrawals(data.withdrawals || []); // Initially, all withdrawals are displayed
        setCurrentPage(Number(data.currentPage)); // Ensure it's a number
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching withdrawal history:', error);
      setWithdrawals([]);  // In case of error, ensure withdrawals is an empty array
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

  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Failed Withdraws</Card.Title>
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
                </tr>
              </thead>
              <tbody>
                {filteredWithdrawals.length > 0 ? (
                  filteredWithdrawals.map((withdrawal, index) => (
                    <tr key={index}>
                      <td>{index + 1 + (currentPage - 1) * 10}</td>
                      <td>{withdrawal.account_number}</td>
                      <td>{withdrawal.payment_mode}</td>
                      <td>${withdrawal.amount.toFixed(2)}</td>
                      <td>
                        <Badge bg='success'>
                          {withdrawal.status}
                        </Badge>
                      </td>
                      <td>{new Date(withdrawal.updated_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No withdrawals</td>
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
