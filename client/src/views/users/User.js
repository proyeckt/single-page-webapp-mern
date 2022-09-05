import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { getUserById } from '../../services/user.services';

const User = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        id && getUserFromService();
    }, [id]);

    const getUserFromService = async () => {
        try {
            const userFromService = await getUserById(id);
            if(userFromService.data.user){
                setUser(userFromService.data.user);
            }else {
                navigate('/not-found');
            }  
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteUserFromService = async () => {
        alert('ToDo');
    }

    return (
        <>
            <Header />
            <Container className="mt-4">
                <Card>
                    <Card.Header>{user?.name}</Card.Header>
                    <Card.Body>
                        <Card.Title>{user?.position} - {user?.experience}</Card.Title>
                        <Card.Text>{user?.description}</Card.Text>
                        <Card.Subtitle>Contacto: {user?.email}</Card.Subtitle>
                        <Button onClick={() => deleteUserFromService()} className="mt-3" variant="primary">Contratar</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default User;