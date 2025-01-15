// src/features/SearchUser/ui/SearchUser.tsx
import { useState } from 'react';
import { Input, message } from 'antd';
import debounce from 'lodash/debounce';
import style from './SearchUser.module.scss';
import { userService } from '../../../shared/api/user.service';
import { useAppDispatch } from '../../../app/store';
import { getUsers } from '../model/usersSlice';
import UserList from './UserList';

const SearchUser = (): JSX.Element => {
    const [isSearching, setIsSearching] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce(async (searchTerm: string) => {
        if (!searchTerm) {
            dispatch(getUsers([]));
            return;
        }

        try {
            setIsSearching(true);
            const users = await userService.searchUsers(searchTerm);
            dispatch(getUsers(users));
        } catch (error) {
            messageApi.error('Failed to search for users');
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    }, 300);

    return (
        <div className={style.searchUserContainer}>
            {contextHolder}

            <Input.Search
                size="large"
                placeholder="Search by email or username"
                loading={isSearching}
                onChange={(e) => debouncedSearch(e.target.value)}
                className={style.searchInput}
            />

            <UserList />
        </div>
    );
};

export default SearchUser;
