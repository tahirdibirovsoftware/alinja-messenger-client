import { FC } from 'react';
import style from './Logo.module.scss'

interface ILogo {
    mainText: string;
    mode?: string;
}

const Logo: FC<ILogo> = ({ mainText, mode }): JSX.Element => {
    return (
        <div className={style.logoContainer}>
            <p className={style.mainText}>{mainText}</p>
            {mode && <sup className={style.mode}>{mode}</sup>}
        </div>
    )
}

export { Logo }