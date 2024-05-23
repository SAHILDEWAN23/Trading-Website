import React from "react";

import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

import LogoutPage from './Logout';
/// Image
import profile from "../../../images/profile/12.png";
import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";

const Header = ({ onNote, toggle, onProfile, onNotification, onClick }) => {
  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;
  return (
    <div className="header">
		<div className="header-content">
			<nav className="navbar navbar-expand">
				<div className="collapse navbar-collapse justify-content-between">
					<div className="header-left">
						<div
							className="dashboard_bar"
							style={{ textTransform: "capitalize" }}
						  >
							{finalName.join(" ").length === 0
							  ? "Dashboard"
							  : finalName.join(" ")}
						</div>
					</div> 	
					<ul className="navbar-nav header-right">
						{/* <li className="nav-item">
							<div className="input-group search-area ms-auto d-inline-flex">
								<input type="text" className="form-control" placeholder="Search here"  />
								<div className="input-group-append">
									<button type="button" className="input-group-text"><i className="flaticon-381-search-2"></i></button>
								</div>
							</div>
						</li> */}
						{/*  */}
						
						<Dropdown as="li" className="nav-item header-profile ">
							<Dropdown.Toggle as="a" to="#" variant="" className="nav-link i-false c-pointer">								
								<img src={profile} width="20" alt=""/>
								<div className="header-info">
									<span>David<i className="fa fa-caret-down ms-3" aria-hidden="true"></i></span>
								</div>
                                
							</Dropdown.Toggle>
							<Dropdown.Menu align="right" className="mt-2">
							  <Link to="/" className="dropdown-item ai-icon">
								<svg
								  id="icon-user1"
								  xmlns="http://www.w3.org/2000/svg"
								  className="text-primary"
								  width={18}
								  height={18}
								  viewBox="0 0 24 24"
								  fill="none"
								  stroke="currentColor"
								  strokeWidth={2}
								  strokeLinecap="round"
								  strokeLinejoin="round"
								>
								  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
								  <circle cx={12} cy={7} r={4} />
								</svg>
								<span className="ms-2">Home </span>
							  </Link>
							 
                               <LogoutPage />
							</Dropdown.Menu>
						</Dropdown>
					</ul>
				</div>
			</nav>
		</div>
    </div>
  );
};

export default Header;
