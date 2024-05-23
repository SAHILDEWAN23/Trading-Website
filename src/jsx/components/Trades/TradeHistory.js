import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Badge, FormControl } from "react-bootstrap";
import api from '../../../services/api';  // Ensure this path is correct for your setup

export default function ClosedOrdersReport() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchClosedOrders(currentPage);
  }, [currentPage]);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, orders]);

  const fetchClosedOrders = async (page) => {
    try {
      const response = await api.get('all-closed-orders', {
        params: {
          page,
          limit: 10  // Assuming 10 items per page
        }
      });
      const data = response.data;
      if (data) {
        setOrders(data.orders);
        setFilteredOrders(data.orders); // Initially, all orders are displayed
        setCurrentPage(Number(data.currentPage)); // Ensure it's a number
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching closed orders:', error);
    }
  };

  const filterOrders = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = orders.filter(order => {
      return Object.keys(order).some(key =>
        order[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredOrders(filteredData);
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
            <Card.Title>Closed Orders</Card.Title>
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
                  <th>Symbol</th>
                  <th>Account Number</th>
                  <th>Ticket</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Volume</th>
                  <th>Opening Price</th>
                  <th>Stop Loss</th>
                  <th>Take Profit</th>
                  <th>Closing Price</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.symbol.replace('/','')}</td>
                      <td>{order.account_number}</td>
                      <td>{order.order_number}</td>
                      <td>{new Date(order.updated_at).toLocaleString()}</td>
                      <td>
                        <Badge bg={order.type === 'buy' ? 'info' : 'danger'}>
                        {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                        </Badge>
                      </td> 
                      <td>{order.volume}</td>
                      <td>${order.opening_price.toFixed(2)}</td>
                      <td>${order.stop_loss.toFixed(2)}</td>
                      <td>${order.take_profit.toFixed(2)}</td>
                      <td>${order.closing_price.toFixed(2)}</td>
                      <td className={order.profit.toFixed(2) > 0 ? "text-primary" : "text-danger"}>
                        ${order.profit.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">No closed orders found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="pagination-controls pt-2">
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
