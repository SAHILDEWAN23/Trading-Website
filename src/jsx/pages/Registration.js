import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import logo from '../../images/logo-2.png'
import login from "../../images/bg-login2.png";
import loginbg from "../../images/bg-login.jpg";import Loader from '../pages/Loader/Loader';
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
import api from '../../services/api';
import Select from 'react-select';



function Register(props) {
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
      };


    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }

        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }

        if (selectedCountry === '') {
            errorObj.selectedCountry = 'Select Your Country';
            error = true;
        }


        setErrors(errorObj);

        if (error) return;
        dispatch(loadingToggleAction(true));

        dispatch(signupAction(email, password,selectedCountry, navigate));
    }

    useEffect(() => {
        // Make HTTP GET request to fetch country names
        api.get('/countries')
          .then(response => {
            // Update countries state with fetched country names
            const countryOptions = response.data.map(country => ({
              value: country,
              label: country
            }));
            setCountries(countryOptions);
          })
          .catch(error => {
            console.error('Error fetching country names:', error.message);
          });
      }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className="login-main-page" style={{backgroundImage:"url("+ loginbg +")"}}>
    <div className="login-wrapper">
        <div className="login-aside-left" style={{backgroundImage:"url("+ login +")"}}>
            <Link to="/dashboard" className="login-logo">
                <img src={logo} alt="" />
              </Link>
            <div className="login-description">
                <h2 className="mb-2">Check the Status</h2>
                <p className="fs-12">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
                <ul className="social-icons mt-4">
                    <li><Link to={"#"}><i className="fab fa-facebook-f"></i></Link></li>
                    <li><Link to={"#"}><i className="fab fa-twitter"></i></Link></li>
                    <li><Link to={"#"}><i className="fab fa-linkedin-in"></i></Link></li>
                </ul>
                <div className="mt-5">
                    <Link to={"#"} className=" me-4">Privacy Policy</Link>
                    <Link to={"#"} className=" me-4">Contact</Link>
                    <Link to={"#"} className="">© 2023 DexignZone</Link>
                </div>
            </div>
        </div>
        <div className="login-aside-right">
            <div className="row m-0 justify-content-center h-100 align-items-center">
              <div className="col-xl-7 col-xxl-7">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form-1">
                        <div className="mb-4">
                            <h3 className="text-primary mb-1">Welcome to Karciz</h3>
                            <p className="">Sign Up by entering information below</p>
                        </div>
                        {props.errorMessage && (
                            <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                                {props.errorMessage}
                            </div>
                        )}
                        {props.successMessage && (
                            <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                                {props.successMessage}
                            </div>
                        )}
                        <form onSubmit={onSignUp}>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Country</strong>
                                            </label>
                                            <Select styles={{
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isFocused ? 'transparent' : 'transparent',
      color: '#fff !important'
    }),
  }}

                      placeholder="Select Country"
                      value={selectedCountry}
                      onChange={handleChange}
                      options={countries}
                    />                                        </div>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Email</strong>
                                            </label>
                                            <input type="email" className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Password</strong>
                                            </label>
                                            <input type="password" className="form-control"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </div>
                                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                        <div className='text-center mt-4'>
                                            <input type='submit' className='btn btn-primary btn-block'/>
                                        </div>
                                    </form>
                        <div className="new-account mt-2">
                          <p className="">
                            Don't have an account?{" "}
                            <Link className="text-primary" to="/login">
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</div>
  )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);
