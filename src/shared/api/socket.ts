// src/shared/api/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const connectSocket = (userId: string): Socket => {
    socket = io('https://192.168.100.35:3000');
    socket.emit('register', userId);

    socket.on('connect', () => {
        console.log('WebSocket connected:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });

    return socket;
};

export const getSocket = (): Socket => socket;
