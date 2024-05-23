import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import AnalystView from './AnalystView';
import MarketNews from './MarketNews';

export default function Performance() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h2 className="mb-4">Analytics</h2>
      <div className='row'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          role="navigation"
        >
          <Tab label="AnalystView" />
          <Tab label="MarketNews" />
        </Tabs>
      </div>
      <div>
        {value === 0 && <AnalystView />}
        {value === 1 && <MarketNews />}
      </div>
    </>
  );
}
