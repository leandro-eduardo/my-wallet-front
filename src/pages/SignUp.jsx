import { Logo, Form, Input, Button, StyledLink, ErrorMessage } from '../components/FormComponents';
import { authSignUpSchema } from '../schemas/authSchemas';
import styled from 'styled-components';
import { useApi } from '../services/api';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const navigate = useNavigate();
    const api = useApi();

    async function onSubmit(values, actions) {
        const user = { ...values };
        delete user.confirmPassword;

        try {
            await api.signUp(user);
            toast.success('Cadastro realizado com sucesso!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            setTimeout(() => navigate('/'), 3000);
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            // alert(error.response.data.message);
        }
    }

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: authSignUpSchema,
        onSubmit,
    });

    return (
        <Container>
            <Wrapper>
                <Logo>MyWallet</Logo>
                <ToastContainer />
                <Form onSubmit={handleSubmit}>
                    <Input
                        placeholder='Nome'
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.name && touched.name ? 'input-error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.name && touched.name && (
                        <ErrorMessage>{errors.name.includes('required') ? '' : errors.name}</ErrorMessage>
                    )}
                    <Input
                        placeholder='E-mail'
                        type='email'
                        name='email'
                        autocomplete='username'
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
                        autocomplete='new-password'
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
                    <Input
                        placeholder='Confirme a senha'
                        type='password'
                        name='confirmPassword'
                        autocomplete='new-password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <ErrorMessage>
                            {errors.confirmPassword.includes('required') ? '' : errors.confirmPassword}
                        </ErrorMessage>
                    )}
                    <Button type='submit' isSubmitting={isSubmitting}>
                        Cadastrar
                    </Button>
                </Form>

                <StyledLink to='/'>Já tem uma conta? Entre agora!</StyledLink>
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
