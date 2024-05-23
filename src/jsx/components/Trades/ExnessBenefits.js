// ExnessBenefits.jsx
import React from 'react';
import Select from 'react-select';


const options = [
    { value: '2', label: 'Newest' },
    { value: '3', label: 'Oldest' },
    { value: '4', label: 'Free Margin' },
    { value: '5', label: 'Nickname' },
]

const ExnessBenefits = () => {
  return (
    <div className='mt-4'>
      <h3>Our benefits have saved you</h3>
      <div className="row mb-5 align-items-center">
			       <div className="col-lg-3 mb-4 mb-lg-0 mt-lg-1">
			   
                    <Select options={options} className="custom-react-select mb-3 mb-xxl-0"/>
   
			       </div>
        </div>
    </div>
  );
};

export default ExnessBenefits;
