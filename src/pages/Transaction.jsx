import { Form, Input, Button, ErrorMessage } from '../components/FormComponents';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { transactionSchema } from '../schemas/transactionSchema';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useApi } from '../services/api';
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TransactionPage() {
    const navigate = useNavigate();
    const api = useApi();
    const location = useLocation();
    const { config } = useContext(AuthContext);

    async function onSubmit(values, actions) {
        const formattedAmount = +values.amount.replace(/[.,]/g, '');

        if (formattedAmount === 0) {
            toast.error('Valor deve ser maior que zero', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }
        const newTransaction = {
            ...values,
            amount: formattedAmount,
            type: location.state.type,
        };

        try {
            await api.createTransaction(newTransaction, config);
            navigate('/home');
        } catch (error) {
            let errors = error.response.data.map((error) => error.message);
            alert(errors);
        }
    }

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            description: '',
            amount: '',
        },
        validationSchema: transactionSchema,
        onSubmit,
    });

    return (
        <Container>
            <Wrapper>
                <Header>
                    Nova {location.state.type === 'income' ? 'entrada' : 'saída'}
                    <IoMdArrowRoundBack
                        style={{ fontSize: '25px', cursor: 'pointer' }}
                        onClick={() => navigate(-1)}
                    />
                </Header>
                <ToastContainer />
                <Form onSubmit={handleSubmit}>
                    <NumberFormat
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        allowNegative={false}
                        customInput={Input}
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Valor'
                        name='amount'
                        autoComplete='off'
                        className={errors.amount && touched.amount ? 'input-error' : ''}
                    />
                    {errors.amount && touched.amount && !errors.amount.includes('required') && (
                        <ErrorMessage>{errors.amount}</ErrorMessage>
                    )}
                    <Input
                        placeholder='Descrição'
                        type='text'
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.description && touched.description ? 'input-error' : ''}
                        autoComplete='off'
                    />
                    {errors.description &&
                        touched.description &&
                        !errors.description.includes('required') && (
                            <ErrorMessage>{errors.description}</ErrorMessage>
                        )}
                    <Button type='submit' isSubmitting={isSubmitting}>
                        Salvar {location.state.type === 'income' ? 'entrada' : 'saída'}
                    </Button>
                </Form>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: 700;
    font-size: 22px;
    line-height: 31px;
    color: #ffffff;
    margin-bottom: 22px;
`;
