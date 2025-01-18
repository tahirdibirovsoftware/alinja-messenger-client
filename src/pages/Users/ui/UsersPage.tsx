import React from 'react';
import SearchUser from '../../../features/SearchUser/ui/SearchUser';
import UserList from '../../../features/SearchUser/ui/UserList';
import style from './UsersPage.module.scss';
import { message } from 'antd';
import { contactService } from '../../../shared/api/contact.service';
import { useAppSelector } from '../../../app/store';

export const UsersPage = (): JSX.Element => {
    const [messageApi, contextHolder] = message.useMessage();
    const users = useAppSelector((state) => state.foundUsers.users);

    const handleAddContact = async (userId: string) => {
        try {
            await contactService.sendContactRequest(userId);
            messageApi.success('Contact request sent successfully');
        } catch (error) {
            messageApi.error('Failed to send contact request');
            console.error('Add Contact error:', error);
        }
    };

    return (
        <div className={style.userPage}>
            {contextHolder}
            <SearchUser />
            <UserList users={users} onAddContact={handleAddContact} />
        </div>
    );
};
