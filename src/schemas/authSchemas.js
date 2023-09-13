import * as yup from 'yup';

const passwordRules =
    /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
// length must be greater than or equal to 8
// must contain 1 or more uppercase characters
// must contain 1 or more lowercase characters
// must contain 1 or more numeric values
// must contain 1 or more special characters

export const authSignUpSchema = yup.object().shape({
    name: yup.string().min(3, 'Precisa ter no mínimo 3 caracteres').required(),
    email: yup.string().email('Informe um e-mail válido').required(),
    password: yup
        .string()
        .matches(passwordRules, {
            message: `A senha deve ter no mínimo: \n• 8 caracteres \n• 1 letra maiúscula \n• 1 letra minúscula \n• 1 caractere especial \n• 1 número`,
        })
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
        .required(),
});

export const authSignInSchema = yup.object().shape({
    email: yup.string().email('Informe um e-mail válido').required(),
    password: yup.string().required(),
});
