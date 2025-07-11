# Personal Dashboard

A modern, responsive personal dashboard web app built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. This dashboard helps you stay organized and productive with animated widgets for weather, to-dos, time, and productivity stats.

---

## ✨ Features

- **Weather Widget**: Search for weather in Moroccan cities (or your location), with live weather data, suggestions, and error handling.
- **To-Do List Widget**: Add, complete, and delete tasks. Tasks are saved in your browser (localStorage).
- **Clock Widget**: Shows the current time and date, with both digital and analog clock displays.
- **Productivity Chart**: Displays a weekly bar chart of focused hours (static demo data).
- **Theme Toggle**: Switch between light and dark mode.
- **Responsive Design**: Works on all screen sizes, with a sliding panel for mobile navigation.

---

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) (v14)
- [React](https://react.dev/) (v18)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (with custom config and dark mode)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Recharts](https://recharts.org/) (charts)
- [Radix UI](https://www.radix-ui.com/) (accessible UI primitives)
- [Lucide React](https://lucide.dev/) (icons)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-directory>
```

### 2. Install dependencies
- With npm:
  ```bash
  npm install
  ```
- Or with pnpm:
  ```bash
  pnpm install
  ```

### 3. Run the development server
```bash
npm run dev
```
_or_
```bash
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

- `app/` – Main application pages and layout
- `components/` – All UI and widget components
- `components/ui/` – Reusable UI elements (buttons, dialogs, etc.)
- `lib/` – Utility functions
- `hooks/` – Custom React hooks
- `public/` – Static assets (images, icons)

---

## ⚙️ Customization

- **Tailwind CSS** is fully configured for easy theming and custom colors.
- Add more widgets by creating new components in the `components/` folder and including them in the dashboard.

---

## 👤 Usage

- No login required—just open the app and start using the widgets.
- All data (like to-dos) is stored in your browser, so it’s private to you.

---

## ♿ Accessibility & Best Practices

- Uses accessible UI components (Radix UI)
- Fully responsive and mobile-friendly
- Clean, simple code with clear naming and comments for complex logic

---

## 📄 License

This project is for personal portfolio and educational use. Feel free to use, modify, and share! 