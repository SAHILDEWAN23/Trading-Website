import React from 'react'
import { Row, Card, Col, Accordion} from 'react-bootstrap'

const defaultAccordion = [
    {
      title: "Personal details confirmed",
      text:
        "Your confirmed details",
      bg: "primary",
    
    },
    {
      title: "Your identity verified",
      text:
        "Your verified details.",

      bg: "info",
    
    },
    {
      title: "Your residential address verified",
      text:
      "Your verified details.",

      bg: "success",
    
    },
];


export default function Profile() {
  return (
    <div className='mt-4'>
          <h3>Account</h3>
          <Row>
          <Col xl='6'>
          <Card>
            <Card.Body style={{ height:'150px' }}>
              <p>Verification status</p>
              <h3 className='text-success'>Fully verified</h3>
              <p>3/3 steps complete</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl='6'>
          <Card>
            <Card.Body style={{ height:'150px' }}>
              <p>Deposit limit</p>
              <h3 className='text-success'>Unlimited</h3>
              <p>Depending on payment method</p>
            </Card.Body>
          </Card>
        </Col>
        </Row>
        <Row>
          <Col xl="12">
            <Card>
            <Card.Header className="d-block">
              <Card.Title>Verification steps</Card.Title>
            </Card.Header>
            <Card.Body>
              <Accordion
                className="accordion accordion-solid-bg"
                defaultActiveKey="0"
              >
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item  key={i} eventKey={`${i}`}>
                    <Accordion.Header  className="accordion-header  accordion-header-primary">
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">{d.title}</span>
                      <span className="accordion-header-indicator "></span>
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                      <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item >
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>



        </Row>
    </div> 
  )
}
