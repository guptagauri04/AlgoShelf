![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8)
![License](https://img.shields.io/badge/License-MIT-green)

# 🚀 AlgoShelf

**Learn Data Structures & Algorithms through interactive visualizations, animations, and intuitive explanations.**

AlgoShelf is an educational platform designed to help students understand Data Structures and Algorithms through visual learning rather than memorization. Styled after a classical digital bookshelf, each DSA subject is structured as a **Book**, with individual algorithms organized as interactive **Chapters** complete with step-by-step playback, pseudocode tracing, complexity analysis, and intuitive mental models.

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge)](https://algo-shelf.vercel.app)

👉 https://algo-shelf.vercel.app

## ✨ Core Features

- 📚 **Library Bookshelf Theme**: Topics organized conceptually into interactive editorial books.
- 🎬 **Step-by-Step Execution**: Play, pause, step forward, and step backward with speed control.
- 📖 **Code Tracing**: Line-by-line pseudocode highlighting synchronized with visual steps.
- 📊 **Complexity Cards**: Live Time and Space complexity metrics for worst, average, and best cases.
- 📈 **State Tracking**: Real-time counters for comparisons, swaps, and active pointer markers.
- 🎨 **Responsive Editorial UI**: Clean typography and layouts using Tailwind CSS and Framer Motion.

---

## 📚 Modules and Implementation Status

### ✅ Implemented Modules

#### 1. Sorting Algorithms (`/sorting`)
- **Bubble Sort**: Adjacent element comparisons with optimized early-exit detection.
- **Selection Sort**: Unsorted minimum search with single-swap placement.
- **Insertion Sort**: Sorted subarray shifting and in-place insertion.
- **Merge Sort**: Divide-and-conquer recursion tree with segmented array reconstruction.
- **Quick Sort**: Interactive pivot selection with left/right partitioning.
- **Heap Sort**: Max-heap construction and root-extraction sorting.

#### 2. Searching Algorithms (`/searching`)
- **Linear Search**: Sequential scan with match/mismatch states, comparisons counter, and custom target presets.
- *Binary Search*: Layout and chapter card created; interactive visualizer marked as *Coming Soon*.

#### 3. Arrays (`/learn/arrays`)
- **Array Insertion & Deletion**: Dynamic element shifting, index validation, and animated gap closure.

---

### 🚧 Modules Open for Community Contributions

The following modules are planned on the AlgoShelf roadmap:

- **Linked Lists**: Singly, Doubly, and Circular Linked Lists.
- **Stacks & Queues**: LIFO Canister and FIFO Ring Buffer implementations.
- **Tree Algorithms**: Binary Search Trees (BST), AVL Trees, and Traversals.
- **Graph Algorithms**: BFS, DFS, Dijkstra's Shortest Path, and Minimum Spanning Trees.
- **Dynamic Programming**: Memoization and Tabulation visualizers.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 (`vite`)
- **Styling**: Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`)
- **Icons**: Lucide React (`lucide-react`)
- **Animations**: Framer Motion (`framer-motion`)
- **Routing**: React Router DOM v7 (`react-router-dom`)
- **Typography**: Fontsource (`@fontsource/fraunces`, `@fontsource/inter`, `@fontsource/jetbrains-mono`)

---

## 📁 Project Folder Structure

AlgoShelf uses a modular architecture where each DSA domain is isolated inside `src/modules/<module-name>/`:

```text
AlgoShelf/
├── public/                 # Static assets (favicons, SVG icons)
├── src/
│   ├── assets/             # Brand logos and illustration images
│   ├── components/         # Shared global UI components (Footer, StatCard, etc.)
│   │   └── home/           # Homepage components (BookShelf, Book, Hero, Navbar)
│   ├── modules/            # Topic-specific DSA modules
│   │   ├── sorting/        # Sorting module (pages, components, step utils, hooks, data)
│   │   ├── searching/      # Searching module (Linear Search, theory cards, searchHelpers)
│   │   └── arrays/         # Arrays module (Insertion/Deletion canvas, operations)
│   ├── pages/              # Standalone views (Home, About, NotFound)
│   ├── App.jsx             # Route declarations
│   ├── main.jsx            # Application root entry
│   └── index.css           # Global Tailwind CSS definitions
├── eslint.config.js        # ESLint flat configuration
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite configuration and path aliases
├── CONTRIBUTING.md         # Contribution guide & event rules
└── README.md               # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `20.19+` or `22.12+` (LTS recommended, required by Vite 8)
- **npm**: `10+` (bundled with Node.js)
- **Git**

Verify your environment:
```bash
node -v
npm -v
git --version
```

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/guptagauri04/AlgoShelf.git
   cd AlgoShelf
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *(Or run `npm ci` for a clean install synchronized strictly with `package-lock.json`).*

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Vite will serve the app locally at `http://localhost:5173`. Open this URL in your web browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production assets into the `dist/` directory. |
| `npm run preview` | Locally serves the production `dist/` build at `http://localhost:4173`. |
| `npm run lint` | Runs ESLint across all JavaScript/JSX source files. |

---

## 🤝 Contributing to AlgoShelf

Contributions are warmly welcomed! We participate in open-source initiatives including **IEEE IGDTUW Open Source Week 10.0**.

### Contribution Workflow

1. Browse the repository's **Issues** tab.
2. Comment on an open issue to express your interest.
3. Coordinate on the project Discord channel and wait for assignment before writing code.
4. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
5. Before opening a Pull Request, verify your changes pass both checks:
   ```bash
   npm run build
   npm run lint
   ```
6. Submit a Pull Request linked to the relevant issue.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## 📸 Visual Previews

### Home Page & Library
<img width="1626" height="888" alt="Homepage" src="https://github.com/user-attachments/assets/9c8996ec-2562-47e2-8a31-2af9f11339e1" />

### BookShelf Layout
<img width="1043" height="852" alt="image" src="https://github.com/user-attachments/assets/9afffaa1-d3f6-483c-8175-cca2aa7b0f4d" />

### Sorting Module Visualizer
<img width="1426" height="941" alt="Sorting Module" src="https://github.com/user-attachments/assets/ddb9ddfc-5e08-4a0c-9699-3a38645763a7" />

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 👩‍💻 Author

**Gauri Gupta**  
B.Tech — Internet of Things (IIoT), IGDTUW  
Interested in Software Development, Artificial Intelligence, and Data Structures & Algorithms.

⭐ If you find AlgoShelf useful, consider giving the repository a star!
