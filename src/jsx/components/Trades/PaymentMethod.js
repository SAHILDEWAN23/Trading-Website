import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import PaymentMethodModal from './PaymentMethodModal';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bankTransferImage from '../../../images/banktransfer.svg';
import tetherImage from '../../../images/USDTBEP20-removebg-preview.png';
import tetherUSImage from '../../../images/tetherus.svg';

export default function PaymentMethod() {
  const [methods, setMethods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);

  useEffect(() => {
    fetchMethods(currentPage);
  }, [currentPage]);

  const fetchMethods = async (page) => {
    try {
      const response = await api.get('all-payment-methods', {
        params: { page, limit: 10 }
      });
      const data = response.data;
      if (data) {
        setMethods(data.paymentMethods || []);
        setCurrentPage(Number(data.currentPage));
        setTotalPages(Number(data.totalPages));
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      setMethods([]);
      notifyTopRight('Failed to fetch payment methods', 'error');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEdit = (method) => {
    setCurrentMethod(method);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.post('delete-payment-method', { id });
      if (response.status === 200) {
        fetchMethods(currentPage);
        notifyTopRight('Payment method successfully deleted');
      } else {
        notifyTopRight('Failed to delete payment method', 'error');
      }
    } catch (error) {
      notifyTopRight('Error deleting payment method', 'error');
      console.error('Error deleting payment method:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentMethod(null);
  };

  const handleSaveMethod = async (methodData) => {
    // Assuming methodData comes with all the required fields except the logo
    const image = getImage(methodData.name); // Get image based on the name or assign default
  
    const payload = {
      ...methodData,
      logo: image // Add the image path to your payload
    };
  
    const endpoint = payload.id ? 'edit-payment-method' : 'add-payment-method';
    
    try {
      const response = await api.post(endpoint, payload);
      if (response.data) {
        notifyTopRight('Payment method saved successfully');
        fetchMethods(currentPage);
        handleCloseModal();
      } else {
        notifyTopRight('Failed to save payment method', 'error');
      }
    } catch (error) {
      notifyTopRight('Error saving payment method', 'error');
      console.error('Error saving payment method:', error);
    }
  };
  

  const getImage = (name) => {
    switch (name) {
      case 'Bank Transfer': return bankTransferImage;
      case 'Tether (USDT BEP20)': return tetherImage;
      case 'Tether (USDT TRC20)': return tetherUSImage;
      default: return bankTransferImage; // Default image if none matched
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
              <Card.Title>Payment Methods</Card.Title>
            </div>
            <div className='col-md-3 col-sm-6 col-xs-12 p-1'>
              <Link to="#" className="btn btn-outline-primary btn-lg btn-block rounded" onClick={() => setShowModal(true)}>
                +New Payment Method
              </Link>
            </div>
          </Card.Header>
          <ToastContainer/>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Processing Time</th>
                  <th>Fee</th>
                  <th>Limits</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {methods.length > 0 ? methods.map((method, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 10}</td>
                    <td><img src={getImage(method.name)} alt={method.name} width="50" /></td>
                    <td>{method.name}</td>
                    <td>{method.processing_time}</td>
                    <td>{method.fee}</td>
                    <td>{method.limits}</td>
                    <td>{new Date(method.created_at).toLocaleString()}</td>
                    <td>{new Date(method.updated_at).toLocaleString()}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(method)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(method.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="9" className="text-center">No payment methods found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="pagination-controls p-2">
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
        <PaymentMethodModal
          show={showModal}
          handleClose={handleCloseModal}
          handleSave={handleSaveMethod}
          method={currentMethod}
        />
      )}
    </div>
  );
}
