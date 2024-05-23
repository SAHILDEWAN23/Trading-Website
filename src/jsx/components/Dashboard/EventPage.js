import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from "../../../services/api";
import { Tab, Tabs } from 'react-bootstrap'; // Make sure to import Tab and Tabs

import {Dropdown,Button} from 'react-bootstrap';
import Select from 'react-select';
import TradingViewWidget from '../utilities/TradingViewWidget';
import io from 'socket.io-client';
import Header from '../../layouts/nav/Header';
import { ToastContainer, toast } from "react-toastify";
import img from "../../../images/cancel-146131_960_720.png";
import "react-toastify/dist/ReactToastify.css";



function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Change to false for 24-hour format
    });
}

function timestampToTime(timestamp) {
	// Create a new Date object from the timestamp
	const date = new Date(parseInt(timestamp, 10)); // Ensure the timestamp is in integer format
	// Format the date and time
	return date.toLocaleTimeString('en-US', {
	  hour: '2-digit',
	  minute: '2-digit',
	  second: '2-digit',
	  hour12: false // Set to true for AM/PM format, false for 24-hour format
	});
  }
  
  const formatCurrencyCode = (code) => {
    if (!code) return code; // Return unchanged if it's falsy
    // Assuming the first three characters are the base currency
    return code.substring(0, 3) + '/' + code.substring(3);
};
  
const notifyTopRight = (message) => {
	toast.success(message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: true,
		draggable: true,
	});
};

