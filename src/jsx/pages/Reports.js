import React,{useState, useEffect, useRef} from 'react';
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import ReportPieChart from './Reports/ReportPieChart';
import ReportPieChart2 from './Reports/ReportPieChart2';
import ReportPieChart3 from './Reports/ReportPieChart3';

const chartBlog = [
    {title:'Employees'},
    {title:'Customers'},
];

const ticketBlog = [
    {title:'New', color:'warning'},
    {title:'Inprogress', color:'success'},
    {title:'On-Hold', color:'info'},
    {title:'Re-Open', color:'primary'},
    {title:'Closed', color:'danger'},
];

const ticketData = [
    {number:"01", emplid:"Emp-0852", count:'3'},
    {number:"02", emplid:"Emp-2052", count:'5'},
    {number:"03", emplid:"Emp-3052", count:'9'},
    {number:"04", emplid:"Emp-3055", count:'8'},
    {number:"05", emplid:"Emp-1052", count:'6'},
    {number:"06", emplid:"Emp-3055", count:'1'},
    {number:"07", emplid:"Emp-3052", count:'4'},
];

const Reports = () => {
    const [data, setData] = useState(
		document.querySelectorAll("#report_wrapper tbody tr")
	);
	const sort = 10;
	const activePag = useRef(0);
	//const [test, settest] = useState(0);

	// Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
   // use effect
   useEffect(() => {
      setData(document.querySelectorAll("#report_wrapper tbody tr"));
      //chackboxFun();
	}, []);

  
   // Active pagginarion
   activePag.current === 0 && chageData(0, sort);
   // paggination
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

   // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		//settest(i);
	};
    return (
        <>
            <div className="row">
                {chartBlog.map((item, index)=>(
                    <div className="col-xl-3 col-md-6" key={index}>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">{item.title}</h4>
                            </div>
                            <div className="card-body">
                                {index === 0 ? 
                                    <ReportPieChart />
                                    :
                                    index === 1 ? 
                                        <ReportPieChart2 />
                                    :
                                    ''
                                }
                                <div className="chart-deta d-flex justify-content-center">
                                    <div className="mb-0 d-flex justify-content-center me-2">
                                        <span className="dots bg-warning"></span>	
                                        <div className="dots-text my-auto">
                                            <p className="fs-14 mb-0">Active</p>
                                        </div>
                                    </div>
                                    <div className="mb-0 d-flex justify-content-center me-2">
                                        <span className="dots bg-success"></span>	
                                        <div className="dots-text my-auto">
                                            <p className="fs-14 mb-0">Inactive</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	
                ))}
                <div className="col-xl-6 col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Tickets</h4>
                        </div>
                        <div className="card-body d-flex">
                         
                            <ReportPieChart3 />
                            <div className="chart-deta d-flex align-items-center flex-wrap">
                                {ticketBlog.map((data, ind)=>(
                                    <div className="mb-2 d-flex me-3" key={ind}>
                                        <span class={`dots bg-${data.color}`}></span>	
                                        <div className="dots-text">
                                            <p className="fs-14 mb-0">{data.title}</p>
                                        </div>
                                    </div>
                                ))}                               
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Employee Reports</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive ticket-table">
                                <div id="report_wrapper" className="dataTables_wrapper no-footer">
                                    <div className='d-flex justify-content-between mb-3 custom-tab-list'>
                                        <div className='d-flex align-items-center'>
                                            <label className="me-2">Show</label>
                                            <Dropdown className="search-drop">
                                                <Dropdown.Toggle className="">10</Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>25</Dropdown.Item>
                                                    <Dropdown.Item>50</Dropdown.Item>
                                                    <Dropdown.Item>75</Dropdown.Item>
                                                    <Dropdown.Item>100</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <label className="ms-2">entries</label>
                                        </div>
                                        <div className="col-2 d-flex align-items-center">
                                            <label className="me-2">Search:</label>
                                            <inpout type="search" placeholder="" className="form-control" />
                                        </div>
                                    </div>
                                    <table id="example" className="display dataTablesCard table-responsive-xl dataTable no-footer w-100">
                                        <thead>
                                            <tr>                                               	                                            
                                                <th>S.No.</th>
												<th>Employee ID</th>
												<th>Name</th>
												<th>Rating</th>
												<th>Reply Count</th>                                           
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ticketData.map((item, index)=>(
                                                <tr key={index}>     
                                                    <td className="sorting_1">{item.number}</td>
                                                    <td>{item.emplid}</td>
                                                    <td>						
                                                        <div>
                                                            <Link to={"#"} className="h5">Timothy L. Brodbeck</Link>
                                                        </div>
                                                    </td>                                                    
                                                    <td>
                                                        <ul className="star-rating">
                                                            <li><i className="fa fa-star"></i></li>{" "}
                                                            <li><i className="fa fa-star"></i></li>{" "}
                                                            <li><i className="fa fa-star"></i></li>{" "}
                                                            <li><i className="far fa-star"></i></li>{" "}
                                                            <li><i className="far fa-star"></i></li>
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <span className="badge light badge-success">{item.count}</span>
                                                    </td>
                                                </tr>
                                            ))}                                           
                                        </tbody>                                        
                                    </table>
                                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                                        <div className="dataTables_info">
                                            Showing {activePag.current * sort + 1} to{" "}
                                            {data.length > (activePag.current + 1) * sort
                                                ? (activePag.current + 1) * sort
                                                : data.length}{" "}
                                            of {data.length} entries
                                        </div>
                                        <div
                                            className="dataTables_paginate paging_simple_numbers mb-0"
                                            id="example2_paginate"
                                        >
                                            <Link
                                                className="paginate_button previous disabled"
                                                to="/reports"
                                                onClick={() =>
                                                    activePag.current > 0 &&
                                                    onClick(activePag.current - 1)
                                                }
                                            >
                                                Previous
                                            </Link>
                                            <span>
                                                {paggination.map((number, i) => (
                                                    <Link
                                                        key={i}
                                                        to="/reports"
                                                        className={`paginate_button  ${
                                                            activePag.current === i ? "current" : ""
                                                        } `}
                                                        onClick={() => onClick(i)}
                                                    >
                                                        {number}
                                                    </Link>
                                                ))}
                                            </span>

                                            <Link
                                                className="paginate_button next"
                                                to="/reports"
                                                onClick={() =>
                                                    activePag.current + 1 < paggination.length &&
                                                    onClick(activePag.current + 1)
                                                }
                                            >
                                                Next
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Reports;