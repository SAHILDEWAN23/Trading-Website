import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import api from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BankDetailsForm = () => {
    const [bankDetails, setBankDetails] = useState({
        bank_name: '',
        branch_name: '',
        account_number: '',
        ifsc_code: '',
        bep_wallet: '',
        trc_wallet: ''
    });

    useEffect(() => {
        const fetchBankDetails = async () => {
            try {
                const response = await api.get('/bank-details');
                setBankDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch bank details:', error);
                toast.error('Failed to fetch bank details.');
            }
        };
        fetchBankDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankDetails(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/update-bank-details', bankDetails);
            toast.success('Bank details updated successfully!');
        } catch (error) {
            console.error('Error updating bank details:', error);
            toast.error('Failed to update bank details.');
        }
    };

    return (
        <div className='col-lg-6'>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control type="text" name="bank_name" value={bankDetails.bank_name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Branch Name</Form.Label>
                            <Form.Control type="text" name="branch_name" value={bankDetails.branch_name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control type="text" name="account_number" value={bankDetails.account_number} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>IFSC Code</Form.Label>
                            <Form.Control type="text" name="ifsc_code" value={bankDetails.ifsc_code} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>BEP Wallet</Form.Label>
                            <Form.Control type="text" name="bep_wallet" value={bankDetails.bep_wallet} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>TRC Wallet</Form.Label>
                            <Form.Control type="text" name="trc_wallet" value={bankDetails.trc_wallet} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default BankDetailsForm;
