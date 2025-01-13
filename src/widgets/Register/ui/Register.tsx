import { Button, Input } from 'antd';
import style from './Register.module.scss';
import Password from 'antd/es/input/Password';
import { useState } from 'react';
import { Logo } from '../../../shared/ui/Logo/Logo';
import { Link } from 'react-router-dom';

const Register = (): JSX.Element => {

    const [isSending, setIsSending] = useState<boolean>(false)
    const apiHandler = (): void => {
        setIsSending(true);
        console.log("Pressed")
    }

    return (
        <div className={style.registerContainer}>
            <Logo mainText="Alinja" mode="Beta" />
            <Input size='large' placeholder='Email' />
            <Password size='large' placeholder='Password' />
            <Password size='large' placeholder='Confirm password' />
            <Button type='primary' size='large' loading={isSending} onClick={apiHandler}>Sign up</Button>
            <div className={style.processSwitcher}>
                <span>Already have an account?</span>
                <Link to='/login'>Sign in</Link>
            </div>
        </div>
    )
}

export { Register }