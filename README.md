# GamesGlobal - Online Gaming Platform

A modern, responsive online gaming platform built with React, featuring a collection of casino games including slots, table games, and card games.

## 🎮 Features

- **Modern UI/UX**: Sleek design with smooth animations and transitions
- **Game Categories**: 
  - Slots
  - Table Games (Roulette)
  - Card Games (Blackjack, Poker)
- **Favorites System**: Save and organize your favorite games
- **Drag & Drop**: Customize your game order in favorites
- **Responsive Design**: Fully responsive layout for all devices
- **Category Filtering**: Easy navigation through game categories
- **Modern Sidebar**: Intuitive navigation with animated sidebar

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14.0 or higher)
- npm (version 6.0 or higher)

### Installation

1. Open your terminal and clone the repository:
```bash
git clone [repository-url]
cd gamesGlobal
```

2. Install all required dependencies:
```bash
npm install
```

This will install:
- React and React DOM
- TypeScript and types
- Material-UI components and icons
- Redux and React-Redux
- React Router DOM
- Styled Components
- Other development dependencies

3. Create a local environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The application will open automatically in your default browser at `http://localhost:3000`.

### Troubleshooting Common Issues

If you encounter any issues during installation:

1. **Node.js version conflicts**:
   ```bash
   nvm install 14
   nvm use 14
   ```

2. **Dependency installation errors**:
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and reinstall
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **Port conflicts**:
   - If port 3000 is in use, the app will prompt to use a different port
   - Alternatively, you can manually change the port in `.env`

## 🛠️ Built With

- React
- TypeScript
- Material-UI (MUI)
- Redux (for state management)
- React Router (for navigation)
- Styled Components

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Usage

1. **Browse Games**: 
   - Visit the homepage to see all available games
   - Use category filters to find specific game types

2. **Navigation**:
   - Use the sidebar menu (accessible via the menu button) to navigate between sections
   - Click on game category cards for quick access to specific game types

3. **Favorites**:
   - Click the heart icon on any game to add it to favorites
   - Visit the Favorites section to see all saved games
   - Drag and drop games to reorder them in your favorites list

## 💻 Development

To run the application in development mode:

```bash
npm run dev
```

For production build:

```bash
npm run build
```

## 📝 Additional Notes

- The application uses local storage to persist favorites and game order
- All game data is managed through Redux store
- The UI is optimized for both dark and light themes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details 