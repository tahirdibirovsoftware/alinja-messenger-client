// src/features/SearchUser/ui/UserList.tsx
import React from 'react';
import { List } from 'antd';
import style from './UserList.module.scss';
import UserItem from './UserItem';
import { useAppSelector } from '../../../app/store';

const UserList = (): JSX.Element => {
    const users = useAppSelector((state) => state.foundUsers.users);

    return (
        <List
            className={style.searchResults}
            dataSource={users}
            renderItem={(user) => (
                <UserItem user={user} />
            )}
            locale={{
                emptyText:
                    users.length === 0
                        ? 'Start typing to search for users'
                        : 'No users found',
            }}
        />
    );
};

export default UserList;
