import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Real from './Real';
import Demo from './Demo';

export default function Performance() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
     <div className="row mb-5 align-items-center">
			<div className="col-lg-9 mb-2">
					<div className="card m-0 ">
						<div className="card-body py-3 py-md-2 p-2 mb-1">
							<div className="row align-items-center">
								<div className="col-md-5 mb-3 mb-md-0 p-2">
									<div className="media align-items-end">
										
										<div className="media-body ms-1">
											<h1 className="mb-0 font-w600 fs-24 pl-4">My Accounts</h1>
										</div>
									</div>
								</div>
								
							</div>							
						</div>
					</div>
                   
				</div>
				<div className="col-lg-3 mb-4 mb-lg-0 mt-lg-1 mb-1 ">
					<Link to="/new-account" className="btn btn-outline-primary light  btn-lg btn-block rounded" > +New Account</Link>
				</div>
				
			</div>
            <div className='row'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          role="navigation"
        >
          <Tab label="Real" />
          <Tab label="Demo" />
         
        </Tabs>
      </div>
      <div>
        {value === 0 && <Real />}
        {value === 1 && <Demo/>}
      </div>
    </>
  );
}
