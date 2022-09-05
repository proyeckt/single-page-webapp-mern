import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <Header props='home' />
            <Container className="text-center m-5 justify-content-center">
                <Row>
                    <Col xs={4}></Col>
                    <Col xs={4}>
                        <h1>Bienvenido a <span className="text-primary font-italic font-weight-bold">NOTAS</span></h1>
                        <h3>¿Qué deseas hacer?</h3>
                    </Col>
                    <Col xs={4}></Col>
                </Row>
                <Row className="m-5">
                    <Col md={3} />
                    <Col md={2}>
                        <Button onClick={() => navigate('/login')}>Iniciar sesión</Button>
                    </Col>
                    <Col md={2}>
                        <Button onClick={() => navigate('/register')}>Registrarme</Button>
                    </Col>
                    <Col md={2}>
                        <Button onClick={() => navigate('/notes')}>Ver Notas</Button>
                    </Col>
                    <Col md={3} />
                </Row>
                <Button onClick={() => navigate('/notes/create')}>
                    Crear Nota
                </Button>
            </Container>
        </>
    )
}

export default Home;