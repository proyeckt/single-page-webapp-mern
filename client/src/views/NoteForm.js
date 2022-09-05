import React from 'react';
import Header from '../components/Header';
import CNoteForm from '../components/CNoteForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import jobofferPicture from '../assets/imgs/joboffer.png';

const NoteForm = () => {

    return (
        <>
            <Header props="note" />
            <Container className="mt-3 mb-3">
            <Row>
                    <h1 className="d-flex align-items-center justify-content-center">Registra aqui tu nueva nota</h1>
                </Row>
                <Row>
                    <Col sm={4} className="bg-primary">
                    </Col>
                    <Col sm={8} className="text-center">
                        <CNoteForm />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NoteForm;