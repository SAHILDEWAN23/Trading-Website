import React from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../../services/api';


export default function AccountForm() {
    const [searchParams] = useSearchParams();
  const accountType = searchParams.get('accountType');
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const token = userDetails.refreshToken;
  console.log({Token:token});

  const handleSubmit = (event) => {
    event.preventDefault();

    const remarksValue = event.target.gridRadios.value === 'Real' ? 1 : 0;

    console.log({Acc:accountType});
  
    const formData = {
       token,
      nickname: event.target.nickname.value,
      leverage: event.target.leverage.value,
      currency: event.target.Currency.value,
       accountType,
      status: "Active", // Assuming 'Real' or 'Demo' is your status
      remarks: remarksValue // Add logic to get remarks if applicable
    };
  
    api.post('trade_account',{formData})
    .then(data => {
      console.log('Success:', data);
      // You might want to redirect the user or clear the form here
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className='col-xl-8 col-lg-12'>
    <div className='card'>
      <div className='card-header'>
        <h4 className='card-title'>Open New Account-</h4>
      </div>
      <div className='card-body'>
        <div className='basic-form'>
          <form onSubmit={handleSubmit}>
          <input
                type='hidden'
                name='accountType'
                value={accountType || ''} // Default to an empty string if accountType is undefined
              />
            
            <div className='form-group row'>
              <label className='col-sm-3 col-form-label'>Account Nickname</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nickname'
                  name='nickname' // Name attribute added
                />
              </div>
            </div>
            <div className='form-group row'>
                    <label className='col-sm-3 col-form-label'>Max leverage:</label>
                    <div className='col-sm-9'>
                    <select
                      defaultValue={'option'}
                      className='form-control'
                      id='leverage'
                      name='leverage' // Name attribute added

                    >
                      <option>1:2</option>
                      <option>1:20</option>
                      <option>1:50</option>
                    </select>
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label className='col-sm-3 col-form-label'>Currency:</label>
                    <div className='col-sm-9'>
                    <select
                      defaultValue={'option'}
                      className='form-control'
                      id='Currency'
                      name='currency' // Name attribute added

                    >
                      <option>USD</option>
                     
                    </select>
                    </div>
                  </div>
            <fieldset className='form-group'>
              <div className='row'>
                <label className='col-form-label col-sm-3 pt-0'>
                  Account
                </label>
                <div className='col-sm-9'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='gridRadios'
                      value='Real'
                      defaultChecked
                    />
                    <label className='form-check-label'>
                      Real
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='gridRadios'
                      value='Demo'
                    />
                    <label className='form-check-label'>
                      Demo
                    </label>
                  </div>
                  
                </div>
              </div>
            </fieldset>
           
            <div className='form-group row'>
              <div className='col-sm-10'>
                <button type='submit' className='btn btn-primary'>
Create an Account                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
   )
}
