import * as Yup from 'yup';

// Define the validation schema using Yup
export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .matches(/@mdi\.gov\.az$/, 'Only @mdi.gov.az emails are allowed')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});