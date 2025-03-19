# nimbus

a lightweight desktop application that allows users to view, manage, and switch between AWS profiles effortlessly.

## 🛠️ Tech Stack

- [Tauri](https://tauri.app/) - Desktop application framework
- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) - Package manager
- [Rust](https://www.rust-lang.org/) - Required for Tauri development

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nimbus.git
   cd nimbus
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. To run the Tauri application:
   ```bash
   pnpm tauri dev
   ```

## 🏗️ Building for Production

To create a production build:

```bash
pnpm build
```

For building the Tauri application:

```bash
pnpm tauri build
```

## 📝 Scripts

- `pnpm dev` - Start the Vite development server
- `pnpm build` - Build the web application
- `pnpm preview` - Preview the built application
- `pnpm tauri dev` - Start the Tauri development environment
- `pnpm tauri build` - Build the Tauri application

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
