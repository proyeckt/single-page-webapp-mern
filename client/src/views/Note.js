import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { deleteNote, getNote, changeArchivedState } from '../services/note.services';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2'

const Note = () => {


    const { id } = useParams();
    const [note, setNote] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        id && getNoteFromService();
    }, [id]);

    const editNoteView = () => {
        navigate(`/notes/edit/${note._id}`);
    }

    /*const renderExperience = () => (
        <>
            <h3 className=" mt-4 font-weight-bold font-italic">Experiencia: </h3>
            {joboffer?.experience}
        </>
    )*/

    const deleteNoteView = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0275d8',
            cancelButtonColor: '#d9534f',
            confirmButtonText: 'Si, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteNote(note._id);
                    Swal.fire(
                        '¡Eliminado!',
                        'Tu nota ha sido eliminada',
                        'success'
                    );
                } catch (err) {
                    Swal.fire({
                        title: '¡Ups!',
                        text: 'No pudimos borrar la nota, intenta de nuevo más tarde',
                        icon: 'error',
                        confirmButtonColor: '#0275d8'
                    })
                }
                navigate('/notes');
            }
        })
    }
    const getNoteFromService = async () => {
        try {
            const noteFromService = await getNote(id);
            if(noteFromService.data.note){
                setNote(noteFromService.data.note);
            }else {
                navigate('/not-found');
            }  
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

     const changeArchivedStateView = async () => {
      try {
          await changeArchivedState(id);
          Swal.fire(
            '¡Estado de archivado actualizado!',
            'Se ha cambiado el estado de archivado de la nota',
            'success'
          );
          navigate('/notes');
        } catch (err) {
            Swal.fire({
              title: '¡Ups!',
              text: 'No pudimos cambiar el estado de archivado de la nota, intenta de nuevo más tarde',
              icon: 'error',
              confirmButtonColor: '#0275d8'
          })
        }
    }

    var archive;
    if(note?.archived)
     archive = true 
    else archive = false;

    return (
        <>
            <Header />
            <Container className="mt-5">
                <Row>
                    <Col key={1} md={3} xs={4} className="justify-content-end">
                        <Row>
                            <Button onClick={() => navigate('/notes')} className="mt-2 w-50" variant="secondary">Retroceder</Button>
                        </Row>
                        <Row>
                            <Button onClick={() => deleteNoteView()} className="mt-2 w-50" variant="danger">Eliminar nota</Button>
                        </Row>
                        <Row>
                            <Button onClick={() => editNoteView()} className="mt-2 w-50 " variant="warning">Editar nota</Button>
                        </Row>
                        <Row>
                            <Button onClick={() => changeArchivedStateView()} className="mt-2 w-50 " variant="warning"> {archive ? 'Desarchivar' : 'Archivar'} </Button>
                        </Row>
                    </Col>
                    <Col key={3} md={4} xs={6}>
                        <h3 className="font-weight-bold font-italic">Título:</h3>
                        {note?.title}
                        <h3 className="font-weight-bold font-italic">Contenido:</h3>
                        {note?.content}
                        <h3 className="font-weight-bold font-italic">Ultima fecha de modificación:</h3>
                        {note?.last_edited}
                    </Col>
                    <Col key={4} md={3} xs={4} />
                </Row>
                <Row className="mt-4 d-flex justify-content-center">

                </Row>
            </Container>
        </>
    )
}

export default Note;