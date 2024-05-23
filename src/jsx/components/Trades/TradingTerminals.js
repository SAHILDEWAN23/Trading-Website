import React from 'react';
import {
    Row,
    Col,Button
  } from "react-bootstrap";

export default function TradingTerminals() {
  return (
    <div className='m-4'>
        <h2>Default Terminal</h2>
        <p>Set the default trading terminal for all your MT4 and MT5 accounts.</p>

        <div className='border border-primary bm-0'>
       <Row className='p-3'>
        <Col><span>MT5 Accounts</span></Col>
        <Col><span className='text-primary fs-18'>Set your default terminal</span></Col>
        <Col>
                <Button className='me-2' variant='outline-danger'>
                 Change
                </Button>
        </Col>
       </Row>
       </div>

       <div className='border border-primary bm-0'>
       <Row className='p-3'>
        <Col><span>MT4 Accounts</span></Col>
        <Col><span className='text-primary fs-18'>Set your default terminal</span></Col>
        <Col>
                <Button className='me-2' variant='outline-danger'>
                 Change
                </Button>
        </Col>
       </Row>
       </div>

    </div>
  )
}
