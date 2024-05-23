import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../store/actions/AuthActions';

//
import logo from '../../images/logo-2.png'
import login from "../../images/bg-login2.png";
import loginbg from "../../images/bg-login.jpg";

function Login (props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    let errorsObj = { username: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('123456');
    const dispatch = useDispatch();

    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (username === '') {
            errorObj.username = 'Username is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
          return ;
        }
		    dispatch(loadingToggleAction(true));	
        dispatch(loginAction(username, password, navigate));
    }

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
                                    <p className="">Sign in by entering information below</p>
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
                                <form onSubmit={onLogin}>
                                    <div className="form-group">
                                        <label className="mb-2 ">
                                          <strong>Username</strong>
                                        </label>
                                        <input type="username" className="form-control"
                                          value={username}
                                           onChange={(e) => setUsername(e.target.value)}
                                        />
                                      {errors.username && <div className="text-danger fs-12">{errors.username}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2 "><strong>Password</strong></label>
                                        <input
                                          type="password"
                                          className="form-control"
                                          value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                    </div>
                                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                      <div className="form-group">
                                        <div className="form-check custom-checkbox ms-1 ">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="basic_checkbox_1"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="basic_checkbox_1"
                                          >
                                            Remember my preference
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                      >
                                        Sign In
                                      </button>
                                    </div>
                                </form>
                                
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
export default connect(mapStateToProps)(Login);