import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { getUsers } from '../../services/user.services';
import UsersTable from '../../components/UserTable';

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersFromService();
    }, []);

    const getUsersFromService = async () => {
        try {
            const usersFromService = await getUsers();
            setUsers(usersFromService.data.users)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <h1 className="mt-4 d-flex align-items-center justify-content-center">Usuarios dentro de nuestra base de datos</h1>
                </Row>
                <UsersTable users={users} />
            </Container>
        </>
    )
}

export default Users;