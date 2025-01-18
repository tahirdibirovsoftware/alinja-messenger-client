/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, message } from 'antd';
import style from './Register.module.scss';
import Password from 'antd/es/input/Password';
import { Logo } from '../../../shared/ui/Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { validationSchema } from '../config';
import { authService } from '../../../shared/api/auth.service';
import { useState } from 'react';
import { CryptoService } from '../../../shared/lib/crypto';



// Form values interface
interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = (): JSX.Element => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    // Initial form values
    const initialValues: FormValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };


    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {

        try {
            setIsRegistering(true);
            const keyPair = await CryptoService.generateKeyPair();
            const username = values.email.split('@')[0];

            const registrationData = {
                email: values.email,
                password: values.password,
                username,
                publicKey: keyPair.publicKey
            };

            const response = await authService.register(registrationData);

            // Store credentials securely
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('encryptedPrivateKey', keyPair.privateKey);

            messageApi.success({
                content: 'Registration successful!',
                duration: 2,
                onClose: () => navigate('/login')
            });

        } catch (error: any) {
            const errorMessage = error.response?.data?.message
                ? (Array.isArray(error.response.data.message)
                    ? error.response.data.message[0]
                    : error.response.data.message)
                : 'Registration failed. Please try again.';

            messageApi.error({
                content: errorMessage,
                duration: 3
            });
        } finally {
            setSubmitting(false);
            setIsRegistering(false);
        }
    };

    return (
        <div className={style.registerContainer}>
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
                            disabled={isRegistering}
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
                            disabled={isRegistering}
                            className={touched.password && errors.password ? style.errorInput : ''}
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className={style.errorMessage}
                        />

                        <Field
                            as={Password}
                            size="large"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            disabled={isRegistering}
                            className={
                                touched.confirmPassword && errors.confirmPassword
                                    ? style.errorInput
                                    : ''
                            }
                        />
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className={style.errorMessage}
                        />

                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={isSubmitting || isRegistering}
                            disabled={isRegistering}
                            block
                        >
                            {isRegistering ? 'Creating Account...' : 'Sign up'}
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className={style.processSwitcher}>
                <span>Already have an account?</span>
                <Link to="/login">Sign in</Link>
            </div>
        </div>
    );
};

export { Register };