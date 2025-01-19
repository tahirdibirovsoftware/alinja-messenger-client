import { List } from 'antd';
import UserItem from './UserItem';
import { UserSearchResult } from '../types';
import style from './UserList.module.scss';

interface UserListProps {
    users: UserSearchResult[];
    contacts: { userId: string; contactId: string }[];
    onAddContact: (email: string) => Promise<void>;
    onSendMessage: (userId: string) => void;
}

const UserList = ({ users, contacts, onAddContact, onSendMessage }: UserListProps): JSX.Element => {
    // Helper function to check if a user is a contact
    const isContact = (userId: string) => {
        return contacts.some((contact) => contact.contactId === userId || contact.userId === userId);
    };

    return (
        <List
            className={style.userList}
            dataSource={users}
            renderItem={(user) => (
                <UserItem
                    user={user}
                    isContact={isContact(user.id)} // Check if the user is already a contact
                    onAddContact={onAddContact}
                    onSendMessage={onSendMessage}
                />
            )}
            locale={{
                emptyText: users.length === 0 ? 'No users found' : 'Start typing to search',
            }}
        />
    );
};

export default UserList;
