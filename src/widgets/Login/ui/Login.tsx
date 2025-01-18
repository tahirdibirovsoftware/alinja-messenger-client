/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/auth/ui/Login.tsx
import { Button, Input, message } from 'antd';
import style from './Login.module.scss';
import Password from 'antd/es/input/Password';
import { Logo } from '../../../shared/ui/Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { validationSchema } from '../config';
import { authService } from '../../../shared/api/auth.service';
import { useState } from 'react';

interface FormValues {
    email: string;
    password: string;
}

const Login = (): JSX.Element => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    const initialValues: FormValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            setIsLoggingIn(true);

            // Call login API
            const response = await authService.login({
                email: values.email,
                password: values.password
            });
            console.log(response)
            // Store access token
            localStorage.setItem('accessToken', response.accessToken);

            // Get stored private key
            const privateKey = localStorage.getItem('encryptedPrivateKey');
            if (!privateKey) {
                throw new Error('No private key found. Please register again.');
            }

            messageApi.success({
                content: 'Login successful!',
                duration: 2,
                onClose: () => navigate('/dashboard/users')
            });

        } catch (error: any) {
            const errorMessage = error.response?.data?.message
                ? (Array.isArray(error.response.data.message)
                    ? error.response.data.message[0]
                    : error.response.data.message)
                : 'Login failed. Please check your credentials and try again.';

            messageApi.error({
                content: errorMessage,
                duration: 3
            });
        } finally {
            setSubmitting(false);
            setIsLoggingIn(false);
        }
    };

    return (
        <div className={style.loginContainer}>
            {contextHolder}
            <Logo mainText="Alinja" mode="Beta" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, touched, errors }) => (
                    <Form className={style.form}>
                        <Field
                            as={Input}
                            size="large"
                            name="email"
                            placeholder="Email"
                            disabled={isLoggingIn}
                            className={touched.email && errors.email ? style.errorInput : ''}
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className={style.errorMessage}
                        />

                        <Field
                            as={Password}
                            size="large"
                            name="password"
                            placeholder="Password"
                            disabled={isLoggingIn}
                            className={touched.password && errors.password ? style.errorInput : ''}
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className={style.errorMessage}
                        />

                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={isSubmitting || isLoggingIn}
                            disabled={isLoggingIn}
                            block
                        >
                            {isLoggingIn ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className={style.processSwitcher}>
                <span>No account yet?</span>
                <Link to="/register">Click here to sign up</Link>
            </div>
        </div>
    );
};

export { Login };