const EventPage = () => {

	const [currencies, setCurrencies] = useState([]);
	console.log(currencies);
	const [rates, setRates] = useState([]);
	const [selectedCurrency, setSelectedCurrency] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	const [volume, setVolume] = useState(0.01);
	const [selectedOption, setSelectedOption] = useState(null);
	const [symbol, setSymbol] = useState("EURUSD"); // Default symbol
	const [stopLoss, setStopLoss] = useState(0);
    const [takeProfit, setTakeProfit] = useState(0);
	const [openOrders, setOpenOrders] = useState([]);
	const [pipValues, setPipValues] = useState([]);
	const [balance, setBalance] = useState(0); // State to hold the balance
	const [editing, setEditing] = useState(null); // Tracks which order is being edited
    const [editValues, setEditValues] = useState({ stopLoss: '', takeProfit: '' }); // Stores the editable input values
	const [activeTab, setActiveTab] = useState('openOrders');  // Default tab
	const [closedOrders, setClosedOrders] = useState([]);
	const [marketType, setMarketType] = useState('crypto'); // 'forex' or 'crypto'



    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


	const handleEdit = (order) => {
		setEditing(order.order_number);
		setEditValues({ stopLoss: order.stop_loss, takeProfit: order.take_profit });
	};
	
	const handleValueChange = (e) => {
		const { name, value } = e.target;
		setEditValues(prev => ({ ...prev, [name]: value }));
	};
	
	const handleSave = (orderNumber) => {
		console.log('Updating...', orderNumber, editValues);
		// Call your API to update the order
		updateOrder(orderNumber, editValues.stopLoss, editValues.takeProfit);
		setEditing(null); // Exit edit mode
	};
	
	const handleKeyDown = (e, orderNumber) => {
		if (e.key === 'Enter') {
			handleSave(orderNumber);
		}
	};
	
	const updateOrder = async (orderNumber, stopLoss, takeProfit) => {
		try {
			// Construct the payload for the API request
			const payload = {
				orderNumber: orderNumber,
				stopLoss: stopLoss,
				takeProfit: takeProfit
			};
	
			// Send the API request to update the order
			const response = await api.post('/update-order', payload);
	
			// Check the response status
			if (response.status === 200) {
				notifyTopRight(`Order ${orderNumber} updated successfully!`);
				console.log(`Order #${orderNumber} updated successfully with Stop Loss: ${stopLoss} and Take Profit: ${takeProfit}`);
				// Optionally refresh the list of orders or update the UI accordingly
			} else {
				notifyTopRight(`Failed to update order: ${response.data.error}`);
				console.error(`Failed to update order #${orderNumber}: ${response.data.error}`);
			}
		} catch (error) {
			notifyTopRight(`Error updating order: ${error.toString()}`);
			console.error(`Error updating order #${orderNumber}:`, error);
		}
	};
	
	

    const [searchParams] = useSearchParams();
    const accountId = searchParams.get('account');
	const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const token = userDetails.refreshToken;

	const currentRate = rates.find(rate => rate.currency === selectedCurrency) || { bid: '0', ask: '0' };

	const handleManualClose = async (orderNumber) => {
		// Find the specific order
		const order = openOrders.find(o => o.order_number === orderNumber);
		if (!order) {
			notifyTopRight("Order not found");
			return;
		}
	
		// Find the current rate for the order's currency
		const currentRate = rates.find(rate => rate.currency === order.symbol);
		if (!currentRate) {
			notifyTopRight("Current rate not found for the currency");
			return;
		}
	
		// Get pip value for the currency pair
		const pipInfo = pipValues.find(pip => pip.currency_name === order.symbol.replace('/', ''));
		if (!pipInfo) {
			notifyTopRight("Pip value not found for the currency pair");
			return;
		}
	
		// Calculate profit
		const rateValue = parseFloat(currentRate.rate);
		const openingPrice = parseFloat(order.opening_price);
		const pipValue = parseFloat(pipInfo.pip_value);
		const pipDifference = order.type.toLowerCase() === 'buy'
			? (rateValue - openingPrice) / 0.0001
			: (openingPrice - rateValue) / 0.0001;
		const profit = pipDifference * pipValue * parseFloat(order.volume);
	
		try {
			// Send the request to close the order with additional profit and closing price data
			const response = await api.post('/manually-close-order', {
				orderNumber,
				closingPrice: rateValue.toFixed(5),  // Ensure decimals are handled properly
				profit: profit.toFixed(2)            // Round to two decimal places
			});
	
			if (response.status === 200) {
				notifyTopRight(`Order ${orderNumber} closed successfully!`);
				console.log(`Order ${orderNumber} closed successfully!`);
				// Optionally refresh the list of orders or update the UI accordingly
				// fetchOpenOrders(); // Uncomment this if you want to refresh the list immediately after closing
			} else {
				notifyTopRight(`Failed to close order: ${response.data.error}`);
				// Handle errors, e.g., show an error message
			}
		} catch (error) {
			notifyTopRight(`Error closing order: ${error.toString()}`);
			// Handle network errors
		}
	};
	
			


	const getIncrementValue = value => {
        const decimalPlaces = (value.toString().split('.')[1] || '').length;
        return 1 / Math.pow(10, decimalPlaces);
    };

    const handleIncrement = (value, setter) => {
        const increment = getIncrementValue(value);
        const decimalPlaces = (value.toString().split('.')[1] || '').length;
        setter(prev => (parseFloat(prev) + increment).toFixed(decimalPlaces));
    };

    const handleDecrement = (value, setter) => {
        const decrement = getIncrementValue(value);
        const decimalPlaces = (value.toString().split('.')[1] || '').length;
        setter(prev => (parseFloat(prev) - decrement).toFixed(decimalPlaces));
    };


	const handleVolumeIncrement = () => {
	  setVolume(prevVolume => Math.max(prevVolume + 0.01, 0)); // Prevent negative volume
	};
  
	const handleVolumeDecrement = () => {
	  setVolume(prevVolume => Math.max(prevVolume - 0.01, 0)); // Prevent negative volume
	};
  
	const handleChange = (event) => {
	  const value = parseFloat(event.target.value);
	  setVolume(isNaN(value) ? 0 : value); // Ensure that only numbers are set
	};

	const calculateTotalProfit = () => {
		if (!Array.isArray(openOrders) || openOrders.length === 0) {
			console.log('openOrders is not an array or is empty:', openOrders);
			return 0; // Return 0 if openOrders is not an array or empty
		}
	
		return openOrders.reduce((total, order) => {
			const currentRate = rates.find(rate => rate.currency === order.symbol);
			const rateValue = currentRate ? parseFloat(currentRate.rate) : 0;
			const pipInfo = pipValues.find(pip => pip.currency_name === order.symbol.replace('/', ''));
			const pipValue = pipInfo ? parseFloat(pipInfo.pip_value) : 0;
			const pipDifference = order.type.toLowerCase() === 'buy'
				? (rateValue - parseFloat(order.opening_price)) / 0.0001
				: (parseFloat(order.opening_price) - rateValue) / 0.0001;
			const profit = pipDifference * pipValue * parseFloat(order.volume);
			return total + profit;
		}, 0);
	};
	

	const handlePlaceOrder = async (type) => {
		const openingPrice = type === 'sell' ? currentRate.bid : currentRate.ask;
	
		// Check if opening price is valid compared to stop loss and take profit based on order type
		if (type === 'sell') {
			if (openingPrice <= stopLoss || openingPrice >= takeProfit) {
				console.error('Invalid order placement: Opening price for a sell order must be greater than stop loss and less than take profit.');
				alert('Invalid order placement: Opening price for a sell order must be greater than stop loss and less than take profit.');
				return; // Exit the function without placing the order
			}
		} else if (type === 'buy') {
			if (openingPrice <= stopLoss || openingPrice >= takeProfit) {
				console.error('Invalid order placement: Opening price for a buy order must be less than stop loss and greater than take profit.');
				alert('Invalid order placement: Opening price for a buy order must be less than stop loss and greater than take profit.');
				return; // Exit the function without placing the order
			}
		}
	
		const orderData = {
			token:token,
			accountId:accountId,
			symbol: selectedCurrency,
			volume: volume,
			orderType: type,
			openingPrice: openingPrice,
			stopLoss: stopLoss,
			takeProfit: takeProfit,
			status: 'open',
			// ... any other data your backend needs
		};
	
		try {
			const response = await api.post('new_order', orderData);
			console.log('Order placed:', response.data);
			// Update your orders state with the new order if needed
		} catch (error) {
			console.error('Failed to place order:', error);
		}
	};
	

	const handleSelectChange = (option) => {
		setSelectedOption(option);
		setSymbol(option.value);

		const formattedCurrency = formatCurrencyCode(option.value);

		setSelectedCurrency(formattedCurrency);

		const rate = rates.find(r => r.currency.replace('/', '') === option.value);
		if (rate) {
			setStopLoss(rate.bid);
			setTakeProfit(rate.ask);
		} else {
			// Optionally set some default values or handle the absence of rate data
			setStopLoss(0);
			setTakeProfit(0);
		}

		// You can also do other things with the selected option here, such as calling an API or updating other components
	  };

	// Function to handle row click
	const handleRowClick = (rateData) => {
	  setSelectedRow(rateData);
	  setSelectedCurrency(rateData.currency);

	  setSymbol(rateData.currency.replace('/', ''));

	  setStopLoss(rateData.bid);
	  setTakeProfit(rateData.ask);



	        const formattedRateData = {
            value: rateData.currency.replace('/', ''),
            label: rateData.currency.replace('/', ''),
             };
          setSelectedOption(formattedRateData);
         

	};
  


	// useEffect to fetch currencies
	// useEffect to fetch currencies and rates based on market type
useEffect(() => {
    api.get('/currencies')
        .then(response => {
            const currencyOptions = response.data.map(currency => ({
                value: currency,
                label: currency
            }));
            setCurrencies(currencyOptions);
        })
        .catch(error => {
            console.error('Error fetching currency names:', error.message);
        });

    const fetchRates = () => {
        api.get(`/market-rates?marketType=${marketType}`)  // Ensure this endpoint is set up to handle this query
            .then(response => {
                setRates(response.data.map(rate => ({
                    ...rate,
                    timestamp: rate.timestamp ? new Date(rate.timestamp).getTime() : null
                })));
            })
            .catch(error => {
                console.error(`Failed to fetch rates for ${marketType}:`, error);
                toast.error(`Failed to load ${marketType} rates`);
            });
    };

    fetchRates();

    const fetchPipValues = async () => {
        try {
            const response = await api.get('/pip-values');
            setPipValues(response.data);
        } catch (error) {
            console.error('Error fetching pip values:', error.message);
        }
    };

    fetchPipValues();

    const fetchAccountBalance = () => {
        api.post('/acc-balance', { accountId })
            .then(response => {
                if (response.data.length > 0) {
                    setBalance(response.data[0].balance);
                } else {
                    console.error('Balance not found in response:', response.data);
                }
            })
            .catch(error => console.error('Error fetching account balance:', error));
    };

    fetchAccountBalance();

    // Re-fetch rates whenever the market type changes
}, [marketType]);



	


	return(
		<Fragment>
			<Header/>

			

			<div className=' important-margin-top'>				
			<div className="row">
			<div className="col-xl-4 col-xxl-5">
           <div className="row">
		   <ToastContainer />

		   <div className="col-xl-12 col-md-6">
    <div className="card">
        <div className="card-body" style={{ maxHeight:"550px", overflowX:"hidden", scrollbarWidth: "thin", scrollbarColor: "#050609" }}>
            <Tabs defaultActiveKey="forex" id="currency-tabs" onSelect={(k) => setMarketType(k)} className="mb-3">
                <Tab eventKey="forex" title="Forex">
                    <table className="trader-table table custom-table">
                        <thead>
                            <tr style={{ backgroundColor: "#1e2630" }}>
                                <th>Symbol</th>
                                <th>Time</th>
                                <th>Bid</th>
                                <th>Ask</th>
                            </tr>
                        </thead>
                        <tbody style={{ cursor: "pointer" }}>
                            {rates.map((rate) => (
                                <tr key={rate.currency} onClick={() => handleRowClick(rate)}>
                                    <td>
                                        {rate.compareAsk === 'text-info' ? (
                                            <i className="fas fa-arrow-up" style={{ color: 'green', marginLeft: '5px', marginRight: '5px' }}></i>
                                        ) : (
                                            <i className="fas fa-arrow-down" style={{ color: 'red', marginLeft: '5px', marginRight: '5px' }}></i>
                                        )}
                                        {rate.currency.replace('/', '')}
                                        <i className="fas fa-chart-line" style={{ marginLeft: '30px' }}></i>
                                    </td>
                                    <td className="fs-14">{rate.timestamp ? new Date(rate.timestamp).toLocaleTimeString() : ''}</td>
                                    <td className={rate.compareAsk}>{rate.bid}</td>
                                    <td className={rate.compareAsk}>{rate.ask}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Tab>
                <Tab eventKey="crypto" title="Crypto">
                    {/* Display crypto rates similarly here */}
                </Tab>
            </Tabs>
        </div>
    </div>
</div>

      </div>
    </div>
  

				<div className="col-xl-5 col-xxl-3">
					<div >
						<div className='col-lg-12 p-1 pl-2 card' >
						<div className="row text-center">
                {/* Column for Coin Name */}
                <div className="col-lg-4 my-auto">
                    <h1 className="mb-0 text-warning">{symbol}</h1>
                </div>
        
                {/* Column for Ask Price */}
                <div className="col-lg-4 my-auto pt-2">
                    <h6 className="mb-0">Ask: </h6>
					<p>{stopLoss}</p>
                </div>
        
                {/* Column for Bid Price */}
                <div className="col-lg-4 my-auto pt-2">
                    <h6 className="mb-0">Bid: </h6>
					<p>{takeProfit}</p>
                </div>
            </div>						</div>
					</div>
					<div className="row mb-2 pb-0" >
					<TradingViewWidget 
                   key={symbol}  // Use the symbol as key to force re-render when symbol changes
				   symbol={symbol}
                />

						
	
					</div>
				</div>
				
				<div className="col-xl-3 col-xxl-4">
					<div className="row">
						
						<div className="col-xl-12 col-md-6">
							<div className="card">
								<div className="card-header border-0 pb-0">
									<h4 className="fs-20">Open The Order</h4>
								</div>
								<div className="card-body pb-3">
									<div className="d-flex justify-content-between align-items-center ">	
										<span className="text-white fs-14">Symbol</span>
										<span className="text-white fs-14">
										<Select styles={{
                                                           control: (baseStyles, state) => ({
                                                          ...baseStyles,
                                                           backgroundColor: state.isFocused ? 'transparent' : 'transparent',
                                                         color: '#fff !important'
                                                           }),
                                                        }}

                                               placeholder="Select Currency"
											   options={currencies}
											   value={selectedOption} // Set the value prop to the selected option
											   onChange={handleSelectChange} // Set the Select component's onChange handler to our handler
                                         />
										</span>
									</div>

									 
 <div>
        <div className="volume-control  mt-4">
            {/* <span className="text-white fs-14">Volume</span> */}
			<div className="d-flex align-items-center justify-content-between mb-3">
      <Button variant="outline-dark rounded" onClick={handleVolumeDecrement}>-</Button>
      <div className="volume-value mx-2">
        <center>Volume</center>
        <br></br>
        <span className="text-white fs-14 editable">
          <input 
            type="text"
            className="form-control text-center"
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              width: '100%',
              marginTop: '-27px'
            }}
            value={volume.toFixed(2)}
            onChange={handleChange}
          />
        </span>
      </div>
      <Button variant="outline-dark rounded" onClick={handleVolumeIncrement}>+</Button>
    </div>
          </div>
		  <div className="mb-2">
                <span className="text-white fs-14 mb-1">Stop Loss (SL)</span>
                <div className="input-group mt-1">
                    <div className='input-group mb-3'>
                        <span className='input-group-text' style={{ cursor: "pointer" }} onClick={() => handleDecrement(stopLoss, setStopLoss)}>-</span>
                        <input
                            type='text'
                            className='form-control transparent-input'
                            style={{ backgroundColor: '#2f363e' }}
                            value={stopLoss}
                            onChange={e => setStopLoss(e.target.value)}
                        />
                        <span className='input-group-text' style={{ cursor: "pointer" }} onClick={() => handleIncrement(stopLoss, setStopLoss)}>+</span>
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <span className="text-white fs-14 mb-1">Take Profit (TP)</span>
                <div className="input-group mt-1">
                    <div className='input-group mb-3'>
                        <span className='input-group-text' style={{ cursor: "pointer" }} onClick={() => handleDecrement(takeProfit, setTakeProfit)}>-</span>
                        <input
                            type='text'
                            className='form-control transparent-input'
                            style={{ backgroundColor: '#2f363e' }}
                            value={takeProfit}
                            onChange={e => setTakeProfit(e.target.value)}
                        />
                        <span className='input-group-text' style={{ cursor: "pointer" }} onClick={() => handleIncrement(takeProfit, setTakeProfit)}>+</span>
                    </div>
                </div>
            </div>
         
        
        </div>


								</div>
								<div className="card-footer border-0 pt-0 p-2 row">
									<div className='col-6'>
								<Button className='me-2 w-100' variant='danger' onClick={() => handlePlaceOrder('sell')}>
                  SELL   {' '}
                  <span className='btn-icon-right'>
				  <i className='fas fa-arrow-down'></i>                  </span>
				  <br></br>
				 <span id="sell">{currentRate.bid}</span>
                </Button>
				</div>

				<div className='col-6'>
                <Button className='me-2 w-100' variant='info' onClick={() => handlePlaceOrder('buy')}>
                  BUY{' '}
                  <span className='btn-icon-right'>
				  <i className='fas fa-arrow-up'></i>                  </span>
				  <br></br>
				 <span id="buy"> {currentRate.ask}</span>
                </Button>	
				</div>							
				</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<div className="row">
			<div className="trading-dashboard">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'openOrders' ? 'active' : ''}`}
                    onClick={() => handleTabClick('openOrders')}
                >
                    Open Orders
                </button>
                <button
                    className={`tab ${activeTab === 'tradeHistory' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tradeHistory')}
                >
                    Trade History
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'openOrders' && (
                    <div className="open-orders">
                        <div className="card">
                            <div className="card-body p-0">
                              <div className="table-responsive fs-14">
                              <table className="trader-table table table-responsive-md custom-table">
                                      <thead>
                                          <tr style={{ backgroundColor: "#1e2630" }}>
                                              <th>Symbol</th>
                                              <th>Ticket</th>
                                              <th>Time</th>
                                              <th>Type</th>
                                              <th>Volume</th>
                                              <th>Opening Price</th>
                                              <th>Stop Loss</th>
                                              <th>Take Profit</th>
                                              <th>Current Price</th>
                                              <th>Profit</th>
                                              <th></th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {openOrders.length > 0 ? (
                                              openOrders.map(order => {
                                                  const currentRate = rates.find(rate => rate.currency === order.symbol);
                                                  const rateValue = currentRate ? parseFloat(currentRate.rate) : null;
                                                  const pipInfo = pipValues.find(pip => pip.currency_name === order.symbol.replace('/', ''));
                                                  const pipValue = pipInfo ? parseFloat(pipInfo.pip_value) : 0; // default to 0 if no pip value found
                                                  const pipDifference = order.type.toLowerCase() === 'buy'
                                                      ? (rateValue - parseFloat(order.opening_price)) / 0.0001
                                                      : (parseFloat(order.opening_price) - rateValue) / 0.0001;
                                                  const profit = pipDifference * pipValue * parseFloat(order.volume); // Adjust volume for lot size if necessary
                          
                                                  return (
                                                      <tr key={order.id}>
                                                          <td>{order.symbol.replace('/', '')}</td>
                                                          <td>{order.order_number}</td>
                                                          <td>{formatTime(order.created_at)}</td>
                                                          <td className={order.type === 'buy' ? "text-info" : "text-danger"}>
                                                              {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                                                          </td>
                                                          <td>{order.volume}</td>
                                                          <td>{order.opening_price}</td>
                                                          <td onDoubleClick={() => handleEdit(order)}>
                              {editing === order.order_number ? (
                                  <input
                                      type="text"
                                      name="stopLoss"
                                      value={editValues.stopLoss}
                                      onChange={handleValueChange}
                                      onKeyDown={(e) => handleKeyDown(e, order.order_number)}
                                      autoFocus
                                  />
                              ) : (
                                  order.stop_loss
                              )}
                          </td>
                          <td onDoubleClick={() => handleEdit(order)}>
                              {editing === order.order_number ? (
                                  <input
                                      type="text"
                                      name="takeProfit"
                                      value={editValues.takeProfit}
                                      onChange={handleValueChange}
                                      onKeyDown={(e) => handleKeyDown(e, order.order_number)}
                                  />
                              ) : (
                                  order.take_profit
                              )}
                          </td>
                          
                                                          <td className={currentRate ? currentRate.compareAsk : ''}>
                                                              {currentRate ? currentRate.rate : 'N/A'}
                                                          </td>
                                                          <td className={profit >= 0 ? "text-info" : "text-danger"}>
                                                              {profit.toFixed(2)}
                                                          </td>
                                                          <td>
                                                              <img
                                                                  src={img}
                                                                  alt="Close Order"
                                                                  style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                                                                  onClick={() => handleManualClose(order.order_number)}
                                                              />
                                                          </td>
                                                      </tr>
                                                  );
                                              })
                                          ) : (
                                              <tr>
                                                  <td colSpan="11" className="text-center">No Open Orders Currently</td>
                                              </tr>
                                          )}
                                      </tbody>
                                      <tfoot>
                                          <tr >
                                              <td colSpan="9">
                                              <div style={{ textAlign: "left" }}>
                                                      <span className='mr-4 pr-4'>Balance: ${balance.toFixed(2)}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                                      <span>Equity: ${(balance + calculateTotalProfit()).toFixed(2)}</span>
                                                  </div>
                                              </td>
                                              <td colSpan="2">
                                                  <div style={{ textAlign: "left" }}>
                                                      
                                                  <div className={calculateTotalProfit() > 0 ? "text-info" : "text-danger"}>
                                                  {calculateTotalProfit().toFixed(2)}
                                                  </div>
                                                  </div>
                                              </td>
                                          </tr>
                                      </tfoot>
                                  </table>
                              </div>
                            </div>
                          </div>
                    </div>
                )}
                {activeTab === 'tradeHistory' && (
                    <div className="trade-history">
                       <div className="card">
  <div className="card-body p-0">
    <div className="table-responsive fs-14">
	<table className="trader-table table table-responsive-md custom-table">
    <thead>
        <tr style={{ backgroundColor: "#1e2630" }}>
            <th>Symbol</th>
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
        {closedOrders.length > 0 ? (
            closedOrders.map(order => (
                <tr key={order.id}>
                     <td>{order.symbol.replace('/', '')}</td>
                     <td>{order.order_number}</td>
					 <td>{formatTime(order.updated_at)}</td>
                    <td className={order.type === 'buy' ? "text-info" : "text-danger"}>{order.type.charAt(0).toUpperCase() + order.type.slice(1)}</td>
                    <td>{order.volume}</td>
                    <td>{order.opening_price}</td>
                    <td>{order.stop_loss}</td>
                    <td>{order.take_profit}</td>
                    <td>{order.closing_price}</td>
                    <td className={order.Profit >= 0 ? "text-info" : "text-danger"}>{order.Profit}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="10" className="text-center">No Closed Orders</td>
            </tr>
        )}
    </tbody>
</table>

    </div>
  </div>
 </div>
                    </div>
                )}
            </div>
</div>
</div>

            </div>

            

		</Fragment>
	)
}
export default EventPage;