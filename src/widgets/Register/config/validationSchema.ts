import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .matches(/@mdi\.gov\.az$/, 'Only @mdi.gov.az emails are allowed')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});