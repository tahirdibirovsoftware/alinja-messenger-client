import { Outlet } from 'react-router-dom';
import style from './Dashboard.module.scss';
import { Navigation } from '../../../widgets/Navigation';

const Dashboard = (): JSX.Element => {
    return (
        <div className={style.Dashboard}>
            <Navigation />
            <Outlet />
        </div>
    )
}

export { Dashboard };