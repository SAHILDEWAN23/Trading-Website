import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Button, Dropdown, Badge, FormControl } from "react-bootstrap"; // Ensure to import Badge and FormControl
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FundManagementModal from './FundManagementModal'; // Import the modal component path is correct
import api from '../../../services/api';

export default function AccountManagement() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isAdding, setIsAdding] = useState(true); // Track whether we are adding or subtracting funds
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    filterAccounts();
  }, [searchTerm, accounts]);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/accounts');
      setAccounts(response.data.accounts || []);
      setFilteredAccounts(response.data.accounts || []);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      toast.error("Failed to fetch accounts");
    } finally {
      setIsLoading(false);
    }
  };

  const filterAccounts = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = accounts.filter(account => {
      return Object.keys(account).some(key =>
        account[key] ? account[key].toString().toLowerCase().includes(lowercasedFilter) : false
      );
    });
    setFilteredAccounts(filteredData);
  };

  const handleOpenModal = (account, adding) => {
    setSelectedAccount(account);
    setIsAdding(adding); // Set whether we are adding or subtracting
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccount(null);
  };

  const handleUpdateBalance = async (accountNumber, change) => {
    try {
      const response = await api.post('/update-account-balance', { accountNumber, change });
      if (response.data.success) {
        fetchAccounts(); // Refresh the list after update
        toast.success(`Balance updated by ${change}`);
      } else {
        toast.error('Failed to update balance');
      }
    } catch (error) {
      toast.error('Error updating balance');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Account Management</Card.Title>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '200px' }}
            />
          </Card.Header>
          <Card.Body>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nickname</th>
                    <th>Account Number</th>
                    <th>Balance</th>
                    <th>Max Leverage</th>
                    <th>Account</th>
                    <th>Account Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account, index) => (
                    <tr key={account.id}>
                      <td>{index + 1}</td>
                      <td>{account.nickname}</td>
                      <td>{account.account_number}</td>
                      <td>${account.balance.toFixed(2)}</td>
                      <td>{account.max_leverage}</td>
                      <td>{account.remarks == "1" ? "Real" : "Demo"}</td>
                      <td>{account.a_type}</td>
                      <td>
                        <Badge bg={account.status === "Active" ? "primary" : "danger"}>
                          {account.status}
                        </Badge>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="primary" id="dropdown-manage-funds">
                            Manage Funds
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleOpenModal(account, true)}>Add Funds</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleOpenModal(account, false)}>Subtract Funds</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <ToastContainer />
          </Card.Body>
        </Card>
        {showModal && selectedAccount && (
          <FundManagementModal
            show={showModal}
            onHide={handleCloseModal}
            account={selectedAccount}
            isAdding={isAdding}
            onUpdate={handleUpdateBalance}
          />
        )}
      </Col>
    </div>
  );
}
