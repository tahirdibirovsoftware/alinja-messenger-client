import style from './Copyright.module.scss';


const Copyright = (): JSX.Element => {
    return (
        <div className={style.copyContainer}>
            <p>Alinja Systems &copy; {new Date().getFullYear()}</p>
        </div>
    )
}

export { Copyright }