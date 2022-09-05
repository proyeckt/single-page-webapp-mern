import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote } from '../services/note.services';
import Swal from 'sweetalert2'
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CNoteForm from '../components/CNoteForm';
import Image from 'react-bootstrap/esm/Image';

const EditNote = () => {

    const { id } = useParams();
    const [note, setNote] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        id && getNoteFromService();
    }, [id]);

    const getNoteFromService = async () => {
        try {
            const noteFromService = await getNote(id);
            setNote(noteFromService.data.note);
        } catch (err) {
            Swal.fire({
                title: '¡Ups!',
                text: 'No pudimos traer la nota',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            })
            navigate('/notes');
        }
    }

    return (
        <>
            <Header props="note" />
            <Container className="mt-3 mb-3">
                <Row>
                    <h1 className="d-flex align-items-center justify-content-center">Editar la nota {note?.title}</h1>
                </Row>
                <Row>
                    <Col sm={8} className="text-center">
                        {note &&  <CNoteForm props={note} />}
                        {/* <OfferForm props={joboffer}/> */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EditNote;