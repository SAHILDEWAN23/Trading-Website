import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import Summary from './Summary';
import HistoryOfOrders from './HistoryOfOrders';
import ExnessBenefits from './ExnessBenefits';

export default function Performance() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h2 className="mb-4">Performance</h2>
      <div className='row'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          role="navigation"
        >
          <Tab label="Summary" />
          <Tab label="History of orders" />
          <Tab label="Exness benefits" />
        </Tabs>
      </div>
      <div>
        {value === 0 && <Summary />}
        {value === 1 && <HistoryOfOrders />}
        {value === 2 && <ExnessBenefits />}
      </div>
    </>
  );
}
