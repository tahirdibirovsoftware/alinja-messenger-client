import { Button } from 'antd';
import style from './UserItem.module.scss';
import { UserAddOutlined } from '@ant-design/icons';
import { UserSearchResult } from '../types';

interface UserItemProps {
    user: UserSearchResult;
    onAddContact: (email: string) => void; // Use email as the parameter
}

const UserItem = ({ user, onAddContact }: UserItemProps): JSX.Element => {
    return (
        <div className={style.userItem}>
            <div className={style.userName}>{user.username}</div>
            <div className={style.userEmail}>{user.email}</div>

            <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => onAddContact(user.email)} // Pass user.email here
                className={style.addButton}
            >
                Add Contact
            </Button>
        </div>
    );
};

export default UserItem;
