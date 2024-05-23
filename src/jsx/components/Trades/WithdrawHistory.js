import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Badge } from "react-bootstrap";
import api from '../../../services/api';  // Ensure this path is correct for your setup

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const token = userDetails ? userDetails.refreshToken : null;

  useEffect(() => {
    fetchWithdrawals(currentPage);
  }, [currentPage, token]);

  const fetchWithdrawals = async (page) => {
    try {
      const response = await api.post('withdrawals-history', { token }, {
        params: {
          page,
          limit: 10  // Assuming 10 items per page
        }
      });
      const data = response.data;
      if (data) {
        setWithdrawals(data.data || []);  // Ensure withdrawals is always an array
        setCurrentPage(Number(data.currentPage)); // Ensure it's a number
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching withdrawal history:', error);
      setWithdrawals([]);  // In case of error, ensure withdrawals is an empty array
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
            <Card.Title>Withdrawal History</Card.Title>
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
                {withdrawals.length > 0 ? (
                  withdrawals.map((withdrawal, index) => (
                    <tr key={index}>
                      <td>{index + 1 + (currentPage - 1) * 10}</td>
                      <td>{withdrawal.account_number}</td>
                      <td>{withdrawal.payment_mode}</td>
                      <td>${withdrawal.amount.toFixed(2)}</td>
                      <td>
                        <Badge bg={withdrawal.status === 'approved' ? 'success' : 'danger'}>
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
