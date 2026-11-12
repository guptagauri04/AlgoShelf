![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8)
![License](https://img.shields.io/badge/License-MIT-green)

# 🚀 AlgoShelf

**Learn Data Structures & Algorithms through interactive visualizations, animations, and intuitive explanations.**

AlgoShelf is an educational platform designed to help students understand Data Structures and Algorithms through visual learning rather than memorisation. It combines interactive visualizations, step-by-step execution, pseudocode, complexity analysis, and educational explanations.

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge)](https://algo-shelf.vercel.app)

👉 https://algo-shelf.vercel.app

## ✨ Features

- 📚 Interactive algorithm visualizations
- 🎬 Step-by-step algorithm execution with play/pause, speed and reset controls
- 📖 Pseudocode, intuition and theory sections alongside every visualizer
- 📊 Time and space complexity analysis
- 📈 Execution statistics and progress information
- 🎨 Responsive user interface
- ⚡ Animated interactions using Framer Motion

## 📚 Project Modules and Progress

### ✅ Sorting Algorithms — Implemented

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

The Sorting module includes interactive visualizations, execution controls, pseudocode, complexity analysis, and educational explanations. Each algorithm has its own page, reachable from the module overview at `/sorting` (for example `/sorting/bubble`, `/sorting/quick`). Merge Sort adds segment/tree views, Quick Sort lets you pick a pivot strategy, and Heap Sort shows the underlying heap tree — all driven by the same control panel.

### 🔍 Searching Algorithms — In progress

A Searching landing page is available at `/searching`, but it currently shows a "Coming Soon" placeholder. The visualizers for Linear Search and Binary Search are still being built and are **not yet usable in the app** — contributions here are welcome.

### 🚧 Modules Open for Development

The following modules are planned and welcome open-source contributions:

- Arrays
- Linked Lists
- Stacks and Queues
- Trees
- Graph Algorithms
- Dynamic Programming
- Greedy Algorithms
- Backtracking

**Note:** These modules are not yet implemented. Their development is open to contributors.

## 🛠️ Tech Stack

- React 19
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- Framer Motion
- React Router

## 🚀 Getting Started

Follow these steps to run AlgoShelf locally.

### Prerequisites

- **Node.js 20.19+ or 22.12+** (an LTS release is recommended). This is the minimum
  required by the Vite toolchain — check with `node -v`.
- **npm** (ships with Node.js) — check with `npm -v`.
- **Git**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/guptagauri04/AlgoShelf.git
   ```

2. Navigate to the project directory:

   ```bash
   cd AlgoShelf
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   > Working on a contribution? `npm ci` installs the exact versions pinned in
   > `package-lock.json` and is the safer choice for reproducing a clean setup.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in your terminal (by default
   <http://localhost:5173>) in your browser. Vite prints the exact address and
   picks another port automatically if 5173 is already in use.

### Available Scripts

| Command            | What it does                                        |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Start the development server with hot module reload |
| `npm run build`    | Produce an optimized production build in `dist/`    |
| `npm run preview`  | Serve the production build locally (run `build` first) |
| `npm run lint`     | Run ESLint over the project                         |

### Build for Production

```bash
npm run build
```

The output is written to `dist/`, which is what the Vercel deployment serves.

## 🗂️ Project Structure

```text
AlgoShelf/
├── public/                  # Static files served as-is (favicon, icon sprite)
├── src/
│   ├── main.jsx             # React entry point (mounts the app + router)
│   ├── App.jsx              # Route definitions (/, /about, /sorting, /searching)
│   ├── pages/               # Top-level pages: Home, About, NotFound
│   ├── layouts/             # Shared page layout (MainLayout)
│   ├── components/          # Reusable UI: Navbar, Footer, cards, home sections
│   ├── modules/
│   │   ├── sorting/         # Sorting module: components/, data/, hooks/,
│   │   │                    #   layouts/, pages/, utils/
│   │   └── searching/       # Searching module: components/, data/, hooks/,
│   │                        #   pages/, utils/
│   ├── assets/              # Images, logos and icons referenced by the app
│   └── index.css            # Global styles (Tailwind CSS)
├── index.html               # HTML entry point for Vite
├── vite.config.js           # Vite + Tailwind config, "@" alias → src/
├── eslint.config.js         # ESLint rules used by `npm run lint`
├── vercel.json              # SPA rewrite rules for the hosted deployment
├── package.json             # Scripts and dependencies
├── README.md                # This guide
├── CONTRIBUTING.md          # Contribution guidelines
└── LICENSE                  # MIT license
```

Each algorithm lives under `src/modules/<module>/` and follows the same shape:
`pages/` holds the route components, `components/` the visualizer UI, `data/`
the algorithm content (pseudocode, complexity, explanations), `hooks/` the
animation/control logic, and `utils/` the step generators.

## 🤝 Contributing

Contributions are welcome!

You can help improve AlgoShelf by:

- Developing new DSA modules.
- Improving existing visualizations.
- Fixing bugs and improving responsiveness.
- Enhancing explanations and documentation.
- Improving accessibility and user experience.

Before starting work, check the repository's GitHub Issues and coordinate with the project mentor.

Before opening a pull request, make sure `npm run build` succeeds and that `npm run lint` does not report any new problems from your changes.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📸 Screenshots

### Home Page

<img width="1626" height="888" alt="Homepage" src="https://github.com/user-attachments/assets/9c8996ec-2562-47e2-8a31-2af9f11339e1" />

### BookShelf

<img width="1043" height="852" alt="image" src="https://github.com/user-attachments/assets/9afffaa1-d3f6-483c-8175-cca2aa7b0f4d" />

### Sorting Module

<img width="1426" height="941" alt="Sorting Module" src="https://github.com/user-attachments/assets/ddb9ddfc-5e08-4a0c-9699-3a38645763a7" />

### Quick Sort Visualiser

<img width="1210" height="951" alt="Quick Sort Visualiser" src="https://github.com/user-attachments/assets/07da5813-4314-413a-b5d1-6c6f6c181fc2" />

## 🔭 Future Vision

AlgoShelf aims to become a comprehensive interactive learning platform for Data Structures and Algorithms, helping students build strong conceptual understanding and prepare for technical interviews.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 👩‍💻 Author

**Gauri Gupta**

B.Tech — Internet of Things (IIoT)

Interested in Software Development, Artificial Intelligence, and Data Structures & Algorithms.

⭐ If you find AlgoShelf useful, consider giving the repository a star!
