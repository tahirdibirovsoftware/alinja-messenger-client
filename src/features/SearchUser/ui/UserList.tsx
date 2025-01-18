import { List } from 'antd';
import UserItem from './UserItem';
import { UserSearchResult } from '../types';
import style from './UserList.module.scss';

interface UserListProps {
    users: UserSearchResult[];
    onAddContact: (userId: string) => void;
}

const UserList = ({ users, onAddContact }: UserListProps): JSX.Element => {
    return (
        <List
            className={style.userList}
            dataSource={users}
            renderItem={(user) => <UserItem user={user} onAddContact={onAddContact} />}
            locale={{
                emptyText: users.length === 0 ? 'Start typing to search for users' : 'No users found',
            }}
        />
    );
};

export default UserList;
