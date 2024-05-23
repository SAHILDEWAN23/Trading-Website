// HistoryOfOrders.jsx
import React from 'react';
import Select from 'react-select';
import {
    Row,
    Col,
    Card,
    Table,
    Badge,
    Dropdown
  } from "react-bootstrap";
    
  
  const svg1 = (
      <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect x="0" y="0" width="24" height="24"></rect>
          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
        </g>
      </svg>
    );


const options = [
    { value: '2', label: 'Newest' },
    { value: '3', label: 'Oldest' },
    { value: '4', label: 'Free Margin' },
    { value: '5', label: 'Nickname' },
]


const HistoryOfOrders = () => {
  return (
    <div className='mt-4'>
       <div className="row mb-5 align-items-center">
			       <div className="col-lg-3 mb-4 mb-lg-0 mt-lg-1">
			   
                    <Select options={options} className="custom-react-select mb-3 mb-xxl-0"/>
   
			       </div>
        </div>
      
        <Col lg={12}>
          <Card>
          <Card.Header className='row align-items-center'>
         
                <Col className='col-md-8 mb-3 mb-md-0'>
                  <Card.Title>Orders History</Card.Title>
                </Col>
                <Col className="col-md-4 text-md-end">
                <div className='input-group mb-3'>
                    <input type='text' className='form-control' />
                    
                      <button className='btn btn-primary' type='button'>
                        Search
                      </button>
                    
                  </div>

                </Col>
            
            </Card.Header>

           
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>#</strong>
                    </th>
                    <th>
                      <strong>PATIENT</strong>
                    </th>
                    <th>
                      <strong>DR NAME</strong>
                    </th>
                    <th>
                      <strong>DATE</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th>
                      <strong>PRICE</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>01</strong>
                    </td>
                    <td>Mr. Bobby</td>
                    <td>Dr. Jackson</td>
                    <td>01 August 2020</td>
                    <td>
                      <Badge variant="success light">Successful</Badge>
                    </td>
                    <td>$21.56</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="success"
                          className="light sharp i-false"
                        >
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>




    </div>

    
  );
};

export default HistoryOfOrders;
