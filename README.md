# Mahjong Hand Betting Game

A dynamic web application where players bet on the outcome of mahjong hands. Built with a modern tech stack and designed for scalability and user engagement.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or a URI for an external database)

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```
   *(Runs on http://localhost:5000)*

### Frontend Setup
1. Navigate to the `hand-betting-game` directory:
   ```bash
   cd hand-betting-game
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *(Runs on http://localhost:3000)*

## Tech Stack Explanation

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
  - Next.js provides server-side rendering optimizations and an intuitive App Router for clean architecture.
  - TypeScript ensures type safety, reducing runtime errors and improving code scalability.
  - Tailwind CSS enables rapid styling with utility classes while maintaining performance and consistency.
- **State Management:** Zustand
  - Zustand is a lightweight, hook-based state management library that provides predictable state container without the boilerplate of Redux.
- **Backend:** Node.js, Express
  - A lightweight backend architecture handling API routing and requests.
- **Database:** MongoDB, Mongoose
  - Used for storing high scores via a flexible NoSQL structure which easily supports leaderboard ranking.

## Architecture Explanation

The project uses a clean separation of concerns:
- **Frontend Architecture (src/):**
  - `app/`: Contains route pages (`page.tsx`, `game/page.tsx`, `result/page.tsx`) based on Next.js App Router conventions.
  - `components/`: Highly modular, reusable UI components (`Button`, `Tile`, `Hand`, `History`).
  - `store/`: Global game state managed by Zustand (`gameStore.ts`), which encapsulates the complex interactions.
  - `utils/`: Core game logic (`gameLogic.ts`), isolated from UI to maintain pure function logic which is highly testable.
- **Backend Architecture (server/):**
  - Follows an MVC-like pattern with `routes`, `controllers`, `services`, and `models` directories.
  - `services` handle business logic and database querying to keep controllers lean.

## Where AI was used

AI was utilized in the development process for:
- Generating the complex Mahjong tile deck creation and shuffling logic.
- Building the UI components, specifically focusing on modern 3D styling and smooth Tailwind animations for a premium feel.
- Setting up the Zustand global state structure to handle asynchronous updates.
- Scaffolding the Express.js and Mongoose backend setup for the leaderboard API.
