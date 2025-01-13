/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from 'antd';
import style from './Register.module.scss';
import Password from 'antd/es/input/Password';
import { Logo } from '../../../shared/ui/Logo/Logo';
import { Link } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../config';

// Define the form values interface
interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = (): JSX.Element => {
    // Set initial form values
    const initialValues: FormValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    // Handle form submission
    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            console.log('Form values:', values);
            // Add your API call here
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={style.registerContainer}>
            <Logo mainText="Alinja" mode="Beta" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, touched, errors }) => (
                    <>
                        <Field
                            as={Input}
                            size="large"
                            name="email"
                            placeholder="Email"
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
                            loading={isSubmitting}
                        >
                            Sign up
                        </Button>
                    </>
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