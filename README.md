# Daily Tasks

A modern task management application built with React, TypeScript, and Capacitor for cross-platform deployment.

## Features

- 📝 Create and manage daily tasks
- 📱 Cross-platform (Web, iOS, Android)
- ⚡ Built with Vite for fast development and builds
- 🎨 Styled with Tailwind CSS
- 🔄 Real-time updates
- 📱 Mobile-first responsive design

## Prerequisites

- Node.js (v16 or later)
- npm or yarn package manager
- For mobile development: Xcode (iOS) or Android Studio (Android)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/billkampouroudis/daily_tasks.git
   cd daily-tasks
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in your browser**
   The app will be available at [http://localhost:5173](http://localhost:5173)

## Building for Production

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Mobile Development

This project is set up with Capacitor for cross-platform mobile development.

### Adding Platforms

```bash
# iOS
npx cap add ios

# Android
npx cap add android
```

### Opening in IDEs

```bash
# Open iOS project in Xcode
npx cap open ios

# Open Android project in Android Studio
npx cap open android
```

## Technologies Used

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Capacitor](https://capacitorjs.com/) - Cross-platform native runtime
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons

## Project Structure

```
/src
  /components    # Reusable UI components
  /data          # Data files
  /hooks         # Custom React hooks
  /types         # TypeScript type definitions
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
