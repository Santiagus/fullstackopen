## Project Setup & Boilerplate Cleanup

This project was initialized with Vite and cleaned up for the Full Stack Open exercises.

### 1. Initialize Vite Project

```bash
npm create vite@latest unicafe -- --template react
cd unicafe
npm install
```

2. Remove Boilerplate Files
   Remove default styling and starter assets:

```bash
rm -f src/App.css src/index.css src/assets/*
```

3. Reset Entry Point (src/main.jsx)
   Ensure src/main.jsx only mounts the root component without unused CSS imports:

```bash

import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
```
