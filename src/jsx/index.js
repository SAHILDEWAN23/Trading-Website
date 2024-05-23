import React, { useContext } from "react";

/// React router dom
import {  Routes, Route, Outlet  } from "react-router-dom";

/// Css
//import "swiper/css";
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from './layouts/ScrollToTop';
/// Dashboard
import Home from './components/Dashboard/Home';
import EventPage from './components/Dashboard/EventPage';


//Demo
import Theme1 from './components/Dashboard/demo/Theme1';
import Theme2 from './components/Dashboard/demo/Theme2';
//import Theme3 from './components/Dashboard/demo/Theme3';
import Theme4 from './components/Dashboard/demo/Theme4';
import Theme5 from './components/Dashboard/demo/Theme5';
import Theme6 from './components/Dashboard/demo/Theme6';


//Content



//Ticket


//Customers

/// App


/// Product List


/// Charts


/// Bootstrap

/// Plugins

//Redux
import Todo from "./pages/Todo";
//import ReduxForm from "./components/Forms/ReduxForm/ReduxForm";
//import WizardForm from "./components/Forms/ReduxWizard/Index";

/// Widget
import Widget from "./pages/Widget";

/// Table


/// Form


/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import Reports from "./pages/Reports";
import Deposit from "./components/Trades/Deposit";
import Withdrawal from "./components/Trades/Withdrawal";
import TransactionHistory from "./components/utilities/TransactionHistory";
import DepositHistory from "./components/Trades/DepositHistory";
import WithdrawHistory from "./components/Trades/WithdrawHistory";
import Performance from "./components/Trades/Performance";
import Settings from "./components/Trades/Settings";
import Analytics from "./components/Trades/Analytics";
import NewAccount from "./components/Trades/NewAccount";
import AccountForm from "./components/Trades/AccountForm";
import MyAccounts from "./components/Trades/MyAccounts";
import DepositForm from "./components/Trades/DepositForm";
import BankDeposit from "./components/Trades/BankDeposit";
import WalletDeposit from "./components/Trades/WalletDeposit";
import WithdrawForm from "./components/Trades/WithdrawForm";
import TradeHistory from "./components/Trades/TradeHistory";
import SuccessWithdraw from "./components/Trades/SuccessWithdraw";
import FailedWithdraw from "./components/Trades/FailedWithdraw";
import PendingWithdraw from "./components/Trades/PendingWithdraw";
import BankInfo from "./components/Trades/BankInfo";
import CurrencyReport from "./components/Trades/CurrencyReport";
import PaymentMethod from "./components/Trades/PaymentMethod";
import SuccessDeposit from "./components/Trades/SuccessDeposit";
import FailedDeposit from "./components/Trades/FailedDeposit";
import PendingDeposit from "./components/Trades/PendingDeposit";
import UserAccounts from "./components/Trades/UserAccounts";
import ManageUsers from "./components/Trades/ManageUsers";
import ManageTickets from "./components/Trades/ManageTickets.js";
import LogoutPage from './layouts/nav/Logout';
import ViewMessage from "./components/Trades/ViewMessage.js";




const Markup = () => {
  //const { menuToggle } = useContext(ThemeContext);
  const allroutes = [
    /// Dashboard
    { url: "", component: <Home /> },
    { url: 'dashboard', component: <Home/> },
  
	  // { url: 'analytics', component: <Analytics/> },
	 

    { url: 'deposit', component: <Deposit/> },
    { url: 'withdraw', component: <Withdrawal/> },
    { url: 'transaction-history', component: <TransactionHistory/> },

    { url: 'user-accounts', component: <UserAccounts/> },

    { url: 'manage-users', component: <ManageUsers/> },


   //Transaction History
   { url: 'withdraw-history', component: <WithdrawHistory/> },
   { url: 'deposit-history', component: <DepositHistory/> },

   //Performance

    //Settings
    { url: 'settings', component: <Settings/> },

    { url: 'currencies', component: <CurrencyReport/> },
    { url: 'payment-methods', component: <PaymentMethod/> },


    //Analytics
    { url: 'analytics', component: <Analytics/> },

    { url: 'new-account', component: <NewAccount/> },
    { url: 'account-form', component: <AccountForm/> },
    { url: 'my-accounts', component: <MyAccounts/> }, 
    { url: 'deposit-form', component: <DepositForm/> }, 
    { url: 'withdraw-form', component: <WithdrawForm/> }, 
    { url: 'withdraw-form', component: <WithdrawForm/> }, 
    { url: 'trade-history', component: <TradeHistory/> }, 

    { url: 'withdraw-approved', component: <SuccessWithdraw/> }, 
    { url: 'withdraw-rejected', component: <FailedWithdraw/> }, 
    { url: 'withdraw-pending', component: <PendingWithdraw/> }, 

    { url: 'approved-deposits', component: <SuccessDeposit/> }, 
    { url: 'declined-deposits', component: <FailedDeposit/> }, 
    { url: 'pending-deposits', component: <PendingDeposit/> }, 


    { url: 'confirm-bankdeposit', component: <BankDeposit/> }, 
    { url: 'confirm-walletdeposit', component: <WalletDeposit/> }, 

    { url: 'manage-tickets', component: <ManageTickets/> }, 
    { url: "view-message/:ticket_number", component: <ViewMessage /> },



    //Demo
	  { url: 'dark-sidebar', component: <Theme1/> },
	  { url: 'header-secondary', component: <Theme2/> },
	  { url: 'horizontal-sidebar', component: <Theme4/> },
	  { url: 'header-style', component: <Theme5/> },
	  { url: 'mini-sidebar', component: <Theme6/> },
    
    //Content
	  
    //Ticket
	

    //Customers
    
    //Reports


    /// Apps
   

    /// Chart
  

    /// Bootstrap
    

    /// Plugin
   
	///Redux
	//{ url: "redux-form", component: ReduxForm },
    //{ url: "redux-wizard", component: WizardForm },
	
    /// Widget

    /// Shop
   

    /// Form


    /// table

    { url: "bank-details", component: <BankInfo /> },

    { url: "logout", component: <LogoutPage /> },



    /// pages
    { url: "trade-terminal", component: <EventPage /> },
    { url: "page-register", component: <Registration /> },
    { url: "page-lock-screen", component: <LockScreen /> },
    { url: "page-login", component: <Login /> },
    { url: "page-forgot-password", component: <ForgotPassword /> },
    { url: "page-error-400", component: <Error400/> },
    { url: "page-error-403", component: <Error403/> },
    { url: "page-error-404", component: <Error404 /> },
    { url: "page-error-500", component: <Error500/> },
    { url: "page-error-503", component: <Error503/> },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      {/* <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div> */}
      <Routes>
          <Route path='page-lock-screen' element= {<LockScreen />} />
          <Route path='page-error-400' element={<Error400/>} />
          <Route path='page-error-403' element={<Error403/>} />
          <Route path='page-error-404' element={<Error404/>} />
          <Route path='page-error-500' element={<Error500/>} />
          <Route path='page-error-503' element={<Error503/>} />
          <Route path='trade-terminal' element={<EventPage/>} />
          <Route  element={<MainLayout />} > 
              {allroutes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`${data.url}`}
                  element={data.component}
                />
              ))}
          </Route>

      </Routes>
	  <ScrollToTop />
    </>
  );
};

function MainLayout(){
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ menuToggle ? "menu-toggle" : ""}`}>  
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
          <div className="container-fluid">
            <Outlet />                
          </div>
      </div>
      <Footer />
    </div>
  )

};

export default Markup;