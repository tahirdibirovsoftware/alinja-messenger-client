/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getSocket } from '../../../shared/api/socket';
import { api } from '../../../shared/api/api.config';
import style from './Notifications.module.scss';

interface Notification {
    id: string;
    type: string;
    message: string;
    contactId?: string;
    user?: {
        email: string;
        username: string;
    };
}

const Notifications = (): JSX.Element => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await api.get<Notification[]>('/contacts/pending');
            console.log('Notifications:', response.data);

            const mappedNotifications: Notification[] = response.data.map((item: any) => ({
                id: item.id, // Use the 'id' field for API calls
                type: 'contact_request',
                message: `Contact request from ${item.user?.username || 'Unknown'}`,
                contactId: item.id, // Same as 'id'
                user: item.user,
            }));


            setNotifications(mappedNotifications);
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const socket = getSocket();

        fetchNotifications();

        if (socket) {
            socket.on('notification', (notification: Notification) => {
                if (!notification.id) {
                    console.warn('Invalid notification:', notification);
                    return;
                }
                setNotifications((prev) => [notification, ...prev]);
            });
        }

        return () => {
            if (socket) {
                socket.off('notification');
            }
        };
    }, []);

    const handleAccept = async (relationshipId: string) => {
        try {
            await api.put(`/contacts/${relationshipId}/status`, { status: 'accepted' });
            setNotifications((prev) =>
                prev.filter((notification) => notification.id !== relationshipId)
            );
        } catch (err: any) {
            console.error('Accept error:', err);
            setError('Failed to accept contact request');
        }
    };

    const handleReject = async (relationshipId: string) => {
        try {
            await api.put(`/contacts/${relationshipId}/status`, { status: 'rejected' });
            setNotifications((prev) =>
                prev.filter((notification) => notification.id !== relationshipId)
            );
        } catch (err: any) {
            console.error('Reject error:', err);
            setError('Failed to reject contact request');
        }
    };


    if (loading) {
        return <div className={style.loading}>Loading notifications...</div>;
    }

    if (error) {
        return <div className={style.error}>{error}</div>;
    }

    return (
        <div className={style.notifications}>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id} className={style.notification}>
                        <p>{notification.message}</p>
                        {notification.type === 'contact_request' && notification.contactId && (
                            <div className={style.actions}>
                                <button
                                    className={style.acceptButton}
                                    onClick={() => handleAccept(notification.contactId!)}
                                >
                                    Accept
                                </button>
                                <button
                                    className={style.rejectButton}
                                    onClick={() => handleReject(notification.contactId!)}
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {notifications.length === 0 && (
                <p className={style.empty}>No notifications available.</p>
            )}
        </div>
    );
};

export { Notifications };
