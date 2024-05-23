import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import api from '../../../services/api';  // Ensure this path is correct for your setup
import CurrencyModal from './CurrencyModal';  // Ensure this path is correct for your modal component
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CurrencyReport() {
  const [currencies, setCurrencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(null);

  useEffect(() => {
    fetchCurrencies(currentPage);
  }, [currentPage]);

  const fetchCurrencies = async (page) => {
    try {
      const response = await api.get('all-currencies', {
        params: { page, limit: 10 }
      });
      const data = response.data;
      if (data) {
        setCurrencies(data.currencies || []);
        setCurrentPage(Number(data.currentPage));
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
      setCurrencies([]);
      notifyTopRight('Failed to fetch currencies', 'error');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEdit = (currency) => {
    setCurrentCurrency(currency);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.post('delete-currency', { id });
      if (response.status === 200) {
        fetchCurrencies(currentPage);  // Refresh the list after deletion
        notifyTopRight('Currency successfully deleted');
      } else {
        notifyTopRight('Failed to delete currency', 'error');
      }
    } catch (error) {
      notifyTopRight('Error deleting currency', 'error');
      console.error('Error deleting currency:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCurrency(null);
  };

  const handleSaveCurrency = async (currencyData) => {
    const endpoint = currencyData.id ? 'edit-currency' : 'add-currency';
    try {
      const response = await api.post(endpoint, currencyData);
      if (response.data) {
        notifyTopRight('Currency saved successfully');
        fetchCurrencies(currentPage);
        handleCloseModal();
      }
    } catch (error) {
      notifyTopRight('Error saving currency', 'error');
      console.error('Error saving currency:', error);
    }
  };

  const notifyTopRight = (message, type = 'success') => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header className='row'>
            <div className='col-md-9 col-sm-6 col-xs-12 p-1'>
              <Card.Title>Currencies</Card.Title>
            </div>
            <div className='col-md-3 col-sm-6 col-xs-12 p-1'>
              <Link to="#" className="btn btn-outline-primary btn-lg btn-block rounded" onClick={() => setShowModal(true)}>
                +New Currency
              </Link>
            </div>
          </Card.Header>
          <ToastContainer/>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Currency Name</th>
                  <th>Status</th>
                  <th>Pip Value</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Market</th> {/* Add Market column */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currencies.length > 0 ? currencies.map((currency, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 10}</td>
                    <td>{currency.currency_name}</td>
                    <td>{currency.status === 1 ? 'Active' : 'Disabled'}</td>
                    <td>{currency.pip_value}</td>
                    <td>{new Date(currency.created_at).toLocaleString()}</td>
                    <td>{new Date(currency.updated_at).toLocaleString()}</td>
                    <td>{currency.market === 1 ? 'Crypto' : 'Forex'}</td> {/* Display market as Forex or Crypto */}
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(currency)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(currency.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="text-center">No currencies found</td>
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
      {showModal && (
        <CurrencyModal
          show={showModal}
          handleClose={handleCloseModal}
          handleSave={handleSaveCurrency}
          currency={currentCurrency}
        />
      )}
    </div>
  );
}
