import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Badge,  Dropdown,
} from 'react-bootstrap';
import api from '../../../services/api';

const userDetailsString = localStorage.getItem('userDetails');
const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
const token = userDetails ? userDetails.refreshToken : null;

console.log({Token:token});



export default function Demo() {
    const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    api.post('getdemoaccounts',{token})
      .then(response => {
        setAccounts(response.data); // Assuming the response is the array of accounts
      })
      .catch(error => {
        console.error('Failed to fetch accounts:', error);
      });
  }, []);









  return (
    <div className='p-2'>


{accounts.map(account => (

				 <div key={account.id} className="col-lg-12 mb-4 mt-2 ">
                    <div className="card m-0 ">
                        <div className="card-body py-3 py-md-2">

                            <div className="row align-items-center">
                                <div className="col-md-5 mb-3 p-2 m-2">
                                    <div className="media align-items-end">
                                        <div className="bootstrap-badge m-2 p-2">            
                                            <Badge bg="primary" className="m-1">Demo</Badge>
                                            <Badge bg="primary" className="m-1">{account.a_type}</Badge>
                                            <Badge bg="primary" className="m-1">{account.nickname}</Badge>

                                        </div>
                                     </div>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-md-5 mb-3 mb-md-0">
                                    <div className="media align-items-end">
                                        <div className="media-body ms-1">
                                            
                                            <h2 className="mb-0 font-w600 fs-20">{account.balance?account.balance:"0.00"} USD</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 text-md-end">
                                    <Link to={"#"} className="btn btn-outline-primary rounded ms-1 btn-sm px-4">Deposit</Link>
                                    <Link to={"#"} className="btn btn-outline-primary rounded ms-1 btn-sm px-4">Withdraw</Link>
                                    <Link to={"#"} className="btn btn-secondary rounded ms-1 btn-sm px-4">Trade</Link>
                                    <Link to={`/trade-terminal?account=${account.a_id}`} className="btn  rounded  btn-sm px-4">
								                        	<Dropdown>
                                            <Dropdown.Toggle
                                              as='button'
                                              variant=''
                                              className='btn sharp btn-primary tp-btn mt-1'
                                              id='tp-btn'
                                            >
                                              <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                                width='18px'
                                                height='18px'
                                                viewBox='0 0 24 24'
                                                version='1.1'
                                              >
                                                <g
                                                  stroke='none'
                                                  strokeWidth='1'
                                                  fill='none'
                                                  fillRule='evenodd'
                                                >
                                                  <rect x='0' y='0' width='24' height='24' />
                                                  <circle fill='#000000' cx='12' cy='5' r='2' />
                                                  <circle fill='#000000' cx='12' cy='12' r='2' />
                                                  <circle fill='#000000' cx='12' cy='19' r='2' />
                                                </g>
                                              </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <Dropdown.Item href='#'>Transfer Funds</Dropdown.Item>
                                              <Dropdown.Item href='#'>Change max leverage</Dropdown.Item>
                                              <Dropdown.Item href='#'>Add nickname</Dropdown.Item>
                                              <Dropdown.Item href='#'>Account information</Dropdown.Item>
                                              <Dropdown.Item href='#'>Set read-only access</Dropdown.Item>
                                              <Dropdown.Item href='#'>Manage your statements</Dropdown.Item>
                                              <Dropdown.Item href='#'>Change trading password</Dropdown.Item>
                                              <Dropdown.Item href='#'>Archive account</Dropdown.Item>

                                            </Dropdown.Menu>
                                          </Dropdown>
									                   </Link>
                                </div>
                            </div>	

                        </div>
                    </div>
                </div>
                 
                 
                ))}


    </div>
  )
}
