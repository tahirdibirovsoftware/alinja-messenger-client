import { Button, Input } from 'antd';
import style from './Login.module.scss';
import Password from 'antd/es/input/Password';
import { useState } from 'react';
import { Logo } from '../../../shared/ui/Logo/Logo';
import { Link } from 'react-router-dom';

const Login = (): JSX.Element => {

    const [isSending, setIsSending] = useState<boolean>(false)
    const apiHandler = (): void => {
        setIsSending(true);
        console.log("Pressed")
    }

    return (
        <div className={style.loginContainer}>
            <Logo mainText="Alinja" mode="Beta" />
            <Input size='large' placeholder='Email' />
            <Password size='large' placeholder='Password' />
            <Button type='primary' size='large' loading={isSending} onClick={apiHandler}>Sign in</Button>
            <div className={style.processSwitcher}>
                <span>No account yet?</span>
                <Link to='/register'>Click here to sign up</Link>
            </div>
        </div>
    )
}

export { Login }