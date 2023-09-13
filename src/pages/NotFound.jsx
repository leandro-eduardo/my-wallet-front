import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/FormComponents';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container>
            <h6>404NotFound</h6>
            <span>Ops... Página não encontrada 😐</span>
            <Button width={100} onClick={() => navigate('/home')}>
                Voltar
            </Button>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: #ffffff;
    padding-top: 60px;

    h6 {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Saira Stencil One', cursive;
    }

    span {
        font-size: 30px;
        text-align: center;
        padding: 15px;
    }
`;
