import React,{useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

const ticketData = [
    {title:'Glee Smiley', gender:'Male', type:'Customer', Rgdate:'10 Jan, 2023', Expdate:'12 Jan, 2023' },
    {title:'Louis Jovanny', gender:'Male',type:'Guest', Rgdate:'13 Jan, 2023', Expdate:'15 Jan, 2023'   },
    {title:'Cindy Hawkins', gender:'Female',type:'Customer', Rgdate:'14 Jan, 2023', Expdate:'16 Jan, 2023'},
    {title:'Glee Smiley', gender:'Male',type:'Guest', Rgdate:'17 Jan, 2023', Expdate:'19 Jan, 2023'},
    {title:'Timothy L. Brodbeck', gender:'Male',type:'Customer', Rgdate:'18 Jan, 2023', Expdate:'20 Jan, 2023'},
    {title:'Louis Jovanny', gender:'Male', type:'Guest', Rgdate:'21 Jan, 2023', Expdate:'23 Jan, 2023'},
    {title:'Timothy L. Brodbeck', gender:'Female',type:'Customer', Rgdate:'22 Jan, 2023', Expdate:'24 Jan, 2023'},
    {title:'Cindy Hawkins', gender:'Male',type:'Customer', Rgdate:'25 Jan, 2023', Expdate:'27 Jan, 2023'},
    {title:'Louis Jovanny', gender:'Male',type:'Guest', Rgdate:'26 Jan, 2023', Expdate:'28 Jan, 2023'},
    {title:'Cindy Hawkins', gender:'Female',type:'Customer', Rgdate:'29 Jan, 2023', Expdate:'30 Jan, 2023'},
];


const CustomersList = () => {
    const [data, setData] = useState(
		document.querySelectorAll("#ticket_wrapper tbody tr")
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
      setData(document.querySelectorAll("#ticket_wrapper tbody tr"));
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

   
	const chackbox = document.querySelectorAll(".sorting_1 input");
	const motherChackBox = document.querySelector(".sorting_asc input");
   // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
	const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
         const element = chackbox[i];
         if (type === "all") {
            if (motherChackBox.checked) {
               element.checked = true;
            } else {
               element.checked = false;
            }
         } else {
            if (!element.checked) {
               motherChackBox.checked = false;
               break;
            } else {
               motherChackBox.checked = true;
            }
         }
      }
    };
    return (
        <>
            <div className="row page-titles">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><Link to={"#"}> Customers</Link></li>
                    <li className="breadcrumb-item"><Link to={"#"}> Customers List</Link></li>
                </ol>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Customers List</h4>
                            <Link to={"/create-ticket"} className="btn btn-primary">Add Customers</Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive ticket-table">
                                <div id="ticket_wrapper" className="dataTables_wrapper no-footer">
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
                                                <th className="sorting_asc">
                                                    <div className="form-check custom-checkbox ms-2">
                                                        <input type="checkbox" className="form-check-input" id="checkAll" required="" onClick={() => chackboxFun("all")}/>
                                                        <label className="form-check-label" for="checkAll"></label>
                                                    </div>
                                                </th>	                                            
                                                <th>Name</th>
												<th>Gender</th>
												<th>User Type</th>
												<th>Register Date</th>
												<th>Expire Date</th>
												<th>Status</th>
												<th>Actions</th>                                          
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ticketData.map((item, index)=>(
                                                <tr key={index}>
                                                    <td className='sorting_1'>
                                                        <div className="form-check custom-checkbox ms-2">
                                                            <input type="checkbox" className="form-check-input" id={`customCheck${index + 1}`} required="" />
                                                            <label className="form-check-label" for={`customCheck${index + 1}`}></label>
                                                        </div>
                                                    </td>
                                                    
                                                    <td>						
                                                        <div>
                                                            <Link to={"#"} className="h5">{item.title}</Link>
                                                        </div>
                                                        <small className="fs-12 text-muted"> <span className="font-weight-normal1">customer@gmail.com</span></small>
                                                        
                                                    </td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.type}</td>
                                                    <td>
                                                        <span className="badge light badge-success">{item.Rgdate}</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge light  badge-danger">{item.Expdate}</span>
                                                    </td>
                                                    <td>
                                                        { index % 2 ? 
                                                         <span className="badge badge-success">Active</span>
                                                         : 
                                                            <span className="badge badge-danger">Inactive</span>
                                                         }


                                                    </td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <Link to={"#"} className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></Link>
                                                            <Link to={"#"} className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></Link>
                                                        </div>
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
                                                to="/customers-list"
                                                onClick={() =>
                                                    activePag.current > 0 &&
                                                    onClick(activePag.current - 1)
                                                }
                                            >
                                                {/* <i className="fa-solid fa-angle-left"></i> */}
                                                Previous
                                            </Link>
                                            <span>
                                                {paggination.map((number, i) => (
                                                    <Link
                                                        key={i}
                                                        to="/customers-list"
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
                                                to="/customers-list"
                                                onClick={() =>
                                                    activePag.current + 1 < paggination.length &&
                                                    onClick(activePag.current + 1)
                                                }
                                            >
                                                {/* <i className="fa-solid fa-angle-right"></i> */}
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


export default CustomersList;