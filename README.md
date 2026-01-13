# chat-app

A small real-time chat app I’m building while learning WebSockets.

Backend: TypeScript + Expressjs + ws

Frontend: TypeScript + Reactjs

State management: Zustand

Uses raw WebSockets for real-time messaging

Rooms and active users are stored in memory using Map

Main goal of this project was to understand how WebSockets work under the hood and how to manage live connections.
Data is in memory, so everything resets when the server restarts.
