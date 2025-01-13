/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from 'antd';
import style from './Login.module.scss';
import Password from 'antd/es/input/Password';
import { Logo } from '../../../shared/ui/Logo/Logo';
import { Link } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../config';



interface FormValues {
    email: string;
    password: string;
}

const Login = (): JSX.Element => {
    const initialValues: FormValues = {
        email: '',
        password: '',
    };

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
        <div className={style.loginContainer}>
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

                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={isSubmitting}
                        >
                            Sign in
                        </Button>
                    </>
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