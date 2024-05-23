export const MenuList = [
    //Dashboard
    {
        title: 'Home',
        to: 'dashboard',		
        iconStyle: <i className="flaticon-381-home" />, // Home icon
    },
    {
        title: 'Bank Details',
        to: 'bank-details',      	
        iconStyle: <i className="flaticon-381-id-card-1" />, // Icon representing accounts or user information
    },
    {
        title: 'Manage Users',
        to: 'manage-users',		
        iconStyle: <i className="flaticon-381-user-7" />, // User management icon
    },
    {
        title: 'Currencies',
        to: 'currencies',		
        iconStyle: <i className="fas fa-donate" />, // Icon representing money or deposits
    },
    {
        title: 'Payment Methods',
        to: 'payment-methods',		
        iconStyle: <i className="	fas fa-money-check-alt" />, // Icon representing withdrawals or cash out
    },
    {
        title: 'User Accounts',
        to: 'user-accounts',		
        iconStyle: <i className="flaticon-381-id-card-1" />, // User accounts icon
    },
    {
        title: 'Transaction History',
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-table" />,
        content: [
           
            {
                title: 'Trade History',
                to: 'trade-history'
            },
        ],
    },
    {
        title: 'Withdraw History',
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-table" />,
        content: [
            {
                title: 'Pending Withdraw',
                to: 'withdraw-pending'
            },
            {
                title: 'Success Withdraw',
                to: 'withdraw-approved'
            },
            {
                title: 'Failed Withdraw',
                to: 'withdraw-rejected'
            },
        ],
    },
    {
        title: 'Deposit History',
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-table" />,
        content: [
            {
                title: 'Pending Deposit',
                to: 'pending-deposits'
            },
            {
                title: 'Success Deposit',
                to: 'approved-deposits'
            },
            {
                title: 'Failed Deposit',
                to: 'declined-deposits'
            },
        ],
    },
    
    {
        title: 'Manage Tickets',
        to: 'manage-tickets',		
        iconStyle: <i className="flaticon-table" />, // User accounts icon
    },
       
]