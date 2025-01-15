import { List, Avatar, Button } from 'antd';
import { UserAddOutlined, CloseCircleOutlined } from '@ant-design/icons';
import style from './UserItem.module.scss';
import { UserSearchResult } from '../types';


interface UserItemProps {
    user: UserSearchResult;
}

const UserItem = ({ user }: UserItemProps): JSX.Element => {
    const handleAddContact = () => {
        console.log(`Add contact for user: ${user.id}`);
    };

    const handleCancelRequest = () => {
        console.log(`Cancel contact request for user: ${user.id}`);
    };

    return (
        <List.Item
            className={style.userItem}
            actions={[
                !user.isContact && !user.isPending && (
                    <Button
                        icon={<UserAddOutlined />}
                        onClick={handleAddContact}
                    >
                        Add Contact
                    </Button>
                ),
                user.isPending && (
                    <Button
                        icon={<CloseCircleOutlined />}
                        danger
                        onClick={handleCancelRequest}
                    >
                        Cancel Request
                    </Button>
                ),
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar>{user.username[0].toUpperCase()}</Avatar>}
                title={user.username}
                description={user.email}
            />
        </List.Item>
    );
};

export default UserItem;
