import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotes } from '../services/note.services';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Container from 'react-bootstrap/esm/Container';
import NoteCard from '../components/NoteCard';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { authServices } from '../services/auth.services';

import Button from 'react-bootstrap/esm/Button';

const Notes = () => {

    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getNotesFromService();
    }, []);

    const getNotesFromService = async () => {
        try {
            let notesFromService = await getNotes();
            setNotes(notesFromService.data.notes);

        } catch (err) {
            Swal.fire({
                title: 'Ups!',
                text: 'No pudimos traer las notas',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            })
            navigate('/notes');
        }
    }

    return (
        <>
            <Header />
            <Col>
              <h1 className="d-flex align-items-center justify-content-center">Notas</h1>
              <Button onClick={() => navigate('/archivedNotes')} className="mt-2 w-50" variant="primary">Ir a notas archivadas</Button>
              <Button onClick={() => navigate('/')} className="mt-2 w-50" variant="secondary">Regresar a Inicio</Button>
            </Col>
            <Container>
                <Row>
                    {notes?.map((note, idx) => {
                      if(!note.archived)
                        return <NoteCard key={idx} note={note} idx={idx} />
                    })}
                </Row>
            </Container>
        </>
    )
}

export default Notes;