// src/features/SearchUser/ui/SearchUser.tsx
import { Input, List, Avatar, Button, message } from 'antd';
import { UserAddOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import style from './SearchUser.module.scss';
import { userService } from '../../../shared/api/user.service';
import { contactService } from '../../../shared/api/contact.service';


// Define our interfaces for better type safety
interface UserSearchResult {
    id: string;
    email: string;
    username: string;
    isContact: boolean;
    isPending: boolean;
}

const SearchUser = (): JSX.Element => {
    // State management for our component
    const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // Create a debounced search function to prevent too many API calls
    const debouncedSearch = debounce(async (searchTerm: string) => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        try {
            setIsSearching(true);
            const users = await userService.searchUsers(searchTerm);
            setSearchResults(users);
        } catch (error) {
            messageApi.error('Failed to search for users');
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    }, 300);

    // Handle sending contact request
    const handleContactRequest = async (userId: string) => {
        try {
            await contactService.sendContactRequest(userId);

            // Update the local state to reflect the pending request
            setSearchResults(prevResults =>
                prevResults.map(user =>
                    user.id === userId
                        ? { ...user, isPending: true }
                        : user
                )
            );

            messageApi.success('Contact request sent successfully');
        } catch (error) {
            messageApi.error('Failed to send contact request');
            console.error('Contact request error:', error);
        }
    };

    // Handle canceling a pending request
    const handleCancelRequest = async (userId: string) => {
        try {
            await contactService.cancelContactRequest(userId);

            // Update the local state to remove the pending status
            setSearchResults(prevResults =>
                prevResults.map(user =>
                    user.id === userId
                        ? { ...user, isPending: false }
                        : user
                )
            );

            messageApi.success('Contact request canceled');
        } catch (error) {
            messageApi.error('Failed to cancel contact request');
            console.error('Cancel request error:', error);
        }
    };

    return (
        <div className={style.searchUserContainer}>
            {contextHolder}

            {/* Search input field */}
            <Input.Search
                placeholder="Search by email or username"
                loading={isSearching}
                onChange={(e) => debouncedSearch(e.target.value)}
                className={style.searchInput}
            />

            {/* Search results list */}
            <List
                className={style.searchResults}
                dataSource={searchResults}
                renderItem={(user) => (
                    <List.Item
                        key={user.id}
                        actions={[
                            !user.isContact && !user.isPending && (
                                <Button
                                    icon={<UserAddOutlined />}
                                    onClick={() => handleContactRequest(user.id)}
                                >
                                    Add Contact
                                </Button>
                            ),
                            user.isPending && (
                                <Button
                                    icon={<CloseCircleOutlined />}
                                    danger
                                    onClick={() => handleCancelRequest(user.id)}
                                >
                                    Cancel Request
                                </Button>
                            )
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar>{user.username[0].toUpperCase()}</Avatar>
                            }
                            title={user.username}
                            description={user.email}
                        />
                    </List.Item>
                )}
                locale={{
                    emptyText: searchResults.length === 0
                        ? 'Start typing to search for users'
                        : 'No users found'
                }}
            />
        </div>
    );
};

export default SearchUser;