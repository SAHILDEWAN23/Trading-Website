import React from 'react';
import {
    Row,
    Col
  } from "react-bootstrap";

export default function TradingConditions() {
  return (
    <div className='m-4'>
         <h2>Trading Conditions</h2>
        <p>Here's a list of the better-than-market trading conditions you can currently enjoy on your accounts.</p>
        <Row>
            <Col>
            <div className='border border-primary p-3 mt-2'>
            <h4>Negative Balance Protection</h4>
            <p>You can never lose more money than you put into your account. If a stop out causes all your positions to close in a negative balance, we will restore it to 0.</p>
            <a href='#' className='text-info'>Learn More</a>
            </div>
            </Col>

            <Col>
            <div className='border border-primary p-3 mt-2'>
            <h4>Swap-Free</h4>
            <p>No more overnight charges. Hold positions on popular instruments for as long as you want, without paying swaps. The list of swap-free instruments varies depending on your Swap-Free Level.</p>
            <a href='#' className='text-info'>Learn More</a>
            </div>
            </Col>

        </Row>

    </div>
   
  )
}
