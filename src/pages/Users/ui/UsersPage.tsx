import React, { useEffect } from 'react';
import SearchUser from '../../../features/SearchUser/ui/SearchUser';
import UserList from '../../../features/SearchUser/ui/UserList';
import style from './UsersPage.module.scss';
import { message } from 'antd';
import { contactService } from '../../../shared/api/contact.service';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { fetchContacts } from '../model/contactSlice';

export const UsersPage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const users = useAppSelector((state) => state.foundUsers.users);
    const contacts = useAppSelector((state) => state.contacts.contacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleAddContact = async (email: string) => {
        try {
            await contactService.sendContactRequest(email);
            messageApi.success('Contact request sent successfully');
        } catch (error) {
            messageApi.error('Failed to send contact request');
            console.error('Add Contact error:', error);
        }
    };

    const handleSendMessage = (userId: string) => {
        // Navigate to the messaging page or open a chat window
        console.log('Send message to:', userId);
    };

    return (
        <div className={style.userPage}>
            {contextHolder}
            <SearchUser />
            <UserList
                users={users}
                contacts={contacts} // Pass the contacts list
                onAddContact={handleAddContact}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};
