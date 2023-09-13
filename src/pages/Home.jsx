import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useApi } from '../services/api';
import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { clearUserLocalStorage } from '../contexts/utils';
import NumberFormat from 'react-number-format';
import { Button } from '../components/FormComponents';

export default function HomePage() {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState({
        canShow: false,
        transactionId: null,
    });

    const { user, setUser, config } = useContext(AuthContext);

    const navigate = useNavigate();
    const api = useApi();
    const auth = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const { data } = await api.getTransactions(config);
            setTransactions(data.reverse());
            let balance = 0;
            data.forEach((transaction) => {
                if (transaction.type === 'income') {
                    balance += transaction.amount;
                } else {
                    balance -= transaction.amount;
                }
            });
            setBalance(balance);
        } catch (error) {
            setUser(null);
            clearUserLocalStorage();
            alert(error.response.data.message);
            navigate('/');
        }
    }

    function handleLogout() {
        auth.signOut();
        navigate('/');
    }

    async function handleDelete(id) {
        try {
            await api.deleteTransaction(id, config);
            fetchData();
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <Container>
            <Wrapper>
                <Header>
                    Olá, {user.name}
                    <RiLogoutBoxRLine
                        style={{ cursor: 'pointer', fontSize: '25px' }}
                        onClick={() => handleLogout()}
                    />
                </Header>
                <TransactionsContainer>
                    {transactions.length === 0 ? (
                        <NoTransactionsMessage>
                            Não há registros de entrada ou saída
                        </NoTransactionsMessage>
                    ) : (
                        transactions.map((transaction, index) => (
                            <TransactionItem key={index}>
                                <div>
                                    <Date>{transaction.date}</Date>
                                    <Description title={transaction.description}>
                                        {transaction.description}
                                    </Description>
                                </div>
                                <div>
                                    <Amount
                                        type={transaction.type}
                                        value={transaction.amount / 100}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        displayType={'text'}
                                    />
                                    <DeleteIcon
                                        onClick={() =>
                                            setShowDeleteModal({
                                                canShow: true,
                                                transactionId: transaction._id,
                                            })
                                        }>
                                        <IoCloseOutline />
                                    </DeleteIcon>
                                </div>
                            </TransactionItem>
                        ))
                    )}
                    {transactions.length !== 0 && (
                        <BalanceContainer>
                            SALDO
                            <Balance
                                value={balance / 100}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                displayType={'text'}
                                prefix={'R$ '}
                                balance={balance}
                            />
                        </BalanceContainer>
                    )}
                    {showDeleteModal.canShow && (
                        <DeleteModalBackDrop
                            onClick={() =>
                                setShowDeleteModal({
                                    canShow: false,
                                    transactionId: null,
                                })
                            }>
                            <DeleteModal>
                                <p>Deseja realmente excluir o registro?</p>
                                <ActionsContainer>
                                    <Button
                                        height={25}
                                        width={85}
                                        fontSize={16}
                                        onClick={() =>
                                            handleDelete(showDeleteModal.transactionId)
                                        }>
                                        Apagar
                                    </Button>
                                    <Button
                                        height={25}
                                        width={85}
                                        backgroundColor={'#a228d689'}
                                        fontSize={16}
                                        onClick={() =>
                                            setShowDeleteModal({
                                                canShow: false,
                                                transactionId: null,
                                            })
                                        }>
                                        Cancelar
                                    </Button>
                                </ActionsContainer>
                            </DeleteModal>
                        </DeleteModalBackDrop>
                    )}
                </TransactionsContainer>
                <ButtonsContainer>
                    <TransactionButton
                        onClick={() =>
                            navigate('/transaction', { state: { type: 'income' } })
                        }>
                        <AiOutlinePlusCircle style={{ fontSize: '25px' }} />
                        <p>Nova entrada</p>
                    </TransactionButton>
                    <TransactionButton
                        onClick={() =>
                            navigate('/transaction', { state: { type: 'expense' } })
                        }>
                        <AiOutlineMinusCircle style={{ fontSize: '25px' }} />
                        <p>Nova saída</p>
                    </TransactionButton>
                </ButtonsContainer>
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

const TransactionsContainer = styled.div`
    width: 100%;
    height: 446px;
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    gap: 15px;
    position: relative;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    font-size: 22px;
    line-height: 31px;
    color: #ffffff;
    margin-bottom: 22px;
`;

const NoTransactionsMessage = styled.p`
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 20px;
    line-height: 23px;
    max-width: 180px;
    color: #868686;
    height: 100%;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 13px;
`;

const TransactionButton = styled.button`
    all: unset;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    height: 114px;
    width: 50%;
    border-radius: 5px;
    height: 114px;
    background: #a328d6;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;

    p {
        font-weight: 500;
        font-family: 'Raleway', sans-serif;
        font-size: 17px;
        line-height: 20px;
        max-width: 65px;
    }
`;

const TransactionItem = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    line-height: 19px;
    font-size: 16px;

    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

const Date = styled.p`
    color: #c6c6c6;
`;

const DeleteIcon = styled.div`
    color: #c6c6c6;
    font-size: 18px;
    cursor: pointer;
`;

const Description = styled.p`
    color: #000000;
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Amount = styled(NumberFormat)`
    color: ${(props) => (props.type === 'income' ? '#03ac00' : '#c70000')};
`;

const BalanceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 15px;
    border-radius: inherit;
    background-color: #ffffff;
    position: absolute;
    bottom: 0px;
    font-weight: 700;
`;

const Balance = styled(NumberFormat)`
    font-weight: 400;
    font-size: 17px;
    color: ${(props) =>
        props.balance > 0 ? '#03ac00' : props.balance < 0 ? '#c70000' : '#000000'};
`;

const DeleteModalBackDrop = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;

const DeleteModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 15px;
`;

const ActionsContainer = styled.div`
    display: flex;
    gap: 10px;
`;
