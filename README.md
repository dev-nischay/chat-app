# chat-app

A small real-time chat app I built while learning WebSockets.

Note - This project uses bruteforce approaches  and must not be considered as an professional approach to chats/websockets


## Ui 

Home -

<img width="1898" height="991" alt="Screenshot 2026-01-13 at 5 46 28 PM" src="https://github.com/user-attachments/assets/18918738-18ae-4543-83a7-38fc5e630cf9" />


Join -

<img width="1895" height="987" alt="Screenshot 2026-01-13 at 5 59 14 PM" src="https://github.com/user-attachments/assets/290620d0-03b6-4a89-89f2-092357f9fed8" />


Create -

<img width="1876" height="974" alt="Screenshot 2026-01-13 at 5 59 22 PM" src="https://github.com/user-attachments/assets/a187e947-0d42-4007-91c4-8f70827e0541" />


Main -

<img width="1914" height="986" alt="Screenshot 2026-01-13 at 5 58 23 PM" src="https://github.com/user-attachments/assets/7d703ab4-1b56-4b10-9e3b-ad05c4588409" />


## Tech Stack - 
Backend: TypeScript + Expressjs + ws

Frontend: TypeScript + Reactjs

State management: Zustand

Uses raw WebSockets for real-time messaging

Rooms and active users are stored in memory using Map

Main goal of this project was to understand how WebSockets work under the hood and how to manage live connections.
Data is in memory, so everything resets when the server restarts.
