import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
    amount: yup.string().required(),
    description: yup
        .string()
        .min(3, 'Descrição deve ter pelo menos 3 caracteres')
        .required(),
});
