import { Button, Input } from 'antd';
import style from './Login.module.scss';
import Password from 'antd/es/input/Password';
import { useState } from 'react';
import { Logo } from '../../../shared/ui/Logo/Logo';

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
            <Button type='primary' size='large' loading={isSending} onClick={apiHandler}>Login</Button>
        </div>
    )
}

export { Login }