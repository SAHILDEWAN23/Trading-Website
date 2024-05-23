import React, { useEffect, useState } from 'react';
import { Card, Col, Table, Badge, Button, FormControl } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Instantiate useNavigate

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/users');
            setUsers(response.data.users || []);
            setFilteredUsers(response.data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    const filterUsers = () => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = users.filter(item => {
            return Object.keys(item).some(key =>
                item[key] ? item[key].toString().toLowerCase().includes(lowercasedFilter) : false
            );
        });
        setFilteredUsers(filteredData);
    };

    const handleViewUser = (userId) => {
        if(userId) {
            navigate(`/edit-profile/${userId}`);
        } else {
            console.error("User ID is undefined");
        }
    };

    return (
        <div>
            <Col lg={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>User List</Card.Title>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ width:'200px' }}
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
                                        <th>First Name</th>
                                        <th>Status (KYC)</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Country</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.first_name}</td>
                                                <td>
                                                    <Badge bg={user.kyc === 1 ? 'success' : 'danger'}>
                                                        {user.kyc === 1 ? 'Verified' : 'Not Verified'}
                                                    </Badge>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{user.tpsr}</td>
                                                <td>{user.country_name}</td>
                                                <td>
                                                    <Button onClick={() => handleViewUser(user.id)} variant="primary">View User</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">No users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        )}
                        <ToastContainer />
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
}
