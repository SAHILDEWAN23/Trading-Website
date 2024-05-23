import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import Profile from './Profile';
import SecuritySettings from './SecuritySettings';
import TradingTerminals from './TradingTerminals';
import TradingConditions from './TradingConditions';
import VirtualPrivateServer from './VirtualPrivateServer';

export default function Performance() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h2 className="mb-4">Settings</h2>
      <div className='row'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          role="navigation"
        >
          <Tab label="Profile" />
          <Tab label="Security Settings" />
          <Tab label="Trading Terminals" />
          <Tab label="Trading Conditions" />
          <Tab label="Virtual Private Server" />
        </Tabs>
      </div>
      <div>
        {value === 0 && <Profile />}
        {value === 1 && <SecuritySettings/>}
        {value === 2 && <TradingTerminals/>}
        {value === 3 && <TradingConditions />}
        {value === 4 && <VirtualPrivateServer/>}
      </div>
    </>
  );
}
