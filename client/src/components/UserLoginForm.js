import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../services/user.services';
import { authServices } from '../services/auth.services';
import Swal from 'sweetalert2';

const UserLoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formSchema = Yup.object().shape({
            email: Yup.string()
                .email('Debe ser un correo valido')
                .required('Este campo es requerido'),
            password: Yup.string()
                .required('Este campo es requerido')
        });

    const handlerSubmit = async (values) => {
        try {
            const res = await loginUser(values.email,values.password);
            console.log(res);

            if(res.data.auth){
              Swal.fire({
                  title: '¡Felicidades!',
                  text: res.data.msg,
                  icon: 'success',
                  confirmButtonColor: '#0275d8'
              });

              //Save token
              authServices.saveToken(res.data.token);
              navigate('/');
            }
            else{
              Swal.fire({
                title: 'Ups!',
                text: res.data.msg,
                icon: 'error',
                confirmButtonColor: '#0275d8'
              });
            }
        }
        catch (err) {
          console.log(err);
          Swal.fire({
            title: 'Ups!',
            text: 'Ha ocurrido un error. Intentalo nuevamente.',
            icon: 'error',
            confirmButtonColor: '#0275d8'
          });
        }
    }

    return (
        <>
            <Container>
                <Formik
                    submitForm
                    initialValues={{email:'',password:''}}
                    validationSchema={formSchema}
                    onSubmit={values => {
                        handlerSubmit(values)
                    }}
                >
                    {({ errors, getFieldProps }) => (

                        <FormikForm>
                            <Container>
                                <div>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Correo electrónico</Form.Label>
                                        <Form.Control type="email" placeholder="Correo electrónico" value={email} {...getFieldProps('email')} />
                                    </Form.Group>
                                    {errors.email && (
                                        <div className="d-flex text-danger error-form">
                                            <p>{errors?.email}</p>
                                        </div>
                                    )}
                                </div >
                                <div className="mt-3">
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Contraseña" value={password} {...getFieldProps('password')} />
                                    </Form.Group>
                                    {errors.password && (
                                        <div className="d-flex text-danger error-form">
                                            <p>{errors?.password}</p>
                                        </div>
                                    )}
                                </div>
                                <Button className="mt-3" variant="primary" type="submit">
                                    Ingresar
                                </Button>
                            </Container>
                        </FormikForm>
                    )}

                </Formik>
            </Container>
        </>
    )
}

export default UserLoginForm;