# Game Team Randomizer

**This entire repository was created using GitHub Copilot in Agent mode.**

Game Team Randomizer is a Svelte web application for managing players and generating random teams for games. The app features a clean, responsive UI with a purple and pink color scheme.

## Features

- **Player Management:** Add, remove, and edit player names.
- **Team Generation:** Randomly generate teams from the player list, with customizable team sizes or number of teams.
- **Responsive UI:** Works well on desktop and mobile devices.
- **Modern Svelte Stack:** Built with Svelte, Vite, and Vitest for testing.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/game-team-generator.git
cd game-team-generator
npm install
```

### Running the App
Start the development server:

```bash
npm run dev
```

Open your browser to the local address shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Project Structure

- `src/` - Main source code
  - `App.svelte` - Main app component
  - `lib/` - Reusable Svelte components
- `public/` - Static assets
- `tests/` - Test files

## Customization

You can modify the color scheme and features by editing the Svelte components in `src/`.

## License

This project is provided as-is for demonstration and educational purposes.
