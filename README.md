# Next.js ifarmer Assignment

This is a [Next.js](https://nextjs.org) project showcasing two main applications:

## Live Demo

🚀 **Live Demo:** [View Demo](https://ifarmer-assignment.vercel.app/)

## Assignment 1: Tic-tac-toe Game

A modern implementation of the classic Tic-tac-toe game with advanced features:

### Game Features
- Best of 5 rounds gameplay system
- Points-based scoring (2 points for win, 1 for loss, 0 for draw)
- Real-time game state management
- Persistent leaderboard system
- Player statistics tracking
- Responsive design with mobile support
- Dark mode support

### Game Rules
- Players take turns marking spaces on a 3×3 grid
- First player uses "X", second player uses "O"
- First to win 3 rounds wins the match
- Points are awarded after each match:
  - Win: 2 points
  - Loss: 1 point
  - Draw: 0 points

## Assignment 2: Product Management System

A comprehensive product management system with full CRUD operations:

### Features
- Product listing with pagination
- Category-based filtering
- Product creation and editing
- Product details view
- Responsive grid and table views
- Image preview support

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- Next.js 14
- TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Shadcn UI components
- React Hook Form for form handling

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/store` - Redux store configuration and slices
- `/hooks` - Custom React hooks
- `/types` - TypeScript type definitions
- `/utils` - Utility functions and form schemas

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
