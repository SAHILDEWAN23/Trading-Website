import React from 'react';
import {
    Row,
    Col,ListGroup,Button
  } from "react-bootstrap";
  import {Link} from 'react-router-dom';


export default function NewAccount() {
  return (
    <div>
          <div className='row'>
            <h1>Open New Account</h1>
          </div>
          <Row>
               <Col>
               <div className='border border-primary p-3 mt-2'>
                  <h4 className='text-center'>Standard</h4>
                  <p>Most popular!A great account for all types of traders.</p>
                 <div className="basic-list-group">
                        <ListGroup as="ul">
                          
                                 <ListGroup.Item as="li">Minimum initial deposit - <span className='text-primary'>1 USD</span></ListGroup.Item>
                                 <ListGroup.Item as="li">Spread - <span className='text-primary'>From 0.20</span></ListGroup.Item>
                                 <ListGroup.Item as="li">Commission - <span className='text-primary'>No Commission</span></ListGroup.Item>

                        </ListGroup>
                     </div> 
                     <div className='m-2 text-center btn-lg'>
                     <Link to="/account-form?accountType=Standard" className='btn btn-outline-primary light me-2'>
  Continue
</Link>

                          </div>          
             </div>
               </Col>
               <Col>
               <div className='border border-primary p-3 mt-2'>
                  <h4 className='text-center'>Pro</h4>
                  <p>Zero commission and low spreads with both instant or market execution.</p>
                  <div className="basic-list-group">
                        <ListGroup as="ul">
                          
                                 <ListGroup.Item as="li">Minimum initial deposit - <span className='text-primary'>500 USD</span></ListGroup.Item>
                                 <ListGroup.Item as="li">Spread - <span className='text-primary'>From 0.10</span></ListGroup.Item>
                                 <ListGroup.Item as="li">Commission - <span className='text-primary'>No Commission</span></ListGroup.Item>

                        </ListGroup>
                     </div> 
                          <div className='m-2 text-center btn-lg'>
                          <Link to="/account-form?accountType=Pro" className='btn btn-outline-primary light me-2'>
  Continue
</Link>

                          </div>
                    </div>
               </Col>

          </Row>
    </div>
  )
}
