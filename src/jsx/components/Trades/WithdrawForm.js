import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Ensure to import CSS for Toastify

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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

export default function WithdrawForm() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const query = useQuery();
  const selectedPaymentMethodName = query.get('value');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(selectedPaymentMethodName);
  const navigate = useNavigate();

  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const token = userDetails ? userDetails.refreshToken : null;

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get('/payment-methods');
        setPaymentMethods(response.data);
        if (!selectedPaymentMethod) {
          setSelectedPaymentMethod(response.data[0].name);
        }
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
        notifyTopRight('Failed to fetch payment methods.', 'error');
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await api.post('/getrealaccounts', { token });
        setAccounts(response.data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
        notifyTopRight('Failed to fetch accounts.', 'error');
      }
    };

    fetchPaymentMethods();
    fetchAccounts();
  }, [token, selectedPaymentMethod]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const amount = parseFloat(event.target.amount.value);
    const methodId = event.target.method.value;
    const account_no = event.target.account_no.value;
    const method = paymentMethods.find(m => m.id.toString() === methodId);
  
    if (!amount) {
      notifyTopRight(`Enter amount`);
      return;
    }
  
    if (!method) {
      notifyTopRight('Selected payment method is not valid.');
      return;
    }
  
    const [minLimit, maxLimit] = method.limits.split('-').map(Number);
    if (amount < minLimit || amount > maxLimit) {
      notifyTopRight(`Amount must be between ${minLimit} and ${maxLimit}`);
      return;
    }
  
    const postData = {
      token,
      amount,
      paymentMethod: method.name,
      accountNumber: account_no
    };
  
    try {
      const response = await api.post('/withdraw', postData);
      notifyTopRight('Withdrawal request sent successfully!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        notifyTopRight(`Error: ${error.response.data.error}`);
      } else {
        notifyTopRight(`Error sending withdrawal request: ${error.toString()}`);
      }
      console.error('Error sending withdrawal request:', error);
    }
  };
  

  return (
    <div className='col-xl-8 col-lg-12'>
      <div className='card'>
      <ToastContainer />
        <div className='card-header'>
          <h4 className='card-title'>Withdraw</h4>
        </div>
        <div className='card-body'>
          <div className='basic-form'>
            <form onSubmit={handleSubmit}>
              <div className='form-group row'>
                <label className='col-sm-3 col-form-label'>Amount</label>
                <div className='col-sm-9'>
                  <input type='text' className='form-control' placeholder='Amount' name='amount' />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-3 col-form-label'>Payment Method</label>
                <div className='col-sm-9'>
                  <select className='form-control' id='method' name='method' value={selectedPaymentMethod} onChange={e => setSelectedPaymentMethod(e.target.value)}>
                    {paymentMethods.map((method, index) => (
                      <option key={index} value={method.id}>{method.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-3 col-form-label'>To account</label>
                <div className='col-sm-9'>
                  <select className='form-control' id='account_no' name='account_no'>
                    {accounts.map((account, index) => (
                      <option key={index} value={account.account_number}>{account.account_number}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-sm-10'>
                  <button type='submit' className='btn btn-primary'>Continue</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
