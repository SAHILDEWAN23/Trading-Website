import React, { useEffect, useState } from 'react';
import api from '../../../services/api'; // Make sure this points to your configured API client
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Assuming you are using React-Bootstrap
import QRCode from 'qrcode.react'; // Correct import for the default export



export default function WalletDeposit() {
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
    const token = userDetails ? userDetails.refreshToken : null;
    const { state } = useLocation();
    const amount = state ? state.amount : ''; // Default to empty if no state
    const method = state ? state.methodName : ''; // Correctly get the payment mode from state
    console.log(method);
    const account_no = state ? state.account_no : ''; // Correctly get the account number from state
    const [bankDetails, setBankDetails] = useState(null); // State to store bank details
    const [tx_id, setTxId] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        // Fetch Bank Details
        const fetchBankDetails = async () => {
            try {
                const response = await api.get('/bank_details');
                setBankDetails(response.data[0]); // Assuming the API returns an array
            } catch (error) {
                console.error('Failed to fetch bank details:', error);
            }
        };

        fetchBankDetails();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('utr', tx_id);
        formData.append('file', file);
        formData.append('token', token);
        formData.append('payment_mode', method); // Sending payment mode
        formData.append('account_number', account_no); // Sending account number

        try {
            const response = await api.post('bankdeposit', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Success:', response.data);
            // Handle further actions after successful submission like redirecting the user or showing a success message
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the file from the event
        console.log(file); // Log the file object to see if it's captured correctly
        if (file) {
            const validTypes = ['image/jpeg', 'image/png']; // List of allowed file types
            if (!validTypes.includes(file.type)) {
                alert('Only JPEG and PNG files are allowed.');
                setFile(null); // Reset the file input if the type is not valid
            } else {
                setFile(file); // Set the file if it is valid
            }
        }
    };

     // Function to handle copying wallet address to clipboard
     const handleCopyWalletAddress = (address) => {
        navigator.clipboard.writeText(address).then(() => {
            alert('Wallet address copied to clipboard!');
        }, (err) => {
            console.error('Failed to copy wallet address:', err);
        });
    };
    
    

    return (
        <div className='row'>
            <div className='col-xl-4 col-lg-6 col-xxl-4 col-sm-6'>
            <div className='card text-white'>
                <div className='card-header'>
                    <h4 className='card-title'>Pay Here</h4>
                </div>
                <div className='card-body'>
                    {bankDetails ? (
                        <>
                            {/* Determine which QR code and wallet address to display */}
                            <center>
                            <QRCode value={method === 'Tether (USDT BEP20)' ? bankDetails.bep_wallet : bankDetails.trc_wallet} size={150} level={"H"} includeMargin={true} />
                            </center>
                            <div className='mt-3'>
                                <span>{method === 'Tether (USDT BEP20)' ? bankDetails.bep_wallet : bankDetails.trc_wallet}</span><br/>
                                <center>
                                <Button variant="outline-secondary" size="sm" onClick={() => handleCopyWalletAddress(method === 'Tether (USDT BEP20)' ? bankDetails.bep_wallet : bankDetails.trc_wallet)}>
                                <i class="fa fa-copy"></i> Copy
                                </Button>
                                </center>
                            </div>
                        </>
                    ) : (
                        <p>Loading bank details...</p>
                    )}
                </div>
            </div>
        </div>
            <div className='col-xl-8 col-lg-6'>
                <div className='card'>
                    <div className='card-header'>
                        <h4 className='card-title'>Add Funds-</h4>
                    </div>
                    <div className='card-body'>
                        <div className='basic-form'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group row'>
                                    <label className='col-sm-3 col-form-label'>Amount-</label>
                                    <div className='col-sm-9'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Amount'
                                            name='amount'
                                            value={amount}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-sm-3 col-form-label'>Transaction ID:</label>
                                    <div className='col-sm-9'>
                                        <input
                                            type='number'
                                            className='form-control'
                                            placeholder='Enter Transaction Id'
                                            name='tx_id'
                                            value={tx_id}
                                            onChange={(e) => setTxId(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-sm-3 col-form-label'>Upload Screenshot:</label>
                                    <div className='col-sm-9'>
                                        <input
                                            type='file'
                                            className='form-control'
                                            name='screenshot'
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-sm-10'>
                                        <button type='submit' className='btn btn-primary'>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
