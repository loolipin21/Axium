# AI Recipe Generator (Frontend)

A modern React app for generating delicious recipes with AI. Enter your ingredients and get instant, easy-to-follow recipes!

---

## Preview

![App Screenshot](/frontend/public/screenshot.png)

---

## Features
- Clean, modern UI
- Responsive design
- Instant recipe generation from your ingredients
- Copy-paste friendly

---

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

---

## Project Structure
- `src/` — React components, hooks, and services
- `public/` — Static assets (add your screenshot here as `screenshot.png`)
- `App.css` — Main styles

---

## API
This frontend expects a backend running at `http://localhost:8000/recipes` that accepts a POST request with a prompt and returns recipe data.

---

## License
MIT
