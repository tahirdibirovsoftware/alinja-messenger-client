import { Button } from 'antd';
import style from './UserItem.module.scss';
import { UserAddOutlined, MessageOutlined } from '@ant-design/icons';
import { UserSearchResult } from '../types';

interface UserItemProps {
    user: UserSearchResult;
    isContact: boolean; // Indicates if the user is already a contact
    onAddContact: (email: string) => void;
    onSendMessage: (userId: string) => void;
}

const UserItem = ({ user, isContact, onAddContact, onSendMessage }: UserItemProps): JSX.Element => {
    return (
        <div className={style.userItem}>
            <div className={style.userName}>{user.username}</div>
            <div className={style.userEmail}>{user.email}</div>

            {isContact ? (
                <Button
                    type="primary"
                    icon={<MessageOutlined />}
                    onClick={() => onSendMessage(user.id)}
                    className={style.messageButton}
                >
                    Send Message
                </Button>
            ) : (
                <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={() => onAddContact(user.email)}
                    className={style.addButton}
                >
                    Add Contact
                </Button>
            )}
        </div>
    );
};

export default UserItem;
