# Contributing to AlgoShelf

Thank you for your interest in contributing to AlgoShelf! We welcome developers of all experience levels to help make learning Data Structures and Algorithms more interactive.

## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+ (an LTS release is recommended)
- npm
- Git
- A GitHub account

### Set Up the Project

1. Fork the AlgoShelf repository on GitHub.
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR-USERNAME/AlgoShelf.git
   ```

3. Navigate into the project:

   ```bash
   cd AlgoShelf
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## How to Contribute

1. Visit the repository's **Issues** tab.
2. Browse the open issues and choose a task that matches your interests and experience.
3. Read the issue description and check whether someone is already working on it.
4. Comment on the GitHub issue to express your interest.
5. Request assignment through the AlgoShelf Discord project channel using `/assign`, as instructed by the event organisers.
6. Wait for confirmation before starting work.
7. Create a separate branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

8. Make your changes and test them:

   ```bash
   npm run build   # the production build must succeed
   npm run lint    # do not introduce new ESLint errors or warnings
   ```

9. Commit your work:

   ```bash
   git add .
   git commit -m "Add: describe your changes"
   ```

10. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

11. Open a Pull Request against the `main` branch and link the related issue.

## Understanding Issue Labels

- `good first issue` – Tasks suitable for beginners.
- `enhancement` – New features or improvements.
- `bug` – Issues involving something that is not working correctly.
- `documentation` – README, guides and documentation improvements.
- `help wanted` – Tasks where additional contributors are welcome.

## Contribution Guidelines

- Keep your code readable and organised.
- Follow the existing project structure and styling conventions.
- Avoid modifying unrelated files.
- Test your changes before submitting a pull request.
- Include screenshots or explanations for UI changes.
- Do not submit unfinished or non-functional features.
- Keep documentation accurate: never describe an unimplemented feature as finished, and update the README when behaviour, scripts or folder layout change.
- Communicate with the mentor if you need clarification.
- Avoid working on an issue that has already been assigned to another contributor.

## Areas Open for Contribution

- Searching Algorithms
- Arrays and Linked Lists
- Stacks and Queues
- Trees and Graphs
- UI/UX and responsive design
- Bug fixes and documentation

Please check existing issues before starting work to avoid duplicate contributions.

## Need Help?

If you have questions, reach out in the AlgoShelf Discord project channel or contact the project mentor.

Happy Contributing! 🚀
