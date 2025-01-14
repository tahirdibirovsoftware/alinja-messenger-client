import { Register } from '../../../widgets/Register';
import style from './RegisterPage.module.scss';


const RegisterPage = (): JSX.Element => {
    return (
        <div className={style.registerPage}>
            <Register />
        </div>
    )
}


export { RegisterPage }