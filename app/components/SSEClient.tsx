"use client"
import { eventEmitter } from '@/lib/eventEmitter';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import PNotify from './PNotify';

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
