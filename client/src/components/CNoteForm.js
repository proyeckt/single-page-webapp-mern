import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { createNote, editNote } from '../services/note.services';
import { createTag } from '../services/tag.services';
import Swal from 'sweetalert2';
import Header from './Header';

const CNoteForm = ({ props }) => {

    const navigate = useNavigate();

    const [note, setNote] = useState({
        title: '',
        content: '',
        last_edited: Date.now(),
        archived: 0,
        tags: []
    })

    const [tag, setTag] = useState('');
    const tags = [];

    const startForm = () => {
        setNote(props);
        console.log(props);
    }

    useEffect(() => {
        props && startForm();
    }, []);

    const noteSchema = Yup.object().shape({
        title: Yup.string()
            .required('Este campo es requerido')
    });

    const handlerSubmit = async (values) => {
        try {
            props ? await editNote(props._id, values) : await createNote(values);
            props ? Swal.fire({
                text: 'Tu nota ha sido editada',
                icon: 'success',
                confirmButtonColor: '#0275d8'
            }) : Swal.fire({
                title: '¡Felicidades!',
                text: 'Tu nota ha sido registrada',
                icon: 'success',
                confirmButtonColor: '#0275d8'
            });
            props ? navigate(`/note/${props._id}`) : navigate(`/notes`);
        }
        catch (err) {
            console.log(err);
            props ? Swal.fire({
                title: 'Ups!',
                text: 'No hemos podido editar tu nota, intenta de nuevo',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            }) : Swal.fire({
                title: 'Ups!',
                text: 'No hemos podido crear tu nota, intenta de nuevo',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            })
        }
    }

    const addTag = async (value) => {
      console.log('Value',value);
      await createTag({name:value});
    }

    return (
        <>
            <Container>
                <Formik
                    enableReinitialize
                    submitForm
                    initialValues={note}
                    validationSchema={noteSchema}
                    onSubmit={values => {
                        //values.tags = tags;
                        console.log(values);
                        handlerSubmit(values)
                    }}
                >
                    {({ errors, getFieldProps }) => (

                        <FormikForm>
                            <div>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" placeholder="Título" value={note.title} {...getFieldProps('title')} />
                                </Form.Group>
                                {errors.title && (
                                    <div className="d-flex text-danger error-form">
                                        <p>{errors?.title}</p>
                                    </div>
                                )}
                            </div >
                            <div className="mt-3">

                                <Form.Group controlId="formContent">
                                    <Form.Label>Contenido</Form.Label>
                                    <Form.Control as="textarea" rows={5} type="text" value={note.content} {...getFieldProps('content')} />
                                </Form.Group>
                                {errors.content && (
                                    <div className="d-flex text-danger error-form">
                                        <p>{errors?.content}</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3">
                                <Form.Group controlId="formTag">
                                    <Form.Label>Tag</Form.Label>
                                    <Form.Control type="text" placeholder="Tag" value={note.tags} />
                                </Form.Group>
                            </div>
                            <Button onClick={() => addTag()} className="mt-2 w-50" variant="danger">Agregar tag</Button>
                            <Button className="mt-3" variant="primary" type="submit">
                                {props ? 'Editar nota' : 'Crear nota'}
                            </Button>
                        </FormikForm>
                    )}

                </Formik>
            </Container>
        </>
    )
}

export default CNoteForm;