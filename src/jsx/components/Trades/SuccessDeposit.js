import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Badge, FormControl } from "react-bootstrap";
import api from '../../../services/api';  // Ensure this path is correct for your setup

export default function SuccessDeposit() {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const token = userDetails ? userDetails.refreshToken : null;

  useEffect(() => {
    fetchDeposits(currentPage);
  }, [currentPage, token]);

  useEffect(() => {
    filterDeposits();
  }, [searchTerm, deposits]);

  const fetchDeposits = async (page) => {
    try {
      const response = await api.get('approved-deposits', { token }, {
        params: {
          page,
          limit: 10  // Assuming 10 items per page
        }
      });
      const data = response.data;
      if (data) {
        setDeposits(data.deposits || []);
        setFilteredDeposits(data.deposits || []); // Initially, all deposits are displayed
        setCurrentPage(Number(data.currentPage));
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching deposit history:', error);
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
            <Card.Title>Deposit History</Card.Title>
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
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeposits.length > 0 ? (
                  filteredDeposits.map((deposit, index) => (
                    <tr key={index}>
                      <td>{index + 1 + (currentPage - 1) * 10}</td>
                      <td>{deposit.account_number}</td>
                      <td>{deposit.payment_mode}</td>
                      <td>${deposit.amount.toFixed(2)}</td>
                      <td>{deposit.utr_transaction_id}</td>
                      <td>
                        <Badge bg={deposit.status === 'pending' ? 'warning' : 'success'}>
                          {deposit.status}
                        </Badge>
                      </td>
                      <td>{new Date(deposit.created_at).toLocaleString()}</td>
                      <td>{new Date(deposit.updated_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No deposits found</td>
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
