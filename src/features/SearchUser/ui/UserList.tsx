
import { List } from 'antd';
import UserItem from './UserItem';
import { useAppSelector } from '../../../app/store';
import { UserSearchResult } from '../types';
import style from './UserList.module.scss';


const UserList = (): JSX.Element => {
    const users: UserSearchResult[] = useAppSelector((state) => state.foundUsers.users);

    return (
        <List
            className={style.userList}
            dataSource={users}
            renderItem={(user) => <UserItem user={user} />}
            locale={{
                emptyText: users.length === 0 ? 'Start typing to search for users' : 'No users found',
            }}
        />
    );
};

export default UserList;
