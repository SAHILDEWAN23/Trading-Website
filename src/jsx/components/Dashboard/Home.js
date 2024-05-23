import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Card } from 'react-bootstrap';
import api from '../../../services/api';

function Home() {
  const { changeBackground } = useContext(ThemeContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    closedTrades: 0,
    openTrades: 0,
    totalAccounts: 0,
    totalDeposit: 0,
    totalWithdraw: 0,
  });

  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/dashboard-stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const iconStyle = { color: '#acb0b8' };

  return (
    <Fragment> 
      <div className="row">
        <div className='col-xl-3 col-xxl-4 col-lg-6 col-sm-6'>
          <div className='widget-stat card'>
            <div className='card-body p-4'>
              <div className='media'>
                <span className='me-3'>
                  <i className='flaticon-381-user-7' style={iconStyle}></i>
                </span>
                <div className='media-body text-white text-end'>
                  <p className='mb-1'>Total Users</p>
                  <h4 className='text-white'>{stats.totalUsers}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-xxl-4 col-lg-6 col-sm-6'>
          <div className='widget-stat card'>
            <div className='card-body p-4'>
              <div className='media'>
                <span className='me-3'>
                  <i className='flaticon-381-network' style={iconStyle}></i>
                </span>
                <div className='media-body text-white text-end'>
                  <p className='mb-1'>Closed Trades</p>
                  <h4 className='text-white'>{stats.closedTrades}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-xxl-4 col-lg-6 col-sm-6'>
          <div className='widget-stat card'>
            <div className='card-body p-4'>
              <div className='media'>
                <span className='me-3'>
                  <i className='flaticon-381-network' style={iconStyle}></i>
                </span>
                <div className='media-body text-white text-end'>
                  <p className='mb-1'>Open Trades</p>
                  <h4 className='text-white'>{stats.openTrades}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-xxl-4 col-lg-6 col-sm-6'>
          <div className='widget-stat card'>
            <div className='card-body p-4'>
              <div className='media'>
                <span className='me-3'>
                  <i className='flaticon-381-network' style={iconStyle}></i>
                </span>
                <div className='media-body text-white text-end'>
                  <p className='mb-1'>Total Accounts</p>
                  <h4 className='text-white'>{stats.totalAccounts}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-xxl-4 col-lg-6 col-sm-6'>
          <div className='widget-stat card'>
            <div className='card-body p-4'>
              <div className='media'>
                <span className='me-3'>
                  <i className='flaticon-381-network' style={iconStyle}></i>
                </span>
                <div className='media-body text-white text-end'>
                  <p className='mb-1'>Total Deposit</p>
                  <h4 className='text-white'>${stats.totalDeposit} </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-xxl-4 col-lg-6 col-sm-6'>
          <div className='widget-stat card'>
            <div className='card-body p-4'>
              <div className='media'>
                <span className='me-3'>
                  <i className='flaticon-381-network' style={iconStyle}></i>
                </span>
                <div className='media-body text-white text-end'>
                  <p className='mb-1'>Total Withdraw</p>
                  <h4 className='text-white'>${stats.totalWithdraw} </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Home;
