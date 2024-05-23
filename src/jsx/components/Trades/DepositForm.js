import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import api from '../../../services/api';
import { Col } from 'react-bootstrap';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Deposit() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const query = useQuery();
  const selectedPaymentMethodName = query.get('value'); // Get the 'value' query parameter
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(selectedPaymentMethodName);
  const navigate = useNavigate(); // Initialize navigate function

  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const token = userDetails ? userDetails.refreshToken : null;

  useEffect(() => {
    // Fetch Payment Methods
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get('/payment-methods');
        setPaymentMethods(response.data);
        if (!selectedPaymentMethod) {
          setSelectedPaymentMethod(response.data[0].name); // Default to first payment method if none selected
        }
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };

    // Fetch Accounts
    const fetchAccounts = async () => {
      try {
        const response = await api.post('/getrealaccounts', { token });
        setAccounts(response.data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };

    fetchPaymentMethods();
    fetchAccounts();
  }, [token]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = parseFloat(event.target.amount.value);
    const methodId = event.target.method.value;
    const account_no = event.target.account_no.value;
   // Log the current state of paymentMethods and methodId to debug
  console.log("Payment Methods:", paymentMethods);
  console.log("Selected Method ID:", methodId);

  const method = paymentMethods.find(m => m.id.toString() === methodId); // Ensure types are aligned if necessary

  console.log(method.name);

  if(!amount){
    alert(`Enter amount`);
        return;
  }

    if (method) {
      const [minLimit, maxLimit] = method.limits.split('-').map(Number);
      if (amount < minLimit || amount > maxLimit) {
        alert(`Amount must be between ${minLimit} and ${maxLimit}`);
        return;
      }
            
      const methodName=method.name;
      // Navigate to confirmation page with data
      if (methodName === "Bank Transfer") {
        navigate('/confirm-bankdeposit', { state: { amount, methodName, account_no } });
    } else {
        navigate('/confirm-walletdeposit', { state: { amount, methodName, account_no } });
    }
    } else {
      alert('Selected payment method is not valid.');
    }
  };

  return (
    <div className='col-xl-8 col-lg-12'>
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title'>Deposit-</h4>
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
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-3 col-form-label'>Payment Method:</label>
                <div className='col-sm-9'>
                  <select className='form-control' id='method' name='method' value={selectedPaymentMethod} onChange={e => setSelectedPaymentMethod(e.target.value)}>
                    {paymentMethods.map((method, index) => (
                      <option key={index} value={method.id}>{method.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-3 col-form-label'>To account:</label>
                <div className='col-sm-9'>
                  <select
                    className='form-control'
                    id='account_no'
                    name='account_no'
                  >
                    {accounts.map((account, index) => (
                      <option key={index} value={account.account_number}>{account.account_number}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-sm-10'>
                  <button type='submit' className='btn btn-primary'>
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
