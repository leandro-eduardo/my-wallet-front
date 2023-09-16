import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { TbAlertCircle } from 'react-icons/tb';
import { BiShow, BiHide } from 'react-icons/bi';
import styled from 'styled-components';
import { useState } from 'react';

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export function Input({
    placeholder,
    type,
    name,
    value,
    onChange,
    onBlur,
    className,
    id,
    autocomplete,
    disabled,
}) {
    const [passwordShown, setPasswordShown] = useState(false);

    return (
        <Container>
            <StyledInput
                placeholder={placeholder}
                type={type !== 'password' ? type : passwordShown ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={className}
                id={id}
                autoComplete={autocomplete}
                disabled={disabled}
            />
            {type === 'password' && (
                <PasswordIcon hasError={className === 'input-error'}>
                    {passwordShown ? (
                        <BiHide onClick={() => setPasswordShown(false)} />
                    ) : (
                        <BiShow onClick={() => setPasswordShown(true)} />
                    )}
                </PasswordIcon>
            )}

            {className === 'input-error' && (
                <ErrorIcon>
                    <TbAlertCircle />
                </ErrorIcon>
            )}
        </Container>
    );
}

const Container = styled.div`
    position: relative;
`;

const PasswordIcon = styled.div`
    color: #000000;
    font-size: 28px;
    position: absolute;
    right: ${(props) => (props.hasError ? '40px' : '10px')};
    top: 15px;
`;

const ErrorIcon = styled.div`
    color: #fc8181;
    font-size: 28px;
    position: absolute;
    right: 10px;
    top: 15px;
`;

export const ErrorMessage = styled.p`
    font-weight: 500;
    color: #ffffff;
    margin-left: 2px;
    white-space: pre-wrap;
    margin-top: -7px;
    font-size: 14px;
`;

const StyledInput = styled.input`
    all: unset;
    box-sizing: border-box;
    height: 58px;
    width: 100%;
    background: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 5px;
    padding: 0 15px;
    color: #000000;
    font-weight: 500;
    font-size: 18px;

    &.input-error {
        border: 2px solid #fc8181;
    }

    &::placeholder {
        color: #000000;
    }

    &:disabled {
        opacity: 0.9;
    }

    :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px white inset;
    }
`;

export function Button({
    onClick,
    type,
    children,
    isSubmitting,
    width,
    height,
    color,
    backgroundColor,
    fontSize,
}) {
    return (
        <StyledButton
            type={type}
            disabled={isSubmitting}
            onClick={onClick}
            width={width}
            height={height}
            color={color}
            backgroundColor={backgroundColor}
            fontSize={fontSize}>
            {isSubmitting ? <ThreeDots color='#ffffff' height={23} width={60} /> : children}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    all: unset;
    padding: 12px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    line-height: 23px;
    cursor: pointer;
    width: ${(props) => (props.width ? `${props.width}px` : '')};
    height: ${(props) => (props.height ? `${props.height}px` : '')};
    color: ${(props) => (props.color ? props.color : '#ffffff')};
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#a328d6')};
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '21px')};

    &:disabled {
        opacity: 0.7;
    }
`;

export const Logo = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #ffffff;
    margin-bottom: 28px;
`;

export const StyledLink = styled(Link)`
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
    text-decoration: none;
    margin-top: 34px;
`;
