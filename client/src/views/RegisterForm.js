import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserForm from '../components/UserForm';
import Header from '../components/Header';
import chefPicture from '../assets/imgs/chef-image.png';

const RegisterForm = () => {



    return (
        <>
            <Header props='register' />
            <Container>
                <Row>
                    <h1 className="d-flex align-items-center justify-content-center">Bienvenido, registrate y disfruta de grandes beneficios</h1>
                </Row>
                <Row>
                    <Col sm={4} className="bg-primary">
                        <img className="chef-image m-3 text-center justify-content-center" src={chefPicture} alt='Chef Logo' />
                    </Col>
                    <Col sm={8} className="text-center">
                        <UserForm />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default RegisterForm;