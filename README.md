# React Table Component

A modern, feature-rich React table component built with TypeScript, Vite, and Tailwind CSS. This project includes a reusable table component with pagination, sorting, filtering, and editing capabilities, along with Storybook for component documentation and testing.

## Features

- 📊 **Data Table**: Display data in a structured table format
- 🔍 **Search & Filter**: Built-in search functionality
- 📄 **Pagination**: Configurable pagination with page size options
- ✏️ **Inline Editing**: Edit cells directly in the table
- 🗑️ **Row Actions**: Delete rows with confirmation
- ✅ **Row Selection**: Select single or multiple rows
- 📱 **Responsive**: Mobile-friendly design
- 🎨 **Customizable**: Styled with Tailwind CSS
- 📚 **Storybook**: Component documentation and testing
- 🧪 **Testing**: Vitest integration with Storybook

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 9.0 or higher) or **yarn**

You can check your versions by running:

```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-table
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Available Scripts

### Development

- **Start development server**

  ```bash
  npm run dev
  ```

  Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

- **Start Storybook**
  ```bash
  npm run storybook
  ```
  Launches Storybook for component development and documentation. Open [http://localhost:6006](http://localhost:6006) to view it.

### Building

- **Build for production**

  ```bash
  npm run build
  ```

  Builds the app for production to the `dist` folder.

- **Build Storybook**
  ```bash
  npm run build-storybook
  ```
  Builds Storybook for production to the `storybook-static` folder.
