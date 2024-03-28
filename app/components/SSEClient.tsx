"use client"
import { eventEmitter } from '@/lib/eventEmitter';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import PNotify from './PNotify';

/**
 * Creates a toast notification with the provided message.
 * Uses PNotify component to render the notification content.
 */
const notificationListener = (message: string) => {
    return toast.success(
        <PNotify
            title="Pending Notification"
            icon="fas fa-check"
            text={message}
        />,
        {
            containerId: "bottom-right",
        },
    );
}

/**
 * Sets up a client-side event listener for server-sent events from the /api/sse endpoint. 
 * Listens for 'notification-message' events from the eventEmitter and shows a toast notification.
 * Cleans up the event listener on unmount.
*/
const RealTimeNotifications = () => {
    useEffect(() => {
        const eventSource = new EventSource('/api/sse');
        console.log(eventSource);

        eventEmitter.on('notification-message', notificationListener);
        // Clean up on unmount
        return () => {
            // Remove event listener
            eventEmitter.removeEventListener('notification-message', notificationListener);
        };
    }, []);

    return null;
};

export default RealTimeNotifications;
