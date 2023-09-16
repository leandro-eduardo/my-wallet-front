import { Logo, Form, Input, Button, StyledLink, ErrorMessage } from '../components/FormComponents';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { authSignInSchema } from '../schemas/authSchemas';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignInPage() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const auth = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user]);

    async function onSubmit(values, actions) {
        try {
            await auth.signIn(values);
            navigate('/home');
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    }

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: authSignInSchema,
        onSubmit,
    });

    return (
        <Container>
            <Wrapper>
                <Logo>MyWallet</Logo>
                <ToastContainer />
                <Form onSubmit={handleSubmit}>
                    <Input
                        placeholder='E-mail'
                        type='email'
                        name='email'
                        autocomplete='on'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? 'input-error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.email && touched.email && (
                        <ErrorMessage>{errors.email.includes('required') ? '' : errors.email}</ErrorMessage>
                    )}
                    <Input
                        placeholder='Senha'
                        type='password'
                        name='password'
                        autocomplete='current-password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password ? 'input-error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.password && touched.password && (
                        <ErrorMessage>
                            {errors.password.includes('required') ? '' : errors.password}
                        </ErrorMessage>
                    )}
                    <Button type='submit' isSubmitting={isSubmitting}>
                        Entrar
                    </Button>
                </Form>

                <StyledLink to='/sign-up'>Primeira vez? Cadastre-se!</StyledLink>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
`;
