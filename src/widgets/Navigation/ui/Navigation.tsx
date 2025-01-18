import TeamOutlined from '@ant-design/icons/lib/icons/TeamOutlined'
import style from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import { MessageOutlined, NotificationOutlined } from '@ant-design/icons';

const Navigation = (): JSX.Element => {
    return (
        <div className={style.navigation}>
            <Link to={'dashboard/users'}> <TeamOutlined /></Link>
            <Link to={'dashboard/chats'}><MessageOutlined /></Link>
            <Link to={'dashboard/notifications'}><NotificationOutlined /><TeamOutlined /></Link>
        </div>
    )
}

export { Navigation }