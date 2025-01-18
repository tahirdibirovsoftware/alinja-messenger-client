import { Button } from 'antd';
import style from './UserItem.module.scss';
import { UserAddOutlined } from '@ant-design/icons';
import { UserSearchResult } from '../types';

interface UserItemProps {
    user: UserSearchResult;
}

const UserItem = ({ user }: UserItemProps): JSX.Element => {
    return (
        <div className={style.userItem}>
            <div className={style.userName}>{user.username}</div>
            <div className={style.userEmail}>{user.email}</div>

            <Button
                type="primary"
                icon={<UserAddOutlined />}
                className={style.addButton}
            >
                Add Contact
            </Button>
        </div>
    );
};

export default UserItem;
