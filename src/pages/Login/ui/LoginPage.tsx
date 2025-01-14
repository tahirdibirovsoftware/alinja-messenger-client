import { Login } from '../../../widgets/Login';
import style from './LoginPage.module.scss';


const LoginPage = (): JSX.Element => {
    return (
        <div className={style.loginPage}>
            <Login />
        </div>
    )
}


export { LoginPage }