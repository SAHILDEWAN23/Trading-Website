import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button,Badge } from "react-bootstrap";
import api from '../../../services/api';  // Ensure this path is correct for your setup

export default function DepositHistory() {
  const [deposits, setDeposits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const token = userDetails ? userDetails.refreshToken : null;

  console.log(currentPage);

  useEffect(() => {
    fetchDeposits(currentPage);
  }, [currentPage, token]);

  const fetchDeposits = async (page) => {
    try {
      const response = await api.post('deposits-history', { token }, {
        params: {
          page,
          limit: 10  // Assuming 10 items per page
        }
      });
      const data = response.data;
      if (data) {
        setDeposits(data.deposits);
        console.log(data.currentPage);
        setCurrentPage(Number(data.currentPage)); // Ensure it's a number
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching deposit history:', error);
    }
  };

  const handlePageChange = (newPage) => {
    console.log(newPage-1);
    console.log('Attempting to change to page:', newPage);
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Deposit History</Card.Title>
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
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 10}</td>
                    <td>{deposit.account_number}</td>
                    <td>{deposit.payment_mode}</td>
                    <td>${deposit.amount.toFixed(2)}</td>
                    <td>{deposit.utr_transaction_id}</td>
                    <td>
  {deposit.status === 'approved' ? (
    <Badge variant="success">Approved</Badge>
  ) : (
    <Badge bg="danger">{deposit.status}</Badge>
  )}
</td>
                    <td>{new Date(deposit.created_at).toLocaleString()}</td>
                  </tr>
                ))}
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
