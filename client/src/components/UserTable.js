import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UsersTable = ({ users, props }) => {

    const navigate = useNavigate();

    const viewUser = (id) => {
        navigate(`/users/${id}`)
    }

    return (
        <>
            <Table className="mt-4" striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '11rem' }}>Nombre</th>
                        <th style={{ width: '11rem' }}>Experience</th>
                        <th>Descripción</th>
                        <th style={{ width: '7rem' }} />
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr key={idx}>
                            <td>{user.name}</td>
                            <td>{user.experience}</td>
                            <td>{user.description}</td>
                            <td><Button onClick={() => viewUser(user?._id)}>Ver perfil</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default UsersTable;